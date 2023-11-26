<script lang="ts">
	import { goto } from '$app/navigation';
	import Textarea from '$lib/components/Textarea.svelte';
	import ArrowRight from '$lib/icons/ArrowRight.svelte';
	import Arrow from '$lib/icons/arrow.svelte';
	import Avia from '$lib/icons/avia.svelte';
	import Bank from '$lib/icons/bank.svelte';
	import Paper from '$lib/icons/paper.svelte';
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
				} else {
					caseSummary = data.summary ?? '';
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

	function formatDate(dateNumber: number | undefined) {
		if (!dateNumber) return null;

		const date = new Date(dateNumber);

		return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(
			2,
			'0'
		)}`;
	}
</script>

{#if $caseInfo.isSuccess}
	{@const caseData = $caseInfo.data}
	<div class="aboutCase">
		<div class="caseHeader">
			<div class="props">
				{#each getUniqueValues(caseData.reports.map((x) => x.category)) as category}
					<div class="prop">
						<svelte:component this={iconByCategory(category)} />
					</div>
				{/each}
				{#each getUniqueValues(caseData.reports.map((x) => x.country)).filter((val, index) => index < 2) as country}
					<div class="prop">{country}</div>
				{/each}
				<div class="prop">
					{formatDate(caseData.reports[0]?.createdAt)}
				</div>
			</div>
			<div class="statusWrapper">
				<button
					class="status highlighted {isButtonStatusesOpened ? 'active' : ''}"
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
						<svelte:component this={iconByCategory(category)} />
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

	.caseHeader {
		display: flex;
		justify-content: space-between;

		.prop {
			color: #b6b6b6;
		}
	}
	h4 {
		font-size: 17px;
		color: #8fa5fb;
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
		width: 100px;
		padding: 6px 16px;
		border: none;
		font-size: 12px;
		line-height: 18px;

		&.highlighted {
			border-radius: 16px;
			background: #9da5b5;
			color: #fff;
		}

		&.active {
			border-radius: 16px 16px 0 0;
		}
	}

	.changeStatusButtons {
		display: flex;
		flex-direction: column;
		position: absolute;
		top: 30px;
		border-radius: 0 0 16px 16px;
		background: #9da5b5;
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
