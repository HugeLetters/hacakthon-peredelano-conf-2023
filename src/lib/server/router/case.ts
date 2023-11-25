import { eq, getTableColumns } from 'drizzle-orm';
import { db } from '../database';
import { Case } from '../database/schema/case';
import { Report } from '../database/schema/report';
import { aggregateArrayColumns } from '../database/utils';
import { adminProcedure, router } from '../trpc';
import { throwInternalError } from './utils';

export const caseRouter = router({
	findMany: adminProcedure.query(() => {
		return db
			.select({
				...getTableColumns(Case),
				reports: aggregateArrayColumns({ content: Report.content, country: Report.country })
			})
			.from(Case)
			.leftJoin(Report, eq(Report.caseId, Case.id))
			.groupBy(Case.id)
			.all()
			.catch(throwInternalError);
	})
});
