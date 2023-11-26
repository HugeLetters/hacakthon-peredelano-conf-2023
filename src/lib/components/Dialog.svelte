<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';

	export let reassignReport: (caseId) => void;
	export let onClick: () => void;

	const {
		elements: { trigger, content, overlay, close, portalled },
		states: { open }
	} = createDialog({
		forceVisible: true
	});

	let searchValue = '';
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
				bind:value={searchValue}
			/>

			<div class="casesList"></div>
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
</style>
