<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { translations } from '$lib/content/translations';
	import { experiences, education } from '$lib/content/experience';

	const m = $derived(translations[i18n.locale]);
	const accents = ['var(--violet)', 'var(--pink)', 'var(--orange)', 'var(--cyan)'];
</script>

<section class="section" id="experience">
	<div class="container">
		<h2 class="section-title gradient-text" use:reveal>{m.experience.title}</h2>
		<p class="section-subtitle" use:reveal={{ delay: 90 }}>{m.experience.subtitle}</p>

		<ol class="timeline">
			{#each experiences as exp, index (exp.company + exp.period.en)}
				<li style="--accent: {accents[index % accents.length]}" use:reveal={{ delay: index * 70 }}>
					<span class="dot" aria-hidden="true"></span>
					<span class="period">{exp.period[i18n.locale]}</span>
					<h3>{exp.role[i18n.locale]} <span class="company">· {exp.company}</span></h3>
					<p>{exp.summary[i18n.locale]}</p>
				</li>
			{/each}
		</ol>

		<h3 class="edu-title" use:reveal>{m.experience.education}</h3>
		<ul class="education">
			{#each education as item, index (item.school)}
				<li use:reveal={{ delay: index * 80 }}>
					<span class="school">{item.school}</span>
					<span class="degree">{item.degree[i18n.locale]}</span>
					<span class="edu-period">{item.period}</span>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.timeline {
		list-style: none;
		margin: 2.5rem 0 0;
		padding: 0;
		position: relative;
	}

	.timeline::before {
		content: '';
		position: absolute;
		left: 0.4rem;
		top: 0.5rem;
		bottom: 0.5rem;
		width: 2px;
		background: linear-gradient(var(--violet), var(--pink), var(--orange));
		opacity: 0.5;
	}

	.timeline li {
		position: relative;
		padding-left: 2.2rem;
		padding-bottom: 2.4rem;
	}

	.timeline li:last-child {
		padding-bottom: 0;
	}

	.dot {
		position: absolute;
		left: 0;
		top: 0.35rem;
		width: 0.9rem;
		height: 0.9rem;
		border-radius: 50%;
		background: var(--accent);
		box-shadow: 0 0 14px var(--accent);
	}

	.period {
		font-family: var(--font-display);
		font-size: 0.8rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--accent);
	}

	.timeline h3 {
		font-size: 1.2rem;
		margin-top: 0.35rem;
	}

	.company {
		color: var(--muted);
		font-weight: 500;
	}

	.timeline p {
		margin: 0.5rem 0 0;
		color: var(--muted);
		max-width: 42rem;
	}

	.edu-title {
		margin-top: 3.5rem;
		font-size: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--cyan);
	}

	.education {
		list-style: none;
		margin: 1.2rem 0 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
	}

	.education li {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem 1rem;
		align-items: baseline;
	}

	.school {
		font-weight: 600;
	}

	.degree {
		color: var(--muted);
	}

	.edu-period {
		margin-left: auto;
		color: var(--muted);
		font-size: 0.85rem;
		font-family: var(--font-display);
	}
</style>
