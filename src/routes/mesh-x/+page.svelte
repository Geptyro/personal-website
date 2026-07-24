<script lang="ts">
	import { browser } from '$app/environment';
	import { i18n } from '$lib/i18n.svelte';
	import { getApplication } from '$lib/content/applications';
	import AppShell from '$lib/components/AppShell.svelte';
	import MeshXDemo from '$lib/demos/MeshXDemo.svelte';
	import MeshXComposition from '$lib/demos/MeshXComposition.svelte';

	const app = getApplication('mesh-x');

	const t = $derived(
		{
			en: {
				demoTitle: 'Code in, mesh out',
				compositionTitle: 'Meshes compose like components',
				about: 'Why it exists',
				aboutText1:
					'3D assets normally live in a modeling tool — opaque binary files a code review can’t diff and a script can’t generate. mesh-x flips that: meshes are described declaratively in JSX (or a plain builder API) and exported to standard glTF/GLB that drops into three.js, Blender or any viewer.',
				aboutText2:
					'Because assets are code, they are parametric (a Robot({ eyeGlow }) component is a family of robots), versionable, and — the part I care most about — AI coding assistants can generate and edit them, something Blender-style tools can’t do efficiently. It covers primitives, boolean CSG, extrusions, skeleton skinning and procedural animations, and ships with its own VS Code extension for live preview.'
			},
			fr: {
				demoTitle: 'Du code entre, un mesh sort',
				compositionTitle: 'Les meshes se composent comme des composants',
				about: 'Pourquoi ça existe',
				aboutText1:
					'Les assets 3D vivent d’habitude dans un outil de modélisation — des binaires opaques qu’une revue de code ne peut pas diff-er et qu’un script ne peut pas générer. mesh-x inverse ça : les meshes sont décrits déclarativement en JSX (ou via une API builder) et exportés en glTF/GLB standard, utilisable dans three.js, Blender ou n’importe quel viewer.',
				aboutText2:
					'Les assets étant du code, ils sont paramétriques (un composant Robot({ eyeGlow }) est une famille de robots), versionnables, et — ce qui m’importe le plus — les assistants de code IA peuvent les générer et les modifier, ce que les outils type Blender ne permettent pas efficacement. Au menu : primitives, CSG booléen, extrusions, skinning squelettique et animations procédurales, plus une extension VS Code de prévisualisation.'
			}
		}[i18n.locale]
	);
</script>

<AppShell {app}>
	<section class="app-section">
		<h2 class="gradient-text">{t.demoTitle}</h2>
		{#if browser}
			<MeshXDemo />
		{/if}
	</section>

	<section class="app-section">
		<h2 class="gradient-text">{t.compositionTitle}</h2>
		{#if browser}
			<MeshXComposition />
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
