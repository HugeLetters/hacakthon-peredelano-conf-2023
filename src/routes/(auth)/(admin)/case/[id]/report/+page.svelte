<script lang="ts">
	import Initial from '$lib/components/Initial.svelte';
	import ChatBubble from '$lib/icons/SpeechBubble.svelte';
	export let data;

	const chatListQuery = data.trpc.case.caseChatList.query({ caseId: data.caseId });

	const formatter = new Intl.DateTimeFormat('ru', {
		day: '2-digit',
		month: '2-digit',
		year: '2-digit'
	});
</script>

{#if $chatListQuery.isSuccess}
	<div class="chats">
		{#each $chatListQuery.data as chat}
			<a class="report" href="/case/{data.caseId}/report/{chat.id}/info">
				<div>
					<div class="user">
						<div class="image">
							<Initial name={chat.authorName} />
						</div>

						<div class="nameAndDate">
							<span class="authorName">{chat.authorName}</span>
							<span class="date">
								{formatter.format(new Date(chat.createdAt))}
							</span>
						</div>
					</div>
				</div>
				<a href="/case/{data.caseId}/report/{chat.id}" class="chatLink link">
					<ChatBubble />
				</a>
			</a>
		{/each}
	</div>
{/if}

<style lang="scss">
	.chats {
		display: grid;
		gap: 10px;
	}
	.report {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #f2f6ff;
		padding: 12px 12px;
		border-radius: 1rem;
	}
	.user {
		display: flex;
		align-items: center;
	}
	.image {
		width: 2.5rem;
		height: 2.5rem;
		margin-right: 10px;
	}
	.nameAndDate {
		display: flex;
		flex-direction: column;
	}
	.authorName {
		font-size: 17px;
	}

	.date {
		color: #8fa5fb;
		font-size: 12px;
		line-height: 18px;
	}
	.date {
		font-size: 0.75rem;
		color: $violet;
	}
	.link {
		margin-top: 8px;
		cursor: pointer;
	}
	.chatLink {
		margin-top: 0;
		color: $violet;
		font-size: 12px;
	}
</style>
