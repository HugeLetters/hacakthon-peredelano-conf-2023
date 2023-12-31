<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Select from '$lib/components/Select.svelte';
	import Textarea from '$lib/components/Textarea.svelte';
	import WithLabel from '$lib/components/WithLabel.svelte';
	import { categoryList, countryList, type Category, type CountryCode } from '$lib/options';

	export let data;

	let name: string = '';
	let content: string = '';
	let category: Category;
	let country: CountryCode;
	let organization: string = '';
	let error: boolean = false;

	const createReportMutation = data.trpc.report.create.mutation({
		onSuccess(data) {
			goto(`/report/${data}/info`);
		}
	});
</script>

<form
	class="form"
	on:submit|preventDefault={() => {
		if (!(category && content && name)) {
			error = true;
			return;
		}

		$createReportMutation.mutate({
			category,
			content,
			name,
			country,
			organization
		});
	}}
>
	<div class="formTitle">Жалоба</div>
	<WithLabel label="Как к вам обращаться">
		<Input placeholder="Имя" required bind:value={name} />
	</WithLabel>
	<WithLabel label="Суть жалобы">
		<div class="textarea">
			<Textarea placeholder="Опишите суть проблемы" required bind:value={content} />
		</div>
	</WithLabel>
	<WithLabel label="Категория">
		<Select
			options={categoryList.map((x) => ({ value: x }))}
			defaultLabel="Выберите категорию"
			onChange={(value) => {
				category = value;
			}}
		/>
	</WithLabel>
	<WithLabel label="Страна">
		<Select
			options={countryList.map((x) => ({ value: x.code, label: x.name }))}
			defaultLabel="В какой стране возникла проблема?"
			onChange={(value) => {
				country = value;
			}}
			withFilter
		/>
	</WithLabel>
	<WithLabel label="Организация">
		<Input
			bind:value={organization}
			placeholder="С какой организацией возникла проблема?"
			maxlength={50}
		/>
	</WithLabel>
	{#if $createReportMutation.isError || error}
		<div class="error">
			{$createReportMutation.error?.message || 'Выберите категорию'}
		</div>
	{/if}
	<Button>Отправить</Button>
</form>

<style lang="scss">
	.form {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 1rem;
	}

	.formTitle {
		padding: 16px 0;
		border-radius: 16px;
		background: #f2f6ff;
		font-size: 28px;
		line-height: 42px;
		text-align: center;
	}

	.error {
		background-color: hsla(0, 70%, 60%, 90%);
		color: white;
		padding: 1rem;
		border-radius: 1rem;
		font-weight: 600;
		display: flex;
		justify-content: center;
	}
	.textarea {
		padding: 1rem;
		border: 1px solid #9da5b5;
		border-radius: 1rem;
		background-color: white;

		&:focus-within {
			border-width: 2px;
		}
	}
</style>
