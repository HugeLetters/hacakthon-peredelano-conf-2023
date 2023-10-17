import { privateProcedure, publicProcedure, router } from '../trpc';

export const greetRouter = router({
	hello: publicProcedure.query(() => {
		return 'hello';
	}),
	hi: publicProcedure.query(() => {
		return 'hi';
	}),
	privateHi: privateProcedure.query(({ ctx }) => {
		return `I also know the context. It's ${ctx.data}`;
	})
});
