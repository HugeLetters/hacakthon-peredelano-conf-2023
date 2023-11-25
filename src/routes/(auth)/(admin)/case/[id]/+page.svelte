<script lang="ts">
	export let data;

	const caseInfo = data.trpc.case.caseInfo.query({ caseId: data.caseId });
</script>

<div>
	case {data.caseId}

	<div>{$caseInfo.data?.summary}</div>
</div>
