import { db } from '$lib/database';
import { comment, post } from '$lib/database/schema';
import { eq } from 'drizzle-orm';
import { publicProcedure, router } from '../trpc';

export const postRouter = router({
	randomPost: publicProcedure.query(async () => {
		const randomPost = await db
			.select()
			.from(post)
			.limit(1)
			.offset(Math.floor(Math.random() * 100))
			.get();
		if (!randomPost) return null;

		return db
			.select()
			.from(post)
			.where(eq(post.id, randomPost.id))
			.innerJoin(comment, eq(post.id, comment.postId))
			.all();
	})
});
