import { trpcServer } from '$lib/server/router';

export async function load(event) {
	await trpcServer.message.getChat.ssr({ reportId: event.params.id }, event).catch(console.error);
}
