<script lang="ts">
	import Textarea from '$lib/components/textarea.svelte';

	export let data;

	let content: string;
	const reportMutation = data.trpc.report.create.mutation({});
	let text: string;
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

<Textarea bind:text />

{text}
