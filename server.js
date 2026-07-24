// Thin wrapper around adapter-node's handler. The site is fully prerendered,
// and prerendered/static responses bypass hooks.server.ts — but the Falcra
// showcase needs cross-origin isolation on EVERY page (the first document a
// visitor loads decides the isolation state for the whole client-side session).
// So the headers are stamped here, on all responses, static or not.
import { createServer } from 'node:http';
import { handler } from './build/handler.js';

const server = createServer((req, res) => {
	res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
	res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');
	handler(req, res, () => {
		res.statusCode = 404;
		res.end('Not found');
	});
});

const port = process.env.PORT ?? 3000;
const host = process.env.HOST ?? '0.0.0.0';
server.listen(port, host, () => {
	console.log(`Listening on http://${host}:${port}`);
});
