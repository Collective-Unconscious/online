<script lang="ts">
	import "./target-style.scss";

	import { slide } from "svelte/transition";
	import { channels } from "$lib/types/channels";

	let isOpen = $state(false);
	let selected = $state(0);
	let { selectedChannel = $bindable(channels[selected]) } = $props();

	function toggleOpen() {
		isOpen = !isOpen;
	}
	function select(idx: number) {
		selected = idx;
		isOpen = false;

		selectedChannel = channels[idx];
	}
	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (isOpen && !target.closest("#target-channel-button")) {
			isOpen = false;
		}
	}
</script>

<svelte:window on:click={handleClickOutside}/>

<div id="target-channel-button">
	<button onclick={() => toggleOpen()}>
		{channels[selected]}
	</button>

	{#if isOpen}
		<div id="target-buttons-drawer" transition:slide={{ duration: 120 }}>
			{#each channels as channel, idx (channel)}
				{#if idx != selected}
					<button onclick={() => select(idx)}>{channel}</button>
				{/if}
			{/each}
		</div>
	{/if}
</div>
