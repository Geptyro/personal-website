<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import ModelViewer from './ModelViewer.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	const t = $derived(
		{
			en: {
				hint: 'Every model below is authored in JSX and compiled to GLB by mesh-x. Drag to orbit.'
			},
			fr: {
				hint: 'Chaque modèle ci-dessous est écrit en JSX et compilé en GLB par mesh-x. Glissez pour orbiter.'
			}
		}[i18n.locale]
	);

	const MODELS = [
		{
			id: 'chainsword',
			label: 'Chainsword',
			url: '/mesh-x/chainsword.glb',
			atlas: true,
			code: `export default function chainsword() {
  // S scales the weapon uniformly
  const S = 2.27
  const BLADE_LENGTH = 0.38 * S
  const BLADE_WIDTH  = 0.05 * S

  // tapered flat slab, beveled cross-section
  const BLADE_SECTIONS = [
    { z: BASE,            widthFactor: 1.0  },
    { z: BASE + 0.20 * S, widthFactor: 0.95 },
    { z: BASE + 0.30 * S, widthFactor: 0.85 },
    { z: TIP,             widthFactor: 0.08 },
  ]

  // chain teeth loop around the blade perimeter
  const chainPoints = bladePerimeterPoints(
    BLADE_SECTIONS, BLADE_WIDTH, BASE, TIP, S)

  return (
    <Scene name="Chainsword">
      <Blade sections={BLADE_SECTIONS} />
      <Chain points={chainPoints} />
      <Housing /> <Guard /> <Grip />
      <Pommel /> <GoldTrim /> <PowerGlow />
    </Scene>
  )
}`
		},
		{
			id: 'townhall',
			label: 'Town Hall',
			url: '/mesh-x/townhall.glb',
			atlas: true,
			code: `export default function townHallMasonry() {
  // Reuse the base TownHall builder VERBATIM
  // (massing, campanile, belfry arcade,
  //  swinging bell, clock, apse, quoins…)
  // but re-skin walls & roofs to FLAT swatches:
  const scene = townHall({
    wallSwatch: 'Stone_Flat',
    tileSwatch: 'Terracotta_Flat',
  })

  // …then lay genuine 3D relief over them:
  // running-bond ashlar stones proud of the
  // walls, recessed mortar joints showing the
  // flat base through as mortar
  layWallBlocks(scene)

  // Roman pan courses + rounded imbrex
  // ridges on the hall slopes, stepped
  // courses on the spire facets & apse cone
  layRoofTiles(scene)
  layApseConeTiles(scene)

  return scene
}`
		},
		{
			id: 'farsight',
			label: 'Farsight',
			url: '/mesh-x/farsight.glb',
			atlas: true,
			code: `// Farsight — magnified optic. Mounts on any
// weapon exposing an OPTIC rail (shared
// mountSpec drives the jaw profile).
export default function farsight({
  r = 0.015,   // main tube radius
  cz = 0.044,  // optic height above the rail
}) {
  const body = meshOf('ScopeBody', (geo) => {
    // eyepiece (flared, capped rear)
    taper(geo, -0.105, -0.072, r * 1.25, r, cz)
    // main tube
    tube(geo, -0.072, 0.048, r, cz)
    // magnification ring
    band(geo, -0.018, 0.004, r, r * 1.20, cz)
    // objective flare + bell + front face
    taper(geo, 0.048, 0.066, r, r * 1.5, cz)
    tube(geo, 0.066, 0.090, r * 1.5, cz)
    disc(geo, 0.090, r * 1.5, cz)
    // elevation turret + cap
    cylZ(geo, cz + r - 0.002, cz + r + 0.020, 0.008)
    cylZ(geo, cz + r + 0.018, cz + r + 0.024, 0.010)
    // twin ring mounts clamp the rail head,
    // jaws matched to the rail's own bevel
    for (const y of [-0.040, 0.030])
      ringMount(geo, y)
  })

  return (
    <Scene name="Farsight">
      {body}
      <Lens swatch="Optic_Lens" z={0.089} />
    </Scene>
  )
}`
		}
	];

	let selected = $state(MODELS[0]);
</script>

<div class="demo">
	<div class="toolbar">
		<div class="tabs" role="tablist">
			{#each MODELS as model (model.id)}
				<button
					role="tab"
					aria-selected={selected.id === model.id}
					class:active={selected.id === model.id}
					onclick={() => (selected = model)}
				>
					{model.label}
				</button>
			{/each}
		</div>
		<p class="hint">{t.hint}</p>
	</div>

	<div class="split">
		<CodeBlock code={selected.code} --code-font-size="0.74rem" --code-max-height="28rem" />
		<div class="viewer">
			<ModelViewer src={selected.url} atlas={selected.atlas} />
		</div>
	</div>
</div>

<style>
	.toolbar {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.tabs {
		display: flex;
		gap: 0.5rem;
	}

	.tabs button {
		font: inherit;
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--muted);
		background: transparent;
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 999px;
		padding: 0.35rem 1rem;
		cursor: pointer;
		transition: color 0.2s, background 0.2s, border-color 0.2s;
	}

	.tabs button.active {
		color: color-mix(in srgb, var(--green) 80%, white);
		background: color-mix(in srgb, var(--green) 14%, transparent);
		border-color: color-mix(in srgb, var(--green) 40%, transparent);
	}

	.hint {
		color: var(--muted);
		font-size: 0.9rem;
		margin: 0;
	}

	.split {
		display: grid;
		grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
		gap: 1.2rem;
	}

	.viewer {
		min-height: 28rem;
		border-radius: var(--radius);
		border: 1px solid rgba(255, 255, 255, 0.08);
		background: radial-gradient(
			circle at 50% 40%,
			color-mix(in srgb, var(--green) 7%, var(--surface)),
			var(--surface) 70%
		);
		overflow: hidden;
	}

	@media (max-width: 760px) {
		.split {
			grid-template-columns: 1fr;
		}

		.viewer {
			min-height: 20rem;
		}
	}
</style>
