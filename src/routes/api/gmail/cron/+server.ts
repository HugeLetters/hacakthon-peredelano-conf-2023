import { GOOGLE_PUB_SUB_TOPIC } from '$env/static/private';
import { gmail } from '$lib/server/gmail';
import { error } from '@sveltejs/kit';

// todo - this will need to authenticate requests somehow to prevent spam, but this is a problem for deployment, not now
export async function fallback() {
	return error(400, { message: 'This endpoint is currently disabled' });

	await gmail.users.watch({ userId: 'me', requestBody: { topicName: GOOGLE_PUB_SUB_TOPIC } });

	return new Response(null, { status: 200 });
}
