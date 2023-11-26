<script lang="ts">
	export let value: string;
	export let placeholder: string;
</script>

<div class="container" data-input={value}>
	<textarea
		{placeholder}
		class="textarea"
		bind:value
		on:input={(e) => {
			const parent = e.currentTarget.parentElement;
			if (!parent) return;

			parent.dataset.input = e.currentTarget.value;
		}}
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
