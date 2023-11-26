<script lang="ts">
	import CategoryIcon from '$lib/components/CategoryIcon.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import Initial from '$lib/components/Initial.svelte';
	import type { Category } from '$lib/options';
	import type { RouterOutput } from '$lib/trpc';
	import { createPopover, melt } from '@melt-ui/svelte';
	import type { Writable } from 'svelte/store';
	import { fade } from 'svelte/transition';

	export let reassignReport: (caseId: string) => void = () => {};
	export let isAdmin: boolean = false;
	export let authorName: string;
	export let category: Category;
	export let country: string | null;
	export let createdAt: number;
	export let content: string;
	export let chatLink: string;
	export let organization: string | null;
	export let filter: string;
	export let casesFiltered: RouterOutput['case']['findManyByName'];

	let dialogOpen: Writable<boolean>;
	function formatDate(dateNumber: number | undefined) {
		if (!dateNumber) return null;

		const date = new Date(dateNumber);

		return date.toLocaleDateString('ru');
	}

	const {
		elements: { trigger, content: popover },
		states: { open }
	} = createPopover({ forceVisible: true });
</script>

<div class="header">
	<span class="name">
		<div class="image">
			<Initial name={authorName} />
		</div>
		{authorName}
	</span>
	{#if isAdmin}
		<div class="menuWraper">
			<button class="menu" use:melt={$trigger}>
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
			</button>
			{#if $open || $dialogOpen}
				<div class="menuPopup" transition:fade={{ duration: 150 }} use:melt={$popover}>
					<Dialog cases={casesFiltered} bind:filter {reassignReport} bind:open={dialogOpen} />
					<button class="menuPopupText disabled" disabled={true}>Удалить жалобу</button>
				</div>
			{/if}
		</div>
	{/if}
</div>

<div class="reportData">
	<span class="categoryIcon">
		<CategoryIcon {category} />
	</span>
	{#if country}
		<span>{country}</span>
	{/if}
	<span>{formatDate(createdAt)}</span>
</div>

<div class="content">
	<h4>Обращение</h4>
	<p class="text">
		{content}
	</p>
	{#if organization}
		<h4>Организация</h4>
		<p class="text">{organization}</p>
	{/if}
</div>

<a href={chatLink} class="chatLink">
	<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
		<g clip-path="url(#clip0_67_11728)">
			<path
				d="M11.7712 27.7371L11.7856 28.0943L12.1162 27.9582C12.4253 27.8309 12.703 27.6508 12.9598 27.4659C13.0737 27.384 13.1784 27.3051 13.2803 27.2283C13.4201 27.1231 13.5547 27.0217 13.7008 26.9214C14.1823 26.5912 14.6442 26.3817 15.2322 26.4936L15.2326 26.4937C16.121 26.6616 17.047 26.75 18 26.75C24.9908 26.75 30.25 22.0678 30.25 16.75C30.25 11.4322 24.9908 6.75 18 6.75C11.0092 6.75 5.75 11.4322 5.75 16.75C5.75 19.8714 7.51867 22.7312 10.4277 24.6042C11.4231 25.2464 11.7222 26.5197 11.7712 27.7371ZM15.1741 29.0208L15.0656 29.0029L14.9791 29.0708C14.9497 29.094 14.9166 29.1203 14.8802 29.1493C14.7378 29.2628 14.5442 29.417 14.3144 29.5792C13.4933 30.1578 12.3111 30.75 10.5 30.75C10.1685 30.75 9.85054 30.6183 9.61612 30.3839C9.3817 30.1495 9.25 29.8315 9.25 29.5C9.25 29.303 9.26283 29.092 9.27744 28.8667L9.28041 28.8209C9.29403 28.6118 9.30836 28.3917 9.31276 28.1723C9.32217 27.7039 9.28794 27.206 9.08664 26.7626L9.05658 26.6964L8.9957 26.6567C5.55877 24.4121 3.25 20.847 3.25 16.75C3.25 9.64452 10.076 4.25 18 4.25C25.924 4.25 32.75 9.64452 32.75 16.75C32.75 23.8555 25.924 29.25 18 29.25C17.034 29.25 16.0891 29.1716 15.1741 29.0208Z"
				fill="white"
				stroke="#8D8D8D"
				stroke-width="0.5"
			/>
		</g>
		<defs>
			<clipPath id="clip0_67_11728">
				<rect width="36" height="36" fill="white" />
			</clipPath>
		</defs>
	</svg>
</a>

<style lang="scss">
	.chatLink {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 64px;
		height: 64px;
		border-radius: 50%;
		background: $violet;
		position: fixed;
		bottom: 16px;
		right: 16px;
		&:hover {
			opacity: 0.4;
		}
	}
	.header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 12px;
	}
	.name {
		display: flex;
		align-items: center;
	}
	.image {
		margin-right: 12px;
		width: 2.5rem;
		height: 2.5rem;
	}
	.menuWraper {
		position: relative;
	}
	.menu {
		cursor: pointer;
		position: relative;
		border: none;
		cursor: pointer;
	}
	.menuPopup {
		display: flex;
		flex-direction: column;
		gap: 10px;
		position: absolute;
		right: 0;
		width: 243px;
		min-height: 98px;
		height: auto;
		z-index: 2;
		background: $violet;
		padding: 16px 12px;
		border-radius: 16px;
	}
	.menuPopupText {
		text-align: left;
		border: none;
		color: #ffffff;
	}
	.disabled {
		opacity: 0.3;
	}
	.reportData {
		display: flex;
		align-items: center;
		margin-bottom: 16px;
		color: #8d8d8d;
		gap: 10px;

		span {
			&:last-child {
				margin-left: 10px;
			}
		}
	}

	.categoryIcon {
		width: 32px;
		height: 32px;
	}
	h4 {
		color: #8d8d8d;
		margin-bottom: 5px;
	}

	.text {
		margin-bottom: 16px;
	}
</style>
