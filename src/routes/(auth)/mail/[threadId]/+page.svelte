<script lang="ts">
	export let data;
	const query = data.trpc.gmail.getThreadById.query(data.threadId);
	const unreadMutation = data.trpc.gmail.markThreadAsRead.mutation({
		onSettled() {
			data.trpc.gmail.getThreadById.utils.invalidate(data.threadId);
		}
	});
	const newMessageMutation = data.trpc.gmail.replyToThread.mutation({
		onSuccess(data) {
			if (!data) return;
		},
		onSettled() {
			data.trpc.gmail.getThreadById.utils.invalidate(data.threadId);
		}
	});
</script>

<form
	on:submit|preventDefault={(e) => {
		const form = new FormData(e.currentTarget);

		const text = form.get('text');

		if (typeof text !== 'string') return;

		const to = $query.data?.replyData.to;
		const replyId = $query.data?.replyData.replyMessageId;
		const subject = $query.data?.replyData.subject;
		if (!to || !replyId || !subject) return;

		$newMessageMutation.mutate({
			content: text,
			to,
			replyId,
			subject,
			threadId: data.threadId,
			cc: $query.data?.replyData.cc ?? undefined
		});
	}}
>
	<textarea placeholder="email body" name="text" required />
	<button>send</button>
</form>

{#if $query.data}
	<div>This chat is {$query.data.unread ? 'unread' : 'read'}</div>
	{#if $query.data.unread}
		<button
			on:click={() => {
				$unreadMutation.mutate(data.threadId);
			}}
		>
			Mark as read
		</button>
	{/if}
	<div class="list">
		{#each $query.data.messages.filter((message) => !!message.data.length && message.data.every((chunk) => !!chunk.content.trim())) as message}
			<div>
				{#each message.data.filter((chunk) => chunk.type === 'text') as chunk}
					<div>{chunk.content}</div>
				{/each}
			</div>
		{/each}
	</div>
{/if}

<style lang="scss">
	.list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		white-space: pre-line;
		> div {
			outline: 2px solid red;
			> div {
				outline: 1px solid green;
			}
		}
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		outline: 1px solid black;
		padding: 0.25rem;
	}
</style>
