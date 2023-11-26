<script lang="ts">
	import CategoryIcon from '$lib/components/CategoryIcon.svelte';
	import Filter from '$lib/icons/filter.svelte';
	import type { CaseStatus } from '$lib/options.js';
	import { createDialog, melt } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';

	export let data;

	let statusFilter: CaseStatus | undefined = undefined;
	const statusList: Array<{ value: CaseStatus; label: string }> = [
		{ label: 'Активные', value: 'active' },
		{ label: 'В работе', value: 'inprogress' },
		{ label: 'Закрытые', value: 'closed' }
	];
	$: cases = data.trpc.case.findMany.infiniteQuery(
		{ statusFilter },
		{
			getNextPageParam(page) {
				return page.at(-1)?.id;
			},
			// @ts-expect-error error with trpc-svelte-query library
			initialPageParam: undefined,
			enabled: !$open
		}
	);

	const {
		elements: { trigger, portalled, content },
		states: { open }
	} = createDialog({ forceVisible: true });
</script>

<div class="cases">
	<div class="header">
		<button class="headerButton" use:melt={$trigger}>
			<Filter />
		</button>
		<div class="headerTitle">Кейсы</div>
	</div>
	{#if $cases.isSuccess}
		{#each $cases.data.pages.flatMap((x) => x) as { id, name, reports, assignedAdminName } (id)}
			{@const report = reports[0]}
			<a href="/case/{id}" class="case">
				<div class="caseInfo">
					<div class="caseName">{name}</div>
					<div class="caseProps">
						{#if report}
							{@const { category, country, createdAt } = report}
							{#if category}
								<div class="caseProp">
									<CategoryIcon {category} />
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
						{assignedAdminName}
					</div>
				{/if}
			</a>
		{/each}
	{/if}
	{#if $open}
		<div use:melt={$portalled}>
			<div class="popover" use:melt={$content} transition:fly={{ x: '-100vw' }}>
				<div class="popoverRow">
					<div class="popoverTitle">Статус</div>
					<div class="popoverButtons">
						{#each statusList as status}
							<button
								class="popoverButton"
								class:active={statusFilter === status.value}
								on:click={() => {
									if (statusFilter === status.value) {
										statusFilter = undefined;
										return;
									}
									statusFilter = status.value;
								}}
								type="button"
							>
								{status.label}
							</button>
						{/each}
					</div>
				</div>
				<div class="filterPopup">
					<button class="confirmFiltersButton" type="button" on:click={() => ($open = false)}>
						Применить
					</button>
				</div>
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
		padding: 16px 16px;
	}

	.case {
		display: flex;
		justify-content: space-between;
		gap: 10px;
		padding: 12px;
		border-radius: 16px;
		background: #f2f6ff;
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
		position: absolute;
		inset: 0;
		padding: 1rem;
		background-color: white;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.popoverTitle {
		margin-bottom: 6px;
	}

	.popoverButtons {
		display: flex;
		gap: 0.75rem;
	}

	.popoverButton {
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 1rem;
		outline: none;
		background: $lightgray;

		&.active {
			background: $violet;
			color: #fff;
		}
	}

	.confirmFiltersButton {
		width: 100%;
		padding: 12px;
		color: #fff;
		background: $violet;
		border: 0;
		border-radius: 16px;
		outline: 0;
		text-align: center;
		font-size: 17px;
		line-height: 25.5px;
		font-weight: bold;
	}
</style>
