<script lang="ts">
	import "./filter-style.scss";

	import { slide } from "svelte/transition";
	import { channels } from "$lib/types/channels";

	let isOpen = $state(false);
	let selected = $state<number[]>(channels.map((_, idx) => idx));
	let {
		selectedChannels = $bindable(selected.map((value) => channels[value])),
		onFilterChange,
	}: {
		selectedChannels: string[],
		onFilterChange: () => unknown,
	} = $props();

	function toggleOpen() {
		isOpen = !isOpen;
	}
	function toggleItem(idx: number) {
		if (selected.includes(idx)) {
			if (selected.length > 1) {
				selected = selected.filter((i) => i !== idx);
			}
		} else {
			selected = [...selected, idx];
		}
		selectedChannels = selected.map((value) => channels[value]);
		onFilterChange();
	}
	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (isOpen && !target.closest("#filter-channel-button")) {
			isOpen = false;
		}
	}
</script>

<svelte:window on:click={handleClickOutside}/>

<div id="filter-channel-button">
	<button onclick={() => toggleOpen()}>
		<img src="assets/icon-filter.svg" height="20px" alt="Filter"/>
	</button>

	{#if isOpen}
		<div id="filter-buttons-drawer" transition:slide={{ duration: 120 }}>
			{#each channels as channel, idx (channel)}
				<button
					onclick={() => toggleItem(idx)}
					class:deselected={!selected.includes(idx)}
					class:selectable={selected.includes(idx) && selected.length === 1}
				>
					{channel}
				</button>
			{/each}
		</div>
	{/if}
</div>
