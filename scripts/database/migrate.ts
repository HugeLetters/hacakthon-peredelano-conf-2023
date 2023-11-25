import { createClient } from '@libsql/client';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';

main();

async function main() {
	const libsqlClient = createClient({
		url: process.env.DB_URL ?? raise('Database url is not set in your environment variables'),
		authToken: process.env.DB_TOKEN
	});
	const db = drizzle(libsqlClient);

	await migrate(db, { migrationsFolder: './src/lib/server/database/migrations' });
}

function raise(message: string): never {
	throw Error(message);
}
