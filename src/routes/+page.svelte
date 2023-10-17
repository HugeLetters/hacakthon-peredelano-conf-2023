<script lang="ts">
	import { onMount } from 'svelte';

	export let data;

	const query = data.trpc.greet.hello.query();
	const query2 = data.trpc.greet.hi.query();
	const secretQuery = data.trpc.greet.privateHi.query();
	onMount(() => {
		setTimeout(() => {
			data.trpc.greet.privateHi.utils.invalidate();
		});
	});
</script>

<h1>Welcome to SvelteKit {$query.data} - {$query2.data}</h1>
<h1>Query with middleware {$secretQuery.data}</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<a href="/other">other page</a>
