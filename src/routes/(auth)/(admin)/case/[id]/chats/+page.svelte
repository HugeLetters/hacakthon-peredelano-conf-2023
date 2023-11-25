<script lang="ts">
	export let data;

	const chatListQuery = data.trpc.case.caseChatList.query({ caseId: data.caseId });
</script>

<div>case chats {data.caseId}</div>
{#if $chatListQuery.isSuccess}
	{#each $chatListQuery.data as chat}
		<div>{chat.content}</div>
	{/each}
{/if}
