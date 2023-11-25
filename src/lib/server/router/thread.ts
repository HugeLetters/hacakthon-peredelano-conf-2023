import { createMimeMessage } from 'mimetext';
import { z } from 'zod';
import { gmail, userId } from '../gmail';
import { adminProcedure, router } from '../trpc';
import { throwInternalError } from './utils';
import { db } from '../database';
import { Thread } from '../database/schema/case';

export const threadRouter = router({
	create: adminProcedure
		.input(
			z.object({
				caseId: z.string(),
				to: z.string(),
				cc: z.array(z.string()).optional(),
				content: z.string(),
				subject: z.string()
			})
		)
		.mutation(async ({ input }) => {
			const message = createMimeMessage();
			message.addMessage({ contentType: 'text/plain', data: input.content });
			message.setSubject(input.subject);
			message.setSender('');
			message.setTo(input.to);
			if (input.cc) {
				message.setCc(input.cc);
			}

			return gmail.users.messages
				.send({ userId: userId, requestBody: { raw: message.asEncoded() } })
				.then(({ data }) => {
					const threadId = data.threadId;
					if (!threadId) throwInternalError("Couldn't retriev thread id of sent email");

					return db
						.insert(Thread)
						.values({ caseId: input.caseId, threadId })
						.then(() => threadId)
						.catch(throwInternalError);
				})
				.catch(throwInternalError);
		})
});
