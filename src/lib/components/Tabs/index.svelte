<script lang="ts">
	export let tabs = [];
	export let value;
</script>

<div class="tabsWrapper">
	{#each tabs as tab}
		<button
			class={tab.id === value.id ? 'tab active' : 'tab'}
			on:click={() => {
				value = tab;
			}}
		>
			{tab.name}
		</button>
	{/each}
</div>

<style lang="postcss">
	.tabsWrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
		/* height: 32px; */
		background: #74748014;
		border-radius: 9px;
		padding: 2px 3px;
	}
	.tab {
		width: 119px;
		height: 28px;
		border: 0;
		border-radius: 5px;
	}
	.active {
		background: #ffffff;
	}
</style>
