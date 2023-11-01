import { trpcServer } from '$lib/server/router';

export async function load(event) {
	await trpcServer.greet.hello.ssr(event);
	await trpcServer.privateGreet.privateHi.ssr(event);
	await trpcServer.post.randomPost.ssr(event);
}
