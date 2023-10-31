<script lang="ts">
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { trpc } from '$lib/trpc';
	import '../app.scss';

	export let data;
	$: queryClient = trpc.hydrateFromServer(data.trpcHydrationClient);
</script>

<QueryClientProvider client={queryClient}>
	<div>
		<a href="/api/auth/signin/google">Sign in with google</a>
		<div>{data.session?.user.name}</div>
		<slot />
	</div>
</QueryClientProvider>

<style lang="scss">
	div {
		min-height: 100%;
		background: linear-gradient(to top, #000a, #0000);
		background-attachment: fixed;
	}
</style>
