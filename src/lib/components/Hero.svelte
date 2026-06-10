<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { parallax } from '$lib/actions/parallax';
	import { translations } from '$lib/content/translations';
	import { site } from '$lib/content/site';

	const m = $derived(translations[i18n.locale]);
</script>

<section class="hero" id="top">
	<div class="blob blob-a" aria-hidden="true" use:parallax={{ speed: 0.35 }}></div>
	<div class="blob blob-b" aria-hidden="true" use:parallax={{ speed: 0.55 }}></div>
	<div class="blob blob-c" aria-hidden="true" use:parallax={{ speed: 0.18 }}></div>

	<div class="container inner">
		<p class="availability"><span class="pulse" aria-hidden="true"></span>{m.hero.availability}</p>
		<p class="hello">{m.hero.hello}</p>
		<h1 class="gradient-text">{site.name}</h1>
		<p class="role">{m.hero.role}</p>
		<p class="location">📍 {m.hero.location}</p>
		<p class="tagline">{m.hero.tagline}</p>
		<p class="workstyle">{m.hero.workStyle}</p>
		<div class="cta">
			<a class="btn primary" href="#work">{m.hero.ctaWork}</a>
			<a class="btn ghost" href="#contact">{m.hero.ctaContact}</a>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		overflow: hidden;
		min-height: calc(100svh - 4rem);
		display: flex;
		align-items: center;
	}

	.inner {
		position: relative;
		z-index: 1;
		padding-block: 5rem;
	}

	.hello {
		font-size: 1.2rem;
		color: var(--muted);
		margin: 0 0 0.5rem;
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

	.availability,
	.hello,
	h1,
	.role,
	.location,
	.tagline,
	.workstyle,
	.cta {
		animation: fade-up 0.7s ease both;
	}

	.hello {
		animation-delay: 0.08s;
	}

	.role {
		animation-delay: 0.26s;
	}

	.location {
		animation-delay: 0.34s;
	}

	.tagline {
		animation-delay: 0.42s;
	}

	.workstyle {
		animation-delay: 0.5s;
	}

	.cta {
		animation-delay: 0.6s;
	}

	h1 {
		font-size: clamp(2.8rem, 9vw, 6rem);
		letter-spacing: -0.03em;
		background-size: 200% auto;
		animation:
			fade-up 0.7s 0.16s ease both,
			shimmer 8s 1.5s ease-in-out infinite;
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

	@keyframes shimmer {
		0%,
		100% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
	}

	.role {
		display: inline-block;
		margin-top: 1.2rem;
		font-family: var(--font-display);
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		font-size: 0.85rem;
		color: var(--cyan);
		border: 1px solid color-mix(in srgb, var(--cyan) 40%, transparent);
		background: color-mix(in srgb, var(--cyan) 10%, transparent);
		border-radius: 999px;
		padding: 0.4rem 1rem;
	}

	.location {
		margin: 0.9rem 0 0;
		color: var(--muted);
		font-size: 0.95rem;
	}

	.tagline {
		max-width: 34rem;
		font-size: 1.25rem;
		color: var(--muted);
		margin-top: 1.4rem;
	}

	.workstyle {
		max-width: 36rem;
		margin-top: 1.3rem;
		padding-left: 1.1rem;
		border-left: 3px solid transparent;
		border-image: var(--gradient) 1;
		font-size: 1.05rem;
		color: var(--text);
	}

	.cta {
		display: flex;
		gap: 1rem;
		margin-top: 2.5rem;
		flex-wrap: wrap;
	}

	.btn {
		font-family: var(--font-display);
		font-weight: 600;
		text-decoration: none;
		padding: 0.85rem 1.7rem;
		border-radius: 999px;
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.btn:hover {
		transform: translateY(-2px);
	}

	.btn.primary {
		background: var(--gradient);
		color: #fff;
	}

	.btn.primary:hover {
		box-shadow: 0 12px 35px -10px var(--pink);
	}

	.btn.ghost {
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.blob {
		position: absolute;
		width: 34rem;
		height: 34rem;
		border-radius: 50%;
		filter: blur(90px);
		opacity: 0.35;
		animation: float 14s ease-in-out infinite alternate;
	}

	.blob-a {
		background: var(--violet);
		top: -10rem;
		left: -8rem;
	}

	.blob-b {
		background: var(--pink);
		bottom: -12rem;
		right: -6rem;
		animation-delay: -5s;
	}

	.blob-c {
		background: var(--orange);
		top: 30%;
		right: 20%;
		width: 20rem;
		height: 20rem;
		opacity: 0.22;
		animation-delay: -9s;
	}

	@keyframes float {
		from {
			transform: translate(0, 0) scale(1);
		}
		to {
			transform: translate(3rem, -2.5rem) scale(1.15);
		}
	}
</style>
