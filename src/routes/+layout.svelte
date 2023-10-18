<script lang="ts">
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { trpc } from '$lib/trpc';
	import '../app.pcss';

	export let data;
	$: queryClient = trpc.hydrateFromServer(data.trpcHydrationClient);
</script>

<QueryClientProvider client={queryClient}>
	<div class="bg-gradient-to-t from-neutral-400 bg-fixed to-neutral-200 min-h-full">
		<slot />
	</div>
</QueryClientProvider>
