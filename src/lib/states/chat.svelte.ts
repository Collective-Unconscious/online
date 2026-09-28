import { API_BASE_MAIN } from "$app/env/public";
import * as v from "valibot";
import type { channels } from "$lib/types/channels";
import { MessageTransform, type Message } from "$lib/types/message";

const ChatErrorSchema = v.object({
	Type: v.literal("Error"),
	Error: v.string(),
});

const MAX_MESSAGES = 200;

export class Chat {
	messages = $state<Message[]>([]);
	error = $state("");
	connected = $state(false);

	#ws: WebSocket | undefined;
	#retryDelay = 1000;
	#stopped = false;

	connect() {
		this.#stopped = false;

		const ws = new WebSocket(API_BASE_MAIN.replace(/^http/, "ws") + "/chat");
		ws.onopen = () => {
			this.connected = true;
			this.#retryDelay = 1000;
		};
		ws.onmessage = (ev) => this.#onMessage(ev.data);
		ws.onclose = () => {
			this.connected = false;
			if (this.#stopped) return;

			// Try again, waiting a bit longer each time
			setTimeout(() => this.connect(), this.#retryDelay);
			this.#retryDelay = Math.min(this.#retryDelay * 2, 30000);
		};
		this.#ws = ws;
	}

	close() {
		this.#stopped = true;
		this.#ws?.close();
	}

	send(channel: (typeof channels)[number], content: string) {
		if (this.#ws?.readyState !== WebSocket.OPEN) {
			this.error = "not connected";
			return;
		}

		this.error = "";
		this.#ws.send(JSON.stringify({ Channel: channel, Content: content }));
	}

	#onMessage(data: string) {
		let json: unknown;
		try {
			json = JSON.parse(data);
		} catch {
			return;
		}

		const msg = v.safeParse(MessageTransform, json);
		if (msg.success) {
			this.messages.push(msg.output);
			if (this.messages.length > MAX_MESSAGES) this.messages.shift();
			return;
		}

		const err = v.safeParse(ChatErrorSchema, json);
		if (err.success) this.error = err.output.Error;
	}
}
