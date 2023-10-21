import { db } from '../../src/lib/server/database';
import { post, comment } from '../../src/lib/server/database/schema';
import { faker } from '@faker-js/faker';

async function main() {
	await db.delete(comment).all();
	await db.delete(post).all();

	const posts = await db
		.insert(post)
		.values(
			Array.from({ length: 100 }, () => ({
				id: crypto.randomUUID(),
				title: faker.lorem.words({ min: 1, max: 10 }),
				content: faker.lorem.paragraphs({ min: 1, max: 5 })
			}))
		)
		.returning()
		.all();

	db.insert(comment)
		.values(
			Array.from({ length: 500 }, () => ({
				id: crypto.randomUUID(),
				postId: faker.helpers.arrayElement(posts).id,
				content: faker.lorem.paragraphs({ min: 1, max: 3 })
			}))
		)
		.all();
}
main();
