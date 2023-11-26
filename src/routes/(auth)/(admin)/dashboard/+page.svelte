<script lang="ts">
	import Filter from '$lib/icons/filter.svelte';
	import SmallCase from '$lib/components/SmallCase.svelte';
	import type { CaseStatus } from '$lib/options.js';
	import { createDialog, melt } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';
	import type { Action } from 'svelte/action';

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

	const observer: Action<HTMLElement, { active: boolean }> = (node, { active }) => {
		if (!active) return {};

		const observer = new IntersectionObserver((events) => {
			events.forEach((event) => {
				if (event.target !== node || !event.isIntersecting || $cases.isFetching) return;

				$cases.fetchNextPage();
			});
		});
		observer.observe(node);

		return {
			update(parameter) {
				active = parameter.active;
			},
			destroy() {
				observer.disconnect();
			}
		};
	};
</script>

<div class="cases">
	<div class="header">
		<button class="headerButton" use:melt={$trigger}>
			<Filter />
		</button>
		<div class="headerTitle">Кейсы</div>
	</div>
	{#if $cases.isSuccess}
		{@const cases = $cases.data.pages.flatMap((x) => x)}
		{#each cases as { id, name, reports, assignedAdminName } (id)}
			{@const report = reports[0]}
			<div use:observer={{ active: id === cases.at(-10)?.id }}>
				<SmallCase href={`/case/${id}`} {name} {report} {assignedAdminName} />
			</div>
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
