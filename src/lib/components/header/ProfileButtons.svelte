<script lang="ts">
	import { getUserContext } from "$lib/states/user";
	import AuthModal from "./AuthModal.svelte";

	const user = getUserContext();

	let authModal = $state<ReturnType<typeof AuthModal>>();
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
	<div id="auth-links">
		<button onclick={() => authModal?.open("login")}>(log in..)</button>
		<button onclick={() => authModal?.open("signup")}>(sign up..)</button>
	</div>
	<AuthModal bind:this={authModal} />
{/if}
