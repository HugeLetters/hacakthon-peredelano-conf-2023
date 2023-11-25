<script lang="ts">
	import Report from '$lib/pages/Report/index.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let data;

	const caseId = $page.params.id;
	const report = data.trpc.report.getUserReport.query(
		{ reportId: data.reportId },
		{
			select(data) {
				if (!data) {
					goto('/dashboard');
					throw Error('No such case exists');
				}
				return data;
			}
		}
	);
</script>

{#if $report.isSuccess}
	<Report
		authorName={$report.data.authorName}
		country={$report.data.country}
		createdAt={$report.data.createdAt}
		content={$report.data.content}
		chatLink="/case/{caseId}/report/{data.reportId}"
	/>
{/if}

<style lang="scss">
</style>
