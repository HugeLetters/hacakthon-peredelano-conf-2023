<script lang="ts">
	import { goto } from '$app/navigation';
	import CategoryIcon from '$lib/components/CategoryIcon.svelte';
	import Textarea from '$lib/components/Textarea.svelte';
	import type { CaseStatus } from '$lib/options.js';

	export let data;
	let caseSummary: string = '';
	let isButtonStatusesOpened: boolean = false;
	let isSummaryEditing: boolean = false;

	const statuses: { name: string; value: CaseStatus }[] = [
		{ name: 'To do', value: 'active' },
		{ name: 'In progress', value: 'inprogress' },
		{ name: 'Done', value: 'closed' }
	];

	const caseInfo = data.trpc.case.caseInfo.query(
		{ caseId: data.caseId },
		{
			select(data) {
				if (!data) {
					goto('/dashboard');
					throw Error('No such case exists');
				}
				caseSummary = data.summary ?? '';
				return data;
			}
		}
	);
	const caseInfoMutation = data.trpc.case.updateCaseData.mutation({
		onSuccess() {
			data.trpc.case.caseInfo.utils.invalidate({ caseId: data.caseId });
		}
	});

	function toggleSummaryEdit() {
		if (isSummaryEditing)
			$caseInfoMutation.mutate({
				caseId: data.caseId,
				newSummary: caseSummary
			});
		isSummaryEditing = !isSummaryEditing;
	}

	function changeStatus(status: CaseStatus) {
		$caseInfoMutation.mutate({
			caseId: data.caseId,
			newStatus: status
		});
		isButtonStatusesOpened = false;
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
				class="status active"
				type="button"
				on:click={() => {
					isButtonStatusesOpened = !isButtonStatusesOpened;
				}}
			>
				{statuses.find(({ value }) => {
					return value === caseData.status;
				})?.name}
			</button>
			{#if isButtonStatusesOpened}
				<div class="changeStatusButtons">
					{#each statuses as status}
						{#if status.value !== caseData.status}
							<button class="status" type="button" on:click={() => changeStatus(status.value)}>
								{status.name}
							</button>
						{/if}
					{/each}
				</div>
			{/if}
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
			<div class="props">
				{#each getUniqueValues(caseData.reports.map((x) => x.category)) as category}
					<div class="prop">
						<CategoryIcon {category} />
						{category}
					</div>
				{/each}
			</div>
		</div>
		<div>
			<h4>Страны</h4>
			<div class="props">
				{#each getUniqueValues(caseData.reports.map((x) => x.country)) as country}
					<div class="prop">{country}</div>
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
		position: relative;
	}
	.status {
		padding: 6px 16px;
		background: #6f6f6f;
		border: none;
		border-radius: 16px;
		font-size: 12px;
		line-height: 18px;

		&.active {
			background: #8d8d8d;
		}
	}

	.changeStatusButtons {
		display: flex;
		flex-direction: column;
		gap: 10px;
		position: absolute;
		top: 30px;
	}
	.props {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.prop {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}
</style>
