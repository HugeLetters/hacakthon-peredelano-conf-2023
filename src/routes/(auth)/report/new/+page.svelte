<script lang="ts">
	import Textarea from '$lib/components/textarea.svelte';
	import TextInput from '$lib/components/textInput.svelte';
	import FormElement from '$lib/components/formElement.svelte';
	import InputSelect from '$lib/components/InputSelect/index.svelte';
	import { countryList } from '$lib/options';

	let name: string = '';
	let reportText: string = '';
	let categ: string = '';
	let country: string = '';

	let countryOptions = countryList.map((el, index) => {
		return { id: index, name: el };
	});

	console.log(categ, country);
</script>

<div class="complaintForm">
	<FormElement component={TextInput} value={name} label="Как к вам обращаться" placeholder="Имя" />
	<FormElement
		component={Textarea}
		value={reportText}
		label="Суть жалобы"
		placeholder="Опишите суть проблемы"
	/>
	<FormElement {categ} component={InputSelect} value={reportText} label="Категория" />
	<FormElement
		component={InputSelect}
		value={reportText}
		label="Страна"
		options={countryOptions}
		isCountry={true}
		categ={country}
	/>
	<FormElement component={TextInput} value={name} label="Организация" placeholder="TBS" />
	<div class="reportRow">
		<h4>{reportText}</h4>
		<h4>{country}</h4>
		<h4>{categ}</h4>
	</div>
</div>

<style lang="scss">
</style>
