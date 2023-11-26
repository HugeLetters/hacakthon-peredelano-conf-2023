<script lang="ts">
	import Initial from '$lib/components/Initial.svelte';
	import { pageFly, pageTransitionDirectionStore } from '$lib/hooks';
	import ChatBubble from '$lib/icons/SpeechBubble.svelte';
	export let data;

	const reportList = data.trpc.case.caseChatList.query({ caseId: data.caseId });

	const formatter = new Intl.DateTimeFormat('ru', {
		day: '2-digit',
		month: '2-digit',
		year: '2-digit'
	});
</script>

{#if $reportList.isSuccess}
	<div
		class="chats"
		transition:pageFly|global={{ x: 200 * ($pageTransitionDirectionStore === 'left' ? 1 : -1) }}
	>
		{#each $reportList.data as report}
			<div class="report">
				<a class="reportLeft" href="/case/{data.caseId}/report/{report.id}/info">
					<div class="user">
						<div class="image">
							<Initial name={report.authorName} />
						</div>

						<div class="nameAndDate">
							<span class="authorName">{report.authorName}</span>
							<span class="date">
								{formatter.format(new Date(report.createdAt))}
							</span>
						</div>
					</div>
				</a>
				<a href="/case/{data.caseId}/report/{report.id}" class="chatLink link">
					<ChatBubble />
					{#if data.session.user.role === 'admin' ? report.isReadByAdmin : report.isReadByUser}
						<div class="unread" />
					{/if}
				</a>
			</div>
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
		.reportLeft {
			flex-grow: 1;
		}
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
		color: $bluegray;
	}
	.link {
		position: relative;
		margin-top: 8px;
		cursor: pointer;
		.unread {
			position: absolute;
			top: 2px;
			right: 2px;
			border-radius: 999999px;
			background-color: $green;
			height: 0.75rem;
			width: 0.75rem;
			box-shadow: 0 0 1px black;
		}
	}
	.chatLink {
		margin-top: 0;
		color: $violet;
		font-size: 12px;
	}
</style>
