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
	{#if $caseQuery.isSuccess}
		{#each $caseQuery.data as { id, name, assignedAdmindId } (id)}
			<div class="case">
				<div class="caseInfo">
					<div class="caseName">{name}</div>
					<div class="caseProps">
						<div class="caseCategory">
							<!-- category icon calculated from reports -->
							bank
						</div>
						<div class="caseCountry">
							<!-- countryCode calculated from reports-->
							GE
						</div>
						<div class="caseDate">
							<!-- caseDate from ??? -->
							17.11.23
						</div>
					</div>
				</div>
				<div class="caseAssignee">
					<!-- assignee avatar -->
					{assignedAdmindId}
				</div>
			</div>
		{/each}
	{/if}
</div>

<style lang="scss">
	.cases {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.case {
		display: flex;
		justify-content: space-between;
		gap: 10px;
		padding: 12px;
		border-radius: 16px;
		background: #fafafa;
	}

	.caseInfo {
		display: flex;
		flex-direction: column;
	}

	.caseName {
		font-size: 17px;
		line-height: 25.5px;
	}

	.caseProps {
		display: flex;
		gap: 6px;
	}

	.caseCategory,
	.caseCountry,
	.caseDate {
		font-size: 12px;
		line-height: 18px;
		color: #8d8d8d;
	}
</style>
