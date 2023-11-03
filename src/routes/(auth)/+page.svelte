<script lang="ts">
	import { onMount } from 'svelte';

	export let data;

	const query = data.trpc.greet.hello.query(undefined, { staleTime: Infinity });
	const query2 = data.trpc.greet.hi.query(undefined, {});
	onMount(() => {
		setTimeout(() => {
			data.trpc.greet.utils.invalidate();
		}, 500);
	});

	const postQuery = data.trpc.post.randomPost.query(undefined, {
		refetchOnMount: false,
		refetchOnWindowFocus: false
	});
</script>

<h1 class="header">Welcome to SvelteKit {$query.data} - {$query2.data}</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<a href="/other">other page</a>
{#if $postQuery.isSuccess}
	{#if $postQuery.data}
		{@const post = $postQuery.data.post}
		{@const comments = $postQuery.data.comments}
		<div class="post">
			<h3 class="post-header">RANDOM POST FOR YOU!</h3>
			<h2 class="post-title">{post.title}</h2>
			<p>{post.content}</p>
			<div>{new Date(post.createdAt)}</div>
			{#if comments.length}
				<h3 class="comments-header">Comments</h3>
				<ul class="comments-content">
					{#each comments as comment (comment?.id)}
						<li>
							<div>{comment.content}</div>
							<div>{new Date(comment.createdAt)}</div>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	{:else}
		Couldn't find a post for you...
	{/if}
{:else}
	Loading...
{/if}

<style lang="scss">
	.header {
		background: linear-gradient(to left, yellow, green);
	}
	.post {
		padding: 1rem;

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
	}
</style>
