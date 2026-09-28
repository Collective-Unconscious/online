import * as v from "valibot";
import { channels } from "./channels";

// TODO: Maybe it should have a list of message "parts"?
// e.g. text part, emote part, mention part
// (maybe making a separate type for it in the process to be used in Chat.svelte)
export interface Message {
	id: string;
	authorId: string;
	author: string;
	content: string;
	channel: (typeof channels)[number];
	sentAt: Date;
}

const MessageSchema = v.object({
	Type: v.literal("Message"),
	ID: v.pipe(v.string(), v.uuid()),
	Channel: v.picklist(channels),
	AuthorID: v.pipe(v.string(), v.uuid()),
	Author: v.string(),
	Content: v.string(),
	SentAt: v.pipe(v.string(), v.isoTimestamp()),
});
export const MessageTransform = v.pipe(
	MessageSchema,
	v.transform((m): Message => ({
		id: m.ID,
		authorId: m.AuthorID,
		author: m.Author,
		content: m.Content,
		channel: m.Channel,
		sentAt: new Date(m.SentAt),
	})),
);
