<script lang="ts">
	import { page } from '$app/stores';
	import { statusList } from '$lib/options';
	import Avia from '$lib/icons/avia.svelte';
	import Bank from '$lib/icons/bank.svelte';
	import Paper from '$lib/icons/paper.svelte';

	export let data;

	const caseId = $page.params.id;
	const caseInfo = data.trpc.case.caseInfo.query({ caseId: caseId });
	const caseInfoMutation = data.trpc.case.updateCaseData.mutation();
	const countries = new Map();
	const categories = new Map();
	function iconByCategory(category: string) {
		switch (category) {
			case 'Банк':
				return Bank;
			case 'ВНЖ':
				return Paper;
			case 'Авиалиния':
				return Avia;
		}
	}
	$caseInfo.data.reports.forEach((report, index) => {
		if (report.countries) {
			countries.set(report.countries, index);
		}
		if (report.categories) {
			categories.set(report.categories, index);
		}
	});
</script>

<div class="aboutCase">
	<div class="statusWrapper">
		<!-- <div class="countries">
			{#each [...categories] as [key, val]}
				<div class="country">
					<svelte:component this={iconByCategory(key)} />
				</div>
			{/each}
		</div>
		<div class="countries">
			{#each [...countries] as [key, val]}
				<div class="country">{key},</div>
			{/each}
		</div> -->
		<button
			class={$caseInfo.data.status === 'active' ? 'status open' : 'status closed'}
			on:click={() => {
				$caseInfoMutation.mutate({
					caseId: data.caseId,
					newSummary: 'new summary',
					newStatus: $caseInfo.data.status === statusList[0] ? statusList[1] : statusList[0]
				});

				data.trpc.case.caseInfo.utils.invalidate({ caseId: data.caseId });
			}}
		>
			{$caseInfo.data.status.toUpperCase()}
		</button>
	</div>
	<div>
		<h4>Содержание</h4>
		<p class="summary">
			{$caseInfo.data?.summary || 'Пусто'}
		</p>
	</div>
	<div>
		<h4>Категории</h4>
		<div class="countries">
			{#each [...categories] as [key, val]}
				<div class="country">
					<svelte:component this={iconByCategory(key)} />
					<span>{key}</span>
				</div>
			{/each}
		</div>
	</div>
	<div>
		<h4>Страны</h4>
		<div class="countries">
			{#each [...countries] as [key, val]}
				<div class="country">{key}</div>
			{/each}
		</div>
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
		justify-content: space-between;
	}
	.status {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 83px;
		height: 30px;
		padding: 6px 16px;
		background: #8d8d8d;
		border-radius: 16px;
		&:hover {
			opacity: 0.4;
		}
	}
	.open {
		background: orange;
		border: 1px solid orange;
		color: #ffffff;
	}
	.closed {
		background: green;
		border: 1px solid #ffffff;
	}
	.countries {
		display: flex;
		flex-wrap: wrap;
	}
	.country {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 16px;
		span {
			margin-left: 10px;
		}
	}
</style>
