import { sql } from 'drizzle-orm';
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import type { Alpha2Code as CountryCode } from 'i18n-iso-countries';
import { createUuidColumn, uuidPkColumn } from '..';
import { User, createUserIdColumn } from './auth';
import { Case } from './case';

export const Report = sqliteTable(
	'report',
	{
		id: uuidPkColumn,
		authorName: text('author_name', { length: 63 }).notNull(),
		content: text('content', { length: 65535 }).notNull(),
		category: text('category', { length: 31 }).$type<Category>().notNull(),
		country: text('country', { length: 2 }).$type<CountryCode>(),
		organization: text('organization', { length: 63 }),
		creatorId: createUserIdColumn('creator_id')
			.references(() => User.id)
			.notNull(),
		caseId: createUuidColumn('case_id')
			.references(() => Case.id)
			.notNull()
	},
	(table) => ({
		categoryIndex: index('category_index').on(table.category),
		countryIndex: index('country_index').on(table.country),
		organizationIndex: index('organization_index').on(table.organization),
		creatorIdIndex: index('creator_id_index').on(table.creatorId),
		caseIdIndex: index('case_id_index').on(table.caseId)
	})
);

export const Message = sqliteTable(
	'message',
	{
		id: uuidPkColumn,
		content: text('content', { length: 65535 }).notNull(),
		/** timestamp in ms */
		createdAt: integer('integer')
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
		createdAtIndex: index('created_at_index').on(table.createdAt),
		reportIdIndex: index('report_id_index').on(table.reportId)
	})
);

type Category = 'Банк' | 'ВНЖ' | 'Авиалиния';
