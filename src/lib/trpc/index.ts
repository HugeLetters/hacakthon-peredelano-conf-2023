import type { AppRouter } from '$lib/server/router';
import { createTRPCSvelte, httpBatchLink } from 'trpc-svelte-query';
// Import the router type from your server file

export const trpc = createTRPCSvelte<AppRouter>({
	links: [httpBatchLink({ url: '/api/trpc' })]
});
