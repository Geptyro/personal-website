<script lang="ts">
	import { browser } from '$app/environment';
	import { i18n } from '$lib/i18n.svelte';
	import { getApplication } from '$lib/content/applications';
	import AppShell from '$lib/components/AppShell.svelte';
	import FalcraShowcase from '$lib/demos/FalcraShowcase.svelte';

	const app = getApplication('falcra');

	type Card ={ icon: string; title: Record<'en' | 'fr', string>; text: Record<'en' | 'fr', string> };

	// What the live scene is actually demonstrating — each card maps to something
	// you can see or trigger up there.
	const features: Card[] = [
		{
			icon: '🌬️',
			title: { en: 'One wind field', fr: 'Un seul champ de vent' },
			text: {
				en: 'Grass, trees, the cloth flags and the drifting cloud shadows all sample the same WindSystem — gusts travel visibly across everything at once.',
				fr: 'L’herbe, les arbres, les drapeaux en tissu et les ombres de nuages échantillonnent le même WindSystem — les rafales traversent visiblement tout en même temps.'
			}
		},
		{
			icon: '🕸️',
			title: { en: 'Worker-parallel simulation', fr: 'Simulation parallèle en workers' },
			text: {
				en: 'Movement, collision and pathfinding run in Web Workers over SharedArrayBuffer typed arrays — the render thread never blocks on the sim.',
				fr: 'Déplacements, collisions et pathfinding tournent dans des Web Workers via SharedArrayBuffer — le thread de rendu ne bloque jamais sur la simulation.'
			}
		},
		{
			icon: '🗺️',
			title: { en: 'Real pathfinding', fr: 'Vrai pathfinding' },
			text: {
				en: 'Right-click and the villager routes with A* over the occupancy grid — cliffs, trees, rocks and the town hall all block; ramps carry it up the plateaus.',
				fr: 'Au clic droit, le villageois se déplace en A* sur la grille d’occupation — falaises, arbres, rochers et hôtel de ville bloquent ; les rampes le hissent sur les plateaux.'
			}
		},
		{
			icon: '🐦',
			title: { en: 'Ambient wildlife', fr: 'Faune ambiante' },
			text: {
				en: 'Ground flocks, tree perchers and crane formations — walk the villager into a flock and it bursts, circles, then re-lands.',
				fr: 'Nuées au sol, oiseaux perchés et vols de grues — approchez le villageois d’une nuée : elle explose, tournoie, puis se repose.'
			}
		},
		{
			icon: '⛈️',
			title: { en: 'Storm mode', fr: 'Mode tempête' },
			text: {
				en: 'One toggle: world-anchored rain under the clouds, lightning bolts dropping from the deck with their own light, wet ground, whipping wind.',
				fr: 'Un seul bouton : pluie ancrée au monde sous les nuages, éclairs tombant du plafond nuageux avec leur propre lumière, sol mouillé, vent déchaîné.'
			}
		},
		{
			icon: '🧵',
			title: { en: 'GPU cloth', fr: 'Tissu simulé sur GPU' },
			text: {
				en: 'The town-hall flags are simulated in WebGPU compute — particle buffers, per-frame constraint solve, aero pressure and flutter.',
				fr: 'Les drapeaux de l’hôtel de ville sont simulés en compute WebGPU — buffers de particules, résolution de contraintes par frame, pression aéro et flottement.'
			}
		}
	];

	// The engine's architecture, at a glance.
	const architecture: Card[] = [
		{
			icon: '🧩',
			title: { en: 'Data-oriented ECS', fr: 'ECS orienté données' },
			text: {
				en: 'World → Entity → Node tree with tick-driven systems; components are plain typed-array views.',
				fr: 'Arbre World → Entity → Node avec systèmes cadencés ; les composants sont des vues sur typed arrays.'
			}
		},
		{
			icon: '🧬',
			title: { en: 'Mixin composition', fr: 'Composition par mixins' },
			text: {
				en: 'Capabilities are mixins (built on sools) that declare their dependencies; the mixer resolves and applies them in order.',
				fr: 'Les capacités sont des mixins (basés sur sools) qui déclarent leurs dépendances ; le mixer les résout et les applique dans l’ordre.'
			}
		},
		{
			icon: '⚙️',
			title: { en: 'Split entity / render', fr: 'Séparation entité / rendu' },
			text: {
				en: 'Every feature has an entity-side system (pure simulation) and an optional render-side system (three.js / WebGPU, TSL).',
				fr: 'Chaque fonctionnalité a un système côté entité (simulation pure) et un système côté rendu optionnel (three.js / WebGPU, TSL).'
			}
		},
		{
			icon: '🌐',
			title: { en: 'Multiplayer built in', fr: 'Multijoueur intégré' },
			text: {
				en: 'Client/server systems, state sync and an RPC layer ship with the engine — plus 1–2 player local split-screen.',
				fr: 'Systèmes client/serveur, synchronisation d’état et couche RPC livrés avec le moteur — plus un écran scindé local à 1–2 joueurs.'
			}
		}
	];

	const t = $derived(
		{
			en: {
				liveTitle: 'Live scene',
				liveText:
					'This is not a video — it is the engine itself, running in your browser. Launch it, move the villager, open the tuning panel, flip the storm on.',
				featuresTitle: "What you're looking at",
				engineTitle: 'The engine',
				engineText:
					'Falcra is my JavaScript game engine for real-time multiplayer browser games. It ships nothing game-specific — only the primitives — and powers a small fleet of prototypes; the simulation scales to thousands of entities without blocking the render thread.',
				gameTitle: 'The game built on it',
				gameText:
					'On top of the engine I am building a colony-defense survival game: by day you run a villager economy and build up the settlement; by night you defend it against escalating waves of enemies. It is mechanically complete and playable end-to-end — win by surviving the night count, lose if the town hall falls — with a persistent hero roster, loadouts, hub progression between runs, and 1–2 player local split-screen co-op.'
			},
			fr: {
				liveTitle: 'Scène en direct',
				liveText:
					'Ce n’est pas une vidéo — c’est le moteur lui-même, dans votre navigateur. Lancez-le, déplacez le villageois, ouvrez le panneau de réglages, déclenchez la tempête.',
				featuresTitle: 'Ce que vous regardez',
				engineTitle: 'Le moteur',
				engineText:
					'Falcra est mon moteur de jeu JavaScript pour jeux navigateur multijoueurs temps réel. Il ne contient rien de spécifique à un jeu — seulement les primitives — et propulse une petite flotte de prototypes ; la simulation monte à des milliers d’entités sans bloquer le thread de rendu.',
				gameTitle: 'Le jeu construit dessus',
				gameText:
					'Sur ce moteur, je construis un jeu de survie et défense de colonie : le jour, vous gérez une économie de villageois et développez le camp ; la nuit, vous le défendez contre des vagues d’ennemis de plus en plus violentes. Mécaniquement complet et jouable de bout en bout — victoire en survivant au décompte des nuits, défaite si l’hôtel de ville tombe — avec un roster de héros persistant, des loadouts, une progression entre les runs, et un co-op local 1–2 joueurs en écran scindé.'
			}
		}[i18n.locale]
	);
