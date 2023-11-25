<script lang="ts">
	import Textarea from '$lib/components/textarea.svelte';
	let reportText: string;
</script>

<div class="complaintForm">
	<div class="reportRow">Ваше имя - инпут</div>
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
