<script lang="ts">
	import { browser } from '$app/environment';
	import { i18n } from '$lib/i18n.svelte';
	import { getApplication } from '$lib/content/applications';
	import AppShell from '$lib/components/AppShell.svelte';
	import ModelViewer from '$lib/demos/ModelViewer.svelte';
	import FalcraShowcase from '$lib/demos/FalcraShowcase.svelte';

	const app = getApplication('falcra');

	// Scene showcase — flip `video: true` once a capture exists at
	// static/falcra/scenes/<id>.webm (short, muted, looping clips).
	type Scene = {
		id: string;
		video: boolean;
		title: Record<'en' | 'fr', string>;
		text: Record<'en' | 'fr', string>;
	};
	const scenes: Scene[] = [
		{
			id: 'day-night',
			video: false,
			title: { en: 'Day / night cycle', fr: 'Cycle jour / nuit' },
			text: {
				en: 'The day phase is economy — villagers mine, farm, cut wood; you place buildings, towers, walls and gates. At night the Arachnis march on the Town Hall.',
				fr: 'Le jour, c’est l’économie — les villageois minent, cultivent, coupent du bois ; vous placez bâtiments, tours, murs et portes. La nuit, les Arachnis marchent sur l’hôtel de ville.'
			}
		},
		{
			id: 'weather',
			video: false,
			title: { en: 'Weather, wind & god rays', fr: 'Météo, vent et rayons crépusculaires' },
			text: {
				en: 'Dynamic weather with wind-driven vegetation, volumetric god rays, cloud shadows sweeping the terrain, and fire that spreads and lights the night fights.',
				fr: 'Météo dynamique avec végétation animée par le vent, rayons volumétriques, ombres de nuages balayant le terrain, et feu qui se propage et éclaire les combats nocturnes.'
			}
		},
		{
			id: 'wildlife',
			video: false,
			title: { en: 'Wildlife & stylized nature', fr: 'Faune et nature stylisée' },
			text: {
				en: 'Birds flock over the settlement, stylized trees react to the wind — ambient life that makes the colony feel inhabited between sieges.',
				fr: 'Des oiseaux survolent la colonie, les arbres stylisés réagissent au vent — une vie ambiante qui rend le camp habité entre deux sièges.'
			}
		},
		{
			id: 'siege',
			video: false,
			title: { en: 'Night sieges', fr: 'Sièges nocturnes' },
			text: {
				en: 'Broodlings swarm, spitters shell your walls from range, broodmothers anchor the wave. Survive the night count, or lose the Town Hall and the run.',
				fr: 'Les broodlings pullulent, les spitters bombardent vos murs à distance, les broodmothers ancrent la vague. Survivez au décompte des nuits, ou perdez l’hôtel de ville — et la partie.'
			}
		}
	];

	const cast = [
		{ id: 'marine', url: '/falcra/marine.glb', label: 'Marine' },
		{ id: 'townhall', url: '/falcra/townHall.glb', label: { en: 'Town Hall', fr: 'Hôtel de ville' } },
		{ id: 'broodling', url: '/falcra/broodling.glb', label: 'Broodling' },
		{ id: 'broodmother', url: '/falcra/broodmother.glb', label: 'Broodmother' }
	];

	const t = $derived(
		{
			en: {
				liveTitle: 'Live scene',
				liveText:
					'This is not a video — it is the engine itself: plateau terrain, one wind field driving the grass, trees and drifting cloud shadows, ambient birds, and a villager pathfinding across it all, simulated in Web Workers over SharedArrayBuffer.',
				gameTitle: 'Homestead, the game built on it',
				gameText1:
					'Homestead is a colony-defense survival game: by day you run a villager economy and build up the settlement; by night you defend it against escalating waves of Arachnis. It is mechanically complete and playable end-to-end — win by surviving the night count, lose if the Town Hall falls or the squad wipes — with a persistent hero roster, unit loadouts and hub progression between runs, plus 1–2 player local split-screen co-op.',
				scenesTitle: 'Scenes',
				scenesText:
					'The part I keep pushing furthest is the environmental tech. Captures are coming — here is what each scene shows.',
				castTitle: 'Meet the cast',
				castText:
					'Real in-game models, straight from the asset pipeline (every one authored in code with mesh-x). Drag to orbit.',
				engineTitle: 'The engine',
				engineText1:
					'Homestead runs on Falcra, my JavaScript game engine for real-time multiplayer browser games. It pairs a data-oriented Entity Component System with mixin-based composition, runs simulation — movement, collision, navigation, swarms — across Web Workers over SharedArrayBuffer typed-array buffers, and renders with three.js / WebGPU.',
				engineText2:
					'Every feature splits into an entity-side system (pure simulation) and an optional render-side system, so the sim scales to thousands of entities without blocking the render thread. Client/server state sync and an RPC layer are built in. Falcra ships nothing game-specific — it also powers my other game prototypes.',
				soon: 'Capture coming soon'
			},
			fr: {
				liveTitle: 'Scène en direct',
				liveText:
					'Ce n’est pas une vidéo — c’est le moteur lui-même : terrain à plateaux, un champ de vent qui anime l’herbe, les arbres et les ombres de nuages, des oiseaux, et un villageois qui trouve son chemin à travers tout ça, simulé en Web Workers via SharedArrayBuffer.',
				gameTitle: 'Homestead, le jeu construit dessus',
				gameText1:
					'Homestead est un jeu de survie et défense de colonie : le jour, vous gérez une économie de villageois et développez le camp ; la nuit, vous le défendez contre des vagues d’Arachnis de plus en plus violentes. Il est mécaniquement complet et jouable de bout en bout — victoire en survivant au décompte des nuits, défaite si l’hôtel de ville tombe ou si l’escouade est anéantie — avec un roster de héros persistant, des loadouts d’unités, une progression entre les runs, et un co-op local 1–2 joueurs en écran scindé.',
				scenesTitle: 'Scènes',
				scenesText:
					'Ce que je pousse le plus loin, c’est la technologie environnementale. Les captures arrivent — voici ce que chaque scène montre.',
				castTitle: 'Le casting',
				castText:
					'De vrais modèles du jeu, directement sortis du pipeline d’assets (tous écrits en code avec mesh-x). Glissez pour orbiter.',
				engineTitle: 'Le moteur',
				engineText1:
					'Homestead tourne sur Falcra, mon moteur de jeu JavaScript pour jeux navigateur multijoueurs temps réel. Il associe un Entity Component System orienté données à une composition par mixins, exécute la simulation — déplacements, collisions, navigation, essaims — dans des Web Workers via SharedArrayBuffer, et rend avec three.js / WebGPU.',
				engineText2:
					'Chaque fonctionnalité se scinde en un système côté entité (simulation pure) et un système côté rendu optionnel, donc la simulation monte à des milliers d’entités sans bloquer le thread de rendu. Synchronisation d’état client/serveur et couche RPC intégrées. Falcra ne contient rien de spécifique à un jeu — il propulse aussi mes autres prototypes.',
				soon: 'Capture à venir'
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
		<h2 class="gradient-text">{t.engineTitle}</h2>
		<div class="prose">
			<p>{t.engineText1}</p>
			<p>{t.engineText2}</p>
		</div>
	</section>

	<section class="app-section">
		<h2 class="gradient-text">{t.gameTitle}</h2>
		<div class="prose">
			<p>{t.gameText1}</p>
		</div>
	</section>

	<section class="app-section">
		<h2 class="gradient-text">{t.scenesTitle}</h2>
		<p class="prose">{t.scenesText}</p>
		<div class="scenes">
			{#each scenes as scene (scene.id)}
				<article class="scene">
					{#if scene.video}
						<!-- svelte-ignore a11y_media_has_caption -->
						<video src="/falcra/scenes/{scene.id}.webm" autoplay muted loop playsinline></video>
					{:else}
						<div class="placeholder"><span>{t.soon}</span></div>
					{/if}
					<div class="body">
						<h3>{scene.title[i18n.locale]}</h3>
						<p>{scene.text[i18n.locale]}</p>
					</div>
				</article>
			{/each}
		</div>
	</section>

	<section class="app-section">
		<h2 class="gradient-text">{t.castTitle}</h2>
		<p class="prose">{t.castText}</p>
		{#if browser}
			<div class="cast">
				{#each cast as member (member.id)}
					<div class="cell">
						<ModelViewer src={member.url} atlas />
						<span class="caption">
							{typeof member.label === 'string' ? member.label : member.label[i18n.locale]}
						</span>
					</div>
				{/each}
			</div>
		{/if}
	</section>

</AppShell>

<style>
	.live-stage {
		margin-top: 1.4rem;
	}

	.scenes {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
		gap: 1.4rem;
		margin-top: 1.4rem;
	}

	.scene {
		display: flex;
		flex-direction: column;
		border-radius: var(--radius);
		border: 1px solid rgba(255, 255, 255, 0.08);
		background: var(--surface);
		overflow: hidden;
	}

	.scene video,
	.placeholder {
		aspect-ratio: 16 / 9;
		width: 100%;
		object-fit: cover;
	}

	.placeholder {
		display: grid;
		place-items: center;
		background: radial-gradient(
			circle at 50% 40%,
			color-mix(in srgb, var(--violet) 10%, var(--bg)),
			var(--bg) 75%
		);
	}

	.placeholder span {
		font-family: var(--font-display);
		font-size: 0.78rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--muted);
		border: 1px dashed rgba(255, 255, 255, 0.2);
		border-radius: 999px;
		padding: 0.4rem 1rem;
	}

	.body {
		padding: 1.1rem 1.3rem 1.3rem;
	}

	.body h3 {
		font-size: 1.05rem;
		margin-bottom: 0.4rem;
	}

	.body p {
		margin: 0;
		color: var(--muted);
		font-size: 0.92rem;
	}

	.cast {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr));
		gap: 1.2rem;
		margin-top: 1.4rem;
	}

	.cell {
		position: relative;
		aspect-ratio: 1;
		border-radius: 14px;
		border: 1px solid rgba(255, 255, 255, 0.08);
		background: radial-gradient(
			circle at 50% 40%,
			color-mix(in srgb, var(--violet) 8%, var(--surface)),
			var(--surface) 70%
		);
		overflow: hidden;
	}

	.caption {
		position: absolute;
		left: 12px;
		bottom: 10px;
		font-family: ui-monospace, 'JetBrains Mono', monospace;
		font-size: 0.75rem;
		color: var(--muted);
		pointer-events: none;
	}
</style>
