import { desc, eq, getTableColumns, inArray } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../database';
import { Case, Thread } from '../database/schema/case';
import { Report } from '../database/schema/report';
import { aggregateArrayColumns } from '../database/utils';
import { adminProcedure, router } from '../trpc';
import { throwInternalError } from './utils';
import { statusList } from '$lib/options';
import { User } from '../database/schema/auth';

export const caseRouter = router({
	findMany: adminProcedure
		.input(z.object({ statusFilter: z.enum(statusList).optional() }).optional())
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
				.where(input?.statusFilter ? eq(Case.status, input.statusFilter) : undefined)
				.groupBy(Case.id)
				.orderBy(desc(Report.createdAt))
				.all()
				.catch(throwInternalError);
		}),
	caseInfo: adminProcedure.input(z.object({ caseId: z.string() })).query(({ input }) => {
		return db.select().from(Case).where(eq(Case.id, input.caseId)).get().catch(throwInternalError);
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
