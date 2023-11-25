<script lang="ts">
	export let value: string;
	export let placeholder: string;
</script>

<input class="input" type="text" {placeholder} bind:value />

<style lang="scss">
	.input {
		padding: 1rem;
		outline: 1px solid gray;
		border-radius: 1rem;
		background-color: white;
		border: none;

		&:focus-within {
			outline-width: 2px;
		}
	}
</style>
