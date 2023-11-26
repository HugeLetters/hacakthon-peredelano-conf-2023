<script lang="ts">
	import { goto } from '$app/navigation';
	import type { RouterOutput } from '$lib/trpc';
	import { createDialog, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import SmallCase from './SmallCase.svelte';

	export let reassignReport: (caseId: string) => void;
	export let filter: string;
	export let cases: RouterOutput['case']['findManyByName'];

	const {
		elements: { trigger, content, overlay, close, portalled },
		states: { open }
	} = createDialog({
		forceVisible: true
	});

	export { open };
</script>

<button use:melt={$trigger} class="menuPopupText"> Привязать к другому кейсу </button>

{#if $open}
	<div use:melt={$portalled}>
		<div use:melt={$overlay} />
		<div class="content" use:melt={$content} transition:fade={{ duration: 150 }}>
			<button use:melt={$close} aria-label="close" class="close"> X </button>
			<div class="imputWrapper">
				<input
					class="search"
					placeholder="Введите название кейса"
					type="search"
					bind:value={filter}
				/>
				{#if !filter}
					<div class="iconSearch">
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M21.7309 20.3109L18.0209 16.6309C19.461 14.8353 20.1584 12.5562 19.9697 10.2622C19.781 7.9682 18.7206 5.83368 17.0064 4.29754C15.2923 2.76141 13.0547 1.94041 10.7538 2.00337C8.45294 2.06633 6.26362 3.00846 4.63604 4.63604C3.00846 6.26362 2.06633 8.45294 2.00337 10.7538C1.94041 13.0547 2.76141 15.2923 4.29754 17.0064C5.83368 18.7206 7.9682 19.781 10.2622 19.9697C12.5562 20.1584 14.8353 19.461 16.6309 18.0209L20.3109 21.7009C20.4039 21.7946 20.5145 21.869 20.6363 21.9198C20.7582 21.9706 20.8889 21.9967 21.0209 21.9967C21.1529 21.9967 21.2836 21.9706 21.4055 21.9198C21.5273 21.869 21.6379 21.7946 21.7309 21.7009C21.9111 21.5144 22.0119 21.2652 22.0119 21.0059C22.0119 20.7466 21.9111 20.4974 21.7309 20.3109ZM11.0209 18.0209C9.63643 18.0209 8.28305 17.6104 7.13191 16.8412C5.98076 16.072 5.08356 14.9788 4.55374 13.6997C4.02393 12.4206 3.88531 11.0131 4.1554 9.65527C4.4255 8.2974 5.09219 7.05012 6.07115 6.07115C7.05012 5.09219 8.2974 4.4255 9.65527 4.1554C11.0131 3.88531 12.4206 4.02393 13.6997 4.55374C14.9788 5.08356 16.072 5.98077 16.8412 7.13191C17.6104 8.28305 18.0209 9.63643 18.0209 11.0209C18.0209 12.8774 17.2834 14.6579 15.9706 15.9706C14.6579 17.2834 12.8774 18.0209 11.0209 18.0209Z"
								fill="#010101"
							/>
						</svg>
					</div>
				{/if}
			</div>
			{#if cases && cases.length}
				<div class="casesList">
					{#each cases as caseData}
						<button
							on:click={() => {
								reassignReport(caseData.id);
								goto(`/case/${caseData.id}`);
							}}
							class="case"
						>
							<SmallCase name={caseData.name} />
						</button>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style lang="scss">
	.menuPopupText {
		text-align: left;
		border: none;
		color: #ffffff;
	}
	.close {
		width: 24px;
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 10px;
		border: 1px solid $bleak-violet;
		color: $bleak-violet;
	}
	.content {
		padding: 16px 16px;
		position: fixed;
		inset: 0;
		width: 0;
		display: flex;
		flex-direction: column;
		height: 100vh;
		width: 100vw;
		z-index: 30 !important;
		background: #fbfcff;
	}
	.imputWrapper {
		position: relative;
	}
	.search {
		background: #ffffff;
		height: 50px;
		border-radius: 16px;
		border: 1px solid #9da5b5;
		padding: 12px 12px;
		width: 100%;
	}
	.iconSearch {
		position: absolute;
		top: 12px;
		right: 14px;
		width: 24px;
		height: 24px;
		z-index: 20;
	}
	.casesList {
		display: grid;
		gap: 16px;
		height: 500px;
		overflow-y: scroll;
		margin-top: 12px;
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
