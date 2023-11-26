<script lang="ts">
	export let name: string;
	export let color: string;
	function getInitials(name: string) {
		const [first, second] = name.split(/[\s_+.-]/);
		return (first && second ? `${first.at(0)}${second.at(0)}` : name.slice(0, 2)).toUpperCase();
	}
</script>

<div class="root" style="--color: {color}">
	{getInitials(name)}
</div>

<style lang="scss">
	.root {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		border-radius: 99999px;
		background-color: var(--color, gray);
		color: white;
	}
</style>
