import { Auth, google } from 'googleapis';
import { config } from 'dotenv';

config();
main();
async function main() {
	const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
	if (!GOOGLE_CLIENT_ID) {
		throw Error('Please make sure env variable for GOOGLE_CLIENT_ID is set');
	}

	const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
	if (!GOOGLE_CLIENT_SECRET) {
		throw Error('Please make sure env variable for GOOGLE_CLIENT_SECRET is set');
	}

	const GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
	if (!GOOGLE_REFRESH_TOKEN) {
		throw Error('Please make sure env variable for GOOGLE_REFRESH_TOKEN is set');
	}

	const GMAIL_PROCESSED_LABEL_NAME = process.env.GMAIL_PROCESSED_LABEL_NAME;
	if (!GMAIL_PROCESSED_LABEL_NAME) {
		throw Error('Please make sure env variable for GMAIL_PROCESSED_LABEL_NAME is set');
	}

	const auth = google.auth.fromJSON({
		type: 'authorized_user',
		client_id: GOOGLE_CLIENT_ID,
		client_secret: GOOGLE_CLIENT_SECRET,
		refresh_token: GOOGLE_REFRESH_TOKEN
	}) as Auth.OAuth2Client;

	const gmail = google.gmail({ version: 'v1', auth });

	const label = await gmail.users.labels
		.create({
			userId: 'me',
			requestBody: {
				type: 'user',
				name: GMAIL_PROCESSED_LABEL_NAME,
				messageListVisibility: 'show',
				color: { backgroundColor: '#fb4c2f', textColor: '#ffffff' }
			}
		})
		.then((label) => label.data)
		.catch((e) => {
			console.error(e);
			console.error('Seems like label already exists - fetching existing label data');

			return gmail.users.labels
				.list({ userId: 'me' })
				.then(
					(labels) => labels.data.labels?.find((label) => label.name === GMAIL_PROCESSED_LABEL_NAME)
				);
		});

	if (!label) throw Error('Something went wrong');

	console.log('Your label id - ', label.id);
}
