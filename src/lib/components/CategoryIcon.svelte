<script lang="ts">
	import type { Category } from '$lib/options';
	import Avia from '$lib/icons/avia.svelte';
	import Bank from '$lib/icons/bank.svelte';
	import Paper from '$lib/icons/paper.svelte';

	export let category: Category | string;

	function iconByCategory(category: Category | string) {
		switch (category) {
			case 'Банкинг':
				return Bank;
			case 'ВНЖ':
				return Paper;
			case 'Перелёты':
				return Avia;
		}
	}
</script>

<svelte:component this={iconByCategory(category)} width="100%" height="100%" />
