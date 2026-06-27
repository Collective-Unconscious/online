<script lang="ts">
	import { getUserContext } from "$lib/states/user";

	const user = getUserContext();
</script>

<div id="profile-buttons">
	<div id="profile-text">
		<div>{user?.name}</div>
		<a href="/TODO">log out</a>
	</div>
	<a id="profile-icon" href="/profile">
		<img src="assets/minna.png" alt="profile" height="48px" width="48px"/>
	</a>
	<button id="profile-icon" onclick={() => alert("settings")}>
		<img src="assets/settings.svg" alt="settings" height="48px" width="48px"/>
	</button>
</div>
