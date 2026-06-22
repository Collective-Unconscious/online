<script lang="ts">
	import SiteLogo from "$lib/components/SiteLogo.svelte";
	import ProfileButtons from "$lib/components/ProfileButtons.svelte";
	import Game from "$lib/components/play/Game.svelte";
	import Chat from "$lib/components/play/Chat.svelte";

	// styling
	import "./style.scss";
</script>

<svelte:head>
	<title>Collective Unconscious</title>
</svelte:head>

<div id="site-contents">
	<main>
		<header>
			<SiteLogo/>
			<ProfileButtons/>
		</header>
		<div id="panes">
			<div id="game-container">
				<Game/>
			</div>
			<div id="chat-container">
				<Chat/>
			</div>
		</div>
	</main>

	<footer>Collective Unconscious v1.0.0</footer>
</div>

