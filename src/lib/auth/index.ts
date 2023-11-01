import { invalidate } from '$app/navigation';
import type { QueryClient } from '@tanstack/svelte-query';

export const GOOGLE_OAUTH_STATE_KEY = 'google_oauth_state';
export const CALLBACK_URL_KEY = 'auth_callback_url';

export function getSignInUrl(location: string) {
	return `/signin?${CALLBACK_URL_KEY}=${location}` as const;
}

export const SESSION_KEY = 'auth:session';
/**
 * This function doesn't rely on global query cache and may cause extra session fetches
 *
 * It's recommended to use `invalidateSessionQuery` instead
 */
export function invalidateSession() {
	return invalidate(SESSION_KEY);
}
export function invalidateSessionQuery(queryClient: QueryClient) {
	return queryClient.invalidateQueries({
		exact: true,
		queryKey: [SESSION_KEY]
	});
}
