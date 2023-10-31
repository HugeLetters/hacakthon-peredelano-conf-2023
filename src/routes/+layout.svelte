<script lang="ts">
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import '../app.scss';

	export let data;
	$: queryClient = data.trpc.hydrateFromServer(data.trpcHydrationClient);
</script>

<QueryClientProvider client={queryClient}>
	<slot />
</QueryClientProvider>
