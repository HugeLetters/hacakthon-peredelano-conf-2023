<script lang="ts">
	import type { RouterOutput } from '$lib/trpc';
	import { onMount } from 'svelte';

	export let data;

	const query = data.trpc.greet.hello.query(undefined, { staleTime: Infinity });
	const query2 = data.trpc.greet.hi.query(undefined, {});
	const secretQuery = data.trpc.privateGreet.privateHi.query(undefined, { staleTime: Infinity });
	onMount(() => {
		setTimeout(() => {
			data.trpc.greet.utils.invalidate();
		}, 500);
	});

	type Comment = NonNullable<RouterOutput['post']['randomPost']>[0]['comment'];
	const postQuery = data.trpc.post.randomPost.query(undefined, {
		refetchOnMount: false,
		refetchOnWindowFocus: false
	});
	$: post = $postQuery.isSuccess
		? $postQuery.data?.reduce(
				(acc, el) => {
					acc.comments.push(el.comment);
					return acc;
				},
				{
					post: $postQuery.data.at(0)?.post,
					comments: [] as Comment[]
				}
		  )
		: undefined;
</script>

<h1 class="header">
	Welcome to SvelteKit {$query.data} - {$query2.data}
</h1>
<h1>Query with middleware {$secretQuery.data}</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<a href="/other">other page</a>
<div class="post">
	<h3 class="post-header">RANDOM POST FOR YOU!</h3>
	<h2 class="post-title">{post?.post?.title}</h2>
	<p>{post?.post?.content}</p>
	{#if post?.post}
		<div>{new Date(post.post.createdAt)}</div>
	{/if}
	{#if post?.comments}
		<h3 class="comments-header">Comments</h3>
		<ul class="comments-content">
			{#each post.comments as comment (comment.id)}
				<li>
					<div>{comment.content}</div>
					<div>{new Date(comment.createdAt)}</div>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style lang="scss">
	.header {
		background: linear-gradient(to left, yellow, green);
	}
	.post {
		padding: 1rem;
	}
	.post-header {
		text-align: center;
		font-size: x-large;
	}
	.post-title {
		text-align: center;
		font-size: xx-large;
		text-transform: capitalize;
	}
	.comments-header {
		padding-top: 1rem;
		text-align: center;
		font-size: large;
	}
	.comments-content {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		li:not(:last-child) {
			padding-bottom: 0.5rem;
			border-bottom: 1px solid white;
		}
	}
</style>
