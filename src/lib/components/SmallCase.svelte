<script lang="ts">
	import CategoryIcon from '$lib/components/CategoryIcon.svelte';
	import Initial from '$lib/components/Initial.svelte';

	export let id: string;
	export let name: string;
	export let report: {
		category: string;
		country: string;
		createdAt: number;
	} = { category: '', country: '', createdAt: 0 };
	export let assignedAdminName: string | null;
</script>

<a href="/case/{id}" class="case">
	<div class="caseInfo">
		<div class="caseName">{name}</div>
		<div class="caseProps">
			{#if report}
				{@const { category, country, createdAt } = report}
				{#if category}
					<div class="caseProp">
						<CategoryIcon {category} />
					</div>
				{/if}
				{#if country}
					<div class="caseProp">
						{country}
					</div>
				{/if}
				{#if createdAt}
					<div class="caseProp">
						{new Date(createdAt).toLocaleDateString('ru')}
					</div>
				{/if}
			{/if}
		</div>
	</div>
	{#if assignedAdminName}
		<div class="caseAssignee">
			<Initial name={assignedAdminName} />
		</div>
	{/if}
</a>

<style lang="scss">
	.case {
		display: flex;
		justify-content: space-between;
		gap: 10px;
		padding: 12px;
		border-radius: 16px;
		background: #f2f6ff;
	}

	.caseInfo {
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.caseName,
	.caseAssignee {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.caseProps {
		height: 1rem;
		display: flex;
		gap: 6px;
	}

	.caseProp {
		font-size: 12px;
		line-height: 18px;
		color: #8d8d8d;
	}

	.caseAssignee {
		width: 36px;
		height: 36px;
	}
</style>
