<script lang="ts">
	import CategoryIcon from '$lib/components/CategoryIcon.svelte';
	import SpeechBubble from '$lib/icons/SpeechBubble.svelte';

	export let data;

	const reportListQuery = data.trpc.report.getUserReportList.query();
	const dateFormatter = new Intl.DateTimeFormat('ru', {
		day: '2-digit',
		month: '2-digit',
		year: '2-digit'
	});
</script>

{#if $reportListQuery.isSuccess}
	<div class="reports">
		{#each $reportListQuery.data as report}
			<div class="report">
				<a
					href="/report/{report.id}/info"
					aria-label="Посмотреть информацию по жалбе"
					class="reportLeft"
				>
					<span class="content">{report.content}</span>
					<div class="info">
						<div class="category">
							<CategoryIcon category={report.category} />
						</div>
						{#if report.country}
							<div>{report.country}</div>
						{/if}
						<div>{dateFormatter.format(new Date(report.createdAt))}</div>
					</div>
				</a>
				<a href="/report/{report.id}" class="chatLink" aria-label="Открыть чат по жалобе">
					<SpeechBubble width="100%" height="100%" />
					{#if data.session.user.role === 'admin' ? report.isReadByAdmin : report.isReadByUser}
						<div class="unread" />
					{/if}
				</a>
			</div>
		{:else}
			<div class="noReports">
				<div>Открытых жалоб нет</div>
				<a href="/">Вернуться на домашнюю страницу</a>
			</div>
		{/each}
	</div>
{/if}

<style lang="scss">
	.reports {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		height: 100%;
		align-items: center;
		padding: 0.5rem;
	}
	.report {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: $lightgray;
		padding: 12px 12px;
		border-radius: 16px;
		width: 100%;
	}
	.reportLeft {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	.content {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.info {
		display: flex;
		gap: 0.25rem;
		align-items: center;
		font-size: small;
		color: $bluegray;
		.category {
			height: 2rem;
		}
	}
	.chatLink {
		position: relative;
		flex-shrink: 0;
		color: $violet;
		font-size: 0.75rem;
		height: 2rem;
		.unread {
			position: absolute;
			top: 2px;
			right: 2px;
			border-radius: 999999px;
			background-color: $green;
			height: 0.75rem;
			width: 0.75rem;
			box-shadow: 0 0 1px black;
		}
	}
	.noReports {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		> div {
			font-weight: 800;
			font-size: large;
			text-align: center;
		}
		> a {
			padding: 1rem;
			border-radius: 1rem;
			background-color: $lightgray;
			display: flex;
			align-items: center;
			gap: 0.5rem;
		}
	}
</style>
