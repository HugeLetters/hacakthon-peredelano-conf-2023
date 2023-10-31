import { CALLBACK_URL_KEY, GOOGLE_OAUTH_STATE_KEY } from '$lib/auth';
import { auth, googleAuth } from '$lib/server/auth';
import { OAuthRequestError } from '@lucia-auth/oauth';

export const GET = async ({ url, cookies, locals }) => {
	const storedState = cookies.get(GOOGLE_OAUTH_STATE_KEY);
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

		auth.deleteDeadUserSessions(user.userId).catch(console.error);

		const location = cookies.get(CALLBACK_URL_KEY);
		cookies.delete(CALLBACK_URL_KEY, { path: '/' });
		return new Response(null, { status: 302, headers: { Location: location ?? '/' } });
	} catch (e) {
		console.error(e);
		if (e instanceof OAuthRequestError) {
			// invalid code
			return new Response(null, { status: 400 });
		}
		return new Response(null, { status: 500 });
	}
};
