import { CALLBACK_URL_KEY } from '$lib/auth';
import { redirect } from '@sveltejs/kit';

export async function load({ parent, url }) {
	const { session } = await parent();
	if (!session) throw redirect(302, `/signin?${CALLBACK_URL_KEY}=${url.toString()}`);

	return { session };
}
