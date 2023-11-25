<script lang="ts">
	import { page } from '$app/stores';
	import { CALLBACK_URL_KEY } from '$lib/auth';

	const host = 'https://a'; // throwaway just so we could construct a relative URL
	let signinURL = new URL('/api/auth/signin/google', host);
	$: calbackUrl = $page.url.searchParams.get(CALLBACK_URL_KEY);
	$: if (calbackUrl) {
		signinURL.searchParams.set(CALLBACK_URL_KEY, calbackUrl);
		signinURL = signinURL;
	}
</script>

<a href={signinURL.href.replace(host, '')}>Sign in with google</a>
