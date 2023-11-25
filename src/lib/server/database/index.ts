import { DB_TOKEN, DB_URL } from '$env/static/private';
import { createClient } from '@libsql/client';
import type { InferSelectModel } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/libsql';
import type { SQLiteColumn, SQLiteTable } from 'drizzle-orm/sqlite-core';

export const libsqlClient = createClient({ url: DB_URL, authToken: DB_TOKEN });
export const db = drizzle(libsqlClient);

export type InferSQLSelectModel<
	T extends SQLiteTable,
	S extends InferSelectModel<T> = InferSelectModel<T>
> = {
	[K in keyof T as T[K] extends SQLiteColumn ? T[K]['_']['name'] : never]: K extends keyof S
		? S[K]
		: never;
};
