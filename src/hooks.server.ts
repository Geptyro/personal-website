import type { Handle } from '@sveltejs/kit';

// Cross-origin isolation, site-wide: the Falcra showcase (/falcra) runs its
// simulation in Web Workers over SharedArrayBuffer, which the browser only
// enables on cross-origin-isolated pages. The headers must cover EVERY route,
// not just /falcra — with SvelteKit client-side navigation the isolation state
// is decided by whichever document the visitor landed on first.
// COEP `credentialless` (not `require-corp`) so any future cross-origin
// images/media keep working without CORP headers.
export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
	response.headers.set('Cross-Origin-Embedder-Policy', 'credentialless');
	return response;
};
