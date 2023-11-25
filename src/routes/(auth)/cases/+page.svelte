<script lang="ts">
	export let data;

	const caseQuery = data.trpc.case.findMany.query();

	let cases = [
		{
			content: '',
			category: 'Авиалиния',
			name: 'Reported',
			country: 'FI',
			organization: 'org'
		}
	];
</script>

<div class="cases">
	<div class="case"></div>

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
</div>

<style lang="scss">
</style>
