<script>
	import { createSelect, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';

	//todo: куда вынести опции как enum?
	export let data = {
		selectLabel: 'Категория обращения',
		selectMessage: 'Выбери категорию',
		options: [
			{
				id: 1,
				name: 'ВНЖ',
				icon: ''
			},
			{
				id: 2,
				name: 'Банкинг',
				icon: ''
			},
			{
				id: 3,
				name: 'Авиабилеты',
				icon: ''
			}
		]
	};

	const options = {
		items: data.options
	};

	const {
		elements: { trigger, menu, option, group, label },
		states: { selectedLabel, open },
		helpers: { isSelected }
	} = createSelect({
		forceVisible: true,
		positioning: {
			placement: 'bottom',
			fitViewport: true,
			sameWidth: true
		}
	});
</script>

<div class="select">
	<!-- svelte-ignore a11y-label-has-associated-control - $label contains the 'for' attribute -->
	<label class="label" use:melt={$label}>{data.selectLabel}</label>
	<button class="btnChoose" use:melt={$trigger} aria-label="Food">
		{$selectedLabel || data.selectMessage}
		<div class="chevron" />
	</button>
	{#if $open}
		<div class="" use:melt={$menu} transition:fade={{ duration: 150 }}>
			{#each Object.entries(options) as [key, arr]}
				<div use:melt={$group(key)}>
					{#each arr as item}
						<div class="" use:melt={$option({ value: item.id, label: item.name })}>
							<div class="check {$isSelected(item) ? 'block' : 'hidden'}">
								<!-- <Check class="square-4" /> -->
							</div>
							{item.name}
						</div>
					{/each}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.select {
		display: flex;
		flex-direction: column;
	}
	.label {
	}
	.btnChoose {
	}
	.check {
		position: absolute;
		left: 2px;
		top: 50%;
		z-index: 20;
		translate: 0 calc(-50% + 1px);
		color: $custom-red;
	}
	.chevron {
	}
</style>
