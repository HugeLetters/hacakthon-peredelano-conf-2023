<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Textarea from '$lib/components/Textarea.svelte';
	import WithLabel from '$lib/components/WithLabel.svelte';
	import Messages from '$lib/components/Messages.svelte';

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
</script>

<div class="chat">
	{#if $chat.isSuccess}
		<Messages messages={$chat.data} currUserId={data.session.user.userId} />
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
</style>
