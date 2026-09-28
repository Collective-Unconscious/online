<script lang="ts">
	// Created by Aunarky
	// September 28 2026

	import { onMount } from "svelte";
	import { beforeNavigate } from "$app/navigation";
	import { API_BASE_MAIN } from "$app/env/public";
	import { simd } from "wasm-feature-detect";

	const GAME = "default";
	const WS_URL = API_BASE_MAIN.replace(/^http/, "ws").replace(/\/?$/, "/");

	let canvas: HTMLCanvasElement;
	let status = $state("Loading...");

	function loadScript(src: string): Promise<void> {
		return new Promise((resolve, reject) => {
			const el = document.createElement("script");
			el.src = src;
			el.onload = () => resolve();
			el.onerror = () => reject(new Error(`failed to load ${src}`));
			document.head.appendChild(el);
		});
	}

	// ES6 builds export it, others put it on window
	async function loadEngine(url: string): Promise<(opts: object) => Promise<any>> {
		const engine = await import(/* @vite-ignore */ url);
		if (engine.default) return engine.default;

		await loadScript(url);
		return (window as any).createEasyRpgPlayer;
	}

	// The engine grabs #canvas right away
	onMount(async () => {
		try {
			// SOME browsers can't run the SIMD build
			const engine = (await simd()) ? "/bin/ynoengine-simd.js" : "/bin/ynoengine.js";

			await loadScript("/js/play.js");
			const createEasyRpgPlayer = await loadEngine(engine);

			const player = await createEasyRpgPlayer({ game: GAME, wsUrl: WS_URL });
			player.initApi();
			player.api.sessionReady();
			status = "";
			canvas.focus();
		} catch (err) {
			console.error("couldn't start the game:", err);
			status = "Couldn't load the game, try refreshing the page";
		}
	});

	// The engine can't be shut down, so do a full page load
	beforeNavigate(({ to, type, cancel }) => {
		if (type === "leave" || !to) return;
		cancel();
		location.href = to.url.href;
	});

	function onKeyDown(ev: KeyboardEvent) {
		if (ev.key.startsWith("Arrow")) ev.preventDefault();
	}
</script>

<div id="game-view">
	<canvas id="canvas" tabindex="-1" bind:this={canvas} onkeydown={onKeyDown}></canvas>
	{#if status}
		<p class="status">{status}</p>
	{/if}
</div>

<style>
	#game-view {
		position: relative;
	}

	.status {
		position: absolute;
		max-width: 90%;
		margin: 0;
		text-align: center;
		pointer-events: none;
	}
</style>
