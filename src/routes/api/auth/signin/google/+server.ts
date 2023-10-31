import { dev } from '$app/environment';
import { CALLBACK_URL_KEY, GOOGLE_OAUTH_STATE_KEY } from '$lib/auth';
import { googleAuth } from '$lib/server/auth';

export const GET = async ({ cookies, url: requestedUrl }) => {
	const [url, state] = await googleAuth.getAuthorizationUrl();

	const callbackUrl = requestedUrl.searchParams.get(CALLBACK_URL_KEY);
	if (callbackUrl) {
		cookies.set(CALLBACK_URL_KEY, callbackUrl, {
			maxAge: 60 * 60,
			path: '/'
		});
	}

	// store state
	cookies.set(GOOGLE_OAUTH_STATE_KEY, state, {
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
