<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Tabs from '$lib/components/Tabs/index.svelte';
	import { writable } from 'svelte/store';
	export let data;

	const popUpStore = writable({
		isOpen: false
	});

	const tabs = [
		{
			name: 'Кейс',
			url: `/case/${data.caseId}`
		},
		{
			name: 'Жалобы',
			url: `/case/${data.caseId}/report`
		},
		{
			name: 'Письма',
			url: `/case/${data.caseId}/thread`
		}
	] as const;

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
</script>

{#if $caseInfo.isSuccess}
	<div class="wrapper">
		<div class="caseMenu">
			<h1 class="caseName">Кейс: {$caseInfo.data.name}</h1>
		</div>
		<Tabs bind:value={currentTab} {tabs} />
		<div class="divider"></div>
		<slot />
	</div>
{/if}

<style lang="scss">
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
		height: 12px;
	}
</style>
