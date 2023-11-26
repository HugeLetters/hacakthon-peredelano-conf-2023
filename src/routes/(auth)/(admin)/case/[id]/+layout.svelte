<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Tabs from '$lib/components/Tabs/index.svelte';
	export let data;
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
			<div class="menu">
				<svg
					width="32"
					height="32"
					viewBox="0 0 32 32"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M26 18C27.1 18 28 17.1 28 16C28 14.9 27.1 14 26 14C24.9 14 24 14.9 24 16C24 17.1 24.9 18 26 18ZM6 18C7.1 18 8 17.1 8 16C8 14.9 7.1 14 6 14C4.9 14 4 14.9 4 16C4 17.1 4.9 18 6 18ZM16 18C17.1 18 18 17.1 18 16C18 14.9 17.1 14 16 14C14.9 14 14 14.9 14 16C14 17.1 14.9 18 16 18Z"
						fill="black"
					/>
				</svg>
			</div>
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
	.menu {
		cursor: pointer;
	}
	.divider {
		height: 12px;
	}
</style>
