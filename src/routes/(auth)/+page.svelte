<script lang="ts">
	export let data;

	const helloQuery = data.trpc.greet.hello.query(undefined, { staleTime: 5000 });
	const usersQuery = data.trpc.greet.usernames.query();
</script>

<div>{$helloQuery.data} {data.session.user.name}</div>
{#if $usersQuery.isSuccess}
	{#each $usersQuery.data as usersName}
		<div>{usersName.name}</div>
	{/each}
{/if}
