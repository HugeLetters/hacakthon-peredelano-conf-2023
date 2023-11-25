<script lang="ts">
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import '$lib/css/reset.css';
	import '@fontsource-variable/inter';

	export let data;
	$: queryClient = data.trpc.hydrateFromServer(data.trpcHydrationClient);
</script>

<QueryClientProvider client={queryClient}>
	<div class="outer">
		<div class="root">
			<slot />
		</div>
	</div>
</QueryClientProvider>

<style lang="scss">
	.outer {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.root {
		max-width: 450px;
		width: 100%;
	}
</style>
