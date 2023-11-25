import { dev } from '$app/environment';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { PUBLIC_HOST_URL } from '$env/static/public';
import { TRPC_UNAUTHENTICATED_ERROR_MESSAGE, getSignInUrl } from '$lib/auth';
import { libsql } from '@lucia-auth/adapter-sqlite';
import { google } from '@lucia-auth/oauth/providers';
import { redirect, type RequestEvent } from '@sveltejs/kit';
import { getTableConfig } from 'drizzle-orm/sqlite-core';
import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { libsqlClient } from './database';
import { User, UserKey, UserSession } from './database/schema/auth';
import { hasProperty } from '$lib/utils';

export const auth = lucia({
	adapter: libsql(libsqlClient, {
		user: getTableConfig(User).name,
		key: getTableConfig(UserKey).name,
		session: getTableConfig(UserSession).name
	}),
	middleware: sveltekit(),
	env: dev ? 'DEV' : 'PROD',
	getUserAttributes(databaseUser) {
		return { name: databaseUser.user_name, role: databaseUser.role };
	}
});

export const googleAuth = google(auth, {
	clientId: GOOGLE_CLIENT_ID,
	clientSecret: GOOGLE_CLIENT_SECRET,
	redirectUri: `${PUBLIC_HOST_URL}/api/auth/signin/google/callback`
});

export type Auth = typeof auth;

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
