<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { translations } from '$lib/content/translations';
	import { site } from '$lib/content/site';
	import { applications } from '$lib/content/applications';
	import { pointerGlow } from '$lib/actions/pointerGlow';

	const m = $derived(translations[i18n.locale]);
</script>

<svelte:head>
	<title>{site.name} — {m.launcher.metaTitle}</title>
	<meta name="description" content={m.launcher.metaDescription} />
	<meta property="og:title" content="{site.name} — {m.launcher.metaTitle}" />
	<meta property="og:description" content={m.launcher.metaDescription} />
	<meta property="og:url" content="https://{site.domain}" />
</svelte:head>

<section class="launcher">
	<div class="container">
		<p class="availability"><span class="pulse" aria-hidden="true"></span>{m.hero.availability}</p>
		<h1 class="gradient-text">{site.name}</h1>
		<p class="role">{m.hero.role}</p>
		<p class="subtitle">{m.launcher.subtitle}</p>

		<div class="grid">
			{#each applications as app, index (app.slug)}
				<a
					class="tile"
					href={app.external ?? `/${app.slug}`}
					target={app.external ? '_blank' : undefined}
					rel={app.external ? 'noopener noreferrer' : undefined}
					style="--accent: {app.accent}; --delay: {index * 70}ms"
					use:pointerGlow
				>
					<div class="top">
						<span class="icon" aria-hidden="true">{app.icon}</span>
						<span class="status" class:wip={app.status === 'wip'}>
							{m.app.status[app.status]}
						</span>
					</div>
					<h2>{app.name}</h2>
					<p class="tagline">{app.tagline[i18n.locale]}</p>
					<div class="bottom">
						<ul class="tech">
							{#each app.tech as tech (tech)}
								<li>{tech}</li>
							{/each}
						</ul>
						<span class="open" aria-hidden="true">{m.launcher.open} →</span>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<style>
	.launcher {
		padding-block: 5rem 6rem;
	}

	.availability {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		margin: 0 0 1.4rem;
		font-family: var(--font-display);
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--green);
		border: 1px solid color-mix(in srgb, var(--green) 40%, transparent);
		background: color-mix(in srgb, var(--green) 10%, transparent);
		border-radius: 999px;
		padding: 0.4rem 1rem;
	}

	.pulse {
		width: 0.55rem;
		height: 0.55rem;
		border-radius: 50%;
		background: var(--green);
		animation: pulse 2s ease-out infinite;
	}

	@keyframes pulse {
		0% {
			box-shadow: 0 0 0 0 color-mix(in srgb, var(--green) 55%, transparent);
		}
		70% {
			box-shadow: 0 0 0 9px transparent;
		}
		100% {
			box-shadow: 0 0 0 0 transparent;
		}
	}

	h1 {
		font-size: clamp(2.4rem, 7vw, 4.5rem);
		letter-spacing: -0.03em;
	}

	.role {
		display: inline-block;
		margin-top: 1.1rem;
		font-family: var(--font-display);
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		font-size: 0.8rem;
		color: var(--cyan);
		border: 1px solid color-mix(in srgb, var(--cyan) 40%, transparent);
		background: color-mix(in srgb, var(--cyan) 10%, transparent);
		border-radius: 999px;
		padding: 0.4rem 1rem;
	}

	.subtitle {
		color: var(--muted);
		font-size: 1.15rem;
		margin: 1.2rem 0 0;
		max-width: 32rem;
	}

	.availability,
	h1,
	.role,
	.subtitle {
		animation: fade-up 0.7s ease both;
	}

	h1 {
		animation-delay: 0.08s;
	}

	.role {
		animation-delay: 0.18s;
	}

	.subtitle {
		animation-delay: 0.28s;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
		gap: 1.5rem;
		margin-top: 3rem;
	}

	.tile {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		padding: 1.6rem;
		border-radius: var(--radius);
		border: 1px solid transparent;
		text-decoration: none;
		background:
			linear-gradient(var(--surface), var(--surface)) padding-box,
			linear-gradient(135deg, var(--accent), rgba(255, 255, 255, 0.06) 65%) border-box;
		transition: transform 0.25s, box-shadow 0.25s;
		animation: fade-up 0.6s ease both;
		animation-delay: calc(0.35s + var(--delay));
	}

	/* Spotlight that follows the cursor (position fed by the pointerGlow action) */
	.tile::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		background: radial-gradient(
			230px circle at var(--glow-x, 50%) var(--glow-y, 50%),
			color-mix(in srgb, var(--accent) 16%, transparent),
			transparent 70%
		);
		opacity: 0;
		transition: opacity 0.3s;
		pointer-events: none;
	}

	.tile:hover {
		transform: translateY(-6px);
		box-shadow: 0 20px 50px -20px var(--accent);
	}

	.tile:hover::after {
		opacity: 1;
	}

	@keyframes fade-up {
		from {
			opacity: 0;
			transform: translateY(24px);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}

	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.icon {
		display: grid;
		place-items: center;
		width: 3.2rem;
		height: 3.2rem;
		font-size: 1.7rem;
		border-radius: 14px;
		background: color-mix(in srgb, var(--accent) 14%, transparent);
		border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
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

	h2 {
		font-size: 1.35rem;
		margin: 0;
	}

	.tagline {
		margin: 0;
		color: var(--muted);
		font-size: 0.95rem;
		flex: 1;
	}

	.bottom {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 1rem;
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
		font-size: 0.72rem;
		font-weight: 600;
		padding: 0.22rem 0.65rem;
		border-radius: 999px;
		background: color-mix(in srgb, var(--accent) 14%, transparent);
		color: color-mix(in srgb, var(--accent) 75%, white);
	}

	.open {
		font-family: var(--font-display);
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--accent);
		white-space: nowrap;
		opacity: 0;
		transform: translateX(-6px);
		transition: opacity 0.25s, transform 0.25s;
	}

	.tile:hover .open {
		opacity: 1;
		transform: none;
	}
</style>
