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
	const reassignMutation = data.trpc.report.reassignToCase.mutation();
</script>

{#if $report.isSuccess}
	<Report
		isAdmin={data.session.user.role === 'admin'}
		reassingReport={(newCaseId) => {
			$reassignMutation.mutate({ caseId: newCaseId, reportId: data.reportId });
		}}
		authorName={$report.data?.authorName}
		category={$report.data?.category}
		country={$report.data?.country}
		createdAt={$report.data?.createdAt}
		content={$report.data?.content}
		chatLink={`/case/{caseId}/report/{reportId}`}
		organization={$report.data?.organization}
	/>
{/if}

<style lang="scss">
</style>
