import type { AppRouter } from '$lib/server/router';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { createTRPCSvelte, httpBatchLink } from 'trpc-svelte-query';
// Import the router type from your server file

export const trpc = createTRPCSvelte<AppRouter>({
	links: [httpBatchLink({ url: '/api/trpc' })]
});

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
