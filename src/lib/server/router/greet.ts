import { publicProcedure, router } from '../trpc';

export const greetRouter = router({
	hello: publicProcedure.query(() => 'hello')
});
