<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Textarea from '$lib/components/Textarea.svelte';
	import WithLabel from '$lib/components/WithLabel.svelte';

	export let data;

	const chat = data.trpc.message.getChat.query(
		{ reportId: data.reportId },
		{ refetchInterval: 10000 }
	);
	const sendMessage = data.trpc.message.send.mutation({
		onSuccess() {
			data.trpc.message.getChat.utils.invalidate({ reportId: data.reportId });
		}
	});

	let message = '';

	function formatDate(dateNumber: number) {
		const date = new Date(dateNumber);

		return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(
			2,
			'0'
		)}`;
	}
</script>

<div class="chat">
	{#if $chat.isSuccess}
		<div class="dateBubble">26 ноября</div>

		{#each $chat.data as message (message.id)}
			<div class="message {message.authorId === data.session.user.userId ? 'mine' : ''}">
				{message.content}
				<span class="time">
					{formatDate(message.createdAt)}
					<div class="time-inner">
						{formatDate(message.createdAt)}
					</div>
				</span>
			</div>
		{/each}
	{/if}
	<form
		on:submit|preventDefault={() => {
			$sendMessage.mutate({ content: message, reportId: data.reportId });
			message = '';
		}}
	>
		<WithLabel label="Ответить">
			<Textarea bind:value={message} placeholder="Сообщение" />
		</WithLabel>
		<Button>Отправить</Button>
	</form>
</div>

<style lang="scss">
	.chat {
		padding: 0 8px;
		background: #f6f6f6;
	}

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

	.message {
		width: fit-content;
		max-width: 358px;
		margin-top: 8px;
		padding: 6px 12px;
		border-radius: 16px;
		position: relative;
		background: #fff;
		word-break: break-word;
		overflow: auto;

		+ :not(.mine) {
			margin-top: 2px;
		}

		&.mine {
			margin-top: 8px;
			margin-left: auto;
			background: #8d8d8d;
			color: #fff;

			+ .mine {
				margin-top: 2px;
			}

			+ :not(.mine) {
				margin-top: 8px;
			}

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
