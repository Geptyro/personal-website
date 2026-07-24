<script lang="ts">
	import type { Component } from 'svelte';
	import { i18n } from '$lib/i18n.svelte';

	const t = $derived(
		{
			en: {
				launch: 'Launch the scene',
				loading: 'Booting the engine…',
				intro: 'Real engine, real simulation — running in your browser.',
				bullets: 'Plateau terrain · wind · grass · birds · cloud shadows · pathfinding',
				hint: 'Right-click moves the villager · WASD/arrows pan · wheel zooms',
				isolationWarn:
					'This page is not cross-origin isolated, so the worker simulation cannot start. If you are running a dev build, make sure the COOP/COEP headers are enabled.',
				failed: 'The scene failed to start on this device/browser.',
				fullscreen: 'Fullscreen',
				exitFullscreen: 'Exit fullscreen'
			},
			fr: {
				launch: 'Lancer la scène',
				loading: 'Démarrage du moteur…',
				intro: 'Vrai moteur, vraie simulation — directement dans votre navigateur.',
				bullets: 'Plateau · vent · herbe · oiseaux · ombres de nuages · pathfinding',
				hint: 'Clic droit déplace le villageois · WASD/flèches pour la caméra · molette pour zoomer',
				isolationWarn:
					'Cette page n’est pas cross-origin isolated : la simulation en workers ne peut pas démarrer. En dev, vérifiez que les en-têtes COOP/COEP sont actifs.',
				failed: 'La scène n’a pas pu démarrer sur cet appareil/navigateur.',
				fullscreen: 'Plein écran',
				exitFullscreen: 'Quitter le plein écran'
			}
		}[i18n.locale]
	);

	let Scene = $state<Component<{ panels?: boolean }> | null>(null);
	let loading = $state(false);
	let error = $state<string | null>(null);
	let stageEl: HTMLDivElement;
	let isFullscreen = $state(false);

	function toggleFullscreen() {
		if (document.fullscreenElement) document.exitFullscreen();
		else stageEl.requestFullscreen();
	}

	async function launch() {
		if (loading || Scene) return;
		loading = true;
		error = null;
		try {
			if (!crossOriginIsolated) {
				error = t.isolationWarn;
				return;
			}
			const mod = await import('@falcra/homestead-game/src/showcase/showcase.scene.svelte');
			Scene = mod.default;
		} catch (e) {
			console.error('Falcra showcase failed to start', e);
			error = t.failed;
		} finally {
			loading = false;
		}
	}
</script>

<svelte:document onfullscreenchange={() => (isFullscreen = document.fullscreenElement === stageEl)} />

<div class="stage" class:live={Scene !== null} bind:this={stageEl}>
	{#if Scene}
		<Scene panels={false} />
		<button
			class="fullscreen"
			onclick={toggleFullscreen}
			title={isFullscreen ? t.exitFullscreen : t.fullscreen}
			aria-label={isFullscreen ? t.exitFullscreen : t.fullscreen}
		>
			{isFullscreen ? '🡼' : '⛶'}
		</button>
	{:else}
		<div class="poster">
			<p class="intro">{t.intro}</p>
			<p class="bullets">{t.bullets}</p>
			<button onclick={launch} disabled={loading}>
				{loading ? t.loading : `▶ ${t.launch}`}
			</button>
			{#if error}<p class="error">{error}</p>{/if}
		</div>
	{/if}
</div>

<style>
	.stage {
		position: relative;
		height: min(70vh, 44rem);
		border-radius: var(--radius);
		border: 1px solid rgba(255, 255, 255, 0.1);
		overflow: hidden;
		background:
			radial-gradient(
				ellipse at 50% 30%,
				color-mix(in srgb, var(--violet) 14%, transparent),
				transparent 65%
			),
			var(--surface);
	}

	.poster {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.8rem;
		text-align: center;
		padding: 2rem;
	}

	.intro {
		font-family: var(--font-display);
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0;
	}

	.bullets {
		color: var(--muted);
		font-size: 0.95rem;
		margin: 0;
	}

	button {
		margin-top: 1rem;
		font-family: var(--font-display);
		font-size: 1rem;
		font-weight: 600;
		color: #fff;
		background: var(--gradient);
		border: none;
		border-radius: 999px;
		padding: 0.9rem 2rem;
		cursor: pointer;
		transition: transform 0.2s, box-shadow 0.2s;
	}

	button:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 12px 35px -10px var(--pink);
	}

	button:disabled {
		opacity: 0.7;
		cursor: wait;
	}

	.error {
		max-width: 34rem;
		color: var(--orange);
		font-size: 0.9rem;
	}

	/* The scene renders its own canvas at 100%×100% + absolute overlays. */
	.stage.live :global(canvas) {
		width: 100%;
		height: 100%;
		display: block;
	}

	.stage:fullscreen {
		height: 100vh;
		border-radius: 0;
		border: none;
	}

	.fullscreen {
		position: absolute;
		top: 10px;
		right: 10px;
		display: grid;
		place-items: center;
		width: 2.3rem;
		height: 2.3rem;
		font-size: 1.1rem;
		color: var(--text);
		background: rgba(0, 0, 0, 0.55);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 10px;
		cursor: pointer;
		transition: background 0.2s;
	}

	.fullscreen:hover {
		background: rgba(0, 0, 0, 0.8);
	}

</style>
