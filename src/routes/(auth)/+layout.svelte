<script lang="ts">
	export let data;
</script>

<div class="root">
	<div>{data.session?.user.name}</div>
	<slot />
</div>

<style lang="scss">
	.root {
		min-height: 100%;
		background: linear-gradient(to top, #000a, #0000);
		background-attachment: fixed;
	}
</style>
