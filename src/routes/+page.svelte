<script lang="ts">
	import type { RouterOutput } from '$lib/trpc';
	import { onMount } from 'svelte';

	export let data;

	const query = data.trpc.greet.hello.query(undefined, { staleTime: Infinity });
	const query2 = data.trpc.greet.hi.query(undefined, {});
	const secretQuery = data.trpc.privateGreet.privateHi.query(undefined, { staleTime: Infinity });
	onMount(() => {
		setTimeout(() => {
			data.trpc.privateGreet.privateHi.utils.invalidate();
		}, 10);
	});

	type Comment = NonNullable<RouterOutput['post']['randomPost']>[0]['comment'];
	const postQuery = data.trpc.post.randomPost.query(undefined, { refetchOnMount: false });
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

<h1 class="text-lg bg-gradient-to-l from-yellow-300 to-green-500">
	Welcome to SvelteKit {$query.data} - {$query2.data}
</h1>
<h1>Query with middleware {$secretQuery.data}</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<a href="/other">other page</a>
<div class="p-4">
	<div class="text-center text-lg">RANDOM POST FOR YOU!</div>
	<h1 class="text-2xl text-center capitalize">{post?.post?.title}</h1>
	<p>{post?.post?.content}</p>
	{#if post?.post}
		<div>{new Date(post.post.createdAt)}</div>
	{/if}
	{#if post?.comments}
		<h2 class="text-center text-xl pt-4">Comments</h2>
		<ul class="flex flex-col gap-2">
			{#each post.comments as comment (comment.id)}
				<li>
					<div>{comment.content}</div>
					<div>{new Date(comment.createdAt)}</div>
				</li>
				<hr class="border-2 rounded-full" />
			{/each}
		</ul>
	{/if}
</div>
