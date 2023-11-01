import { goto } from '$app/navigation';
import { getSignInUrl } from '$lib/auth';
import type { AppRouter } from '$lib/server/router';
import { QueryCache } from '@tanstack/svelte-query';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { TRPCClientError, createTRPCSvelte, httpBatchLink } from 'trpc-svelte-query';
// Import the router type from your server file

export const trpc = createTRPCSvelte<AppRouter>({
	links: [httpBatchLink({ url: '/api/trpc' })],
	queryClientConfig: {
		queryCache: new QueryCache({
			onError(error) {
				if (error instanceof TRPCClientError && error.message === 'UNAUTHENTICATED') {
					goto(getSignInUrl(location.href));
				}
			}
		})
	}
});

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
