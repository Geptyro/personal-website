<script lang="ts">
	import { page } from '$app/state';
	import { i18n, setLocale } from '$lib/i18n.svelte';
	import { translations, locales } from '$lib/content/translations';
	import { site } from '$lib/content/site';

	const m = $derived(translations[i18n.locale]);
	const path = $derived(page.url.pathname);
</script>

<header>
	<div class="container bar">
		<a class="logo" href="/" aria-label="Home">cd<span class="gradient-text">.</span></a>
		<nav>
			<a href="/" class:active={path === '/'}>{m.nav.apps}</a>
			<a href="/resume" class:active={path.startsWith('/resume')}>{m.nav.resume}</a>
		</nav>
		<div class="actions">
			<a
				class="icon"
				href={site.github}
				target="_blank"
				rel="noopener noreferrer"
				aria-label="GitHub"
				title="GitHub"
			>
				<svg viewBox="0 0 16 16" width="20" height="20" aria-hidden="true" fill="currentColor">
					<path
						d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
					/>
				</svg>
			</a>
			<a
				class="icon"
				href={site.linkedin}
				target="_blank"
				rel="noopener noreferrer"
				aria-label="LinkedIn"
				title="LinkedIn"
			>
				<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
					<path
						d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0Z"
					/>
				</svg>
			</a>
			<a class="email" href="mailto:{site.email}">{m.contact.button}</a>
			<div class="lang" role="group" aria-label="Language">
				<span
					class="indicator"
					aria-hidden="true"
					style="transform: translateX(calc({locales.indexOf(i18n.locale)} * (100% + 2px)))"
				></span>
				{#each locales as locale (locale)}
					<button
						class:active={i18n.locale === locale}
						onclick={() => setLocale(locale)}
						aria-pressed={i18n.locale === locale}
					>
						{locale.toUpperCase()}
					</button>
				{/each}
			</div>
		</div>
	</div>
</header>

<style>
	header {
		position: sticky;
		top: 0;
		z-index: 10;
		background: color-mix(in srgb, var(--bg) 75%, transparent);
		backdrop-filter: blur(12px);
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}

	.bar {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		height: 4rem;
	}

	.logo {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1.4rem;
		text-decoration: none;
	}

	nav {
		display: flex;
		gap: 1.25rem;
	}

	nav a {
		position: relative;
		text-decoration: none;
		color: var(--muted);
		font-weight: 500;
		font-size: 0.95rem;
		transition: color 0.2s;
	}

	nav a::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: -5px;
		width: 100%;
		height: 2px;
		border-radius: 2px;
		background: var(--gradient);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.25s ease;
	}

	nav a:hover {
		color: var(--text);
	}

	nav a:hover::after {
		transform: scaleX(1);
	}

	nav a.active {
		color: var(--text);
	}

	nav a.active::after {
		transform: scaleX(1);
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 0.9rem;
		margin-left: auto;
	}

	.icon {
		display: grid;
		place-items: center;
		color: var(--muted);
		transition: color 0.2s, transform 0.2s;
	}

	.icon:hover {
		color: var(--text);
		transform: translateY(-1px);
	}

	.email {
		font-family: var(--font-display);
		font-size: 0.85rem;
		font-weight: 600;
		text-decoration: none;
		color: #fff;
		background: var(--gradient);
		border-radius: 999px;
		padding: 0.45rem 1.1rem;
		white-space: nowrap;
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.email:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 28px -10px var(--pink);
	}

	.lang {
		position: relative;
		display: flex;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 999px;
		padding: 3px;
		gap: 2px;
	}

	/* Sliding gradient pill behind the active language (width math assumes 2 locales) */
	.indicator {
		position: absolute;
		top: 3px;
		bottom: 3px;
		left: 3px;
		width: calc(50% - 4px);
		border-radius: 999px;
		background: var(--gradient);
		transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
		view-transition-name: lang-pill;
	}

	.lang button {
		position: relative;
		z-index: 1;
		border: none;
		background: transparent;
		color: var(--muted);
		font: inherit;
		font-size: 0.75rem;
		font-weight: 600;
		min-width: 2.6rem;
		padding: 0.25rem 0;
		border-radius: 999px;
		cursor: pointer;
		transition: color 0.2s, transform 0.15s;
	}

	.lang button:active {
		transform: scale(0.92);
	}

	.lang button.active {
		color: #fff;
	}

	@media (max-width: 640px) {
		.bar {
			gap: 1rem;
		}

		.email {
			display: none;
		}
	}

	@media (max-width: 420px) {
		.lang {
			display: none;
		}
	}
</style>
