import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN } from '$env/static/private';
import type { gmail_v1 } from 'googleapis';
import { getGmailClient } from '../../../scripts/gmail/client';

export const gmail = getGmailClient({
	client_id: GOOGLE_CLIENT_ID,
	client_secret: GOOGLE_CLIENT_SECRET,
	refresh_token: GOOGLE_REFRESH_TOKEN
});

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
