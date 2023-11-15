<script lang="ts">
	import { createPopover, melt } from '@melt-ui/svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	export let data;

	const query = data.trpc.greet.hello.query(undefined, { staleTime: Infinity });
	const query2 = data.trpc.greet.hi.query(undefined, {});
	const secretQuery = data.trpc.privateGreet.privateHi.query(undefined, { staleTime: Infinity });
	onMount(() => {
		setTimeout(() => {
			data.trpc.greet.utils.invalidate();
		}, 500);
	});

	const {
		elements: { trigger, content, arrow },
		states: { open }
	} = createPopover({ forceVisible: true });
</script>

<h1 class="header">Welcome to SvelteKit {$query.data} - {$query2.data}</h1>
<h1>Query with middleware {$secretQuery.data}</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<a href="/other">other page</a>

<button use:melt={$trigger} class="popover"> open popover </button>
{#if $open}
	<div use:melt={$content} transition:fly={{ y: -10 }} class="popover-content">
		<div use:melt={$arrow} />
		popover content
	</div>
{/if}

<style lang="scss">
	.header {
		background: linear-gradient(to left, yellow, green);
	}
	.popover {
		background-color: green;
		border-radius: 1rem;
		padding: 1rem;
	}
	.popover-content {
		@include green-bg;
		color: $custom-red;
		border-radius: 0.5rem;
		padding: 0.5rem;
	}
</style>
