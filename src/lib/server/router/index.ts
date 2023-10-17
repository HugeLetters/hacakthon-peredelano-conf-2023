import { createTRPCSvelteServer } from 'trpc-svelte-query/server';
import { router } from '../trpc';
import { greetRouter } from './greet';

export const appRouter = router({
	greet: greetRouter
});
export type AppRouter = typeof appRouter;
export const trpcServer = createTRPCSvelteServer({
	endpoint: '/api/trpc',
	router: appRouter,
	createContext() {
		return {};
	}
});
