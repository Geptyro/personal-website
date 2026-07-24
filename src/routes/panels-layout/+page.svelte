<script lang="ts">
	import { browser } from '$app/environment';
	import { i18n } from '$lib/i18n.svelte';
	import { getApplication } from '$lib/content/applications';
	import AppShell from '$lib/components/AppShell.svelte';
	import PanelsLayoutDemo from '$lib/demos/PanelsLayoutDemo.svelte';

	const app = getApplication('panels-layout');

	const t = $derived(
		{
			en: {
				demoTitle: 'Live demo',
				about: 'Why it exists',
				aboutText1:
					'IDE-style layouts — draggable tabs, split views, resizable panes — usually mean pulling in a heavy dependency and adopting its whole component model. panels-layout does the opposite: the host app owns the panel components, the library only manages the layout tree, tab rendering, drag-and-drop and splitter resizing.',
				aboutText2:
					'It is Svelte 5 native (runes, no legacy stores in the components), persists the whole layout to localStorage so users keep their arrangement across sessions, and fits in about 950 lines with zero runtime dependencies beyond Svelte itself.'
			},
			fr: {
				demoTitle: 'Démo interactive',
				about: 'Pourquoi ça existe',
				aboutText1:
					'Les layouts façon IDE — onglets déplaçables, vues scindées, panneaux redimensionnables — imposent d’habitude une grosse dépendance et son modèle de composants. panels-layout fait l’inverse : l’application hôte possède les composants des panneaux, la bibliothèque ne gère que l’arbre de layout, le rendu des onglets, le drag-and-drop et les séparateurs.',
				aboutText2:
					'Svelte 5 natif (runes), persistance complète du layout en localStorage pour retrouver son agencement d’une session à l’autre, le tout en ~950 lignes et zéro dépendance runtime en dehors de Svelte.'
			}
		}[i18n.locale]
	);
</script>

<AppShell {app}>
	<section class="app-section">
		<h2 class="gradient-text">{t.demoTitle}</h2>
		{#if browser}
			<PanelsLayoutDemo />
		{/if}
	</section>

	<section class="app-section">
		<h2 class="gradient-text">{t.about}</h2>
		<div class="prose">
			<p>{t.aboutText1}</p>
			<p>{t.aboutText2}</p>
		</div>
	</section>
</AppShell>
