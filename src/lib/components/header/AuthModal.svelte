<script lang="ts">
	import { API_BASE_MAIN } from "$app/env/public";
	import { ApiErrorTransform, type ApiError } from "$lib/types/apiError";
	import * as v from "valibot";

	let { shown = $bindable() } = $props();

	let dialog = $state<HTMLDialogElement>();

	$effect(() => {
		if (shown) dialog?.showModal();
	});

	let username = $state("");
	let password = $state("");
	let statusText = $state("");

	async function doLogin(e: MouseEvent) {
		e.preventDefault(); // prevent submit action

		const body = { Username: username, Password: password };
		const res = await fetch(`${API_BASE_MAIN}/auth/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
			credentials: "include",
		});
		if (!res.ok) {
			const json = await res.json();
			const err: ApiError = v.parse(ApiErrorTransform, json);
			statusText = `There was a problem: ${err.error}`;
			return;
		}

		// TODO: live-update state here some way
		// right now it is only on page-load by ssr, so just reload for now
		location.reload();
	}
</script>

<dialog
	bind:this={dialog}
	onclose={() => (shown = false)}
	onclick={(e) => {
		if (e.target === dialog) dialog.close();
	}}
>
	<form>
		<h1>Sign In 🚧🚧</h1>

		<div>
			<label for="username">Your username ..</label>
			<input
				name="username"
				type="text"
				placeholder="..."
				bind:value={username}
			/>

			<label for="password">Your password ..</label>
			<input
				name="password"
				type="password"
				placeholder="..."
				bind:value={password}
			/>
		</div>

		<div>{statusText}</div>

		<button type="submit" onclick={doLogin}>Log In</button>
	</form>
</dialog>
