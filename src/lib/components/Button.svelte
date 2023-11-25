<script lang="ts">
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	type $$Props = Partial<HTMLButtonElement>;
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
