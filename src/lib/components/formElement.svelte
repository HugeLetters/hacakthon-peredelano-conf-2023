<script lang="ts">
	export let component: ConstructorOfATypedSvelteComponent;
	export let label: string;
	export let value: string;
</script>

<div class="formElement">
	<p class="formElementLabel">{label}</p>
	<!-- Для корректной работы компонент должен отдавать переменную value и задавать класс из пропса className - примеры в компонентах текстового поля -->
	<svelte:component this={component} className="formElementInput" {value} {...$$restProps} />
</div>

<style lang="scss">
	.formElement {
		margin-bottom: 16px;
		padding: 26px 12px;
		border-radius: 16px;
		background: #f6f6f6;
	}

	.formElementLabel {
		margin-bottom: 16px;
		font-size: 20px;
		line-height: 30px;
	}

	:global(.formElementInput) {
		width: 100%;
		padding: 12px;
		border: 1px solid #8d8d8d;
		border-radius: 16px;
		outline: none;
		font-size: 17px;
		line-height: 25.5px;

		&::placeholder {
			color: #8d8d8d;
		}
	}
</style>
