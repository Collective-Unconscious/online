export async function handle({ event, resolve }) {
	// TODO: proper auth stuff
	// https://svelte.dev/docs/kit/auth
	const mockUser = { name: "mossball_lover_32" };
	event.locals.user = mockUser;

	return await resolve(event);
}
