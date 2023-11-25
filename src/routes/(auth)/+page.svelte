<script lang="ts">
	import Textarea from '$lib/components/textarea.svelte';

	export let data;

	const helloQuery = data.trpc.greet.hello.query(undefined, { staleTime: 5000 });
	const usersQuery = data.trpc.greet.usernames.query();
	let text: string;
</script>

<div>{$helloQuery.data} {data.session.user.name}</div>
{#if $usersQuery.isSuccess}
	{#each $usersQuery.data as { name }}
		<div>{name}</div>
	{/each}
{/if}

<Textarea bind:text />

{text}
