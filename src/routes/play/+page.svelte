<script lang="ts">
	import SiteLogo from "$lib/components/SiteLogo.svelte";
	import ProfileButtons from "$lib/components/ProfileButtons.svelte";
	import Game from "$lib/components/play/Game.svelte";
	import Chat from "$lib/components/play/Chat.svelte";
</script>

<div id="site-contents">
	<header>
		<SiteLogo />
		<ProfileButtons />
	</header>

	<main>
		<div id="game-container">
			<Game />
		</div>
		<div id="divider"></div>
		<div id="chat-container">
			<Chat />
		</div>
	</main>

	<footer>Collective Unconscious v1.0.0</footer>
</div>

<style>
	#site-contents {
		--border-width: 2px;

		padding: 8px;
		gap: 8px;
		display: flex;
		flex-direction: column;
		align-content: center;
		justify-content: space-between;
		height: calc(100vh - 32px);
	}

	header {
		display: flex;
		justify-content: space-between;
	}

	main {
		border: solid var(--border-width) var(--color-light);
		padding: 0px;
		display: flex;
		justify-content: space-evenly;

		flex-direction: row;
	}
	#divider {
		border-right: solid var(--border-width) var(--color-light);
	}

	@media (max-width: 1100px) {
		main {
			align-items: center;
			flex-direction: column;
		}
		#divider {
			width: 100%;
			border-right: none;
			border-top: solid var(--border-width) var(--color-light);
		}
	}

	#game-container,
	#chat-container {
		padding: 16px;
	}
</style>
