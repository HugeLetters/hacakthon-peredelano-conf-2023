<script lang="ts">
	import TextInput from '$lib/components/textInput.svelte';

	export let data;

	let content: string = '';
	const reportMutation = data.trpc.report.create.mutation();
	const caseQuery = data.trpc.case.findMany.query();
</script>

<TextInput className="formElementInput" value={content} placeholder="Введите содержание жалобы" />
<button
	on:click={() => {
		$reportMutation.mutate({
			content,
			category: 'Авиалиния',
			name: 'Reported',
			country: 'FI',
			organization: 'org'
		});
	}}
>
	create report
</button>

{#if $caseQuery.isSuccess}
	{#each $caseQuery.data as caseData (caseData.id)}
		<div>
			<div>{caseData.name}</div>
			{#each caseData.reports as report (report)}
				<div>{report.content}</div>
				<div>{report.country}</div>
			{/each}
		</div>
	{/each}
{/if}
