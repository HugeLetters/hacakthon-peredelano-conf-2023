<script lang="ts">
	export let data;

	const threadList = data.trpc.thread.getThreadList.query({ caseId: data.caseId });
</script>

<div>case threads</div>
{#if $threadList.isSuccess}
	{#each $threadList.data as thread (thread.id)}
		<a href="/case/{data.caseId}/thread/{thread.id}">{thread.snippet}</a>
	{/each}
{/if}

<a href="/case/{data.caseId}/thread/new">create new thread</a>
