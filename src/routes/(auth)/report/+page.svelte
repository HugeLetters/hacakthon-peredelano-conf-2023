<script lang="ts">
	export let data;

	const reportListQuery = data.trpc.report.getUserReportList.query();

	function getInitials(name: string) {
		const [first, second] = name.split(/[\s_+.-]/);
		return (first && second ? `${first.at(0)}${second.at(0)}` : name.slice(0, 2)).toUpperCase();
	}
</script>

{#if $reportListQuery.isSuccess}
	<div class="reports">
		{#each $reportListQuery.data as report}
			<div class="report">
				<div>
					<div class="user">
						<div class="image">
							{getInitials(report.authorName)}
						</div>

						<div class="nameAndDate">
							<span class="authorName">{report.authorName}</span>
							<span>
								{new Date(report.createdAt).toLocaleDateString()}
							</span>
						</div>
					</div>
					<a class="caseLink link" href="/report/{report.id}/info">Посмотреть жалобу</a>
				</div>
				<a href="/report/{report.id}" class="chatLink link">
					<svg
						width="36"
						height="36"
						viewBox="0 0 36 36"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M11.7712 27.7371L11.7856 28.0943L12.1162 27.9582C12.4253 27.8309 12.703 27.6508 12.9598 27.4659C13.0737 27.384 13.1784 27.3051 13.2803 27.2283C13.4201 27.1231 13.5547 27.0217 13.7008 26.9214C14.1823 26.5912 14.6442 26.3817 15.2322 26.4936L15.2326 26.4937C16.121 26.6616 17.047 26.75 18 26.75C24.9908 26.75 30.25 22.0678 30.25 16.75C30.25 11.4322 24.9908 6.75 18 6.75C11.0092 6.75 5.75 11.4322 5.75 16.75C5.75 19.8714 7.51867 22.7312 10.4277 24.6042C11.4231 25.2464 11.7222 26.5197 11.7712 27.7371ZM15.1741 29.0208L15.0656 29.0029L14.9791 29.0708C14.9497 29.094 14.9166 29.1203 14.8802 29.1493C14.7378 29.2628 14.5442 29.417 14.3144 29.5792C13.4933 30.1578 12.3111 30.75 10.5 30.75C10.1685 30.75 9.85054 30.6183 9.61612 30.3839C9.3817 30.1495 9.25 29.8315 9.25 29.5C9.25 29.303 9.26283 29.092 9.27744 28.8667L9.28041 28.8209C9.29403 28.6118 9.30836 28.3917 9.31276 28.1723C9.32217 27.7039 9.28794 27.206 9.08664 26.7626L9.05658 26.6964L8.9957 26.6567C5.55877 24.4121 3.25 20.847 3.25 16.75C3.25 9.64452 10.076 4.25 18 4.25C25.924 4.25 32.75 9.64452 32.75 16.75C32.75 23.8555 25.924 29.25 18 29.25C17.034 29.25 16.0891 29.1716 15.1741 29.0208Z"
							fill="#8D8D8D"
							stroke="#FAFAFA"
							stroke-width="0.5"
						/>
					</svg>
				</a>
			</div>
		{/each}
	</div>
{/if}
<a class="createReportButton" href="/report/new">Добавить новую жалобу</a>

<style lang="scss">
	.reports {
		display: grid;
		gap: 10px;
	}
	.report {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #fafafa;
		padding: 12px 12px;
		border-radius: 16px;
	}
	.user {
		display: flex;
		align-items: center;
	}
	.image {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 2.5rem;
		height: 2.5rem;
		margin-right: 10px;
		border-radius: 99999px;
		background-color: gray;
		color: white;
	}
	.nameAndDate {
		display: flex;
		flex-direction: column;
	}
	.authorName {
		font-size: 17px;
		color: #000000;
	}
	.link {
		margin-top: 8px;
		cursor: pointer;
		&:hover {
			opacity: 0.3;
		}
	}
	.chatLink {
		margin-top: 0;
		color: #8d8d8d;
		font-size: 12px;
	}
	.caseLink {
		margin-top: 8px;
	}

	.createReportButton {
		display: block;
		margin-top: 16px;
		padding: 1rem;
		border-radius: 1rem;
		background: gray;
		color: white;
		border: none;
		text-align: center;
	}
</style>
