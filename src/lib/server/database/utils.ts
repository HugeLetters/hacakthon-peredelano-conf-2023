import { sql, type InferSelectModel } from 'drizzle-orm';
import type { SQLiteColumn, SQLiteTable } from 'drizzle-orm/sqlite-core';

type SQLiteRecord = Record<string, SQLiteColumn>;
type inferSQLiteRecordType<R extends SQLiteRecord> = { [K in keyof R]: R[K]['_']['data'] };
export function aggregateArrayColumns<R extends SQLiteRecord>(columns: R) {
	return sql`JSON_GROUP_ARRAY(JSON_OBJECT${Object.entries(columns).map(
		([key, column]) => sql`${key}, ${column}`
	)})`.mapWith((raw: string) => {
		const array = JSON.parse(raw) as Array<inferSQLiteRecordType<R>> | [null];

		if (array.length !== 1) return array as Array<inferSQLiteRecordType<R>>;

		if (array[0] === null || Object.values(array[0]).every((x) => x === null)) {
			return [];
		}

		return array as Array<inferSQLiteRecordType<R>>;
	});
}
export type InferSQLSelectModel<
	T extends SQLiteTable,
	S extends InferSelectModel<T> = InferSelectModel<T>
> = {
	[K in keyof T as T[K] extends SQLiteColumn ? T[K]['_']['name'] : never]: K extends keyof S
		? S[K]
		: never;
};
