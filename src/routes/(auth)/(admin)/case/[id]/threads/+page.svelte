<script lang="ts">
	export let data;

	const threadList = data.trpc.thread.getThreadList.query({ caseId: data.caseId });
</script>

<div>case threads</div>
{#if $threadList.isSuccess}
	{#each $threadList.data as thread (thread.id)}
		<a href="/case/{data.caseId}/threads/{thread.id}">{thread.snippet}</a>
	{/each}
{/if}

<a href="/case/{data.caseId}/threads/new">create new thread</a>
