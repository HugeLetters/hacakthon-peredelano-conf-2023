import { CALLBACK_URL_KEY } from '$lib/auth';
import { redirect } from '@sveltejs/kit';

export async function load({ locals, url }) {
	const session = await locals.auth.validate();

	// this loader function should trigger on each URL change but because URL is referenced in the condition only its not
	// which actually kinda what we need anyways :)
	if (!session) throw redirect(302, `/signin?${CALLBACK_URL_KEY}=${url.toString()}`);

	return { session };
}
