<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';

	const t = $derived(
		{
			en: {
				title: 'This workspace is the demo',
				lines: [
					'Everything inside this frame is rendered by panels-layout.',
					'Drag a tab onto another group to move it, or to the edge of a group to split in that direction.',
					'Grab the splitters to resize. Your layout is saved to localStorage — reload the page, it survives.'
				]
			},
			fr: {
				title: 'Cet espace est la démo',
				lines: [
					'Tout ce qui se trouve dans ce cadre est rendu par panels-layout.',
					'Glissez un onglet sur un autre groupe pour le déplacer, ou vers le bord d’un groupe pour scinder dans cette direction.',
					'Attrapez les séparateurs pour redimensionner. Le layout est sauvegardé en localStorage — rechargez la page, il survit.'
				]
			}
		}[i18n.locale]
	);
</script>

<div class="panel">
	<h3>{t.title}</h3>
	{#each t.lines as line (line)}
		<p>{line}</p>
	{/each}
</div>

<style>
	.panel {
		padding: 1rem 1.2rem;
		font-size: 0.9rem;
	}

	h3 {
		font-size: 1rem;
		margin-bottom: 0.6rem;
	}

	p {
		color: var(--muted);
		margin: 0 0 0.6rem;
	}
</style>
