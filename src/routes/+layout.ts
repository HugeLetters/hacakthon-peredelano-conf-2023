import { trpc } from '$lib/trpc';

export function load({ data }) {
	return { ...data, trpc };
}
