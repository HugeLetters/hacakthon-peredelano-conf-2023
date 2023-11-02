import {
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GOOGLE_PUB_SUB_TOPIC,
	GOOGLE_REFRESH_TOKEN
} from '$env/static/private';
import { Auth, google } from 'googleapis';

// todo - this will need to authenticate requests somehow to prevent spam, but this is a problem for deployment, not now
export async function fallback() {
	const auth = google.auth.fromJSON({
		type: 'authorized_user',
		client_id: GOOGLE_CLIENT_ID,
		client_secret: GOOGLE_CLIENT_SECRET,
		refresh_token: GOOGLE_REFRESH_TOKEN
	}) as Auth.OAuth2Client;

	const gmail = google.gmail({ version: 'v1', auth });

	await gmail.users.watch({ userId: 'me', requestBody: { topicName: GOOGLE_PUB_SUB_TOPIC } });

	return new Response(null, { status: 200 });
}
