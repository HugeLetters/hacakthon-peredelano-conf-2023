import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

const client = createClient({ url: 'file:./database/db.sqlite' });

export const db = drizzle(client);
