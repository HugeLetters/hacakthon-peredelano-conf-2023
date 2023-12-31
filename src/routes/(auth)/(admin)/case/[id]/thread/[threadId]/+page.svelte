<script lang="ts">
	import Textarea from '$lib/components/Textarea.svelte';
	import Send from '$lib/icons/Send.svelte';

	export let data;

	const threadInfo = data.trpc.thread.getThreadEmailList.query(
		{ threadId: data.threadId },
		{
			select(res) {
				if (res.unread) {
					$markAsRead.mutate({ threadId: data.threadId });
				}

				return res;
			}
		}
	);
	const markAsRead = data.trpc.thread.markThreadAsRead.mutation({
		onSuccess() {
			data.trpc.thread.getThreadList.utils.invalidate({ caseId: data.caseId });
		}
	});

	const sendReply = data.trpc.thread.reply.mutation({
		onSuccess() {
			data.trpc.thread.getThreadEmailList.utils.invalidate({ threadId: data.threadId });
		}
	});

	let replyMessage = '';

	const timeFormatter = new Intl.DateTimeFormat('en', {
		hourCycle: 'h23',
		minute: '2-digit',
		hour: '2-digit',
		day: '2-digit',
		month: 'short'
	});
	function formatDate(dateNumber: number | string) {
		return timeFormatter.format(new Date(dateNumber));
	}
</script>

<div class="root">
	{#if $threadInfo.isSuccess}
		{#each $threadInfo.data.messages
			.flatMap((x) => x)
			.filter((data) => data.message.type === 'text') as message (message)}
			<div class="message {message.from === 'me' ? 'mine' : ''}">
				{#if message.from !== 'me'}
					<div>{message.from}</div>
					<hr />
				{/if}
				{message.message.content}
				{#if message.date}
					<span class="time">
						{formatDate(message.date)}
					</span>
				{/if}
			</div>
		{/each}
		<form
			class="form"
			on:submit|preventDefault={() => {
				if (!$threadInfo.isSuccess) return;
				const replyData = $threadInfo.data.replyData;

				$sendReply.mutate({
					to: replyData.to ?? '',
					cc: replyData.cc ?? '',
					content: replyMessage,
					replyId: replyData.replyMessageId ?? '',
					subject: replyData.subject ?? '',
					threadId: data.threadId
				});

				replyMessage = '';
			}}
		>
			<div class="textarea">
				<Textarea bind:value={replyMessage} placeholder="Сообщение" />
			</div>
			<button aria-label="send email" class="send">
				<Send height="100%" width="100%" />
			</button>
		</form>
	{/if}
</div>

<style lang="scss">
	hr {
		border: 0;
		height: 2px;
		background-color: white;
		border-radius: 9999px;
	}
	.root {
		display: flex;
		flex-direction: column;
		height: 100%;
		gap: 0.5rem;
		padding: 0.25rem;
		border-radius: 0.25rem;
		background-color: $lightgray;
	}
	.message {
		width: fit-content;
		max-width: 358px;
		padding: 0.5rem 0.75rem;
		border-radius: 1rem;
		background: $violet;
		color: white;
		word-wrap: break-word;
		display: flex;
		flex-direction: column;

		&.mine {
			margin-left: auto;
			+ .message:not(.mine) {
				margin-top: 8px;
			}
			background: white;
			color: black;
		}
	}

	.time {
		margin-left: 4px;
		color: white;
		font-size: 10px;
		line-height: 12px;
		align-self: end;
	}
	.mine .time {
		color: rgba(60, 60, 67, 0.6);
	}

	.form {
		display: flex;
		margin-top: auto;
		border-top: 2px solid #ddd;
		padding-top: 0.5rem;
		gap: 0.5rem;
	}
	.textarea {
		flex-grow: 1;
		background-color: rgba(118, 118, 128, 0.12);
		padding: 0.5rem;
		border-radius: 1rem;
		color: #7a7a7a;
		transition: outline-color 200ms;
		outline: 2px solid;
		outline-color: transparent;

		&:focus-within {
			outline-color: #dddf;
		}
	}
	.send {
		align-self: end;
		border: none;
		height: 2rem;
		width: 2rem;
		color: #8fa5fb;
	}
</style>
