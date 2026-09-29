<script lang="ts">
	import { API_BASE_MAIN } from "$app/env/public";
	import { ApiErrorTransform } from "$lib/types/apiError";
	import * as v from "valibot";

	type Mode = "login" | "signup";

	let dialog = $state<HTMLDialogElement>();
	let mode = $state<Mode>("login");

	let username = $state("");
	let password = $state("");
	let passwordAgain = $state("");
	let statusText = $state("");
	let busy = $state(false);

	const signingUp = $derived(mode === "signup");

	const errorText: Record<string, string> = {
		"invalid credentials": "Wrong username or password",
		"username taken": "That username is taken",
		"username invalid": "Usernames can only have letters, numbers and _",
		"request body fails validation": "Check your username and password",
		"too many requests": "Too many tries, wait a bit and try again",
	};

	function setMode(to: Mode) {
		mode = to;
		password = passwordAgain = statusText = "";
	}

	export function open(to: Mode) {
		setMode(to);
		dialog?.showModal();
	}

	async function submit(e: SubmitEvent) {
		e.preventDefault();

		if (signingUp && password !== passwordAgain) {
			statusText = "Passwords don't match";
			return;
		}

		busy = true;
		statusText = "";
		try {
			const res = await fetch(`${API_BASE_MAIN}/auth/${signingUp ? "register" : "login"}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ Username: username, Password: password }),
				credentials: "include",
			});
			if (!res.ok) {
				const err = v.parse(ApiErrorTransform, await res.json());
				statusText = errorText[err.error] ?? `There was a problem: ${err.error}`;
				return;
			}
		} catch {
			statusText = "Couldn't reach the server, try again";
			return;
		} finally {
			busy = false;
		}

		// TODO: live-update state here some way
		// right now it is only on page-load by ssr, so just reload for now
		location.reload();
	}
</script>

<dialog
	bind:this={dialog}
	onclick={(e) => {
		if (e.target === dialog) dialog.close();
	}}
>
	<form onsubmit={submit}>
		<h1>{signingUp ? "Sign Up" : "Sign In"} 🚧🚧</h1>

		<div>
			<label for="auth-username">Your username ..</label>
			<input
				id="auth-username"
				name="username"
				type="text"
				placeholder="..."
				autocomplete="username"
				maxlength="16"
				required
				bind:value={username}
			/>
			{#if signingUp}
				<small>Up to 16 letters, numbers or _</small>
			{/if}

			<label for="auth-password">Your password ..</label>
			<input
				id="auth-password"
				name="password"
				type="password"
				placeholder="..."
				autocomplete={signingUp ? "new-password" : "current-password"}
				minlength={signingUp ? 8 : undefined}
				maxlength="128"
				required
				bind:value={password}
			/>

			{#if signingUp}
				<small>At least 8 characters</small>

				<label for="auth-password-again">Your password again ..</label>
				<input
					id="auth-password-again"
					name="password-again"
					type="password"
					placeholder="..."
					autocomplete="new-password"
					maxlength="128"
					required
					bind:value={passwordAgain}
				/>
			{/if}
		</div>

		{#if statusText}
			<div class="status">{statusText}</div>
		{/if}

		<button type="submit" disabled={busy}>{signingUp ? "Sign Up" : "Log In"}</button>

		<p class="switch">
			{signingUp ? "Have an account?" : "No account?"}
			<button type="button" onclick={() => setMode(signingUp ? "login" : "signup")}>
				{signingUp ? "Log in" : "Sign up"}
			</button>
		</p>
	</form>
</dialog>
