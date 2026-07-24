import { fileURLToPath } from 'node:url';
import adapter from '@sveltejs/adapter-node';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const projectSrc = fileURLToPath(new URL('./src', import.meta.url));

// COOP/COEP: cross-origin isolation for the Falcra showcase's SharedArrayBuffer
// workers. Production sets these in hooks.server.ts; dev/preview need them here.
const isolationHeaders = {
	'Cross-Origin-Opener-Policy': 'same-origin',
	'Cross-Origin-Embedder-Policy': 'credentialless'
};

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in
				// svelte 6. Libraries are matched by "not under this project's src" (not by a
				// node_modules path segment) because linked git deps resolve to their real
				// paths outside the project.
				runes: ({ filename }) => (filename.startsWith(projectSrc) ? true : undefined)
			},

			adapter: adapter()
		})
	],
	// The Falcra scene imports built GLBs straight from homestead-assets.
	assetsInclude: ['**/*.glb'],
	resolve: {
		// One copy of three/svelte for the site AND the linked falcra/homestead
		// packages (their peers would otherwise resolve — or fail to — from their
		// own real paths, giving stubs or duplicate instances).
		dedupe: ['three', 'svelte']
	},
	server: { headers: isolationHeaders },
	preview: { headers: isolationHeaders },
	worker: { format: 'es' },
	optimizeDeps: {
		// Raw-source svelte packages (workers, .svelte, GLB imports) — esbuild
		// prebundling can't process them; vite transforms them as source instead.
		exclude: ['@falcra/homestead-game', 'falcra', 'sools', 'homestead-assets']
	}
});
