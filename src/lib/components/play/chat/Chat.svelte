<script lang="ts">
	import "./style.scss";

	import FilterChannelButton from "./buttons/FilterChannelButton.svelte";
	import TargetChannelButton from "./buttons/TargetChannelButton.svelte";
	import EmoteButton from "./buttons/EmoteButton.svelte";
	import ChatMessage from "./ChatMessage.svelte";

	import { tick } from "svelte";
	import { channels } from "$lib/types/channels";
	import type { Message } from "$lib/types/message";
	import { getUserContext } from "$lib/states/user";

	const user = getUserContext();
	let inputContent: string = $state("");
	let targetChannel: (typeof channels)[number] = $state("Global");
	let filteredChannels: (typeof channels)[number][] = $state([...channels]);

	// TODO: server stuff
	const mockMessages = [
		{
			id: 0,
			author: "mossball_lover_32",
			content: "I love Mossball",
			channel: "Map",
		} as Message,
		{
			id: 1,
			author: "mossball_ambivalent",
			content:
				"hfjghsfjlkd gjklsd ghl hsdglkhlgdjfg ljdsgkdsfgjlk ljsgkd gljsfkd hsgdfjglk",
			channel: "Global",
		} as Message,
		{
			id: 2,
			author: "mossball_hater_64",
			content: "I too am in this episode",
			channel: "Party",
		} as Message,
	] as Message[];

	let messages = $state<Message[]>(mockMessages);

	async function tryScroll() {
		const chat = document.getElementById("chat-main");
		if (!chat) return;

		const lowRegionSizePixels = 32;
		const isScrolledToBottom =
			chat.scrollHeight - chat.clientHeight <=
			chat.scrollTop + lowRegionSizePixels;

		await tick();
		if (isScrolledToBottom) {
			chat.scrollTop = chat.scrollHeight - chat.clientHeight;
		}
	}
	function sendMessage() {
		if (!user || !inputContent || !targetChannel) {
			return;
		}

		// TODO: do some stuff on the backend
		messages.push({
			id: messages.length,
			author: user.name,
			content: inputContent,
			channel: targetChannel,
		} as Message);
		inputContent = "";

		tryScroll();
	}
	function inputKeyDown(event: KeyboardEvent) {
		console.log(event.key);
		if (event.key === "Enter") {
			sendMessage();
		}
	}
</script>

<aside>
	<!-- Main part -->
	<div id="chat-main">
		{#each messages as message (message.id)}
			{#if filteredChannels.includes(message.channel)}
				<ChatMessage {message}/>
			{/if}
		{/each}
	</div>

	<!-- Bottom part -->
	<div id="chat-bottom">
		<div id="chat-buttons">
			<div id="chat-buttons-group">
				<TargetChannelButton bind:selectedChannel={targetChannel}/>
				<FilterChannelButton
					bind:selectedChannels={filteredChannels}
					onFilterChange={() => tryScroll()}
				/>
			</div>

			<EmoteButton/>
		</div>

		<!-- TOOD: a form instead -->
		<input bind:value={inputContent} onkeydown={inputKeyDown}/>
	</div>
</aside>
