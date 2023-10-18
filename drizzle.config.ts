import { type Config } from 'drizzle-kit';

export default {
	out: './src/lib/database/migrations',
	schema: './src/lib/database/schema',
	driver: 'turso',
	breakpoints: true,
	dbCredentials: {
		url: 'file:./database/db.sqlite'
	}
} satisfies Config;
