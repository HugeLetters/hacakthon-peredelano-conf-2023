import { trpcServer } from '$lib/server/router';

export async function load(event) {
	await trpcServer.thread.getThreadEmailList
		.ssr({ threadId: event.params.threadId }, event)
		.catch(console.error);
}
