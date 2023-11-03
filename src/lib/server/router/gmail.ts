import { GMAIL_PROCESSED_LABEL_ID } from '$env/static/private';
import type { gmail_v1 } from 'googleapis';
import { createMimeMessage } from 'mimetext';
import { z } from 'zod';
import { gmail } from '../gmail';
import { protectedProcedure, router } from '../trpc';

export const gmailRouter = router({
	getThreadById: protectedProcedure.input(z.string()).query(({ input }) => {
		return gmail.users.threads.get({ userId: 'me', id: input }).then((res) => {
			if (!res.data.messages) return null;

			return {
				messages: res.data.messages
					.map((message) => message.payload)
					.filter((message): message is NonNullable<typeof message> => !!message)
					.map((message) => ({
						data: parseMessageContent(message),
						id: message.headers?.find((header) => header.name === 'Message-ID')?.value
					})),
				unread: res.data.messages.some((message) => message.labelIds?.includes('UNREAD'))
			};
		});
	}),
	markThreadAsRead: protectedProcedure.input(z.string()).mutation(({ input }) => {
		return gmail.users.threads
			.modify({
				userId: 'me',
				id: input,
				requestBody: { removeLabelIds: ['UNREAD'] }
			})
			.then(() => {})
			.catch((e) => {
				console.error(e);
				throw Error('Error while trying mark thread as unread');
			});
	}),
	sendMessage: protectedProcedure
		.input(
			z.object({
				to: z.string(),
				content: z.string(),
				/** Subject is required for the first message in the thread */
				subject: z.string(),
				thread: z
					.object({
						/** ThreadId must be provided for new messages to the same thread */
						threadId: z.string(),
						/** Specify to which message in the thread to reply to */
						replyId: z.string()
					})
					.optional()
			})
		)
		.mutation(({ input: { content, subject, thread, to } }) => {
			const message = createMimeMessage();
			message.setTo(to);
			message.setSender('');
			message.setSubject(subject ? subject : '');
			message.addMessage({ contentType: 'text/plain', data: content });
			if (thread) {
				message.headers.set('References', thread.replyId);
				message.headers.set('In-Reply-To', thread.replyId);
			}
			const raw = message.asEncoded();

			return gmail.users.messages
				.send({ userId: 'me', requestBody: { raw, threadId: thread?.threadId } })
				.then((res) => {
					if (!res.data.threadId) throw Error("Couldn't retrieve threadId of the send message");
					if (!subject) return res.data.threadId;

					return gmail.users.threads
						.modify({
							userId: 'me',
							requestBody: { addLabelIds: [GMAIL_PROCESSED_LABEL_ID] },
							id: res.data.threadId
						})
						.then(() => {
							return res.data.threadId;
						})
						.catch((e) => {
							console.error(e);
							throw Error('Erorr while applying processed label to the thread');
						});
				});
		})
});

type Message = NonNullable<gmail_v1.Schema$Message['payload']>;
type MessageChunk = { type: 'html' | 'text'; content: string };
function parseMessageContent(message: Message): Array<MessageChunk> {
	const result: Array<MessageChunk> = [];
	if (message.body?.data) {
		result.push({
			content: base64ToString(message.body.data),
			type: message.mimeType === 'text/html' ? 'html' : 'text'
		});
	}
	if (!message.parts) return result;

	return result.concat(...message.parts.map(parseMessageContent));
}

function base64ToString(string: string) {
	return Buffer.from(string, 'base64').toString('utf-8');
}
