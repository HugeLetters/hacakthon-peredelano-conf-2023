<script lang="ts">
	import { page } from '$app/stores';
	import { TRPC_UNAUTHENTICATED_ERROR_MESSAGE, getSignInUrl } from '$lib/auth';
</script>

{#if $page.status === 404}
	<div>404 - Page not found</div>
{:else}
	<div>Unexpected error - {$page.error?.message}</div>
{/if}
{#if $page.error?.message === TRPC_UNAUTHENTICATED_ERROR_MESSAGE}
	<a href={getSignInUrl('/')}>go to signin page</a>
{/if}
