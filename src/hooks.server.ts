import { API_BASE_LOCAL } from "$app/env/private";
import { API_BASE_MAIN } from "$app/env/public";
import type { User } from "$lib/types/user";
import * as v from "valibot";

export async function handleFetch({ request, fetch }) {
	// If it is an API request and we have a locally-available API server,
	// rewrite the URL to use the local server
	if (request.url.startsWith(API_BASE_MAIN) && API_BASE_LOCAL !== undefined) {
		request = new Request(
			request.url.replace(API_BASE_MAIN, API_BASE_LOCAL),
			request,
		);
	}

	return fetch(request);
}

const ApiUserSchema = v.object({
	AccountID: v.pipe(v.string(), v.uuid()),
	Username: v.string(),
	CreatedAt: v.pipe(v.string(), v.isoTimestamp()),
});
const UserTransformSchema = v.pipe(ApiUserSchema, v.transform(au => ({
	accountId: au.AccountID,
	name: au.Username,
	createdAt: au.CreatedAt,
})))

export async function handle({ event, resolve }) {
	const res = await event.fetch(`${API_BASE_MAIN}/users/me`);
	if (res.ok) {
		const json = await res.json();
		const user: User = v.parse(UserTransformSchema, json);
		event.locals.user = user;
	}

	return await resolve(event);
}
