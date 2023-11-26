<script lang="ts">
	import Report from '$lib/pages/Report/index.svelte';
	import { goto } from '$app/navigation';

	export let data;

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
	<div class="reportWrapper">
		<Report
			isAdmin={data.session.user.role === 'admin'}
			authorName={$report.data?.authorName}
			category={$report.data?.category}
			country={$report.data?.country}
			createdAt={$report.data?.createdAt}
			content={$report.data?.content}
			chatLink={`/report/${data.reportId}`}
			organization={$report.data?.organization}
		/>
	</div>
{/if}

<style lang="scss">
	.reportWrapper {
		padding: 16px 16px;
	}
</style>
