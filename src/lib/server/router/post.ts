import { db } from '$lib/server/database';
import { comment, post } from '$lib/server/database/schema';
import { eq, type InferSelectModel } from 'drizzle-orm';
import { publicProcedure, router } from '../trpc';

export const postRouter = router({
	randomPost: publicProcedure.query(() => {
		const randomPostSq = db
			.select()
			.from(post)
			.limit(1)
			.offset(Math.floor(Math.random() * 100))
			.as('post');

		return db
			.select()
			.from(randomPostSq)
			.leftJoin(comment, eq(comment.postId, randomPostSq.id))
			.all()
			.then((x) => {
				if (!arrayNonEmpty(x)) return null;

				return x.reduce(
					(acc, el) => {
						if (el.comment) acc.comments.push(el.comment);
						return acc;
					},
					{ post: x[0].post, comments: [] as InferSelectModel<typeof comment>[] }
				);
			});
	})
});

function arrayNonEmpty<T>(arr: T[]): arr is [T, ...T[]] {
	return !!arr.length;
}
