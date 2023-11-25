import { createTRPCSvelteServer } from 'trpc-svelte-query/server';
import { createTrpcContext, router } from '../trpc';
import { reportRouter } from './report';

export const appRouter = router({
	report: reportRouter
});

export type AppRouter = typeof appRouter;

export const trpcServer = createTRPCSvelteServer({
	endpoint: '/api/trpc',
	router: appRouter,
	createContext: createTrpcContext
});
