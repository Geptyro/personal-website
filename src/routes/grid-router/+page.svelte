<script lang="ts">
	import { browser } from '$app/environment';
	import { i18n } from '$lib/i18n.svelte';
	import { getApplication } from '$lib/content/applications';
	import AppShell from '$lib/components/AppShell.svelte';
	import GridRouterDemo from '$lib/demos/GridRouterDemo.svelte';

	const app = getApplication('grid-router');

	const t = $derived(
		{
			en: {
				demoTitle: 'Live demo',
				about: 'Why it exists',
				aboutText1:
					'Node-link diagrams get ugly fast: lines cut through boxes, overlap each other and become unreadable. grid-router rasterizes the canvas into a grid and routes every edge with A* — each cell can host one horizontal and one vertical run, so lanes separate themselves and crossings only happen where they are worth paying for.',
				aboutText2:
					'Edges that share a source and a bus merge into shared trunks (Steiner-style joins), like a real wiring loom. Crossings are disambiguated with hops — each bus cuts a small gap into the buses it crosses, so the line visually tunnels under. The core is framework-free; an optional Svelte 5 canvas lets you keep full ownership of the chips.',
				gallery: 'It scales to real diagrams',
				galleryText:
					'Schematics with named ports, org charts with merged reporting lines, pipeline maps detouring around keep-out zones, radial trees — all routed by the same engine.',
				galleryAlt: {
					circuit: 'Electronic circuit: real schematic symbols with positioned named ports',
					org: 'Org chart: reporting lines merge into buses per manager',
					pipeline: 'Oil & gas pipelines: product buses detouring around a keep-out zone',
					radial: 'Radial tree: color-coded limbs radiating from a central root'
				}
			},
			fr: {
				demoTitle: 'Démo interactive',
				about: 'Pourquoi ça existe',
				aboutText1:
					'Les diagrammes nœuds-liens deviennent vite illisibles : les lignes traversent les boîtes et se chevauchent. grid-router rastérise le canvas en grille et route chaque arête avec A* — chaque cellule accepte un passage horizontal et un vertical, donc les couloirs se séparent d’eux-mêmes et les croisements n’arrivent que là où ils valent leur coût.',
				aboutText2:
					'Les arêtes qui partagent une source et un bus fusionnent en troncs communs (jonctions de type Steiner), comme un vrai faisceau de câbles. Les croisements sont désambiguïsés par des « hops » — chaque bus découpe un petit espace dans ceux qu’il croise, la ligne semble passer dessous. Le cœur est sans framework ; un canvas Svelte 5 optionnel vous laisse la pleine propriété des chips.',
				gallery: 'Ça tient sur de vrais diagrammes',
				galleryText:
					'Schémas électroniques à ports nommés, organigrammes aux lignes fusionnées, cartes de pipelines contournant des zones interdites, arbres radiaux — tous routés par le même moteur.',
				galleryAlt: {
					circuit: 'Circuit électronique : symboles de schéma avec ports nommés positionnés',
					org: 'Organigramme : les lignes hiérarchiques fusionnent en bus par manager',
					pipeline: 'Pipelines pétroliers : bus de produits contournant une zone interdite',
					radial: 'Arbre radial : branches colorées rayonnant depuis la racine centrale'
				}
			}
		}[i18n.locale]
	);

	const shots = [
		{ src: '/grid-router/circuit.png', key: 'circuit' as const },
		{ src: '/grid-router/org-chart.png', key: 'org' as const },
		{ src: '/grid-router/pipeline.png', key: 'pipeline' as const },
		{ src: '/grid-router/radial-tree.png', key: 'radial' as const }
	];
</script>

<AppShell {app}>
	<section class="app-section">
		<h2 class="gradient-text">{t.demoTitle}</h2>
		{#if browser}
			<GridRouterDemo />
		{/if}
	</section>

	<section class="app-section">
		<h2 class="gradient-text">{t.about}</h2>
		<div class="prose">
			<p>{t.aboutText1}</p>
			<p>{t.aboutText2}</p>
		</div>
	</section>

	<section class="app-section">
		<h2 class="gradient-text">{t.gallery}</h2>
		<p class="prose">{t.galleryText}</p>
		<div class="gallery">
			{#each shots as shot (shot.key)}
				<img src={shot.src} alt={t.galleryAlt[shot.key]} loading="lazy" />
			{/each}
		</div>
	</section>
</AppShell>

<style>
	.gallery {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
		gap: 1.2rem;
		margin-top: 1.4rem;
	}

	.gallery img {
		width: 100%;
		height: auto;
		border-radius: 14px;
		border: 1px solid rgba(255, 255, 255, 0.08);
		background: var(--surface);
	}
</style>
