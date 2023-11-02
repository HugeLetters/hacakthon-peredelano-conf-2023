// todo authenticate that requests are from google
export async function POST({ request }) {
	const body: TempPubSubEvent = await request.json();
	const messageData: TempPubSubMessageData = JSON.parse(
		Buffer.from(body.message.data, 'base64').toString()
	);
	console.log(body);
	console.log(messageData);

	return new Response(null, { status: 200 });
}

type TempPubSubEvent = {
	message: {
		data: string;
		messageId: string;
		message_id: string;
		publishTime: string;
		publish_time: string;
	};
	subscription: string;
};

type TempPubSubMessageData = { emailAddress: string; historyId: number };
