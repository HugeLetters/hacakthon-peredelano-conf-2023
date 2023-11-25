<script lang="ts">
	export let text: string;
	export let placeholder: string;
</script>

<input type="text" {placeholder} value={text} />
