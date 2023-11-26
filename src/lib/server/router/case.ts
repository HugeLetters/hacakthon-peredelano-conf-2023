import { statusList } from '$lib/options';
import { and, asc, desc, eq, getTableColumns, gt, inArray, like } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../database';
import { User } from '../database/schema/auth';
import { Case, Thread } from '../database/schema/case';
import { Report } from '../database/schema/report';
import { aggregateArrayColumns } from '../database/utils';
import { adminProcedure, router } from '../trpc';
import { throwInternalError } from './utils';

export const caseRouter = router({
	findMany: adminProcedure
		.input(
			z.object({
				/** Case id */
				cursor: z.string().optional(),
				statusFilter: z.enum(statusList).optional()
			})
		)
		.query(({ input }) => {
			return db
				.select({
					...getTableColumns(Case),
					reports: aggregateArrayColumns(getTableColumns(Report)),
					assignedAdminName: User.name
				})
				.from(Case)
				.leftJoin(Report, eq(Report.caseId, Case.id))
				.leftJoin(User, eq(Case.assignedAdmindId, User.id))
				.where(
					and(
						input?.statusFilter ? eq(Case.status, input.statusFilter) : undefined,
						input?.cursor ? gt(Case.id, input.cursor) : undefined
					)
				)
				.groupBy(Case.id)
				.orderBy(asc(Case.id), desc(Report.createdAt))
				.limit(30)
				.all()
				.then((caseList) => caseList.filter((caseData) => !!caseData.reports.length))
				.catch(throwInternalError);
		}),
	findManyByName: adminProcedure
		.input(z.object({ filter: z.string().optional() }))
		.query(({ input }) =>
			db
				.select({ id: Case.id, name: Case.name, status: Case.status })
				.from(Case)
				.where(input?.filter ? like(Case.name, `${input.filter}%`) : undefined)
				.orderBy(asc(Case.id), desc(Report.createdAt))
				.limit(50)
				.all()
				.catch(throwInternalError)
		),
	caseInfo: adminProcedure.input(z.object({ caseId: z.string() })).query(({ input }) => {
		return db
			.select({
				...getTableColumns(Case),
				reports: aggregateArrayColumns({
					country: Report.country,
					category: Report.category,
					createdAt: Report.createdAt
				}),
				assignedAdminName: User.name
			})
			.from(Case)
			.where(eq(Case.id, input.caseId))
			.leftJoin(Report, eq(Report.caseId, Case.id))
			.leftJoin(User, eq(Case.assignedAdmindId, User.id))
			.get()
			.then((caseInfo) => (caseInfo?.reports.length ? caseInfo : null))
			.catch(throwInternalError);
	}),
	caseChatList: adminProcedure.input(z.object({ caseId: z.string() })).query(({ input }) => {
		const sq = db.select({ caseId: Case.id }).from(Case).where(eq(Case.id, input.caseId));
		return db
			.select()
			.from(Report)
			.where(inArray(Report.caseId, sq))
			.all()
			.catch(throwInternalError);
	}),
	caseThreadList: adminProcedure.input(z.object({ caseId: z.string() })).query(({ input }) => {
		const sq = db.select({ caseId: Case.id }).from(Case).where(eq(Case.id, input.caseId));
		return db
			.select()
			.from(Thread)
			.where(inArray(Thread.caseId, sq))
			.all()
			.catch(throwInternalError);
	}),
	updateCaseData: adminProcedure
		.input(
			z.object({
				caseId: z.string(),
				newStatus: z.enum(statusList).optional(),
				newAdmin: z.string().optional(),
				newName: z.string().optional(),
				newSummary: z.string().optional()
			})
		)
		.mutation(({ input }) => {
			return db
				.update(Case)
				.set({
					status: input.newStatus,
					assignedAdmindId: input.newAdmin,
					name: input.newName,
					summary: input.newSummary
				})
				.where(eq(Case.id, input.caseId))
				.then(() => void 0)
				.catch(throwInternalError);
		})
});
