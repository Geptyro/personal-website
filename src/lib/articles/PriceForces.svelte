<script lang="ts">
	// Illustrative, not a forecast: the two opposing forces on what you pay for AI.
	// Palette validated for CVD + contrast on --surface (#8b5cf6 / #0891b2).
	const years = [2026, 2027, 2028, 2029, 2030, 2031];
	const series = [
		{
			key: 'monetization',
			label: 'Monetization pull — labs need margins',
			color: '#8b5cf6',
			values: [100, 115, 130, 148, 168, 190]
		},
		{
			key: 'efficiency',
			label: 'Efficiency pull — same capability, less compute',
			color: '#0891b2',
			values: [100, 70, 50, 36, 26, 19]
		}
	];

	const W = 720;
	const H = 380;
	const M = { top: 28, right: 16, bottom: 40, left: 48 };
	const yMax = 200;
	const yTicks = [0, 50, 100, 150, 200];

	const x = (i: number) => M.left + (i * (W - M.left - M.right)) / (years.length - 1);
	const y = (v: number) => M.top + (1 - v / yMax) * (H - M.top - M.bottom);

	const linePath = (values: number[]) =>
		values.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(v)}`).join(' ');

	// Corridor between the two forces — where the sticker price actually lands.
	const bandPath =
		series[0].values.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(v)}`).join(' ') +
		[...series[1].values]
			.map((v, i) => ({ v, i }))
			.reverse()
			.map(({ v, i }) => `L${x(i)},${y(v)}`)
			.join(' ') +
		'Z';

	let hover: number | null = $state(null);
	let svgEl: SVGSVGElement | undefined = $state();

	function onMove(event: PointerEvent) {
		if (!svgEl) return;
		const rect = svgEl.getBoundingClientRect();
		const px = ((event.clientX - rect.left) / rect.width) * W;
		const step = (W - M.left - M.right) / (years.length - 1);
		const i = Math.round((px - M.left) / step);
		hover = Math.max(0, Math.min(years.length - 1, i));
	}
</script>

<figure>
	<div class="chart-head">
		<p class="chart-title">The two forces on your AI bill</p>
		<div class="legend" role="list">
			{#each series as s (s.key)}
				<span role="listitem"><i style="background: {s.color}"></i>{s.label}</span>
			{/each}
		</div>
	</div>

	<div class="chart-wrap">
		<div class="plot">
		<svg
			bind:this={svgEl}
			viewBox="0 0 {W} {H}"
			role="img"
			aria-label="Illustrative chart: monetization pressure pushes AI prices up while efficiency gains push them down; the shaded corridor between the two curves is where prices land."
			onpointermove={onMove}
			onpointerleave={() => (hover = null)}
		>
			{#each yTicks as tick (tick)}
				<line x1={M.left} x2={W - M.right} y1={y(tick)} y2={y(tick)} class="grid" />
				<text x={M.left - 8} y={y(tick) + 4} text-anchor="end" class="tick">{tick}</text>
			{/each}
			{#each years as year, i (year)}
				<text x={x(i)} y={H - M.bottom + 22} text-anchor="middle" class="tick">{year}</text>
			{/each}

			<path d={bandPath} class="band" />
			{#each series as s (s.key)}
				<path d={linePath(s.values)} fill="none" stroke={s.color} stroke-width="2" />
			{/each}

			<text x={M.left} y={M.top - 12} class="axis-label">Index — today = 100</text>
			<text x={x(2.5)} y={y(92)} text-anchor="middle" class="band-label">
				where prices land
			</text>

			{#if hover !== null}
				<line x1={x(hover)} x2={x(hover)} y1={M.top} y2={H - M.bottom} class="crosshair" />
				{#each series as s (s.key)}
					<circle cx={x(hover)} cy={y(s.values[hover])} r="4.5" fill={s.color} class="marker" />
				{/each}
			{/if}
		</svg>

		{#if hover !== null}
			<div
				class="tooltip"
				style="left: {(x(hover) / W) * 100}%; top: {(M.top / H) * 100}%"
			>
				<p class="tooltip-year">{years[hover]}</p>
				{#each series as s (s.key)}
					<p><i style="background: {s.color}"></i>{s.values[hover]}</p>
				{/each}
			</div>
		{/if}
		</div>
	</div>

	<figcaption>
		Illustrative — not a forecast. Efficiency makes each unit of capability cheaper; the need for
		margins pushes sticker prices up. Competition decides where in the corridor you land.
	</figcaption>
</figure>

<style>
	figure {
		margin: 2.5rem 0;
	}

	.chart-head {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.5rem 1.5rem;
		margin-bottom: 0.75rem;
	}

	.chart-title {
		margin: 0;
		font-family: var(--font-display);
		font-weight: 600;
		color: var(--text);
	}

	.legend {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem 1.2rem;
	}

	.legend span {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		font-size: 0.8rem;
		color: var(--muted);
	}

	.legend i,
	.tooltip i {
		width: 10px;
		height: 10px;
		border-radius: 3px;
		display: inline-block;
	}

	.chart-wrap {
		background: var(--surface);
		border: 1px solid rgba(255, 255, 255, 0.07);
		border-radius: var(--radius);
		padding: 0.75rem;
	}

	/* The tooltip is positioned as a % of this box, so it must match the SVG box
	   exactly (no padding) — otherwise it drifts from the crosshair at the edges. */
	.plot {
		position: relative;
	}

	svg {
		display: block;
		width: 100%;
		touch-action: none;
	}

	.grid {
		stroke: rgba(255, 255, 255, 0.06);
	}

	.tick,
	.axis-label,
	.band-label {
		fill: var(--muted);
		font-size: 12px;
		font-family: var(--font-body);
	}

	.axis-label {
		font-size: 11px;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.band {
		fill: rgba(255, 255, 255, 0.045);
	}

	.band-label {
		font-style: italic;
	}

	.crosshair {
		stroke: rgba(255, 255, 255, 0.25);
		stroke-dasharray: 3 3;
	}

	.marker {
		stroke: var(--surface);
		stroke-width: 2;
	}

	.tooltip {
		position: absolute;
		transform: translate(-50%, -0.25rem);
		background: var(--bg);
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 10px;
		padding: 0.5rem 0.7rem;
		pointer-events: none;
		white-space: nowrap;
	}

	.tooltip p {
		margin: 0;
		display: flex;
		align-items: center;
		gap: 0.45rem;
		font-size: 0.8rem;
		color: var(--text);
	}

	.tooltip-year {
		font-weight: 600;
		font-family: var(--font-display);
	}

	figcaption {
		margin-top: 0.9rem;
		font-size: 0.85rem;
		color: var(--muted);
		text-align: center;
	}
</style>
