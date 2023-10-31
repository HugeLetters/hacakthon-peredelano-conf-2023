import { CALLBACK_URL_KEY } from '$lib/auth';
import { redirect } from '@sveltejs/kit';

export async function load({ locals, url }) {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, `/signin?${CALLBACK_URL_KEY}=${url.toString()}`);

	return { session };
}
