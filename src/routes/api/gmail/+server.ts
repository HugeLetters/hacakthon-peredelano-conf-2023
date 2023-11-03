import { error } from '@sveltejs/kit';

// todo - authenticate that requests are from google
export async function POST() {
	return error(400, { message: 'This endpoint is currently disabled' });

	// const body: PubSubEvent = await request.json();
	// const messageData: PubSubMessageData = JSON.parse(base64ToString(body.message.data));
	// console.log(messageData);

	// return new Response(null, { status: 200 });
}

// type PubSubEvent = {
// 	message: {
// 		data: string;
// 		messageId: string;
// 		message_id: string;
// 		publishTime: string;
// 		publish_time: string;
// 	};
// 	subscription: string;
// };

// type PubSubMessageData = { emailAddress: string; historyId: number };

// function base64ToString(string: string) {
// 	return Buffer.from(string, 'base64').toString('utf-8');
// }
