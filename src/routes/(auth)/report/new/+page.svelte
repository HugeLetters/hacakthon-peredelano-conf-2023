<script lang="ts">
	import Textarea from '$lib/components/textarea.svelte';
	import TextInput from '$lib/components/textInput.svelte';
	import FormElement from '$lib/components/formElement.svelte';
	import InputSelect from '$lib/components/InputSelect/index.svelte';
	import { countryList } from '$lib/options';

	let name: string = '';
	let reportText: string = '';

	let countryOptions = countryList.map((el, index) => {
		return { id: index, name: el };
	});
</script>

<div class="complaintForm">
	<FormElement component={TextInput} value={name} label="Как к вам обращаться" placeholder="Имя" />
	<FormElement
		component={Textarea}
		value={reportText}
		label="Суть жалобы"
		placeholder="Опишите суть проблемы"
	/>
	<FormElement component={InputSelect} value={reportText} label="Категория" />
	<FormElement
		component={InputSelect}
		value={reportText}
		label="Страна"
		options={countryOptions}
		isCountry={true}
	/>
	<FormElement component={TextInput} value={name} label="Организация" placeholder="TBS" />
	<div class="reportRow">
		{reportText}
	</div>
</div>

<style lang="scss">
	.complaintForm {
		padding: 0 16px;
	}
</style>
