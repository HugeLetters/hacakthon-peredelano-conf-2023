import { redirect } from '@sveltejs/kit';

export async function load({ parent }) {
	const { session } = await parent();

	if (session.user.role !== 'admin') throw redirect(302, '/');

	return { session };
}
