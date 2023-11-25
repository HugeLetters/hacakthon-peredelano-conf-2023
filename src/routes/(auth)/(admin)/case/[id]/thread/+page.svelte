<script lang="ts">
	import Plus from '$lib/icons/Plus.svelte';

	export let data;

	const threadList = data.trpc.thread.getThreadList.query({ caseId: data.caseId });
</script>

<div class="root">
	{#if $threadList.isSuccess}
		<div class="cardList">
			{#each $threadList.data as thread (thread.id)}
				<a href="/case/{data.caseId}/thread/{thread.id}" class="card">
					<span class="from">
						{thread.from}
					</span>
					<span class="snippet">
						{thread.snippet}
					</span>
				</a>
			{/each}
		</div>
	{/if}

	<a class="newThread" href="/case/{data.caseId}/thread/new" aria-label="Send a new email">
		<Plus width="100%" height="100%" />
	</a>
</div>

<style lang="scss">
	.root {
		position: relative;
	}
	.cardList {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.card {
		display: flex;
		flex-direction: column;
		background-color: #f5f5f5;
		border-radius: 1rem;
		padding: 1rem;
	}
	.from {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.snippet {
		font-size: 0.75rem;
		color: #8d8d8d;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.newThread {
		background-color: #8d8d8d;
		color: white;
		border-radius: 99999px;
		position: fixed;
		bottom: 1rem;
		right: 1rem;
		height: 4rem;
		width: 4rem;
		padding: 0.5rem;
	}
</style>
