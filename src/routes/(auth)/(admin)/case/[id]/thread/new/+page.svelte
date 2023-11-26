<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import Textarea from '$lib/components/Textarea.svelte';

	export let data;

	let to = '';
	let cc = '';
	let subject = '';
	let message = '';

	const sendEmailMutation = data.trpc.thread.create.mutation({
		onSuccess(threadId) {
			goto(`/case/${data.caseId}/thread/${threadId}`);
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
	<label class="input">
		<span class="label">Адресат</span>
		<input placeholder="Получатель" bind:value={to} required />
	</label>
	<hr class="break" />
	<label class="input">
		<span class="label">Cc</span>
		<input placeholder="cc1@mail.com, cc2@mail.com" bind:value={cc} />
	</label>
	<hr class="break" />
	<input placeholder="Тема письма" bind:value={subject} required />
	<hr class="break" />
	<div class="textarea">
		<Textarea placeholder="Тело письма" bind:value={message} />
	</div>
	<Button>Отправить</Button>
</form>

<style lang="scss">
	.form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		height: 100%;
		padding-top: 0.5rem;
	}
	.input {
		display: flex;
		gap: 1rem;
		align-items: center;
		input {
			flex-grow: 1;
		}
	}
	input {
		outline: 2px solid;
		outline-color: transparent;
		transition: outline-color 200ms;
		padding: 0.25rem;
		border-radius: 0.25rem;
		&:focus-within {
			outline-color: #dddf;
		}
		border: none;
	}
	.label {
		width: 4rem;
		display: block;
	}
	.textarea {
		flex-grow: 1;
	}
	.break {
		width: 100%;
		border-width: 0;
		border-top: 1px solid #ddd;
	}
</style>
