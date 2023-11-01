import type { RequestEvent } from '@sveltejs/kit';
import { initTRPC, TRPCError } from '@trpc/server';

export const createTrpcContext = async function (event: RequestEvent) {
	return { session: await event.locals.auth.validate() };
};

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<typeof createTrpcContext>().create();

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;

export const publicProcedure = t.procedure;

const enforceUserSession = t.middleware(({ ctx, next }) => {
	if (!ctx.session) throw new TRPCError({ code: 'UNAUTHORIZED' });
	return next({ ctx: { session: ctx.session } });
});
export const privateProcedure = publicProcedure.use(enforceUserSession);
