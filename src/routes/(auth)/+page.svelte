<script lang="ts">
	export let data;

	let content: string;
	const reportMutation = data.trpc.report.create.mutation({});
</script>

<input bind:value={content} />
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
