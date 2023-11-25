<script lang="ts">
	import Textarea from '$lib/components/textarea.svelte';
	import TextInput from '$lib/components/textInput.svelte';

	let name: string = '';
	let reportText: string = '';
</script>

<div class="complaintForm">
	<div class="reportRow"><TextInput bind:text={name} placeholder="Введите ваше имя" /></div>
	<div class="reportRow">Категория - селект</div>
	<div class="reportRow">Страна - селект с поиском</div>
	<div class="reportRow">
		<Textarea bind:text={reportText} />
		{reportText}
	</div>
</div>

<style lang="scss">
	.reportRow {
		margin-bottom: 8px;
	}
</style>
