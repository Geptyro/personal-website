<script lang="ts">
	import { onMount } from 'svelte';
	import { i18n } from '$lib/i18n.svelte';
	import { LayoutNode, configureLayout, nodeFactories, layout, resetLayout } from 'panels-layout';
	import WelcomePanel from './panels/WelcomePanel.svelte';
	import FeaturesPanel from './panels/FeaturesPanel.svelte';
	import CodePanel from './panels/CodePanel.svelte';

	const t = $derived(
		{
			en: {
				hint: 'Drag tabs between groups, drop one on a group edge to split, resize with the splitters.',
				reset: 'Reset layout'
			},
			fr: {
				hint: 'Glissez les onglets entre les groupes, déposez-en un au bord pour scinder, redimensionnez avec les séparateurs.',
				reset: 'Réinitialiser'
			}
		}[i18n.locale]
	);

	const { makeGroup, makeSplit } = nodeFactories;

	onMount(() => {
		configureLayout({
			panelList: [
				{ type: 'welcome', label: i18n.locale === 'fr' ? 'Bienvenue' : 'Welcome' },
				{ type: 'features', label: i18n.locale === 'fr' ? 'Fonctionnalités' : 'Features' },
				{ type: 'code', label: 'Usage' }
			],
			components: { welcome: WelcomePanel, features: FeaturesPanel, code: CodePanel },
			storageKey: 'cd-panels-layout-demo-v1',
			buildDefault: () =>
				makeSplit('h', 0.55, makeGroup(['welcome', 'code']), makeGroup(['features']))
		});
	});
</script>

<div class="demo">
	<div class="toolbar">
		<p class="hint">{t.hint}</p>
		<button onclick={() => resetLayout()}>↺ {t.reset}</button>
	</div>

	<div class="workspace">
		{#if $layout}
			<LayoutNode node={$layout} />
		{/if}
	</div>
</div>

<style>
	.toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.hint {
		color: var(--muted);
		font-size: 0.9rem;
		margin: 0;
	}

	.toolbar button {
		font: inherit;
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--orange);
		background: color-mix(in srgb, var(--orange) 12%, transparent);
		border: 1px solid color-mix(in srgb, var(--orange) 35%, transparent);
		border-radius: 999px;
		padding: 0.35rem 0.9rem;
		cursor: pointer;
		white-space: nowrap;
		transition: background 0.2s;
	}

	.toolbar button:hover {
		background: color-mix(in srgb, var(--orange) 20%, transparent);
	}

	/* Theme panels-layout's CSS vars to match the site */
	.workspace {
		height: 26rem;
		border-radius: var(--radius);
		border: 1px solid rgba(255, 255, 255, 0.08);
		overflow: hidden;
		background: var(--bg);
		--bg: #0b0613;
		--bg-card: #160d26;
		--border: rgba(255, 255, 255, 0.1);
		--text: #f4ecff;
		--text-dim: #b3a4cc;
		--text-muted: #b3a4cc;
		--accent: #fb923c;
		--accent-bg: color-mix(in srgb, #fb923c 14%, transparent);
	}
</style>
