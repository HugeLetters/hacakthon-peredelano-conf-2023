<script lang="ts">
	import { page } from '$app/stores';
	import { SESSION_KEY, invalidateSession } from '$lib/auth';
	import Home from '$lib/icons/Home.svelte';
	import { createQuery } from '@tanstack/svelte-query';

	const sesssionTracker = createQuery({
		queryKey: [SESSION_KEY],
		async queryFn() {
			await invalidateSession();
			return null;
		},
		staleTime: 5 * 60 * 1000, // 5 minutes
		refetchInterval: 10 * 60 * 1000, // 10 minutes
		// so that session is considered fresh initially
		initialData: null
	});
</script>

<!-- this is hack so that svelte doesn't compile out query away since it doesn't think it has side-effects -->
{#if false && $sesssionTracker.data}_{/if}

<div class="root">
	{#if $page.url.pathname !== '/'}
		<div class="home">
			<span>gera.lt</span>
			<a href="/" aria-label="homepage">
				<Home height="2rem" width="2rem" />
			</a>
		</div>
	{/if}
	<slot />
</div>

<style lang="scss">
	.home {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem;
	}
	.root {
		min-height: 100%;
	}
</style>
