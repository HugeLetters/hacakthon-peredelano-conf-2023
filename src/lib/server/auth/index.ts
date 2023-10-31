import { dev } from '$app/environment';
import { libsql } from '@lucia-auth/adapter-sqlite';
import { getTableConfig } from 'drizzle-orm/sqlite-core';
import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { libsqlClient } from '../database';
import { user, userKey, userSession } from '../database/schema/auth';
import { google } from '@lucia-auth/oauth/providers';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';

export const auth = lucia({
	adapter: libsql(libsqlClient, {
		user: getTableConfig(user).name,
		key: getTableConfig(userKey).name,
		session: getTableConfig(userSession).name
	}),
	middleware: sveltekit(),
	env: dev ? 'DEV' : 'PROD',
	getUserAttributes(databaseUser) {
		return { name: databaseUser['user_name'] };
	}
});

export const googleAuth = google(auth, {
	clientId: GOOGLE_CLIENT_ID,
	clientSecret: GOOGLE_CLIENT_SECRET,
	// todo - host should by set by env
	redirectUri: 'http://localhost:5173/api/auth/signin/google/callback'
});

export type Auth = typeof auth;
