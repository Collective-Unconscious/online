<script lang="ts">
	import { getUserContext } from "$lib/states/user";
	import AuthModal from "./AuthModal.svelte";

	let shown = $state(false);

	const user = getUserContext();
</script>

{#if user}
	<div id="profile-buttons">
		<div id="profile-text">
			<div>{user.name}</div>
			<a href="/TODO">log out</a>
		</div>
		<a id="profile-icon" href="/profile">
			<img src="assets/minna.png" alt="profile" height="48px" width="48px"/>
		</a>
		<button id="profile-icon" onclick={() => alert("settings")}>
			<img src="assets/settings.svg" alt="settings" height="48px" width="48px"/>
		</button>
	</div>
{:else}
	<!-- svelte-ignore a11y_invalid_attribute -->
	<a href="#" onclick={() => shown = true}>(log in..)</a>
	<AuthModal bind:shown />
{/if}
