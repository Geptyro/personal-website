// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			/** Per-page OG/Twitter share image URL; layout falls back to the site card when unset. */
			ogImage?: string;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
