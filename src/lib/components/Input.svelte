<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	export let value: string;

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	type $$Props = Partial<HTMLInputAttributes> & { value: string };
</script>

<input class="input" type="text" {...$$props} bind:value />

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
