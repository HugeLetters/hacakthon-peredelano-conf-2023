<script lang="ts">
	import { pageFly, pageTransitionDirectionStore } from '$lib/hooks';
	import Plus from '$lib/icons/Plus.svelte';
	import Temple from '$lib/icons/Temple.svelte';

	export let data;

	const threadList = data.trpc.thread.getThreadList.query({ caseId: data.caseId });
</script>

<div
	class="root"
	transition:pageFly={{ x: 200 * ($pageTransitionDirectionStore === 'left' ? 1 : -1) }}
>
	{#if $threadList.isSuccess}
		<div class="cardList">
			{#each $threadList.data as thread (thread.id)}
				<a href="/case/{data.caseId}/thread/{thread.id}" class="card">
					<div class="icon">
						<Temple width="100%" height="100%" />
					</div>
					<div class="cardMiddle">
						<span class="from">
							{thread.from}
						</span>
						<span class="snippet">
							{thread.snippet}
						</span>
					</div>
					{#if thread.unread}
						<div class="unread" />
					{/if}
				</a>
			{:else}По данному кейсу еще не было сделано обращений{/each}
		</div>
	{/if}

	<a class="newThread" href="/case/{data.caseId}/thread/new" aria-label="Send a new email">
		<Plus width="100%" height="100%" />
	</a>
</div>

<style lang="scss">
	.root {
		position: relative;
		height: 100%;
		width: 100%;
		// uhm this fixes fixed position of a new thread button for whatever reason
		transform: translate(0px);
	}
	.cardList {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.card {
		display: flex;
		align-items: center;
		background-color: #f5f5f5;
		border-radius: 1rem;
		padding: 1rem;
		gap: 0.5rem;
	}
	.icon {
		background-color: $violet;
		border-radius: 9999px;
		padding: 0.5rem;
		width: 3rem;
		height: 3rem;
		flex-shrink: 0;
	}
	.cardMiddle {
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	.from {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.snippet {
		font-size: 0.75rem;
		color: $bleak-violet;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 100%;
		display: block;
	}
	.unread {
		align-self: flex-end;
		flex-shrink: 0;
		width: 0.75rem;
		height: 0.75rem;
		background-color: $green;
		border-radius: 9999px;
	}
	.newThread {
		background-color: $violet;
		color: white;
		border-radius: 99999px;
		position: fixed;
		bottom: 0;
		right: 0;
		height: 4rem;
		width: 4rem;
		padding: 0.5rem;
	}
</style>
