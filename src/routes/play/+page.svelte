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
			<div id="game-pane">
				<div class="game-buttons">
					<button>a</button>
					<button>b</button>
					<button>c</button>
				</div>

				<div class="game-window">
					<Game/>
					<div class="subtitle"><span id="world-name">World Name</span></div>
				</div>
			</div>
			<div id="chat-pane">
				<Chat/>
			</div>
		</div>
	</main>

	<footer>Collective Unconscious v1.0.0</footer>
</div>

