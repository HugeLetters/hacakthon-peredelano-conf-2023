import {
	GMAIL_EMAIL_ADDRESS,
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

type ReplyMessageOptions = { threadId: string; replyId: string };
type SendMessageOptions = {
	content: string;
	to: string;
	subject: string;
	cc?: string;
} & DiscriminatedUnion<ReplyMessageOptions, unknown>;
/**
 * @returns assigned thread id of the message
 */
export function sendMessage({ to, content, subject, replyId, threadId, cc }: SendMessageOptions) {
	const message = createMimeMessage();
	message.setTo(to);
	message.setSender('');
	message.setSubject(subject);
	message.addMessage({ contentType: 'text/plain', data: content });
	if (cc) {
		message.setCc(ccToArray(cc));
	}

	if (replyId) {
		message.headers.set(REFERENCES_HEADER, replyId);
		message.headers.set(IN_REPLY_TO_HEADER, replyId);
	}

	const raw = message.asEncoded();

	return gmail.users.messages.send({ userId, requestBody: { raw, threadId } }).then((res) => {
		const responseThreadId = res.data.threadId;

		if (!responseThreadId) throw Error("Couldn't retrieve threadId of the sent message");
		if (!subject) return responseThreadId;

		return gmail.users.threads
			.modify({
				userId,
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

export function getLastInboxMessage(messages: Message[]) {
	return messages.findLast(
		(message) =>
			message.payload?.headers?.find(
				(header) => header.name === FROM_HEADER && !header.value?.includes(GMAIL_EMAIL_ADDRESS)
			)
	);
}

type HeaderValue = string | null | undefined;
type ReplyData = {
	to?: HeaderValue;
	cc?: HeaderValue;
	subject?: HeaderValue;
	replyMessageId?: HeaderValue;
};
export function getReplyData({
	message,
	isYourMessage
}: {
	message: MessagePayload;
	isYourMessage?: boolean;
}) {
	const { headers } = message;
	if (!headers) return {};

	const toHeader = isYourMessage ? TO_HEADER : FROM_HEADER;
	const result: ReplyData = {};
	for (const header of headers) {
		switch (header.name) {
			case toHeader: {
				result.to = header.value;
				break;
			}
			case CC_HEADER: {
				result.cc = header.value;
				break;
			}
			case SUBJECT_HEADER: {
				result.subject = header.value;
				break;
			}
			case MESSAGE_Id_HEADER:
			case MESSAGE_ID_HEADER: {
				result.replyMessageId = header.value;
				break;
			}
		}
	}

	return result;
}

function ccToArray(cc: string) {
	return cc
		.split(',')
		.map((string) => string.trim())
		.filter(Boolean);
}

export const FROM_HEADER = 'From';
export const TO_HEADER = 'To';
export const SUBJECT_HEADER = 'Subject';
export const MESSAGE_ID_HEADER = 'Message-ID';
export const MESSAGE_Id_HEADER = 'Message-Id';
export const IN_REPLY_TO_HEADER = 'In-Reply-To';
export const REFERENCES_HEADER = 'References';
export const CC_HEADER = 'Cc';

export const UNREAD_LABEL = 'UNREAD';
export const userId = 'me';
