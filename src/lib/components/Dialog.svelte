<script lang="ts">
	import { goto } from '$app/navigation';
	import { createDialog, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';

	export let reassignReport: (caseId) => void;
	export let filter: string;
	export let casesFiltered: [];

	const {
		elements: { trigger, content, overlay, close, portalled },
		states: { open }
	} = createDialog({
		forceVisible: true
	});
	$: console.log(casesFiltered, '16');
</script>

<button use:melt={$trigger} class="menuPopupText"> Привязать к другому кейсу </button>

<div use:melt={$portalled}>
	{#if $open}
		<div use:melt={$overlay} transition:fade={{ duration: 150 }} />
		<div class="content" use:melt={$content}>
			<button use:melt={$close} aria-label="close" class="close"> Отмена </button>
			<input
				class="search"
				placeholder="Введите название кейса"
				type="search"
				bind:value={filter}
			/>

			{#if casesFiltered && casesFiltered.length}
				<div class="casesList">
					{#each casesFiltered as caseData}
						<button
							on:click={() => {
								reassignReport(caseData.id);
								goto(`/case/${caseData.id}`);
							}}
							class="case"
						>
							{caseData.name}
						</button>
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</div>

<style lang="scss">
	.menuPopupText {
		text-align: left;
		border: none;
		color: #ffffff;
	}
	.close {
		margin-bottom: 10px;
	}
	.content {
		padding: 16px 16px;
		position: fixed;
		top: 0;
		width: 0;
		display: flex;
		flex-direction: column;
		height: 100vh;
		width: 100vw;
		z-index: 30 !important;
		background: #fbfcff;
	}
	.search {
		background: #ffffff;
		height: 50px;
		border-radius: 16px;
		border: 1px solid #9da5b5;
		padding: 12px 12px;
	}
	.casesList {
		display: grid;
		height: 500px;
		overflow-y: scroll;
	}
	.case {
		border: none;
		text-align: left;
		margin-bottom: 16px;
		height: 68px;
		background: #f2f6ff;
		cursor: pointer;
		padding: 12px 12px;
		border-radius: 16px;
	}
</style>
