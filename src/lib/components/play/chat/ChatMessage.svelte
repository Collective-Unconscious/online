<script lang="ts">
	import type { Message } from "$lib/types/message";

	let { message }: { message: Message } = $props();

	const channelClass = message.channel.toLowerCase();
</script>

<div class="chat-message {channelClass}">
	<span class="author">
		[{message.channel[0]}]
		{message.author}:
	</span>
	{message.content}
</div>
