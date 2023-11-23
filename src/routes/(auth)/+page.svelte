<script lang="ts">
	export let data;

	const helloQuery = data.trpc.greet.hello.query(undefined, { staleTime: 5000 });
</script>

<div>{$helloQuery.data} {data.session.user.name}</div>
