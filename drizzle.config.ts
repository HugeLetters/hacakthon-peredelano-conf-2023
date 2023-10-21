import { type Config } from 'drizzle-kit';

export default {
	out: './src/lib/server/database/migrations',
	schema: './src/lib/server/database/schema',
	driver: 'turso',
	breakpoints: true,
	dbCredentials: {
		url: 'file:./database/db.sqlite'
	}
} satisfies Config;
