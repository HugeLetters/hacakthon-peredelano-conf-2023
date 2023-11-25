<script lang="ts">
	export let value: string;
	export let className: string;
	export let placeholder: string;
</script>

<input class={className} type="text" {placeholder} {value} />
