<script lang="ts">
	import { page } from '$app/stores';
	import { CALLBACK_URL_KEY } from '$lib/auth';

	const host = 'https://a'; // throwaway just so we could construct a relative URL
	let siginURL = new URL('/api/auth/signin/google', host);
	$: calbackUrl = $page.url.searchParams.get(CALLBACK_URL_KEY);
	$: if (calbackUrl) {
		siginURL.searchParams.set(CALLBACK_URL_KEY, calbackUrl);
		siginURL = siginURL;
	}
</script>

<a href={siginURL.toString().replace(host, '')}>Sign in with google</a>
