import { sql } from 'drizzle-orm';
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { z } from 'zod';
import { categoryList, countryCodeList, type Category, type CountryCode } from '../../../options';
import { User, createUserIdColumn } from './auth';
import { Case } from './case';
import { createUuidColumn, uuidPkColumn } from './utils';

export const Report = sqliteTable(
	'report',
	{
		id: uuidPkColumn,
		authorName: text('author_name', { length: 63 }).notNull(),
		content: text('content', { length: 65535 }).notNull(),
		category: text('category', { length: 31 }).$type<Category>().notNull(),
		country: text('country', { length: 2 }).$type<CountryCode>(),
		organization: text('organization', { length: 63 }),
		/** timestamp in ms */
		createdAt: integer('created_at')
			.notNull()
			.default(sql`current_timestamp`),
		creatorId: createUserIdColumn('creator_id')
			.references(() => User.id)
			.notNull(),
		caseId: createUuidColumn('case_id')
			.references(() => Case.id)
			.notNull(),
		isReadByAdmin: integer('is-read-by-admin', { mode: 'boolean' }),
		isReadByUser: integer('is-read-by-user', { mode: 'boolean' })
	},
	(table) => ({
		categoryIndex: index('report_category_index').on(table.category),
		countryIndex: index('report_country_index').on(table.country),
		organizationIndex: index('report_organization_index').on(table.organization),
		createdAtIndex: index('report_created_at_index').on(table.createdAt),
		creatorIdIndex: index('report_creator_id_index').on(table.creatorId),
		caseIdIndex: index('report_case_id_index').on(table.caseId)
	})
);

export const Message = sqliteTable(
	'message',
	{
		id: uuidPkColumn,
		content: text('content', { length: 65535 }).notNull(),
		/** timestamp in ms */
		createdAt: integer('created_at')
			.notNull()
			.default(sql`current_timestamp`),
		reportId: createUuidColumn('report_id')
			.references(() => Report.id)
			.notNull(),
		authorId: createUserIdColumn('author_id')
			.references(() => User.id)
			.notNull()
	},
	(table) => ({
		createdAtIndex: index('message_created_at_index').on(table.createdAt),
		reportIdIndex: index('message_report_id_index').on(table.reportId)
	})
);

export const categorySchema = z.enum(categoryList);
export const countrySchema = z.enum(countryCodeList);
