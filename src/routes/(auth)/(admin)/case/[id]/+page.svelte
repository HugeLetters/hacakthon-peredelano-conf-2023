<script lang="ts">
	export let data;

	const caseInfo = data.trpc.case.caseInfo.query({ caseId: data.caseId });

	const caseInfoMutation = data.trpc.case.updateCaseData.mutation();
</script>

<div>
	case {data.caseId}

	<div>{$caseInfo.data?.summary}</div>
	<button
		on:click={() => {
			$caseInfoMutation.mutate({
				caseId: data.caseId,
				newSummary: 'new summary',
				newStatus: 'closed'
			});

			data.trpc.case.caseInfo.utils.invalidate({ caseId: data.caseId });
		}}
	>
		change summary
	</button>
</div>
