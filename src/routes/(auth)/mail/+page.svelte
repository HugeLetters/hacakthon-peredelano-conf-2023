<script lang="ts">
	import { goto } from '$app/navigation';

	export let data;

	const newMessageMutation = data.trpc.gmail.startThread.mutation({
		onSuccess(result) {
			if (!result) return;
			goto(`/mail/${result}`);
			data.trpc.gmail.getThreadById.utils.invalidate(result);
		}
	});
</script>

<form
	on:submit|preventDefault={(e) => {
		const form = new FormData(e.currentTarget);

		const text = form.get('text');
		const to = form.get('to');
		const subject = form.get('subject');
		const cc = form.get('cc') ?? undefined;

		if (typeof text !== 'string') return;
		if (typeof to !== 'string') return;
		if (typeof subject !== 'string') return;
		if (!!cc && typeof cc !== 'string') return;

		$newMessageMutation.mutate({
			content: text,
			to,
			subject,
			cc
		});
	}}
>
	<input placeholder="subject" name="subject" required />
	<input placeholder="to" name="to" required />
	<input placeholder="cc - separate emails with ','" name="cc" />
	<textarea placeholder="email body" name="text" required />
	<button>send</button>
</form>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		outline: 1px solid black;
		padding: 0.25rem;
	}
</style>
