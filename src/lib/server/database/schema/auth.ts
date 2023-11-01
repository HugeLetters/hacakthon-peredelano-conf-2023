import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: text('id', { length: 15 }).notNull().primaryKey(),
	name: text('user_name', { length: 63 }).notNull()
});

export const userKey = sqliteTable('user_key', {
	id: text('id', { length: 255 }).notNull().primaryKey(),
	userId: text('user_id', { length: 15 })
		.notNull()
		.references(() => user.id),
	hashedPassword: text('hashed_password', { length: 255 })
});

export const userSession = sqliteTable('user_session', {
	id: text('id', { length: 127 }).notNull().primaryKey(),
	userId: text('user_id', { length: 15 })
		.notNull()
		.references(() => user.id),
	activeExpires: int('active_expires').notNull(),
	idleExpires: int('idle_expires').notNull()
});
