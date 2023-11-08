import { goto, invalidate } from '$app/navigation';
import type { QueryClient } from '@tanstack/svelte-query';

export const GOOGLE_OAUTH_STATE_KEY = 'google_oauth_state';
export const CALLBACK_URL_KEY = 'auth_callback_url';
export const TRPC_UNAUTHENTICATED_ERROR_MESSAGE = 'UNAUTHENTICATED';

export function getSignInUrl(location?: string) {
	if (!location) return '/signin';

	return `/signin?${CALLBACK_URL_KEY}=${location}` as const;
}

type SignOutOptions = { queryClient?: QueryClient; callbackUrl?: string };
export function signOut(options?: SignOutOptions) {
	return fetch('/api/auth/signout', { method: 'POST' }).then((res) => {
		if (res.ok) {
			if (options?.queryClient) {
				invalidateSession(options.queryClient);
			}

			goto(getSignInUrl(options?.callbackUrl));
		}

		return res;
	});
}

export const SESSION_KEY = 'auth:session';
/**
 * `!WARNING!`
 *
 * Try to provide queryClient whenever possible so that session invalidation may be properly cached
 */
export function invalidateSession(queryClient?: QueryClient) {
	if (!queryClient) return invalidate(SESSION_KEY);

	return queryClient.invalidateQueries({
		exact: true,
		queryKey: [SESSION_KEY]
	});
}
