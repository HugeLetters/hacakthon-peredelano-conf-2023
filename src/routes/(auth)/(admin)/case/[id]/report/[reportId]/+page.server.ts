import { trpcServer } from '$lib/server/router';

export async function load(event) {
	await trpcServer.message.getChat
		.ssr({ reportId: event.params.reportId }, event)
		.catch(console.error);
}
