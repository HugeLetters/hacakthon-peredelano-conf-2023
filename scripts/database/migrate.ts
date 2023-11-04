import { migrate } from 'drizzle-orm/libsql/migrator';
import { db } from '../../src/lib/server/database';

main();

async function main() {
	await migrate(db, { migrationsFolder: './src/lib/server/database/migrations' });
}
