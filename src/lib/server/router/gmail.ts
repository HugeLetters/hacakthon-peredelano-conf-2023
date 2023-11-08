import { z } from 'zod';
import {
	MESSAGE_ID_HEADER,
	UNREAD_LABEL,
	decodeMessage,
	getLastInboxMessage,
	getReplyData,
	gmail,
	sendMessage,
	userId
} from '../gmail';
import { protectedProcedure, router } from '../trpc';

const newThreadSchema = z.object({
	to: z.string(),
	subject: z.string(),
	content: z.string(),
	cc: z.string().optional()
});

export const gmailRouter = router({
	getThreadById: protectedProcedure.input(z.string()).query(({ input }) => {
		return gmail.users.threads.get({ userId, id: input }).then((res) => {
			if (!res.data.messages) return null;

			const { messages } = res.data;
			// writeFile('./email.json', JSON.stringify(res.data));

			const lastInboxMessage = getLastInboxMessage(messages);
			const isYourMessage = !lastInboxMessage;
			const replyToMessage = (lastInboxMessage ?? messages.at(-1))?.payload;
			const replyData = replyToMessage
				? getReplyData({ message: replyToMessage, isYourMessage })
				: {};

			return {
				messages: messages
					.map((message) => message.payload)
					.filter((message): message is NonNullable<typeof message> => !!message)
					.map((message) => ({
						data: decodeMessage(message),
						id: message.headers?.find((header) => header.name === MESSAGE_ID_HEADER)?.value
					})),
				unread: messages.some((message) => message.labelIds?.includes(UNREAD_LABEL)),
				replyData
			};
		});
	}),
	markThreadAsRead: protectedProcedure.input(z.string()).mutation(({ input }) => {
		return gmail.users.threads
			.modify({
				userId,
				id: input,
				requestBody: { removeLabelIds: [UNREAD_LABEL] }
			})
			.then(() => {})
			.catch((e) => {
				console.error(e);
				throw Error('Error while trying mark thread as unread');
			});
	}),
	startThread: protectedProcedure
		.input(newThreadSchema)
		.mutation(({ input: { subject, to, cc, content } }) => {
			return sendMessage({ to, subject, content, cc });
		}),
	replyToThread: protectedProcedure
		.input(
			newThreadSchema.merge(
				z.object({
					replyId: z.string(),
					threadId: z.string()
				})
			)
		)
		.mutation(({ input: { content, subject, replyId, threadId, cc, to } }) => {
			return sendMessage({ to, content, subject, cc, replyId, threadId });
		})
});
