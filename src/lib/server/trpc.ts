import { TRPC_UNAUTHENTICATED_ERROR_MESSAGE } from '$lib/auth';
import type { RequestEvent } from '@sveltejs/kit';
import { initTRPC, TRPCError } from '@trpc/server';

export const createTrpcContext = async function (event: RequestEvent) {
	return { session: await event.locals.auth.validate() };
};

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<typeof createTrpcContext>().create({
	errorFormatter({ shape: { code, message, data } }) {
		return {
			code,
			message,
			data: { code: data.code, httpStatus: data.httpStatus }
		};
	}
});

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;

export const publicProcedure = t.procedure;

const enforceUserSession = t.middleware(({ ctx, next }) => {
	if (!ctx.session) {
		throw new TRPCError({ code: 'UNAUTHORIZED', message: TRPC_UNAUTHENTICATED_ERROR_MESSAGE });
	}
	return next({ ctx: { session: ctx.session } });
});

export const userProcedure = publicProcedure.use(enforceUserSession);

export const adminProcedure = userProcedure.use(({ ctx, next }) => {
	if (ctx.session.user.role !== 'admin') {
		throw new TRPCError({ code: 'UNAUTHORIZED', message: 'User lacks admin permsissions' });
	}
	return next({ ctx });
});
