<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	export let value: string;

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	type $$Props = Partial<HTMLTextareaAttributes> & { value: string };
</script>

<div class="container" data-input={value}>
	<textarea
		{...$$props}
		class="textarea"
		bind:value
		on:input={(e) => {
			const parent = e.currentTarget.parentElement;
			if (!parent) return;

			parent.dataset.input = e.currentTarget.value;
		}}
		{...$$restProps}
	/>
</div>

<style lang="scss">
	.container {
		min-height: 3lh;
		position: relative;
		height: 100%;
		width: 100%;

		&::after {
			content: attr(data-input);
			visibility: hidden;
			overflow-wrap: break-word;
		}
	}

	textarea {
		outline: none;
		border: none;
		position: absolute;
		background-color: transparent;
		height: 100%;
		width: 100%;
		resize: none;
		overflow-wrap: break-word;
	}
</style>
