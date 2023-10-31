import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import type { SQLiteColumn, SQLiteTable } from 'drizzle-orm/sqlite-core';

export const libsqlClient = createClient({ url: 'file:./database/db.sqlite' });
export const db = drizzle(libsqlClient);

export type InferSQLSelectModel<T extends SQLiteTable> = {
	[K in keyof T as T[K] extends SQLiteColumn ? T[K]['_']['name'] : never]: T[K] extends SQLiteColumn
		? T[K]['_']['data'] | (T[K]['_']['notNull'] extends true ? never : null)
		: never;
};
