<script lang="ts">
	import { goto } from '$app/navigation';
	import CategoryIcon from '$lib/components/CategoryIcon.svelte';
	import Textarea from '$lib/components/Textarea.svelte';
	import type { CaseStatus } from '$lib/options.js';
	import { createPopover, melt } from '@melt-ui/svelte';
	import { slide } from 'svelte/transition';

	export let data;
	let caseSummary: string = '';
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
		$open = false;
	}

	function getUniqueValues<T>(arr: T[]) {
		return [...new Set(arr.filter((x): x is NonNullable<T> => !!x))];
	}

	const formatter = new Intl.DateTimeFormat('ru', {
		day: '2-digit',
		month: '2-digit',
		year: '2-digit'
	});
	function formatDate(dateNumber: number | undefined) {
		if (!dateNumber) return null;

		return formatter.format(new Date(dateNumber));
	}

	const {
		elements: { trigger, content },
		states: { open }
	} = createPopover({ forceVisible: true });
</script>

{#if $caseInfo.isSuccess}
	{@const caseData = $caseInfo.data}
	<div class="aboutCase">
		<div class="caseHeader">
			<div class="props">
				{#each getUniqueValues(caseData.reports.map((x) => x.category)) as category}
					<div class="prop">
						<CategoryIcon {category} />
					</div>
				{/each}
				{#each getUniqueValues(caseData.reports.map((x) => x.country)).filter((val, index) => index < 2) as country}
					<div class="prop">{country}</div>
				{/each}
				<div class="prop">
					{formatDate(caseData.reports[0]?.createdAt)}
				</div>
			</div>
			<div class="statusWrapper" use:melt={$trigger}>
				<button class="status highlighted {$open ? 'active' : ''}" type="button">
					{statuses.find(({ value }) => {
						return value === caseData.status;
					})?.name}
				</button>
				{#if $open}
					<div
						class="changeStatusButtons"
						use:melt={$content}
						in:slide={{ axis: 'y', delay: 200 }}
						out:slide={{ axis: 'y' }}
					>
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

	.caseHeader {
		display: flex;
		justify-content: space-between;
	}
	.prop {
		color: #b6b6b6;
		height: 1.5rem;
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
		line-height: 25.5px;
		text-align: left;
	}

	.changeSummaryButton {
		width: 100%;
		margin-top: 16px;
		padding: 1rem;
		border: none;
		border-radius: 1rem;
		background: #8fa5fb;
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
		background-color: $violet;

		&.highlighted {
			border-radius: 1rem;

			color: white;
		}

		transition: border-radius 200ms 250ms;
		&.active {
			transition: border-radius 200ms 0ms;
			border-radius: 1rem 1rem 0 0;
		}
	}

	.changeStatusButtons {
		translate: 0 -5px;
		display: flex;
		flex-direction: column;
		position: absolute;
		top: 30px;
		border-radius: 0 0 1rem 1rem;
		overflow: hidden;
		background-color: $violet;
		color: white;
	}
	.props {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		align-items: center;
	}
	.prop {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}
</style>
