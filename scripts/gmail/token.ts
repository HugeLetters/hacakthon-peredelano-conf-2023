import { authenticate } from '@google-cloud/local-auth';
import { config } from 'dotenv';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { check } from 'tcp-port-used';

config();
main();
async function main() {
	// If modifying these scopes - you need to retrieve new refresh token
	const SCOPES = [
		'https://www.googleapis.com/auth/gmail.readonly',
		'https://www.googleapis.com/auth/gmail.labels',
		'https://www.googleapis.com/auth/gmail.modify'
	];
	const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
	if (!GOOGLE_CLIENT_ID) {
		throw Error('Please make sure env variable for GOOGLE_CLIENT_ID is set');
	}

	const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
	if (!GOOGLE_CLIENT_SECRET) {
		throw Error('Please make sure env variable for GOOGLE_CLIENT_SECRET is set');
	}
	const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
	if (!GOOGLE_REDIRECT_URI) {
		throw Error('Please make sure env variable for GOOGLE_REDIRECT_URI is set');
	}

	const { port } = new URL(GOOGLE_REDIRECT_URI);
	const isPortBusy = await check(+port);
	if (isPortBusy) {
		throw Error(
			`Your callback uri is ${GOOGLE_REDIRECT_URI} but this port is currently busy - please close the process occpuying this port and re-run the script. Most likely the port is occupied by your SvelteKit dev server`
		);
	}

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
	console.log('Your refresh token - ', client.credentials.refresh_token);
}
