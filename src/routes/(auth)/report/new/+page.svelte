<script lang="ts">
	import Textarea from '$lib/components/textarea.svelte';
	import TextInput from '$lib/components/textInput.svelte';
	import FormElement from '$lib/components/formElement.svelte';

	let name: string = '';
	let reportText: string = '';
</script>

<div class="complaintForm">
	<FormElement component={TextInput} value={name} label="Как к вам обращаться" placeholder="Имя" />
	<FormElement
		component={Textarea}
		value={reportText}
		label="Суть жалобы"
		placeholder="Опишите суть проблемы"
	/>
	<div class="reportRow">Категория - селект</div>
	<div class="reportRow">Страна - селект с поиском</div>
	<div class="reportRow">
		{reportText}
	</div>
</div>

<style lang="scss">
	.complaintForm {
		padding: 0 16px;
	}
</style>
