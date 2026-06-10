<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { translations } from '$lib/content/translations';
	import { site } from '$lib/content/site';

	const m = $derived(translations[i18n.locale]);
</script>

<section class="section" id="contact">
	<div class="container inner">
		<h2 class="section-title gradient-text" use:reveal>{m.contact.title}</h2>
		<p class="text" use:reveal={{ delay: 90 }}>{m.contact.text}</p>
		<p class="availability" use:reveal={{ delay: 180 }}>
			<span class="pulse" aria-hidden="true"></span>{m.contact.availability}
		</p>
		<a class="btn" href="mailto:{site.email}" use:reveal={{ delay: 270 }}>{m.contact.button} ✦</a>
		<div class="socials" use:reveal={{ delay: 360 }}>
			<a href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>
			<span aria-hidden="true">·</span>
			<a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
			<span aria-hidden="true">·</span>
			<a href="mailto:{site.email}">{site.email}</a>
		</div>
	</div>
</section>

<style>
	.inner {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
	}

	.text {
		max-width: 30rem;
		color: var(--muted);
		font-size: 1.15rem;
		margin: 0;
	}

	.availability {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		max-width: 34rem;
		margin: 0;
		font-size: 0.95rem;
		font-weight: 500;
		color: color-mix(in srgb, var(--green) 70%, white);
		border: 1px solid color-mix(in srgb, var(--green) 35%, transparent);
		background: color-mix(in srgb, var(--green) 8%, transparent);
		border-radius: 999px;
		padding: 0.55rem 1.2rem;
	}

	.pulse {
		flex-shrink: 0;
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

	.btn {
		font-family: var(--font-display);
		font-weight: 600;
		font-size: 1.1rem;
		text-decoration: none;
		color: #fff;
		background: var(--gradient);
		padding: 1rem 2.2rem;
		border-radius: 999px;
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.btn:hover {
		transform: translateY(-3px) scale(1.03);
		box-shadow: 0 16px 45px -12px var(--pink);
	}

	.socials {
		display: flex;
		gap: 0.8rem;
		color: var(--muted);
		font-size: 0.95rem;
	}

	.socials a {
		color: var(--muted);
		transition: color 0.2s;
	}

	.socials a:hover {
		color: var(--text);
	}
</style>
