import { auth } from '$lib/server/auth';
import { error, json } from '@sveltejs/kit';

export async function POST({ locals }) {
	const session = await locals.auth.validate();
	if (!session) throw error(400, { message: "You're not authenticated" });

	await auth.invalidateSession(session.sessionId);
	locals.auth.setSession(null);

	return json(null);
}
