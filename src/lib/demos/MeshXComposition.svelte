<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import ModelViewer from './ModelViewer.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	const t = $derived(
		{
			en: {
				intro:
					'Because meshes are components, they compose like UI: a Cog and a Track become a RunningGear, two RunningGears and a hull become the Centurion tank.',
				parts: 'Parts',
				assembly: 'Sub-assembly',
				vehicle: 'Vehicle'
			},
			fr: {
				intro:
					'Les meshes étant des composants, ils se composent comme de l’UI : un Cog et une Track deviennent un RunningGear, deux RunningGears et une coque deviennent le tank Centurion.',
				parts: 'Pièces',
				assembly: 'Sous-ensemble',
				vehicle: 'Véhicule'
			}
		}[i18n.locale]
	);

	const runningGearCode = `<Group name="RunningGear">
  {cogs.map((c) => (
    <Cog
      position={[0, c.y, c.z]}
      radius={c.r}
      toothCount={teethFor(c.r)}
    >
      <RotationAnimation axis={[1, 0, 0]} />
    </Cog>
  ))}
  <Track
    points={beltPath(cogs)}
    padSpacing={padSpacing}
  />
</Group>`;

	const centurionCode = `<Scene name="Centurion">
  <AutoTrackCover side="right">
    <RunningGear position={[TRACK_X, 0, 0]} />
  </AutoTrackCover>
  <AutoTrackCover side="left">
    <RunningGear position={[-TRACK_X, 0, 0]} />
  </AutoTrackCover>
  {hullMesh}
  <Porthole
    position={[X, Y, Z]}
    width={0.6} height={0.4}
  />
  <DoubleDoor
    position={[0, DOOR_Y, DOOR_Z]}
    openAngle={Math.PI / 2}
  />
  <Empty name="Mount_Turret" />
</Scene>`;
</script>

<div class="composition">
	<p class="intro">{t.intro}</p>

	<div class="flow">
		<div class="stage">
			<p class="label">{t.parts}</p>
			<div class="stack">
				<div class="cell">
					<ModelViewer src="/mesh-x/cog.glb" atlas />
					<span class="caption">Cog.jsx</span>
				</div>
				<div class="cell">
					<ModelViewer src="/mesh-x/track.glb" atlas />
					<span class="caption">Track.jsx</span>
				</div>
			</div>
		</div>

		<span class="arrow" aria-hidden="true">→</span>

		<div class="stage">
			<p class="label">{t.assembly}</p>
			<div class="cell tall">
				<ModelViewer src="/mesh-x/runningGear.glb" atlas />
				<span class="caption">RunningGear.jsx</span>
			</div>
			<CodeBlock
				code={runningGearCode}
				--code-font-size="0.68rem"
				--code-max-height="15rem"
				--code-padding="0.9rem 1rem"
				--code-radius="14px"
			/>
		</div>

		<span class="arrow" aria-hidden="true">→</span>

		<div class="stage">
			<p class="label">{t.vehicle}</p>
			<div class="cell tall">
				<ModelViewer src="/mesh-x/centurion.glb" atlas />
				<span class="caption">Centurion.jsx</span>
			</div>
			<CodeBlock
				code={centurionCode}
				--code-font-size="0.68rem"
				--code-max-height="15rem"
				--code-padding="0.9rem 1rem"
				--code-radius="14px"
			/>
		</div>
	</div>
</div>

<style>
	.intro {
		color: var(--muted);
		max-width: 46rem;
		margin: 0 0 1.6rem;
	}

	.flow {
		display: grid;
		grid-template-columns: 1fr auto 1.15fr auto 1.15fr;
		align-items: stretch;
		gap: 0.9rem;
	}

	.arrow {
		align-self: center;
		font-size: 1.4rem;
		color: var(--green);
		opacity: 0.7;
	}

	.stage {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		min-width: 0;
	}

	.label {
		font-family: var(--font-display);
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--muted);
		text-align: center;
		margin: 0;
	}

	.stack {
		display: grid;
		grid-template-rows: 1fr 1fr;
		gap: 0.8rem;
		flex: 1;
	}

	.cell {
		position: relative;
		border-radius: 14px;
		border: 1px solid rgba(255, 255, 255, 0.08);
		background: radial-gradient(
			circle at 50% 40%,
			color-mix(in srgb, var(--green) 6%, var(--surface)),
			var(--surface) 70%
		);
		overflow: hidden;
		min-height: 9rem;
	}

	.cell.tall {
		min-height: 13rem;
		flex: 1;
	}

	.caption {
		position: absolute;
		left: 10px;
		bottom: 8px;
		font-family: ui-monospace, 'JetBrains Mono', monospace;
		font-size: 0.72rem;
		color: var(--muted);
		pointer-events: none;
	}

	@media (max-width: 860px) {
		.flow {
			grid-template-columns: 1fr;
		}

		.arrow {
			justify-self: center;
			rotate: 90deg;
		}
	}
</style>
