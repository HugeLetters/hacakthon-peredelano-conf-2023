<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	type $$Props = Partial<HTMLButtonAttributes>;
</script>

<button class="submit" {...$$props}> <slot /></button>

<style lang="scss">
	.submit {
		border: none;
		background-color: gray;
		color: white;
		padding: 1rem;
		border-radius: 1rem;
	}
</style>
