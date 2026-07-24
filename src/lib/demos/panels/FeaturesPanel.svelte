<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';

	const t = $derived(
		{
			en: [
				'Tab groups with reorderable, draggable tabs',
				'Row / column splits with resizable splitters',
				'Drag a tab to a group edge → splits in that direction',
				'Stack mode: auto-grid of all tabs in a group',
				'Layout tree persisted to localStorage',
				'Svelte 5 native — $state / $effect runes',
				'~950 lines, no runtime dependencies'
			],
			fr: [
				'Groupes d’onglets réordonnables en drag-and-drop',
				'Splits ligne / colonne avec séparateurs redimensionnables',
				'Onglet déposé au bord d’un groupe → split dans cette direction',
				'Mode pile : grille automatique des onglets d’un groupe',
				'Arbre de layout persisté en localStorage',
				'Svelte 5 natif — runes $state / $effect',
				'~950 lignes, aucune dépendance runtime'
			]
		}[i18n.locale]
	);
</script>

<ul>
	{#each t as feature (feature)}
		<li>{feature}</li>
	{/each}
</ul>

<style>
	ul {
		margin: 0;
		padding: 1rem 1.2rem 1rem 2.2rem;
		font-size: 0.9rem;
		color: var(--muted);
	}

	li {
		margin-bottom: 0.45rem;
	}

	li::marker {
		color: var(--orange);
	}
</style>
