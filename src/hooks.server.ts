import { auth } from '$lib/server/auth';

export const handle = ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);
	return resolve(event);
};
