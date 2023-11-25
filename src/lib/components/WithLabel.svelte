<script lang="ts">
	export let label: string;
</script>

<label class="root">
	<span class="label">
		{label}
	</span>
	<slot />
</label>

<style lang="scss">
	.root {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		background-color: #f6f6f6;
		padding: 1.25rem;
		border-radius: 1rem;
	}
	.label {
		font-size: larger;
	}
</style>
