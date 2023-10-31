import { trpcServer } from '$lib/server/router';

export function load(event) {
	return {
		trpcHydrationClient: trpcServer.hydrateToClient(event),
		session: event.locals.auth.validate()
	};
}
