import { type Config } from 'drizzle-kit';
import 'dotenv/config';

export default {
	out: './src/lib/server/database/migrations',
	schema: './src/lib/server/database/schema',
	driver: 'turso',
	breakpoints: true,
	dbCredentials: {
		url: process.env.DB_URL ?? raise('Database url is not set in your environment variables'),
		authToken: process.env.DB_TOKEN
	}
} satisfies Config;

function raise(message: string): never {
	throw Error(message);
}
