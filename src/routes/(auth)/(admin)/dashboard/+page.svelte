<script lang="ts">
	import Bank from '$lib/icons/bank.svelte';
	import Filter from '$lib/icons/filter.svelte';
	import Arrow from '$lib/icons/arrow.svelte';

	export let data;
	let isPopoverOpened: boolean = false;
	let filterRows: {
		title: string;
		filterId: string;
		buttons: { name: string; value: string }[];
	}[] = [
		{
			title: 'Статус',
			filterId: 'status',
			buttons: [
				{ name: 'Todo', value: 'todo' },
				{ name: 'In process', value: 'inprocess' },
				{ name: 'Done', value: 'done' }
			]
		}
	];
	export let selectedFilters: Object = {};

	const cases = data.trpc.case.findMany.query({ statusFilter: 'active' });

	function toggleFilter(filterId, value) {
		if (selectedFilters[filterId] === value) selectedFilters[filterId] = null;
		else selectedFilters[filterId] = value;
	}
</script>

<div class="cases">
	<div class="header">
		<button
			class="headerButton"
			type="button"
			on:click={() => (isPopoverOpened = !isPopoverOpened)}
		>
			<svelte:component this={isPopoverOpened ? Arrow : Filter} />
		</button>
		<div class="headerTitle">{isPopoverOpened ? 'Фильтры' : 'Кейсы'}</div>
	</div>
	{#if $cases.isSuccess && !isPopoverOpened}
		{#each $cases.data as { id, name, status, assignedAdmindId } (id)}
			<a href="/case/{id}" class="case">
				<div class="caseInfo">
					<div class="caseName">{name}</div>
					{status}
					<div class="caseProps">
						<div class="caseCategory">
							<!-- category icon calculated from reports -->
							<Bank />
						</div>
						<div class="caseCountry">
							<!-- countryCode calculated from reports-->
							GE
						</div>
						<div class="caseDate">
							<!-- caseDate from ??? -->
							17.11.23
						</div>
					</div>
				</div>
				{#if assignedAdmindId}
					<div class="caseAssignee">
						<!-- assignee avatar -->
						{assignedAdmindId}
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
							<div
								class="popoverButton"
								class:active={selectedFilters?.[filterId] === value}
								on:click={() => toggleFilter(filterId, value)}
							>
								{name}
							</div>
						{/each}
					</div>
				</div>
			{/each}
			<div class="filterPopup">
				<button type="button" on:click={() => (isPopoverOpened = false)}>Применить</button>
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

	.caseCategory,
	.caseCountry,
	.caseDate {
		font-size: 12px;
		line-height: 18px;
		color: #8d8d8d;
	}

	.popover {
		position: absolute;
		top: 80px;
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
		border-radius: 16px;
		background: #f6f6f6;
		font-size: 17px;
		line-height: 23.8px;

		&.active {
			background: #8d8d8d;
			color: #fff;
		}
	}
</style>
