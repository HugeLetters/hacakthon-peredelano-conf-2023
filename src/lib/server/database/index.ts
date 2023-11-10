import { createClient } from '@libsql/client';
import type { InferSelectModel } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/libsql';
import { text, type SQLiteColumn, type SQLiteTable } from 'drizzle-orm/sqlite-core';

export const libsqlClient = createClient({ url: 'file:./database/db.sqlite' });
export const db = drizzle(libsqlClient);

export type InferSQLSelectModel<
	T extends SQLiteTable,
	S extends InferSelectModel<T> = InferSelectModel<T>
> = {
	[K in keyof T as T[K] extends SQLiteColumn ? T[K]['_']['name'] : never]: K extends keyof S
		? S[K]
		: never;
};

export function createUuidColumn<T extends string>(name: T) {
	return text(name, { length: 36 });
}
export const uuidPkColumn = createUuidColumn('id')
	.notNull()
	.primaryKey()
	.$defaultFn(() => crypto.randomUUID());
