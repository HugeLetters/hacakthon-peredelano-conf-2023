<script lang="ts">
	import Arrow from '$lib/icons/arrow.svelte';
	import Avia from '$lib/icons/avia.svelte';
	import Bank from '$lib/icons/bank.svelte';
	import Filter from '$lib/icons/filter.svelte';
	import Paper from '$lib/icons/paper.svelte';
	import type { CaseStatus } from '$lib/options.js';

	enum FilterFields {
		statusFilter = 'statusFilter'
	}

	export let data;

	let isPopoverOpened: boolean = false;
	let filterRows: {
		title: string;
		filterId: FilterFields;
		buttons: { name: string; value: CaseStatus }[];
	}[] = [
		{
			title: 'Статус',
			filterId: FilterFields.statusFilter,
			buttons: [
				{ name: 'To do', value: 'active' },
				{ name: 'In progress', value: 'inprogress' },
				{ name: 'Done', value: 'closed' }
			]
		}
	];
	let selectedFilters: { [FilterFields.statusFilter]: CaseStatus | undefined } = {
		statusFilter: undefined
	};
	let activefilters: { [FilterFields.statusFilter]: CaseStatus | undefined } = {
		statusFilter: undefined
	};

	$: cases = data.trpc.case.findMany.query(activefilters);

	function toggleFilter(filterId: FilterFields, value: CaseStatus) {
		if (selectedFilters[filterId] === value) selectedFilters[filterId] = undefined;
		else selectedFilters[filterId] = value;
	}

	function togglePopover() {
		if (isPopoverOpened) activefilters = selectedFilters;
		isPopoverOpened = !isPopoverOpened;
	}

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
</script>

<div class="cases">
	<div class="header">
		<button class="headerButton" type="button" on:click={togglePopover}>
			<svelte:component this={isPopoverOpened ? Arrow : Filter} />
		</button>
		<div class="headerTitle">{isPopoverOpened ? 'Фильтры' : 'Кейсы'}</div>
	</div>
	{#if $cases.isSuccess && !isPopoverOpened}
		{#each $cases.data as { id, name, status, assignedAdminName, reports } (id)}
			{@const report = reports[0]}
			<a href="/case/{id}" class="case">
				<div class="caseInfo">
					<div class="caseName">{name}</div>
					<div class="caseProps">
						{#if report}
							{@const { category, country, createdAt } = report}
							{#if category}
								<div class="caseProp">
									<svelte:component this={iconByCategory(category)} />
								</div>
							{/if}
							{#if country}
								<div class="caseProp">
									{country}
								</div>
							{/if}
							{#if createdAt}
								<div class="caseProp">
									{new Date(createdAt).toLocaleDateString('ru')}
								</div>
							{/if}
						{/if}
					</div>
				</div>
				{#if assignedAdminName}
					<div class="caseAssignee">
						<!-- assignee avatar -->
						{assignedAdminName}
					</div>
				{/if}
			</a>
		{/each}
	{/if}

	{#if isPopoverOpened}
		<div class="popover">
			{#each filterRows as { title, filterId, buttons }}
				<div class="popoverRow">
					<div class="popoverTitle">{title}</div>
					<div class="popoverButtons">
						{#each buttons as { name, value }}
							<button
								class="popoverButton"
								class:active={selectedFilters?.[filterId] === value}
								on:click={() => toggleFilter(filterId, value)}
								type="button"
							>
								{name}
							</button>
						{/each}
					</div>
				</div>
			{/each}
			<div class="filterPopup">
				<button class="confirmFiltersButton" type="button" on:click={togglePopover}
					>Применить</button
				>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.header {
		display: flex;
		align-items: center;
	}

	.headerButton {
		width: 32px;
		height: 32px;
		position: absolute;
		border: none;
		outline: none;
	}

	.headerTitle {
		flex-grow: 1;
		text-align: center;
		font-size: 28px;
		line-height: 42px;
	}
	.cases {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.case {
		display: flex;
		justify-content: space-between;
		gap: 10px;
		padding: 12px;
		border-radius: 16px;
		background: #fafafa;
	}

	.caseInfo {
		display: flex;
		flex-direction: column;
	}

	.caseName {
		font-size: 17px;
		line-height: 25.5px;
	}

	.caseProps {
		display: flex;
		gap: 6px;
	}

	.caseProp {
		font-size: 12px;
		line-height: 18px;
		color: #8d8d8d;
	}

	.popover {
		height: calc(100vh - 200px);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.popoverRow {
		margin-bottom: 8px;
	}

	.popoverTitle {
		margin-bottom: 6px;
		font-size: 17px;
		line-height: 23.8px;
	}

	.popoverButtons {
		display: flex;
		gap: 12px;
	}

	.popoverButton {
		padding: 6px 16px;
		border: none;
		border-radius: 16px;
		outline: none;
		background: #f6f6f6;
		font-size: 17px;
		line-height: 23.8px;

		&.active {
			background: #8d8d8d;
			color: #fff;
		}
	}

	.confirmFiltersButton {
		width: 100%;
		padding: 12px;
		color: #fff;
		background: #8d8d8d;
		border: 0;
		border-radius: 16px;
		outline: 0;
		text-align: center;
		font-size: 17px;
		line-height: 25.5px;
		font-weight: bold;
	}
</style>
