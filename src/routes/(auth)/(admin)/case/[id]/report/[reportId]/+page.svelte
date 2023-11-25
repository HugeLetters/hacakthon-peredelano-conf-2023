<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Textarea from '$lib/components/Textarea.svelte';
	import WithLabel from '$lib/components/WithLabel.svelte';

	export let data;

	const chat = data.trpc.message.getChat.query({ reportId: data.reportId });
	const sendMessage = data.trpc.message.send.mutation({
		onSuccess() {
			data.trpc.message.getChat.utils.invalidate({ reportId: data.reportId });
		}
	});

	let message = '';
</script>

{#if $chat.isSuccess}
	{#each $chat.data as message (message.id)}
		<div>{message.content}</div>
	{/each}
{/if}
<form
	on:submit|preventDefault={() => {
		$sendMessage.mutate({ content: message, reportId: data.reportId });
	}}
>
	<WithLabel label="Ответить">
		<Textarea bind:value={message} placeholder="Сообщение" />
	</WithLabel>
	<Button>Отправить</Button>
</form>
