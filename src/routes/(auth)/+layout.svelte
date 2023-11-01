<script lang="ts">
	import { SESSION_KEY, invalidateSession } from '$lib/auth';
	import { createQuery } from '@tanstack/svelte-query';

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
</script>

<!-- this is hack so that svelte doesn't compile out query away since it doesn't think it has side-effects -->
{#if false && $sesssionTracker.data}_{/if}

<div class="root">
	<div>{data.session.user.name}</div>
	<slot />
</div>

<style lang="scss">
	.root {
		min-height: 100%;
		background: linear-gradient(to top, #000a, #0000);
		background-attachment: fixed;
	}
</style>
