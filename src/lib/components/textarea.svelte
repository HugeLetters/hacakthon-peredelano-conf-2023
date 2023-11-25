<script lang="ts">
	export let value: string;
	export let className: string;
	export let placeholder: string;
</script>

<textarea class={className} {placeholder} bind:value />

<style lang="scss">
	textarea {
		height: 120px;
		resize: vertical;
	}
</style>
