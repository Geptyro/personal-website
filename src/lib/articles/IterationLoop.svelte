<script lang="ts">
	// The dev loop (need → build → test → adjust) drawn twice: same shape,
	// different revolution time. The orbiting dot is the argument.
	const nodes = [
		{ label: 'need', angle: -90 },
		{ label: 'build', angle: 0 },
		{ label: 'test', angle: 90 },
		{ label: 'adjust', angle: 180 }
	];

	const R = 62;
	const C = 90; // center of the 180×180 viewBox

	function pos(angle: number) {
		const rad = (angle * Math.PI) / 180;
		return { x: C + R * Math.cos(rad), y: C + R * Math.sin(rad) };
	}

	const loops = [
		{ title: 'Before', period: 'one revolution: hours to days', duration: '9s' },
		{ title: 'With agents', period: 'one revolution: minutes', duration: '1.6s' }
	];
</script>

<figure>
	<div class="loops">
		{#each loops as loop (loop.title)}
			<div class="loop">
				<svg viewBox="-34 -10 248 200" role="img" aria-label="{loop.title} — {loop.period}">
					<circle cx={C} cy={C} r={R} class="track" />
					{#each nodes as node (node.label)}
						{@const p = pos(node.angle)}
						<circle cx={p.x} cy={p.y} r="5" class="node" />
						<text
							x={p.x + (node.angle === 0 ? 12 : node.angle === 180 ? -12 : 0)}
							y={p.y + (node.angle === -90 ? -14 : node.angle === 90 ? 20 : 4)}
							text-anchor={node.angle === 0 ? 'start' : node.angle === 180 ? 'end' : 'middle'}
						>
							{node.label}
						</text>
					{/each}
					<g class="orbit" style="animation-duration: {loop.duration}">
						<circle cx={C + R} cy={C} r="6" class="dot" />
					</g>
				</svg>
				<p class="loop-title">{loop.title}</p>
				<p class="loop-period">{loop.period}</p>
			</div>
		{/each}
	</div>
	<figcaption>
		The loop kept its shape — only the wall-clock time of one revolution changed.
	</figcaption>
</figure>

<style>
	figure {
		margin: 2.5rem 0;
	}

	.loops {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 1.5rem;
	}

	.loop {
		background: var(--surface);
		border: 1px solid rgba(255, 255, 255, 0.07);
		border-radius: var(--radius);
		padding: 1.5rem 1rem 1.25rem;
		text-align: center;
	}

	svg {
		width: min(200px, 70%);
		display: block;
		margin-inline: auto;
	}

	.track {
		fill: none;
		stroke: rgba(255, 255, 255, 0.12);
		stroke-width: 2;
	}

	.node {
		fill: var(--surface);
		stroke: var(--muted);
		stroke-width: 2;
	}

	svg text {
		fill: var(--muted);
		font-size: 12px;
		font-family: var(--font-body);
	}

	.orbit {
		transform-origin: 90px 90px;
		animation: spin linear infinite;
	}

	.dot {
		fill: var(--violet);
		stroke: var(--surface);
		stroke-width: 2;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.loop-title {
		margin: 0.75rem 0 0;
		font-family: var(--font-display);
		font-weight: 600;
		color: var(--text);
	}

	.loop-period {
		margin: 0.15rem 0 0;
		font-size: 0.85rem;
		color: var(--muted);
	}

	figcaption {
		margin-top: 0.9rem;
		font-size: 0.85rem;
		color: var(--muted);
		text-align: center;
	}
</style>
