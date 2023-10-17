import { initTRPC } from '@trpc/server';
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.create();
export const publicProcedure = t.procedure;
export const privateProcedure = publicProcedure.use(({ next }) => {
	// we can set up auth check here
	return next({ ctx: { data: 1 } });
});

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
