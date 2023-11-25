import { DB_TOKEN, DB_URL } from '$env/static/private';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

export const libsqlClient = createClient({ url: DB_URL, authToken: DB_TOKEN });
export const db = drizzle(libsqlClient);
