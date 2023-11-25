import { User } from '$lib/server/database/schema/auth';
import { eq } from 'drizzle-orm';
import { db } from './client';
import { select } from '@inquirer/prompts';

main();

async function main() {
	const users = await db.select().from(User);

	const { id, role } = await select({
		choices: users.map(({ id, name, role }) => ({
			name: `${name} - ${role}`,
			value: { id, role }
		})),
		message: 'Select for which user to toggle the role'
	});

	const result = await db
		.update(User)
		.set({ role: role === 'admin' ? 'basic' : 'admin' })
		.where(eq(User.id, id))
		.returning();

	console.log('Roles were changed for these users to:');
	result.map((user) => console.log(user.name, user.role));
}

export {};
