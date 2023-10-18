<script lang="ts">
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { trpc } from '$lib/trpc';
	import '../app.pcss';

	export let data;
	$: queryClient = trpc.hydrateFromServer(data.trpcHydrationClient);
</script>

<QueryClientProvider client={queryClient}>
	<div class="min-h-full bg-gradient-to-t from-neutral-400 to-neutral-200 bg-fixed">
		<slot />
	</div>
</QueryClientProvider>
