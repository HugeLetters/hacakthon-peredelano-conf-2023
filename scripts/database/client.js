import { createClient } from '@libsql/client';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';

const libsqlClient = createClient({
	url: process.env.DB_URL ?? raise('Database url is not set in your environment variables'),
	authToken: process.env.DB_TOKEN
});
export const db = drizzle(libsqlClient);

/**
 *
 * @param {string} message
 * @returns {never}
 */
function raise(message) {
	throw Error(message);
}
