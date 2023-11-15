<script lang="ts">
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import '$lib/css/reset.css';

	export let data;
	$: queryClient = data.trpc.hydrateFromServer(data.trpcHydrationClient);
</script>

<QueryClientProvider client={queryClient}>
	<slot />
</QueryClientProvider>
