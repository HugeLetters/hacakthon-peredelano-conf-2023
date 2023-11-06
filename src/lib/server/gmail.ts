import {
	GMAIL_PROCESSED_LABEL_ID,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GOOGLE_REFRESH_TOKEN
} from '$env/static/private';
import type { DiscriminatedUnion } from '$lib/utils';
import type { gmail_v1 } from 'googleapis';
import { createMimeMessage } from 'mimetext';
import { getGmailClient } from '../../../scripts/gmail/client';

export const gmail = getGmailClient({
	client_id: GOOGLE_CLIENT_ID,
	client_secret: GOOGLE_CLIENT_SECRET,
	refresh_token: GOOGLE_REFRESH_TOKEN
});

type SendMessageOptions = { content: string; to: string; subject: string } & DiscriminatedUnion<
	{ threadId: string; replyId: string },
	unknown
>;
/**
 * @returns assigned thread id of the message
 */
export function sendMessage({ to, content, subject, replyId, threadId }: SendMessageOptions) {
	const message = createMimeMessage();
	message.setTo(to);
	message.setSender('');
	message.setSubject(subject);
	message.addMessage({ contentType: 'text/plain', data: content });
	if (replyId) {
		message.headers.set('References', replyId);
		message.headers.set('In-Reply-To', replyId);
	}
	const raw = message.asEncoded();

	return gmail.users.messages.send({ userId: 'me', requestBody: { raw, threadId } }).then((res) => {
		const responseThreadId = res.data.threadId;

		if (!responseThreadId) throw Error("Couldn't retrieve threadId of the sent message");
		if (!subject) return responseThreadId;

		return gmail.users.threads
			.modify({
				userId: 'me',
				requestBody: { addLabelIds: [GMAIL_PROCESSED_LABEL_ID] },
				id: responseThreadId
			})
			.then(() => {
				return responseThreadId;
			})
			.catch((e) => {
				console.error(e);
				throw Error('Erorr while applying processed label to the thread');
			});
	});
}

export type Message = NonNullable<gmail_v1.Schema$Message>;
export type MessagePayload = NonNullable<Message['payload']>;
type MessagePart = { type: 'html' | 'text'; content: string };
export function decodeMessage(message: MessagePayload): Array<MessagePart> {
	const result: Array<MessagePart> = [];
	if (message.body?.data) {
		result.push({
			content: base64ToString(message.body.data),
			type: message.mimeType === 'text/html' ? 'html' : 'text'
		});
	}
	if (!message.parts) return result;

	return result.concat(...message.parts.map(decodeMessage));
}

function base64ToString(string: string) {
	return Buffer.from(string, 'base64').toString('utf-8');
}

export function getLastSubject(messages: Message[]) {
	for (let i = messages.length - 1; i >= 0; i--) {
		const message = messages[i];
		if (!message) continue;

		const subject = message.payload?.headers?.find((header) => header.name === 'Subject');
		if (subject) return subject.value;
	}
}
