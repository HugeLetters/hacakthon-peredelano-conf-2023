import { createTRPCSvelteServer } from 'trpc-svelte-query/server';
import { createTrpcContext, router } from '../trpc';
import { greetRouter, privateGreetRouter } from './greet';
import { postRouter } from './post';
import { gmailRouter } from './gmail';

export const appRouter = router({
	greet: greetRouter,
	privateGreet: privateGreetRouter,
	post: postRouter,
	gmail: gmailRouter
});
export type AppRouter = typeof appRouter;

export const trpcServer = createTRPCSvelteServer({
	endpoint: '/api/trpc',
	router: appRouter,
	createContext: createTrpcContext
});
