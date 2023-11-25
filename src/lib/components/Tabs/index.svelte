<script lang="ts">
	type Tab = { url: string; name: string };

	export let tabs: ReadonlyArray<Tab> = [];
	export let value: Tab;
</script>

<div class="tabsWrapper">
	{#each tabs as tab}
		<a
			href={tab.url}
			class="tab {tab.name === value.name ? 'active' : 'tabLink'}"
			on:click={() => {
				value = tab;
			}}
		>
			{tab.name}
		</a>
	{/each}
</div>

<style lang="postcss">
	.tabsWrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #74748014;
		border-radius: 9px;
		padding: 2px 3px;
	}
	.tab {
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		width: 119px;
		height: 28px;
		border: 0;
		border-radius: 5px;
	}
	.active {
		background: #ffffff;
	}
</style>
