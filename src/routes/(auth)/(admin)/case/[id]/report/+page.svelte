<script lang="ts">
	import Initial from '$lib/components/Initial.svelte';
	export let data;

	const chatListQuery = data.trpc.case.caseChatList.query({ caseId: data.caseId });
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
								{new Date(chat.createdAt).toLocaleDateString('ru')}
							</span>
						</div>
					</div>
				</div>
				<a href="/case/{data.caseId}/report/{chat.id}" class="chatLink link">
					<svg
						width="36"
						height="36"
						viewBox="0 0 36 36"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M18 33C26.2845 33 33 26.2845 33 18C33 9.7155 26.2845 3 18 3C9.7155 3 3 9.7155 3 18C3 20.4 3.564 22.668 4.5645 24.6795C4.8315 25.2135 4.92 25.824 4.7655 26.4015L3.873 29.7405C3.78494 30.0708 3.78527 30.4185 3.87396 30.7487C3.96265 31.0789 4.13659 31.3799 4.37834 31.6217C4.62008 31.8634 4.92113 32.0373 5.2513 32.126C5.58147 32.2147 5.92916 32.2151 6.2595 32.127L9.5985 31.2345C10.1781 31.0886 10.791 31.1596 11.322 31.434C13.3964 32.4669 15.6827 33.0031 18 33Z"
							fill="#8FA5FB"
						/>
					</svg>
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
		border-radius: 16px;
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
	.link {
		margin-top: 8px;
		cursor: pointer;
		&:hover {
			opacity: 0.3;
		}
	}
	.chatLink {
		margin-top: 0;
	}
</style>
