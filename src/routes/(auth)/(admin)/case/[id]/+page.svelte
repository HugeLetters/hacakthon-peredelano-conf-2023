<script lang="ts">
	import { page } from '$app/stores';
	export let data;

	const caseId = $page.params.id;
	const caseInfo = data.trpc.case.caseInfo.query({ caseId: caseId });
</script>

<div class="aboutCase">
	<div class="statusWrapper">
		<div class="status">
			{$caseInfo.data.status}
		</div>
	</div>
	<div>
		<h4>Содержание</h4>
		<p class="summary">
			{$caseInfo.data?.summary || 'Пусто'}
		</p>
	</div>
	<div>
		<h4>Категории</h4>
	</div>
	<div>
		<h4>Страны</h4>
	</div>
</div>

<style lang="scss">
	.aboutCase {
		display: grid;
		gap: 16px;
	}
	h4 {
		font-size: 17px;
		color: #8d8d8d;
		margin-bottom: 8px;
	}
	.summary {
		font-size: 17px;
		color: #000000;
	}
	.statusWrapper {
		display: flex;
		justify-content: flex-end;
	}
	.status {
		widows: 83px;
		height: 30px;
		padding: 6px 16px;
		background: #8d8d8d;
	}
</style>
