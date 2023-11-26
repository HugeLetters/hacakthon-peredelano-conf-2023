import { trpcServer } from '$lib/server/router';

export async function load(event) {
	await trpcServer.report.getUserReport
		.ssr({ reportId: event.params.id }, event)
		.catch(console.error);
}
