<script lang="ts">
	// Created by Aunarky
	// September 28 2026

	import { onMount } from "svelte";
	import { API_BASE_MAIN } from "$app/env/public";

	declare function createEasyRpgPlayer(opts: object): Promise<any>;

	const GAME = "default";
	const WS_URL = API_BASE_MAIN.replace(/^http/, "ws") + "/";

	let canvas: HTMLCanvasElement;

	function loadScript(src: string): Promise<void> {
		return new Promise((resolve, reject) => {
			const el = document.createElement("script");
			el.src = src;
			el.onload = () => resolve();
			el.onerror = () => reject(new Error(`failed to load ${src}`));
			document.head.appendChild(el);
		});
	}

	// The engine grabs #canvas right away
	onMount(async () => {
		await loadScript("/js/play.js");
		await loadScript("/bin/ynoengine-simd.js");

		const player = await createEasyRpgPlayer({ game: GAME, wsUrl: WS_URL });
		player.initApi();
		player.api.sessionReady();
		canvas.focus();
	});

	function onKeyDown(ev: KeyboardEvent) {
		if (ev.key.startsWith("Arrow")) ev.preventDefault();
	}
</script>

<div id="game-view">
	<canvas id="canvas" tabindex="-1" bind:this={canvas} onkeydown={onKeyDown}></canvas>
</div>
