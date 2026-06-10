<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { translations } from '$lib/content/translations';
	import { skillGroups } from '$lib/content/skills';

	const m = $derived(translations[i18n.locale]);
	const accents = ['var(--cyan)', 'var(--orange)', 'var(--pink)'];
</script>

<section class="section" id="skills">
	<div class="container">
		<h2 class="section-title gradient-text" use:reveal>{m.skills.title}</h2>
		<p class="section-subtitle" use:reveal={{ delay: 90 }}>{m.skills.subtitle}</p>

		<div class="groups">
			{#each skillGroups as group, index (group.items.join())}
				<div
					class="group"
					style="--accent: {accents[index % accents.length]}"
					use:reveal={{ delay: index * 90 }}
				>
					<h3>{group.label[i18n.locale]}</h3>
					<ul>
						{#each group.items as item (item)}
							<li>{item}</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.groups {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
		gap: 1.5rem;
		margin-top: 2.5rem;
	}

	h3 {
		font-size: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--accent);
		margin-bottom: 1rem;
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	li {
		padding: 0.45rem 1rem;
		border-radius: 999px;
		font-weight: 500;
		font-size: 0.9rem;
		border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
		background: color-mix(in srgb, var(--accent) 10%, transparent);
		transition: transform 0.2s, background 0.2s;
	}

	li:hover {
		transform: translateY(-2px);
		background: color-mix(in srgb, var(--accent) 22%, transparent);
	}
</style>
