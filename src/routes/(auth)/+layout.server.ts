import { SESSION_KEY, getSignInUrl } from '$lib/auth';
import { redirect } from '@sveltejs/kit';

export async function load({ locals, url, depends }) {
	const session = await locals.auth.validate();
	depends(SESSION_KEY);

	// this loader function should trigger on each URL change
	// but because URL is referenced in the condition only, its doesnt trigger
	// which actually is kinda what we need anyways :)
	if (!session) throw redirect(302, getSignInUrl(url.href));

	return { session };
}
