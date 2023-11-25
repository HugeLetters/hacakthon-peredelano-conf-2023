<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Textarea from '$lib/components/Textarea.svelte';
	import WithLabel from '$lib/components/WithLabel.svelte';

	export let data;

	let to = '';
	let cc = '';
	let subject = '';
	let message = '';

	const sendEmailMutation = data.trpc.thread.create.mutation({
		onSuccess(threadId) {
			goto(`/case/${data.caseId}/threads/${threadId}`);
		}
	});
</script>

<form
	class="form"
	on:submit|preventDefault={() => {
		$sendEmailMutation.mutate({
			caseId: data.caseId,
			content: message,
			subject: subject,
			to,
			cc
		});
	}}
>
	<WithLabel label="Адресат">
		<Input placeholder="Получатель" bind:value={to} />
	</WithLabel>
	<WithLabel label="Cc">
		<Input placeholder="email1@mail.com, email2@mail.com" bind:value={cc} />
	</WithLabel>
	<WithLabel label="Тема">
		<Input placeholder="Тема письма" bind:value={subject} />
	</WithLabel>
	<WithLabel label="Сообщение">
		<Textarea placeholder="Тело письма" bind:value={message} />
	</WithLabel>
	<Button>Отправить</Button>
</form>

<style lang="scss">
	.form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
	}
</style>
