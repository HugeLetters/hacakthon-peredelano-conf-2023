<script lang="ts">
	import Bank from '$lib/icons/bank.svelte';

	export let data;

	const cases = data.trpc.case.findMany.query({ statusFilter: 'active' });
</script>

<div class="cases">
	{#if $cases.isSuccess}
		{#each $cases.data as { id, name, status, assignedAdmindId } (id)}
			<a href="/case/{id}" class="case">
				<div class="caseInfo">
					<div class="caseName">{name}</div>
					{status}
					<div class="caseProps">
						<div class="caseCategory">
							<!-- category icon calculated from reports -->
							<Bank />
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
				{#if assignedAdmindId}
					<div class="caseAssignee">
						<!-- assignee avatar -->
						{assignedAdmindId}
					</div>
				{/if}
			</a>
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
