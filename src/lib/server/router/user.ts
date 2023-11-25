import { roleList } from '$lib/options';
import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../database';
import { User } from '../database/schema/auth';
import { adminProcedure, router } from '../trpc';
import { throwInternalError } from './utils';

export const userRouter = router({
	changeUserRole: adminProcedure
		.input(z.object({ userId: z.string(), newRole: z.enum(roleList) }))
		.mutation(({ input }) =>
			db
				.update(User)
				.set({ role: input.newRole })
				.where(eq(User.id, input.userId))
				.then((query) => {
					if (!query.rowsAffected) {
						throw new TRPCError({ code: 'BAD_REQUEST', message: 'Such user does not exist' });
					}
				}, throwInternalError)
		),
	getUsers: adminProcedure.query(() => db.select().from(User).all().catch(throwInternalError))
});
