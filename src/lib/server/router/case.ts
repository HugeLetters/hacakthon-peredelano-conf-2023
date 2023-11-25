import { desc, eq, getTableColumns } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../database';
import { Case } from '../database/schema/case';
import { Report } from '../database/schema/report';
import { aggregateArrayColumns } from '../database/utils';
import { adminProcedure, router } from '../trpc';
import { throwInternalError } from './utils';
import { statusList } from '$lib/options';

export const caseRouter = router({
	findMany: adminProcedure
		.input(z.object({ statusFilter: z.enum(statusList).optional() }).optional())
		.query(({ input }) => {
			return db
				.select({
					...getTableColumns(Case),
					reports: aggregateArrayColumns(getTableColumns(Report))
				})
				.from(Case)
				.leftJoin(Report, eq(Report.caseId, Case.id))
				.where(input?.statusFilter ? eq(Case.status, input.statusFilter) : undefined)
				.groupBy(Case.id)
				.orderBy(desc(Report.createdAt))
				.all()
				.catch(throwInternalError);
		})
});
