<script lang="ts">
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { trpc } from '$lib/trpc';
	import '../app.pcss';

	export let data;
	$: queryClient = trpc.hydrateFromServer(data.trpcHydrationClient);
</script>

<QueryClientProvider client={queryClient}>
	<slot />
</QueryClientProvider>
