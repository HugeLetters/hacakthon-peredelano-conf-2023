<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Textarea from '$lib/components/Textarea.svelte';
	import WithLabel from '$lib/components/WithLabel.svelte';

	export let data;

	const threadInfo = data.trpc.thread.getThreadEmailList.query({ threadId: data.threadId });
	const sendReply = data.trpc.thread.reply.mutation({
		onSuccess() {
			data.trpc.thread.getThreadEmailList.utils.invalidate({ threadId: data.threadId });
		}
	});

	let replyMessage = '';
</script>

{#if $threadInfo.isSuccess}
	{#each $threadInfo.data.messages
		.flatMap((x) => x)
		.filter((message) => message.type === 'text') as message (message)}
		<div>{message.content}</div>
	{/each}
{/if}
<form
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
	}}
>
	<WithLabel label="Ответить">
		<Textarea bind:value={replyMessage} placeholder="Тело письма" />
	</WithLabel>
	<Button>Отправить</Button>
</form>
