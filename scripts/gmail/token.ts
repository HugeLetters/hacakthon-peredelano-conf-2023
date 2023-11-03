import { authenticate } from '@google-cloud/local-auth';
import { config } from 'dotenv';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

config();
main();
async function main() {
	// If modifying these scopes - you need to retrieve new refresh token
	const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
	const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
	const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
	const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
	if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REDIRECT_URI) {
		throw Error(
			'Please make sure env variables for GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET and GOOGLE_REDIRECT_URI are set'
		);
	}
	// todo check if port is running already. throw if yes
	const credentialsFilesPath = path.resolve(fileURLToPath(import.meta.url), '../credentials.json');
	const credentialsaData = JSON.stringify({
		web: {
			client_id: GOOGLE_CLIENT_ID,
			client_secret: GOOGLE_CLIENT_SECRET,
			redirect_uris: [GOOGLE_REDIRECT_URI]
		}
	});
	await fs.writeFile(credentialsFilesPath, credentialsaData, { encoding: 'utf-8' });

	const client = await authenticate({ scopes: SCOPES, keyfilePath: credentialsFilesPath });

	await fs.unlink(credentialsFilesPath);
	console.log(client.credentials.refresh_token);
}
