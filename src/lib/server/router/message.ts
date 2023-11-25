import { TRPCError } from '@trpc/server';
import { asc, eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../database';
import { Message, Report } from '../database/schema/report';
import { adminProcedure, reportProcedure, router } from '../trpc';
import { throwInternalError } from './utils';

export const messageRouter = router({
	send: reportProcedure
		.input(z.object({ content: z.string() }))
		.mutation(async ({ ctx, input }) => {
			return db
				.insert(Message)
				.values({
					authorId: ctx.session.user.userId,
					content: input.content,
					reportId: input.reportId
				})
				.catch(throwInternalError);
		}),
	getChat: reportProcedure.query(({ input }) => {
		return db
			.select()
			.from(Message)
			.where(eq(Message.reportId, input.reportId))
			.orderBy(asc(Message.createdAt))
			.all()
			.catch(throwInternalError);
	}),
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
		)
});
