import { text } from 'drizzle-orm/sqlite-core';

export function createUuidColumn<T extends string>(name: T) {
	return text(name, { length: 36 });
}
export const uuidPkColumn = createUuidColumn('id')
	.notNull()
	.primaryKey()
	.$defaultFn(() => crypto.randomUUID());
