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
		min-height: 100vh;
		max-width: 450px;
		height: 100%;
		position: relative;
	}
	.root {
		height: 100%;
		width: 100%;
	}
</style>
