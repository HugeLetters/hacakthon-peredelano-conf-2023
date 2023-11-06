import { Auth, google } from 'googleapis';

type GmailClientCredentials = { client_id: string; client_secret: string; refresh_token: string };
export function getGmailClient({
	client_id,
	client_secret,
	refresh_token
}: GmailClientCredentials) {
	const auth = google.auth.fromJSON({
		type: 'authorized_user',
		client_id,
		client_secret,
		refresh_token
	}) as Auth.OAuth2Client;

	return google.gmail({ version: 'v1', auth });
}
