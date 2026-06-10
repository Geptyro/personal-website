<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { pointerGlow } from '$lib/actions/pointerGlow';
	import type { Project } from '$lib/content/projects';

	let {
		id,
		title,
		subtitle,
		projects
	}: { id: string; title: string; subtitle: string; projects: Project[] } = $props();

	const accents = ['var(--violet)', 'var(--pink)', 'var(--orange)', 'var(--cyan)'];
</script>

<section class="section" {id}>
	<div class="container">
		<h2 class="section-title gradient-text" use:reveal>{title}</h2>
		<p class="section-subtitle" use:reveal={{ delay: 90 }}>{subtitle}</p>

		<div class="grid">
			{#each projects as project, index (project.title.en)}
				<article
					class="card"
					style="--accent: {accents[index % accents.length]}"
					use:reveal={{ delay: (index % 3) * 90 }}
					use:pointerGlow
				>
					<div class="top">
						<h3>{project.title[i18n.locale]}</h3>
						<span class="year">{project.year}</span>
					</div>
					<p class="desc">{project.description[i18n.locale]}</p>
					<ul class="tech">
						{#each project.tech as tech (tech)}
							<li>{tech}</li>
						{/each}
					</ul>
					{#if project.link}
						<a class="link" href={project.link} target="_blank" rel="noopener noreferrer">
							{project.linkLabel ?? project.link.replace(/^https?:\/\//, '')} ↗
						</a>
					{/if}
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
		gap: 1.5rem;
		margin-top: 2.5rem;
	}

	.card {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
		padding: 1.6rem;
		border-radius: var(--radius);
		border: 1px solid transparent;
		background:
			linear-gradient(var(--surface), var(--surface)) padding-box,
			linear-gradient(135deg, var(--accent), rgba(255, 255, 255, 0.06) 65%) border-box;
		transition: transform 0.25s, box-shadow 0.25s;
	}

	/* Spotlight that follows the cursor (position fed by the pointerGlow action) */
	.card::after {
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

	.card:hover {
		transform: translateY(-6px);
		box-shadow: 0 20px 50px -20px var(--accent);
	}

	.card:hover::after {
		opacity: 1;
	}

	.top {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
	}

	h3 {
		font-size: 1.3rem;
	}

	.year {
		font-family: var(--font-display);
		font-size: 0.8rem;
		color: var(--accent);
		font-weight: 600;
		white-space: nowrap;
	}

	.desc {
		margin: 0;
		color: var(--muted);
		flex: 1;
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

	.link {
		font-size: 0.85rem;
		color: var(--accent);
		text-decoration: none;
		font-weight: 600;
	}

	.link:hover {
		text-decoration: underline;
	}
</style>
