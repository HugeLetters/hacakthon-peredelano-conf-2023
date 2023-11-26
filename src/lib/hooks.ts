import type { FlyParams, TransitionConfig } from 'svelte/transition';

export const pageFly = (
	node: HTMLElement,
	params?: FlyParams & { x?: number; y?: number }
): TransitionConfig => {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		return { duration: 0, delay: 0 };
	}

	const { delay, duration = 200, easing, opacity = 0, x = 0, y = 0 } = params ?? {};

	const style = getComputedStyle(node);
	const target_opacity = +style.opacity;
	const transform = style.transform === 'none' ? '' : style.transform;
	const od = target_opacity * (1 - opacity);
	return {
		delay,
		duration,
		easing,
		css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - od * u}; position: absolute; width: 100%;`
	};
};
