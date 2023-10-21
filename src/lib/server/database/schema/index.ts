import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
export const post = sqliteTable('post', {
	id: text('id').primaryKey(),
	title: text('title', { length: 25 }).notNull(),
	content: text('content'),
	createdAt: integer('created-at')
		.notNull()
		.default(sql`current_timestamp`)
});

export const comment = sqliteTable('comment', {
	id: text('id').primaryKey(),
	content: text('content').notNull(),
	createdAt: integer('created-at')
		.notNull()
		.default(sql`current_timestamp`),
	postId: text('post-id')
		.notNull()
		.references(() => post.id)
});
