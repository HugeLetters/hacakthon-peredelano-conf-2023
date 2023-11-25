<script lang="ts">
	import { page } from '$app/stores';
	import { signOut } from '$lib/auth';
	import { getQueryClientContext } from '@tanstack/svelte-query';
	import ArrowRight from '$lib/icons/ArrowRight.svelte';

	export let data;

	const queryClient = getQueryClientContext();
</script>

<header class="root">
	<button class="signout" on:click={() => signOut({ callbackUrl: $page.url.href, queryClient })}>
		Выйти из аккаунта
	</button>
	<!-- todo this page -->
	<a href="/404">Мои жалобы <ArrowRight /></a>
	<a href="/report/new">Написать новую жалобу <ArrowRight /></a>
	{#if data.session.user.role === 'admin'}
		<a href="/dashboard">Дэшборд <ArrowRight /></a>
	{/if}
</header>

<style lang="scss">
	.root {
		display: flex;
		flex-direction: column;
		gap: 3rem;
		padding: 1rem;
	}
	.signout {
		border: none;
		background-color: gray;
		color: white;
		padding: 1rem;
		border-radius: 1rem;
	}

	a {
		padding: 1rem;
		border-radius: 1rem;
		background-color: #8883;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
</style>
