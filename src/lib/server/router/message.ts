import { z } from 'zod';
import { db } from '../database';
import { Message } from '../database/schema/report';
import { reportProcedure, router } from '../trpc';
import { throwInternalError } from './utils';
import { eq } from 'drizzle-orm';

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
			.all()
			.catch(throwInternalError);
	})
});
