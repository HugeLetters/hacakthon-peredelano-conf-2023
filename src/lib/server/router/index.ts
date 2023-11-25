import { createTRPCSvelteServer } from 'trpc-svelte-query/server';
import { createTrpcContext, router } from '../trpc';
import { reportRouter } from './report';
import { caseRouter } from './case';
import { threadRouter } from './thread';
import { messageRouter } from './message';

export const appRouter = router({
	report: reportRouter,
	case: caseRouter,
	thread: threadRouter,
	message: messageRouter
});

export type AppRouter = typeof appRouter;

export const trpcServer = createTRPCSvelteServer({
	endpoint: '/api/trpc',
	router: appRouter,
	createContext: createTrpcContext
});
