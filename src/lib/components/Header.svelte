<script lang="ts">
	import { i18n, setLocale } from '$lib/i18n.svelte';
	import { translations, locales } from '$lib/content/translations';

	const m = $derived(translations[i18n.locale]);
</script>

<header>
	<div class="container bar">
		<a class="logo" href="#top" aria-label="Home">cd<span class="gradient-text">.</span></a>
		<nav>
			<a href="#work">{m.nav.work}</a>
			<a href="#projects">{m.nav.projects}</a>
			<a href="#experience">{m.nav.experience}</a>
			<a href="#skills">{m.nav.skills}</a>
			<a href="#contact">{m.nav.contact}</a>
		</nav>
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
		margin-left: auto;
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

	@media (max-width: 560px) {
		nav {
			display: none;
		}
		.lang {
			margin-left: auto;
		}
	}
</style>
