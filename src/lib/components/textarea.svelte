<script lang="ts">
	export let text: string;
</script>

<textarea placeholder="Опишите суть проблемы" bind:value={text} />

<style lang="scss">
	textarea {
		width: 100%;
		height: 350px;

		&::placeholder {
			color: gray;
		}
	}
</style>
