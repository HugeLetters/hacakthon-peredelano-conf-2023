<script lang="ts">
	import type { Category } from '$lib/options';
	import Avia from '$lib/icons/avia.svelte';
	import Bank from '$lib/icons/bank.svelte';
	import Paper from '$lib/icons/paper.svelte';

	export let category: Category;

	function iconByCategory(category: Category) {
		switch (category) {
			case 'Банк':
				return Bank;
			case 'ВНЖ':
				return Paper;
			case 'Авиалиния':
				return Avia;
		}
	}
</script>

<svelte:component this={iconByCategory(category)} />
