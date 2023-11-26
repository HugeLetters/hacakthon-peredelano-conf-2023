<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Textarea from '$lib/components/Textarea.svelte';
	import WithLabel from '$lib/components/WithLabel.svelte';
	import Messages from '$lib/components/Messages.svelte';
	import { goto } from '$app/navigation';

	export let data;

	const chat = data.trpc.message.getChat.query(
		{ reportId: data.reportId },
		{
			refetchInterval: 10000,
			select(res) {
				if (!res) {
					goto('/report');
					throw Error('No such report exists');
				}

				if (!res.read) {
					$markAsRead.mutate({ reportId: data.reportId });
				}

				return res;
			}
		}
	);
	const markAsRead = data.trpc.report.markAsRead.mutation({
		onSuccess() {
			data.trpc.report.getUserReportList.utils.invalidate();
		}
	});
	const sendMessage = data.trpc.message.send.mutation({
		onSuccess() {
			data.trpc.message.getChat.utils.invalidate({ reportId: data.reportId });
		}
	});

	let message = '';
</script>

<div class="chat">
	{#if $chat.isSuccess}
		<Messages messages={$chat.data.messages} currUserId={data.session.user.userId} />
	{/if}
	<form
		class="form"
		on:submit|preventDefault={() => {
			if (!message) return;
			$sendMessage.mutate({ content: message, reportId: data.reportId });
			message = '';
		}}
	>
		<WithLabel label="">
			<div class="textAreaWrapper">
				<Textarea bind:value={message} placeholder="Сообщение" />
			</div>
			<Button>Отправить</Button>
		</WithLabel>
	</form>
</div>

<style lang="scss">
	.chat {
		padding: 0.5rem;
		background: #f6f6f6;
		flex-basis: 100%;
		display: flex;
		flex-direction: column;
	}
	.form {
		margin-top: auto;
	}
	.textAreaWrapper {
		border: 1px solid #9da5b5;
		border-radius: 16px;
		padding: 16px 16px;
		background: #ffffff;
	}
</style>
