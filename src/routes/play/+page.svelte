<script lang="ts">
	import Game from "$lib/components/play/Game.svelte";
	import Chat from "$lib/components/play/Chat.svelte";
	import Header from "$lib/components/header/Header.svelte";

	// styling
	import "./style.scss";
</script>

<svelte:head>
	<title>Collective Unconscious</title>
</svelte:head>

<div id="site-contents">
	<main>
		<Header />

		<div id="panes">
			<div id="game-pane">
				<div class="game-buttons">
					<button>a</button>
					<button>b</button>
					<button>c</button>
				</div>

				<div class="game-window">
					<Game />
					<div class="subtitle"><span id="world-name">World Name</span></div>
				</div>
			</div>
			<div id="chat-pane">
				<Chat />
			</div>
		</div>
	</main>

	<footer>Collective Unconscious v1.0.0</footer>
</div>
