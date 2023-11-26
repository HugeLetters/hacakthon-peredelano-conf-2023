<script lang="ts">
	import { beforeNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Tabs from '$lib/components/Tabs/index.svelte';
	import { pageTransitionDirectionStore } from '$lib/hooks';
	export let data;

	$: tabs = [
		{ name: 'Кейс', url: `/case/${data.caseId}` },
		{ name: 'Жалобы', url: `/case/${data.caseId}/report` },
		{ name: 'Письма', url: `/case/${data.caseId}/thread` }
	] as const;

	$: caseInfo = data.trpc.case.caseInfo.query(
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

	// проверяем роут и в зависимости от него отпределяем какой таб сделать активным
	$: currentTab =
		tabs[
			(() => {
				const route = $page.route.id?.split('/');

				if (route?.includes('report')) return 1;
				if (route?.includes('thread')) return 2;
				return 0;
			})()
		];

	beforeNavigate(({ from, to }) => {
		const fromtTab = tabs.findIndex((tab) => from?.url.pathname === tab.url);
		const toTab = tabs.findIndex((tab) => to?.url.pathname === tab.url);
		$pageTransitionDirectionStore = fromtTab < toTab ? 'right' : 'left';
	});
</script>

{#if $caseInfo.isSuccess}
	<div class="wrapper">
		<div class="caseMenu">
			<h1 class="caseName">Кейс: {$caseInfo.data.name}</h1>
		</div>
		<Tabs value={currentTab} {tabs} />
		<div class="divider"></div>
		<div class="slot">
			<slot />
		</div>
	</div>
{/if}

<style lang="scss">
	.slot {
		position: relative;
		height: 100%;
	}
	.wrapper {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	.caseMenu {
		display: flex;
		justify-content: space-between;
		align-items: center;
		h1 {
			font-size: 28px;
		}
		margin-bottom: 12px;
	}

	.divider {
		min-height: 12px;
	}
</style>
