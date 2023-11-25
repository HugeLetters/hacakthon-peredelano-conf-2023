import { faker } from '@faker-js/faker';
import { eq } from 'drizzle-orm';
import { categoryList, countryList } from '../../src/lib/options';
import { User } from '../../src/lib/server/database/schema/auth';
import { Case } from '../../src/lib/server/database/schema/case';
import { Message, Report } from '../../src/lib/server/database/schema/report';
import { db } from './client';

main();

async function main() {
	await db.delete(Message).all();
	await db.delete(Report).all();
	await db.delete(Case).all();

	const admins = await db.select().from(User).where(eq(User.role, 'admin')).all();
	const users = await db.select().from(User).where(eq(User.role, 'basic')).all();
	const allusers = await db.select().from(User).all();

	const cases = await db
		.insert(Case)
		.values(
			faker.helpers.multiple(
				() => ({
					name: faker.company.name(),
					assignedAdmindId: faker.helpers.maybe(() =>
						faker.helpers.arrayElement(admins.map((x) => x.id))
					),
					status: faker.helpers.arrayElement(['active', 'closed'] as const),
					summary: faker.helpers.maybe(() => faker.lorem.paragraphs(10))
				}),
				{ count: 200 }
			)
		)
		.returning()
		.all();

	const reports = await db
		.insert(Report)
		.values(
			faker.helpers.multiple(
				() => ({
					authorName: faker.person.fullName(),
					caseId: faker.helpers.arrayElement(cases.map((x) => x.id)),
					category: faker.helpers.arrayElement(categoryList),
					content: faker.lorem.paragraphs(5),
					creatorId: faker.helpers.arrayElement(users.map((x) => x.id)),
					country: faker.helpers.maybe(() => faker.helpers.arrayElement(countryList)),
					organization: faker.helpers.maybe(faker.company.name)
				}),
				{ count: 2000 }
			)
		)
		.returning()
		.all();

	await db.insert(Message).values(
		faker.helpers.multiple(
			() => ({
				authorId: faker.helpers.arrayElement(allusers.map((x) => x.id)),
				content: faker.lorem.sentences(3),
				reportId: faker.helpers.arrayElement(reports.map((x) => x.id))
			}),
			{ count: 5000 }
		)
	);
}

export {};
