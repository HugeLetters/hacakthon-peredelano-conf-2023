<script lang="ts">
	import { page } from '$app/stores';
	import { signOut } from '$lib/auth';
	import Initial from '$lib/components/Initial.svelte';
	import { getQueryClientContext } from '@tanstack/svelte-query';

	export let data;

	const queryClient = getQueryClientContext();
</script>

<header class="root">
	<div class="user">
		<div class="initials">
			<Initial name={data.session.user.name} />
		</div>
		<div class="userdata">
			<div>{data.session.user.name}</div>
			<button
				class="signout"
				on:click={() => signOut({ callbackUrl: $page.url.href, queryClient })}
			>
				Выйти из аккаунта
			</button>
		</div>
	</div>
	<nav>
		<a href="/report">Мои жалобы</a>
		<a href="/report/new">Написать новую жалобу</a>
		{#if data.session.user.role === 'admin'}
			<a href="/dashboard">Дэшборд</a>
		{/if}
	</nav>
</header>

<style lang="scss">
	.root {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding: 1rem;
	}
	.user {
		display: flex;
		gap: 1rem;
	}
	.initials {
		width: 4rem;
		height: 4rem;
		font-size: x-large;
		font-weight: 500;
	}
	.userdata {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.signout {
		border: none;
		font-size: 0.75rem;
		color: $orange;
		text-align: left;
	}
	nav {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		a {
			padding: 1rem;
			border-radius: 1rem;
			background-color: $lightgray;
			display: flex;
			align-items: center;
			gap: 0.5rem;
		}
	}
</style>
