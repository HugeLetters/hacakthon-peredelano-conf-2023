<script lang="ts">
	export let data;
</script>

<div>
	<nav>
		<a href="/case/{data.caseId}">info</a>
		<a href="/case/{data.caseId}/chats"> chats</a>
		<a href="/case/{data.caseId}/threads">threads</a>
	</nav>
	<slot />
</div>
