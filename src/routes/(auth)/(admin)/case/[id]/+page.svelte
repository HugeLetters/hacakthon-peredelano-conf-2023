<script lang="ts">
	import { goto } from '$app/navigation';
	import Textarea from '$lib/components/Textarea.svelte';
	import Avia from '$lib/icons/avia.svelte';
	import Bank from '$lib/icons/bank.svelte';
	import Paper from '$lib/icons/paper.svelte';

	export let data;
	let caseSummary: string = '';
	let isSummaryEditing: boolean = false;

	const caseInfo = data.trpc.case.caseInfo.query(
		{ caseId: data.caseId },
		{
			select(data) {
				if (!data) {
					goto('/dashboard');
					throw Error('No such case exists');
				}
				return data;
			}
		}
	);
	const caseInfoMutation = data.trpc.case.updateCaseData.mutation({
		onSuccess() {
			data.trpc.case.caseInfo.utils.invalidate({ caseId: data.caseId });
		}
	});

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

	function toggleSummaryEdit() {
		if (isSummaryEditing)
			$caseInfoMutation.mutate({
				caseId: data.caseId,
				newSummary: caseSummary
			});
		isSummaryEditing = !isSummaryEditing;
	}

	function getUniqueValues<T>(arr: T[]) {
		return [...new Set(arr.filter((x): x is NonNullable<T> => !!x))];
	}
</script>

{#if $caseInfo.isSuccess}
	{@const caseData = $caseInfo.data}
	<div class="aboutCase">
		<div class="statusWrapper">
			<button
				class={caseData.status === 'active' ? 'status open' : 'status closed'}
				type="button"
				on:click={() => {
					$caseInfoMutation.mutate({
						caseId: data.caseId,
						newStatus: caseData.status === 'active' ? 'closed' : 'active'
					});
				}}
			>
				{caseData.status.toUpperCase()}
			</button>
		</div>
		<div>
			<h4>Содержание</h4>
			{#if !isSummaryEditing}
				<button class="summary" on:click={toggleSummaryEdit}>
					{caseData?.summary || 'Пусто'}
				</button>
			{:else}
				<div
					style="
					display: flex;
					flex-direction: column;
				"
				>
					<Textarea placeholder="Введите описание кейса" bind:value={caseSummary} />
				</div>
				<button class="changeSummaryButton" type="button" on:click={toggleSummaryEdit}
					>Поменять описание</button
				>
			{/if}
		</div>
		<div>
			<h4>Категории</h4>
			<div class="countries">
				{#each getUniqueValues(caseData.reports.map((x) => x.category)) as category}
					<div class="country">
						<svelte:component this={iconByCategory(category)} />
					</div>
				{/each}
			</div>
		</div>
		<div>
			<h4>Страны</h4>
			<div class="countries">
				{#each getUniqueValues(caseData.reports.map((x) => x.country)) as country}
					<div class="country">{country}</div>
				{/each}
			</div>
		</div>
	</div>
{/if}

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
		border: none;
		outline: none;
		font-size: 17px;
		color: #000000;
	}

	.changeSummaryButton {
		width: 100%;
		margin-top: 16px;
		padding: 1rem;
		border: none;
		border-radius: 1rem;
		background: gray;
		color: white;
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
	}
</style>
