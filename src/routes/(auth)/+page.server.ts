import { redirectOnUnauthenticatedError } from '$lib/server/auth';
import { trpcServer } from '$lib/server/router';

export async function load(event) {
	await redirectOnUnauthenticatedError(event, async () => {
		await trpcServer.greet.hello.ssr(event);
	});
}
