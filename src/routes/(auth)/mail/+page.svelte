<script lang="ts">
	import { writable } from 'svelte/store';

	export let data;

	const threadId = writable('');
	const query = data.trpc.gmail.getThreadById.query(threadId, { enabled: !!threadId });
	const newMessageMutation = data.trpc.gmail.sendMessage.mutation({
		onSuccess(data) {
			if (!data) return;
			$threadId = data;
		},
		onSettled() {
			data.trpc.gmail.getThreadById.utils.invalidate($threadId);
		}
	});
	const unreadMutation = data.trpc.gmail.markThreadAsRead.mutation({
		onSettled() {
			data.trpc.gmail.getThreadById.utils.invalidate($threadId);
		}
	});
</script>

<form
	on:submit|preventDefault={(e) => {
		const form = new FormData(e.currentTarget);

		const text = form.get('text');
		const to = form.get('to');
		const subject = form.get('subject');

		if (typeof text !== 'string') return;
		if (typeof to !== 'string') return;
		if (typeof subject !== 'string') return;

		const replyId = $query.data?.messages.at(-1)?.id;

		$newMessageMutation.mutate({
			content: text,
			to,
			subject,
			thread: $threadId && replyId ? { threadId: $threadId, replyId } : undefined
		});
	}}
>
	<input placeholder="subject" name="subject" required />
	<input placeholder="to" name="to" required />
	<textarea placeholder="email body" name="text" required />
	<button>send</button>
</form>
{#if $query.data}
	<div>This chat is {$query.data.unread ? 'unread' : 'read'}</div>
	{#if $query.data.unread && threadId}
		<button
			on:click={() => {
				$unreadMutation.mutate($threadId);
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
