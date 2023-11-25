<script lang="ts">
	import { page } from '$app/stores';
	import { SESSION_KEY, invalidateSession, signOut } from '$lib/auth';
	import { createQuery, getQueryClientContext } from '@tanstack/svelte-query';

	export let data;

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

	const queryClient = getQueryClientContext();
</script>

<!-- this is hack so that svelte doesn't compile out query away since it doesn't think it has side-effects -->
{#if false && $sesssionTracker.data}_{/if}

<div class="root">
	<header class="header">
		<button on:click={() => signOut({ callbackUrl: $page.url.href, queryClient })}>
			Sign out of {data.session.user.name}
		</button>
	</header>
	<slot />
</div>

<style lang="scss">
	.root {
		min-height: 100%;
		padding: 0 16px;
	}

	.header {
		width: 100%;
		display: flex;
		justify-content: center;
		padding: 0.25rem;
		background-color: #0003;
	}
</style>
