import { TRPCError } from '@trpc/server';

export function throwInternalError(e: unknown): never {
	console.error(e);
	throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
}
