<script lang="ts">
	import type { Snippet } from 'svelte';
	import { i18n } from '$lib/i18n.svelte';
	import { translations } from '$lib/content/translations';
	import { site } from '$lib/content/site';
	import type { Application } from '$lib/content/applications';

	let { app, children }: { app: Application; children: Snippet } = $props();

	const m = $derived(translations[i18n.locale]);
</script>

<svelte:head>
	<title>{app.name} — {site.name}</title>
	<meta name="description" content={app.tagline.en} />
	<meta property="og:title" content="{app.name} — {site.name}" />
	<meta property="og:description" content={app.tagline.en} />
	<meta property="og:url" content="https://{site.domain}/{app.slug}" />
</svelte:head>

<div class="app-page" style="--accent: {app.accent}">
	<div class="container">
		<a class="back" href="/">← {m.app.back}</a>

		<header class="head">
			<span class="icon" aria-hidden="true">{app.icon}</span>
			<div class="titles">
				<h1><span class="gradient-text">{app.name}</span></h1>
				<p class="tagline">{app.tagline[i18n.locale]}</p>
			</div>
		</header>

		<div class="meta">
			<span class="status" class:wip={app.status === 'wip'}>{m.app.status[app.status]}</span>
			<span class="year">{app.year}</span>
			<ul class="tech">
				{#each app.tech as tech (tech)}
					<li>{tech}</li>
				{/each}
			</ul>
			{#if app.links.length}
				<span class="links">
					{#each app.links as link (link.href)}
						<a href={link.href} target="_blank" rel="noopener noreferrer">{link.label} ↗</a>
					{/each}
				</span>
			{/if}
		</div>

		{@render children()}
	</div>
</div>

<style>
	.app-page {
		padding-block: 3rem 6rem;
	}

	.back {
		display: inline-block;
		font-family: var(--font-display);
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--muted);
		text-decoration: none;
		margin-bottom: 2.2rem;
		transition: color 0.2s;
	}

	.back:hover {
		color: var(--text);
	}

	.head {
		display: flex;
		align-items: center;
		gap: 1.4rem;
	}

	.icon {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 4.2rem;
		height: 4.2rem;
		font-size: 2.2rem;
		border-radius: 18px;
		background: color-mix(in srgb, var(--accent) 14%, transparent);
		border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
	}

	h1 {
		font-size: clamp(2rem, 6vw, 3.4rem);
		letter-spacing: -0.02em;
	}

	.tagline {
		color: var(--muted);
		font-size: 1.1rem;
		margin: 0.5rem 0 0;
		max-width: 42rem;
	}

	.meta {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.8rem;
		margin-top: 1.6rem;
		padding-bottom: 2.4rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	}

	.status {
		font-family: var(--font-display);
		font-size: 0.72rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		padding: 0.25rem 0.7rem;
		border-radius: 999px;
		color: var(--green);
		background: color-mix(in srgb, var(--green) 12%, transparent);
	}

	.status.wip {
		color: var(--orange);
		background: color-mix(in srgb, var(--orange) 12%, transparent);
	}

	.year {
		font-family: var(--font-display);
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--accent);
	}

	.tech {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.tech li {
		font-size: 0.75rem;
		font-weight: 600;
		padding: 0.25rem 0.7rem;
		border-radius: 999px;
		background: color-mix(in srgb, var(--accent) 14%, transparent);
		color: color-mix(in srgb, var(--accent) 75%, white);
	}

	.links {
		display: flex;
		gap: 1rem;
		margin-left: auto;
	}

	.links a {
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--accent);
		text-decoration: none;
	}

	.links a:hover {
		text-decoration: underline;
	}
</style>
