<script lang="ts">
	import { onMount } from 'svelte';

	export let data;

	const query = data.trpc.greet.hello.query(undefined, { staleTime: Infinity });
	const query2 = data.trpc.greet.hi.query(undefined, {});
	const secretQuery = data.trpc.privateGreet.privateHi.query(undefined, { staleTime: Infinity });
	onMount(() => {
		setTimeout(() => {
			data.trpc.greet.utils.invalidate();
		}, 500);
	});
</script>

<h1 class="header">Welcome to SvelteKit {$query.data} - {$query2.data}</h1>
<h1>Query with middleware {$secretQuery.data}</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<a href="/other">other page</a>

<style lang="scss">
	.header {
		background: linear-gradient(to left, yellow, green);
	}
</style>
