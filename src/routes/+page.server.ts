import { trpcServer } from '$lib/server/router';

export async function load(event) {
	await trpcServer.greet.hello.ssr(event);
	await trpcServer.greet.privateHi.ssr(event);
	return {};
}
