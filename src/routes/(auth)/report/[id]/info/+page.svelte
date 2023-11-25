<script lang="ts">
	export let data;
	import Report from '$lib/pages/Report/index.svelte';
	import { page } from '$app/stores';

	const reportId = $page.params.id;
	const report = data.trpc.report.getUserReport.query({ reportId: reportId });
</script>

{#if $report.isSuccess}
	<Report
		authorName={$report.data?.authorName}
		category={$report.data?.category}
		country={$report.data?.country}
		createdAt={$report.data?.createdAt}
		content={$report.data?.content}
		chatLink={`/report/${reportId}`}
		organization={$report.data?.organization}
	/>
{/if}

<style lang="scss">
</style>
