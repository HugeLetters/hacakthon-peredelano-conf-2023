import { GMAIL_EMAIL_ADDRESS } from '$env/static/private';
import { eq } from 'drizzle-orm';
import { createMimeMessage } from 'mimetext';
import { z } from 'zod';
import { db } from '../database';
import { Thread } from '../database/schema/case';
import {
	DATE_HEADER,
	FROM_HEADER,
	IN_REPLY_TO_HEADER,
	REFERENCES_HEADER,
	decodeMessage,
	getLastIncomingMessage,
	getReplyData,
	gmail,
	userId
} from '../gmail';
import { adminProcedure, router } from '../trpc';
import { throwInternalError } from './utils';

export const threadRouter = router({
	create: adminProcedure
		.input(
			z.object({
				caseId: z.string(),
				to: z.string(),
				cc: z.string().optional(),
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
		}),
	reply: adminProcedure
		.input(
			z.object({
				threadId: z.string(),
				to: z.string(),
				cc: z.string().optional(),
				content: z.string(),
				subject: z.string(),
				replyId: z.string()
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
			if (input.replyId) {
				message.headers.set(REFERENCES_HEADER, input.replyId);
				message.headers.set(IN_REPLY_TO_HEADER, input.replyId);
			}

			return gmail.users.messages
				.send({
					userId: userId,
					requestBody: { raw: message.asEncoded(), threadId: input.threadId }
				})
				.then(() => void 0)
				.catch(throwInternalError);
		}),
	getThreadList: adminProcedure.input(z.object({ caseId: z.string() })).query(async ({ input }) => {
		const threadIds = await db
			.select()
			.from(Thread)
			.where(eq(Thread.caseId, input.caseId))
			.all()
			.catch(throwInternalError);

		return Promise.all(
			threadIds.map(({ threadId }) => gmail.users.threads.get({ userId, id: threadId }))
		)
			.then((threads) => {
				return threads.map(({ data }) => ({
					from: data.messages
						? getLastIncomingMessage(data.messages)?.payload?.headers?.find(
								(header) => header.name === FROM_HEADER
						  )?.value ?? GMAIL_EMAIL_ADDRESS
						: null,
					id: data.id,
					snippet: data.snippet ?? data.messages?.at(-1)?.snippet
				}));
			})
			.catch(throwInternalError);
	}),
	getThreadEmailList: adminProcedure
		.input(z.object({ threadId: z.string() }))
		.query(({ input }) => {
			return gmail.users.threads
				.get({
					userId,
					format: 'full',
					id: input.threadId
				})
				.then(({ data }) => {
					const messages =
						data.messages
							?.flatMap(({ payload }) => {
								if (!payload) return null;
								const fromEmail = payload.headers?.find((header) => header.name === FROM_HEADER)
									?.value;
								const from = fromEmail === GMAIL_EMAIL_ADDRESS ? 'me' : fromEmail;
								const date = payload.headers?.find((header) => header.name === DATE_HEADER)?.value;

								return decodeMessage(payload).map((message) => ({ message, from, date }));
							})
							.filter((message): message is NonNullable<typeof message> => !!message) ?? [];

					const lastInboxMessage = data.messages ? getLastIncomingMessage(data.messages) : null;
					const isMyMessage = !lastInboxMessage;
					const replyMessage = (lastInboxMessage ?? data.messages?.at(-1))?.payload;
					const replyData = replyMessage
						? getReplyData({ message: replyMessage, isMyMessage })
						: {};

					return {
						messages,
						replyData
					};
				});
		})
});
