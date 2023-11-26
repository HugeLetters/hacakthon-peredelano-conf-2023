import { asc, eq, getTableColumns } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../database';
import { Message, Report } from '../database/schema/report';
import { reportProcedure, router } from '../trpc';
import { throwInternalError } from './utils';
import { aggregateArrayColumns } from '../database/utils';

export const messageRouter = router({
	send: reportProcedure
		.input(z.object({ content: z.string() }))
		.mutation(async ({ ctx, input }) => {
			await db
				.insert(Message)
				.values({
					authorId: ctx.session.user.userId,
					content: input.content,
					reportId: input.reportId
				})
				.catch(throwInternalError);

			return db
				.update(Report)
				.set(ctx.session.user.role === 'admin' ? { isReadByUser: false } : { isReadByAdmin: false })
				.where(eq(Report.id, input.reportId))
				.returning()
				.get()
				.then(() => void 0)
				.catch(throwInternalError);
		}),
	getChat: reportProcedure.query(({ input, ctx }) => {
		return db
			.select({
				messages: aggregateArrayColumns(getTableColumns(Message)),
				read: ctx.session.user.role === 'admin' ? Report.isReadByAdmin : Report.isReadByUser
			})
			.from(Message)
			.where(eq(Message.reportId, input.reportId))
			.leftJoin(Report, eq(Report.id, Message.reportId))
			.orderBy(asc(Message.createdAt))
			.groupBy(Report.id)
			.get()
			.then((x) => x ?? null)
			.catch(throwInternalError);
	})
});
