import { index, int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { roleList } from '../../../options';

export function createUserIdColumn<T extends string>(name: T) {
	return text(name, { length: 15 });
}
export const User = sqliteTable(
	'user',
	{
		id: createUserIdColumn('id').notNull().primaryKey(),
		name: text('user_name', { length: 63 }).notNull(),
		role: text('role', { enum: roleList }).notNull().default('basic')
	},
	(table) => ({ roleIndex: index('user_role_index').on(table.role) })
);

export const UserKey = sqliteTable(
	'user_key',
	{
		id: text('id', { length: 255 }).notNull().primaryKey(),
		userId: createUserIdColumn('user_id')
			.notNull()
			.references(() => User.id),
		hashedPassword: text('hashed_password', { length: 255 })
	},
	(table) => ({ userIdIndex: index('user_key_user_id_index').on(table.userId) })
);

export const UserSession = sqliteTable(
	'user_session',
	{
		id: text('id', { length: 127 }).notNull().primaryKey(),
		userId: createUserIdColumn('user_id')
			.notNull()
			.references(() => User.id),
		activeExpires: int('active_expires').notNull(),
		idleExpires: int('idle_expires').notNull()
	},
	(table) => ({ userIdIndex: index('user_session_user_id_index').on(table.userId) })
);
