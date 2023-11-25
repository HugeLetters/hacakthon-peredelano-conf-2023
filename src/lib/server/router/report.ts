import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../database';
import { Case } from '../database/schema/case';
import { Report, categorySchema, countrySchema } from '../database/schema/report';
import { router, userProcedure } from '../trpc';
import { throwInternalError } from './utils';

export const reportRouter = router({
	create: userProcedure
		.input(
			z.object({
				name: z.string(),
				category: categorySchema,
				content: z.string().max(65535),
				country: countrySchema.optional(),
				organization: z.string().optional()
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { id: caseId } = await db
				.insert(Case)
				.values({ name: `${input.name} - ${input.category}` })
				.returning()
				.get()
				.catch(throwInternalError);

			return db
				.insert(Report)
				.values({
					creatorId: ctx.session.user.userId,
					caseId,
					authorName: input.name,
					category: input.category,
					content: input.content,
					country: input.country,
					organization: input.organization
				})
				.then(() => {})
				.catch(throwInternalError);
		}),
	getUserReportList: userProcedure.query(({ ctx }) =>
		db
			.select()
			.from(Report)
			.where(eq(Report.creatorId, ctx.session.user.userId))
			.all()
			.catch(throwInternalError)
	)
});
