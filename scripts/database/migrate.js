import 'dotenv/config';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { db } from './client.js';

main();

async function main() {
	await migrate(db, { migrationsFolder: './src/lib/server/database/migrations' });
}
