<script lang="ts">
	export let value: string;
</script>

<input class="input" type="text" {...$$restProps} bind:value />

<style lang="scss">
	.input {
		padding: 1rem;
		border: 1px solid #9da5b5;
		outline: none;
		border-radius: 1rem;
		background-color: white;
		border: none;

		&:focus-within {
			border-width: 2px;
		}
	}
</style>
