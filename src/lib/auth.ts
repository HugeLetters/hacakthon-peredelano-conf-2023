import { invalidate } from '$app/navigation';
import { redirect, type RequestEvent } from '@sveltejs/kit';
import type { QueryClient } from '@tanstack/svelte-query';

export const GOOGLE_OAUTH_STATE_KEY = 'google_oauth_state';
export const CALLBACK_URL_KEY = 'auth_callback_url';
export const TRPC_UNAUTHENTICATED_ERROR_MESSAGE = 'UNAUTHENTICATED';

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

export function redirectOnUnauthenticatedError<R>(
	event: RequestEvent,
	prefetchCallback: () => Promise<R>
) {
	return prefetchCallback().catch((error) => {
		if (
			hasProperty(error, 'body') &&
			hasProperty(error.body, 'message') &&
			error.body.message === TRPC_UNAUTHENTICATED_ERROR_MESSAGE
		) {
			throw redirect(302, getSignInUrl(event.url.href));
		}

		throw error;
	});
}

function hasProperty<K extends PropertyKey>(
	value: unknown,
	property: K
): value is Record<K, unknown> {
	return !!value && typeof value === 'object' && property in value;
}
