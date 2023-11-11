import { redirectOnUnauthenticatedError } from '$lib/server/auth';
import { trpcServer } from '$lib/server/router';

export async function load(event) {
	await trpcServer.greet.hello.ssr(event);
	await redirectOnUnauthenticatedError(event, async () => {
		await trpcServer.privateGreet.privateHi.ssr(event).catch(console.error);
	});
}
