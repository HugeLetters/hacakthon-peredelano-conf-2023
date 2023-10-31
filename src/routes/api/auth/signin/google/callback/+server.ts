import { auth, googleAuth } from '$lib/server/auth';
import { OAuthRequestError } from '@lucia-auth/oauth';
import { OAUTH_STATE_COOKIE_KEY } from '../utils';

export const GET = async ({ url, cookies, locals }) => {
	const storedState = cookies.get(OAUTH_STATE_COOKIE_KEY);
	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');
	// validate state
	if (!storedState || !state || storedState !== state || !code) {
		return new Response(null, { status: 400 });
	}
	try {
		const { getExistingUser, googleUser, createUser } = await googleAuth.validateCallback(code);

		const getUser = async () => {
			const existingUser = await getExistingUser();
			if (existingUser) return existingUser;
			return createUser({ attributes: { user_name: googleUser.name } });
		};

		const user = await getUser();
		const session = await auth.createSession({ userId: user.userId, attributes: {} });
		locals.auth.setSession(session);
		return new Response(null, { status: 302, headers: { Location: '/' } });
	} catch (e) {
		console.error(e);
		if (e instanceof OAuthRequestError) {
			// invalid code
			return new Response(null, { status: 400 });
		}
		return new Response(null, { status: 500 });
	}
};
