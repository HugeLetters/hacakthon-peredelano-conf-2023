<script lang="ts" context="module">
	type V = string;
</script>

<script lang="ts" generics="V extends string">
	import Input from './Input.svelte';

	import { createSelect, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';

	export let defaultLabel: string;
	export let options: ReadonlyArray<{ value: V; label?: string }>;
	export let onChange: (value: V) => void;
	export let withFilter: boolean = false;

	const {
		elements: { trigger, menu, option },
		states: { selectedLabel, open }
	} = createSelect({
		forceVisible: true,
		positioning: {
			placement: 'bottom',
			fitViewport: true,
			sameWidth: true
		}
	});

	let filter = '';
	$: filteredOptions =
		withFilter && filter.length
			? options.filter((el) => (el.label ?? el.value).toLowerCase().includes(filter.toLowerCase()))
			: options;
</script>

<div class="select">
	<button class="btnChoose" use:melt={$trigger} aria-label="Food">
		{$selectedLabel || defaultLabel}
		<div class={$open ? 'chevronOpen' : 'chevron'}>
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M12.5607 16.7597L20.7861 8.12701C20.9234 7.98297 21 7.7916 21 7.5926C21 7.39359 20.9234 7.20223 20.7861 7.05818L20.7768 7.04889C20.7102 6.97882 20.6301 6.92302 20.5413 6.8849C20.4525 6.84677 20.3568 6.82711 20.2602 6.82711C20.1635 6.82711 20.0679 6.84677 19.9791 6.8849C19.8903 6.92302 19.8102 6.97882 19.7436 7.04889L11.9985 15.1782L4.25641 7.04889C4.18985 6.97882 4.10972 6.92302 4.02091 6.8849C3.9321 6.84677 3.83646 6.82711 3.73981 6.82711C3.64316 6.82711 3.54752 6.84677 3.45871 6.8849C3.3699 6.92302 3.28978 6.97882 3.22321 7.04889L3.21392 7.05818C3.0766 7.20223 3 7.39359 3 7.5926C3 7.7916 3.0766 7.98297 3.21392 8.12701L11.4393 16.7597C11.5116 16.8357 11.5986 16.8961 11.695 16.9374C11.7914 16.9787 11.8951 17 12 17C12.1049 17 12.2086 16.9787 12.305 16.9374C12.4014 16.8961 12.4884 16.8357 12.5607 16.7597Z"
					fill="black"
				/>
			</svg>
		</div>
	</button>
	{#if $open}
		<div class="popup" use:melt={$menu} transition:fade={{ duration: 150 }}>
			{#if withFilter}
				<input class="filter" bind:value={filter} placeholder="Фильтр" />
			{/if}
			{#each filteredOptions as item}
				<button
					use:melt={$option({ value: item.value })}
					class="optionButton"
					on:click={() => {
						onChange(item.value);
						filter = '';
					}}
				>
					{item.label ?? item.value}
				</button>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.select {
		position: relative;
	}
	.btnChoose {
		padding: 0;
		border: none;
		font: inherit;
		color: inherit;
		background-color: transparent;
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		background: #ffffff;
		width: 100%;
		text-align: left;
		padding: 12px 12px;
		border-radius: 16px;
		border: 1px solid #8d8d8d;
	}
	.check {
		display: flex;
		position: absolute;
		left: 2px;
		top: 50%;
		z-index: 20;
		translate: 0 calc(-50% + 1px);
		color: $custom-red;
	}
	.chevron {
		width: 24px;
		height: 24px;
	}
	.chevronOpen {
		transform: rotate(180deg);
	}
	.popup {
		display: flex;
		flex-direction: column;
		background: white;
		gap: 0.5rem;
		padding: 1rem;
		border-radius: 1rem;
		box-shadow: 0 0 5px #0003;
		overflow-y: scroll;
	}
	.optionButton {
		border: none;
		transition: background-color 150ms;

		&:hover,
		:focus-within {
			background-color: #8883;
		}
	}
	.filter {
		padding: 0.25rem;
		border-radius: 0.5rem;
	}
</style>
