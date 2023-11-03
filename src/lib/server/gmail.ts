import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN } from '$env/static/private';
import { Auth, google } from 'googleapis';

function getGmailClient() {
	const auth = google.auth.fromJSON({
		type: 'authorized_user',
		client_id: GOOGLE_CLIENT_ID,
		client_secret: GOOGLE_CLIENT_SECRET,
		refresh_token: GOOGLE_REFRESH_TOKEN
	}) as Auth.OAuth2Client;

	return google.gmail({ version: 'v1', auth });
}

export const gmail = getGmailClient();
