<script lang="ts">
	export let messages: {
		id: string;
		createdAt: number;
		content: string;
		reportId: string;
		authorId: string;
	}[];
	export let currUserId: string;

	function formatDate(dateNumber: number) {
		const date = new Date(dateNumber);

		return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(
			2,
			'0'
		)}`;
	}

	$: formattedMessages = () => {
		let formattedMessages = [[]];
		let isMine = false;

		for (const message of messages) {
			if ((message.authorId === currUserId) !== isMine) {
				formattedMessages.push([]);
				isMine = !isMine;
			}
			formattedMessages[formattedMessages.length - 1]?.push(message);
		}

		return formattedMessages;
	};
</script>

<div class="dateBubble">26 ноября</div>
{#each formattedMessages() as messageGroup}
	<div class="messageGroup">
		{#each messageGroup as message (message.id)}
			<div class="message {message.authorId === currUserId ? 'mine' : ''}">
				{message.content}
				<span class="time">
					{formatDate(message.createdAt)}
					<div class="time-inner">
						{formatDate(message.createdAt)}
					</div>
				</span>
			</div>
		{/each}
	</div>
{/each}

<style lang="scss">
	.dateBubble {
		width: fit-content;
		margin: 16px auto;
		padding: 4px 8px;
		border-radius: 12px;
		background: rgba(60, 60, 67, 0.25);
		backdrop-filter: blur(6px);
		color: #fff;
		font-size: 12px;
		font-weight: bold;
		line-height: 16px;
	}

	.messageGroup {
		margin-top: 8px;

		.message {
			&:not(.mine) {
				&:first-child {
					border-bottom-left-radius: 8px;
				}

				&:last-child {
					border-top-left-radius: 8px;
				}

				&:not(:first-child):not(:last-child) {
					border-top-left-radius: 8px;
					border-bottom-left-radius: 8px;
				}
			}

			&.mine {
				&:first-child {
					border-bottom-right-radius: 8px;
				}

				&:last-child {
					border-top-right-radius: 8px;
				}

				&:not(:first-child):not(:last-child) {
					border-top-right-radius: 8px;
					border-bottom-right-radius: 8px;
				}
			}
		}
	}

	.message {
		width: fit-content;
		max-width: 358px;
		margin-top: 2px;
		padding: 6px 12px;
		border-radius: 16px;
		position: relative;
		background: #fff;
		word-break: break-word;
		overflow: auto;

		&.mine {
			margin-left: auto;
			background: #8d8d8d;
			color: #fff;

			.time {
				color: rgba(235, 235, 245, 0.6);
			}
		}
	}

	.time {
		margin-left: 4px;
		visibility: hidden;
		color: rgba(60, 60, 67, 0.6);
		font-size: 10px;
		line-height: 12px;
		float: right;
	}

	.time-inner {
		position: absolute;
		bottom: 6px;
		right: 12px;
		visibility: visible;
	}
</style>
