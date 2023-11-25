<script lang="ts">
	import Textarea from '$lib/components/textarea.svelte';
	let reportText: string;
</script>

<div class="complaintForm">
	<Textarea bind:text={reportText} />
</div>
