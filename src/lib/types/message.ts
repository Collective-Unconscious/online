import type { channels } from "./channels";

// TODO: Maybe it should have a list of message "parts"?
// e.g. text part, emote part, mention part
// (maybe making a separate type for it in the process to be used in Chat.svelte)
export interface Message {
	id: number;
	author: string;
	content: string;
	channel: (typeof channels)[number];
}
