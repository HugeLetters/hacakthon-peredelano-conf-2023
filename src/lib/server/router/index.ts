import { createTRPCSvelteServer } from 'trpc-svelte-query/server';
import { createTrpcContext, router } from '../trpc';
import { caseRouter } from './case';
import { messageRouter } from './message';
import { reportRouter } from './report';
import { threadRouter } from './thread';
import { userRouter } from './user';

export const appRouter = router({
	report: reportRouter,
	case: caseRouter,
	thread: threadRouter,
	message: messageRouter,
	user: userRouter
});

export type AppRouter = typeof appRouter;

export const trpcServer = createTRPCSvelteServer({
	endpoint: '/api/trpc',
	router: appRouter,
	createContext: createTrpcContext
});
