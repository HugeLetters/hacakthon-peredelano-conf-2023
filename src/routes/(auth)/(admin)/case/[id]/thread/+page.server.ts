import { trpcServer } from '$lib/server/router';

export async function load(event) {
	await trpcServer.thread.getThreadList
		.ssr({ caseId: event.params.id }, event)
		.catch(console.error);
}
