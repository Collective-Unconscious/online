<script lang="ts">
	import "./style.scss";
	import { setUserContext } from "$lib/states/user";

	let { data, children } = $props();

	setUserContext(data.user);
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=B612:ital,wght@0,400;0,700;1,400;1,700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

{@render children()}
