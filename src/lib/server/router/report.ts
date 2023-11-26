import { TRPCError } from '@trpc/server';
import { desc, eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../database';
import { Case } from '../database/schema/case';
import { Report, categorySchema, countrySchema } from '../database/schema/report';
import { adminProcedure, reportProcedure, router, userProcedure } from '../trpc';
import { throwInternalError } from './utils';

export const reportRouter = router({
	create: userProcedure
		.input(
			z.object({
				name: z.string(),
				category: categorySchema,
				content: z.string().max(65535),
				country: countrySchema.optional(),
				organization: z.string().max(50).optional()
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { id: caseId } = await db
				.insert(Case)
				.values({ name: `${input.name} - ${input.category}` })
				.returning()
				.get()
				.catch(throwInternalError);

			return db
				.insert(Report)
				.values({
					creatorId: ctx.session.user.userId,
					caseId,
					authorName: input.name,
					category: input.category,
					content: input.content,
					country: input.country,
					organization: input.organization
				})
				.returning()
				.get()
				.then((x) => x.id)
				.catch(throwInternalError);
		}),
	getUserReportList: userProcedure.query(({ ctx }) =>
		db
			.select()
			.from(Report)
			.where(eq(Report.creatorId, ctx.session.user.userId))
			.orderBy(desc(Report.createdAt))
			.all()
			.catch(throwInternalError)
	),
	getUserReport: reportProcedure.query(({ input }) =>
		db.select().from(Report).where(eq(Report.id, input.reportId)).get().catch(throwInternalError)
	),
	reassignToCase: adminProcedure
		.input(z.object({ caseId: z.string(), reportId: z.string() }))
		.mutation(({ input }) =>
			db
				.update(Report)
				.set({ caseId: input.caseId })
				.where(eq(Report.id, input.reportId))
				.then((query) => {
					if (!query.rowsAffected) {
						throw new TRPCError({ code: 'BAD_REQUEST', message: 'Such report does not exist' });
					}
				}, throwInternalError)
		),
	markAsRead: reportProcedure.mutation(({ ctx, input }) =>
		db
			.update(Report)
			.set(ctx.session.user.role === 'admin' ? { isReadByAdmin: true } : { isReadByUser: true })
			.where(eq(Report.id, input.reportId))
			.returning()
			.get()
			.then(() => void 0)
			.catch(throwInternalError)
	)
});
