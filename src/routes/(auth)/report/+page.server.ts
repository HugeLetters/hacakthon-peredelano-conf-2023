import { trpcServer } from '$lib/server/router';

export async function load(event) {
	await trpcServer.report.getUserReportList.ssr(event).catch(console.error);
}
