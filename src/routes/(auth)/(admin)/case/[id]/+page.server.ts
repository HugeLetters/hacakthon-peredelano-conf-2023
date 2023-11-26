import { trpcServer } from '$lib/server/router';

export async function load(event) {
	await trpcServer.case.caseInfo.ssr({ caseId: event.params.id }, event).catch(console.error);
}
