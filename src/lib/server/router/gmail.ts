import { z } from 'zod';
import { decodeMessage, getLastSubject, gmail, sendMessage } from '../gmail';
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
						data: decodeMessage(message),
						id: message.headers?.find((header) => header.name === 'Message-ID')?.value
					})),
				subject: getLastSubject(res.data.messages),
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
				/** Subject needs to match for all messages in the thread */
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
			if (!thread) return sendMessage({ to, content, subject });
			return sendMessage({
				to,
				content,
				subject,
				threadId: thread.threadId,
				replyId: thread.replyId
			});
		})
});
