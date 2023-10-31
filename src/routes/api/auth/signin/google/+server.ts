import { dev } from '$app/environment';
import { googleAuth } from '$lib/server/auth';
import { OAUTH_STATE_COOKIE_KEY } from './utils';

export const GET = async ({ cookies }) => {
	const [url, state] = await googleAuth.getAuthorizationUrl();
	// store state
	cookies.set(OAUTH_STATE_COOKIE_KEY, state, {
		httpOnly: true,
		secure: !dev,
		path: '/',
		maxAge: 60 * 60
	});
	return new Response(null, {
		status: 302,
		headers: { Location: url.toString() }
	});
};