</script>

<AppShell {app}>
	<section class="app-section">
		<h2 class="gradient-text">{t.liveTitle}</h2>
		<p class="prose">{t.liveText}</p>
		{#if browser}
			<div class="live-stage"><FalcraShowcase /></div>
		{/if}
	</section>

	<section class="app-section">
		<h2 class="gradient-text">{t.featuresTitle}</h2>
		<div class="cards">
			{#each features as card (card.icon)}
				<article class="card">
					<div class="card-head">
						<span class="card-icon" aria-hidden="true">{card.icon}</span>
						<h3>{card.title[i18n.locale]}</h3>
					</div>
					<p>{card.text[i18n.locale]}</p>
				</article>
			{/each}
		</div>
	</section>

	<section class="app-section">
		<h2 class="gradient-text">{t.engineTitle}</h2>
		<p class="prose">{t.engineText}</p>
		<div class="cards">
			{#each architecture as card (card.icon)}
				<article class="card">
					<div class="card-head">
						<span class="card-icon" aria-hidden="true">{card.icon}</span>
						<h3>{card.title[i18n.locale]}</h3>
					</div>
					<p>{card.text[i18n.locale]}</p>
				</article>
			{/each}
		</div>
	</section>

	<section class="app-section">
		<h2 class="gradient-text">{t.gameTitle}</h2>
		<div class="prose">
			<p>{t.gameText}</p>
		</div>
	</section>
</AppShell>

<style>
	.live-stage {
		margin-top: 1.4rem;
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
		gap: 1.2rem;
		margin-top: 1.4rem;
	}

	.card {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 1.3rem 1.4rem;
		border-radius: var(--radius);
		border: 1px solid rgba(255, 255, 255, 0.08);
		background: var(--surface);
	}

	.card-head {
		display: flex;
		align-items: center;
		gap: 0.65rem;
	}

	.card-icon {
		font-size: 1.35rem;
		line-height: 1;
	}

	.card h3 {
		font-size: 1.02rem;
	}

	.card p {
		margin: 0;
		color: var(--muted);
		font-size: 0.9rem;
	}

</style>
