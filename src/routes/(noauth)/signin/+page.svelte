<script lang="ts">
	import { page } from '$app/stores';
	import { CALLBACK_URL_KEY } from '$lib/auth';
	import Google from '$lib/icons/Google.svelte';

	const host = 'https://a'; // throwaway just so we could construct a relative URL
	let signinURL = new URL('/api/auth/signin/google', host);
	$: calbackUrl = $page.url.searchParams.get(CALLBACK_URL_KEY);
	$: if (calbackUrl) {
		signinURL.searchParams.set(CALLBACK_URL_KEY, calbackUrl);
		signinURL = signinURL;
	}
</script>

<div class="root">
	<h1 class="title">Добро пожаловать</h1>
	<a class="signin" href={signinURL.href.replace(host, '')}><Google />Продолжить с помощью Google</a
	>
</div>

<style lang="scss">
	.root {
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2rem;
	}
	.title {
		font-weight: 600;
		font-size: 2rem;
	}
	.signin {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		border-radius: 1rem;
		outline: #9da5b5 solid 1px;
		padding: 1rem;
	}
</style>
