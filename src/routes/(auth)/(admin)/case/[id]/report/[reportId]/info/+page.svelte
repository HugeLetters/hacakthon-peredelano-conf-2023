<script lang="ts">
	import { goto } from '$app/navigation';
	import Report from '$lib/pages/Report/index.svelte';

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
	let filter: string;
	const reassignMutation = data.trpc.report.reassignToCase.mutation();
	$: casesFiltered = data.trpc.case.findManyByName.query({ filter });
</script>

{#if $report.isSuccess && $casesFiltered.isSuccess}
	<Report
		bind:filter
		casesFiltered={$casesFiltered.data}
		isAdmin={data.session.user.role === 'admin'}
		reassignReport={(newCaseId) => {
			$reassignMutation.mutate({ caseId: newCaseId, reportId: data.reportId });
			data.trpc.case.utils.invalidate();
		}}
		authorName={$report.data?.authorName}
		category={$report.data?.category}
		country={$report.data?.country}
		createdAt={$report.data?.createdAt}
		content={$report.data?.content}
		chatLink={`/case/${data.caseId}/report/${data.reportId}`}
		organization={$report.data?.organization}
	/>
{/if}

<style lang="scss">
</style>
