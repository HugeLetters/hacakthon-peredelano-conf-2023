import { trpcServer } from '$lib/server/router';

export async function load(event) {
	await trpcServer.case.caseChatList.ssr({ caseId: event.params.id }, event).catch(console.error);
}
