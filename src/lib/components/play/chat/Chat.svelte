<script lang="ts">
	import "./style.scss";

	import FilterChannelButton from "./buttons/FilterChannelButton.svelte";
	import TargetChannelButton from "./buttons/TargetChannelButton.svelte";
	import EmoteButton from "./buttons/EmoteButton.svelte";
	import ChatMessage from "./ChatMessage.svelte";

	import { onMount, tick } from "svelte";
	import { channels } from "$lib/types/channels";
	import { getUserContext } from "$lib/states/user";
	import { Chat } from "$lib/states/chat.svelte";

	const user = getUserContext();
	const connection = new Chat();
	let inputContent: string = $state("");
	let targetChannel: (typeof channels)[number] = $state("Global");
	let filteredChannels: (typeof channels)[number][] = $state([...channels]);

	onMount(() => {
		// Guests can't chat
		if (user) connection.connect();
		return () => connection.close();
	});

	// Scroll down when new messages come in
	$effect.pre(() => {
		connection.messages.length;
		tryScroll();
	});

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
		const content = inputContent.trim();
		if (!user || !content || !targetChannel) {
			return;
		}

		connection.send(targetChannel, content);
		inputContent = "";
	}
	function inputKeyDown(event: KeyboardEvent) {
		if (event.key === "Enter") {
			sendMessage();
		}
	}
</script>

<aside>
	<!-- Main part -->
	<div id="chat-main">
		{#each connection.messages as message (message.id)}
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

		{#if connection.error}
			<div class="chat-error">{connection.error}</div>
		{/if}

		<!-- TOOD: a form instead -->
		<input
			bind:value={inputContent}
			onkeydown={inputKeyDown}
			maxlength="150"
			disabled={!user}
			placeholder={user ? "" : "Log in to chat"}
		/>
	</div>
</aside>
