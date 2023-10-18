import { migrate } from 'drizzle-orm/libsql/migrator';
import { db } from '../../src/lib/database';

(async () => {
	await migrate(db, { migrationsFolder: './src/lib/database/migrations' });
})();
