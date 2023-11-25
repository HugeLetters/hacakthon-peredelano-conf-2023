<script lang="ts">
	import TextInput from '$lib/components/textInput.svelte';

	export let data;

	let content: string = '';
	const reportMutation = data.trpc.report.create.mutation({});
</script>

<TextInput bind:text={content} placeholder="Введите содержание жалобы" />
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
