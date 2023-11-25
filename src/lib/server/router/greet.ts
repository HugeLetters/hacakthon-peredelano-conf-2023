import { db } from '../database';
import { User } from '../database/schema/auth';
import { protectedProcedure, publicProcedure, router } from '../trpc';

export const greetRouter = router({
	hello: publicProcedure.query(() => 'hello'),
	usernames: protectedProcedure.query(() =>
		db
			.select({ name: User.name })
			.from(User)
			.then((x) => x)
	)
});
