<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Select from '$lib/components/Select.svelte';
	import Textarea from '$lib/components/Textarea.svelte';
	import WithLabel from '$lib/components/WithLabel.svelte';
	import { categoryList, countryList, type CountryCode, type Category } from '$lib/options';

	export let data;

	let name: string = '';
	let content: string = '';
	let category: Category = 'Банк';
	let country: CountryCode;
	let organization: string = '';

	const createReportMutation = data.trpc.report.create.mutation();
</script>

<form
	class="form"
	on:submit|preventDefault={() => {
		$createReportMutation.mutate({
			category,
			content,
			name,
			country,
			organization
		});
	}}
>
	<WithLabel label="Как к вам обращаться">
		<Input placeholder="Имя" bind:value={name} />
	</WithLabel>
	<WithLabel label="Суть жалобы">
		<Textarea placeholder="Опишите суть проблемы" bind:value={content} />
	</WithLabel>
	<WithLabel label="Категория">
		<Select
			options={categoryList.map((x) => ({ value: x }))}
			defaultLabel="Выбери категорию"
			onChange={(value) => {
				category = value;
			}}
		/>
	</WithLabel>
	<WithLabel label="Страна">
		<Select
			options={countryList.map((x) => ({ value: x }))}
			defaultLabel="В какой стране возникла проблема?"
			onChange={(value) => {
				country = value;
			}}
			withFilter
		/>
	</WithLabel>
	<WithLabel label="Организация">
		<Input bind:value={organization} placeholder="С какой организацией возникла проблема?" />
	</WithLabel>
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
</style>
