<script lang="ts">
	import { GridDiagram, type GridEdge } from 'grid-router/svelte';
	import { i18n } from '$lib/i18n.svelte';

	const t = $derived(
		{
			en: {
				hint: 'Hover a line or a person to light up the whole team — drag the knobs to re-route live.',
				res: 'Grid resolution',
				exitCost: 'Exit cost (bus merging)',
				hops: 'Crossing hops',
				grid: 'Show grid',
				shuffle: 'Shuffle people',
				routed: (ms: number) => `routed in ${ms.toFixed(1)} ms`
			},
			fr: {
				hint: 'Survolez une ligne ou une personne pour éclairer toute l’équipe — bougez les réglages pour re-router en direct.',
				res: 'Résolution de la grille',
				exitCost: 'Coût de sortie (fusion des bus)',
				hops: 'Sauts aux croisements',
				grid: 'Afficher la grille',
				shuffle: 'Mélanger',
				routed: (ms: number) => `routé en ${ms.toFixed(1)} ms`
			}
		}[i18n.locale]
	);

	interface Person {
		id: string;
		name: string;
		role: string;
		dept: 'exec' | 'eng' | 'product' | 'sales';
	}

	const LEVELS: Person[][] = [
		[{ id: 'ceo', name: 'Sam', role: 'CEO', dept: 'exec' }],
		[
			{ id: 'vpe', name: 'Ada', role: 'VP Eng', dept: 'eng' },
			{ id: 'vpp', name: 'Grace', role: 'VP Product', dept: 'product' },
			{ id: 'vps', name: 'Margaret', role: 'VP Sales', dept: 'sales' }
		],
		[
			{ id: 'em1', name: 'Linus', role: 'EM Platform', dept: 'eng' },
			{ id: 'em2', name: 'Barbara', role: 'EM Apps', dept: 'eng' },
			{ id: 'pm1', name: 'Alan', role: 'PM', dept: 'product' },
			{ id: 'ae1', name: 'Steve', role: 'AE', dept: 'sales' }
		],
		[
			{ id: 'd1', name: 'Ken', role: 'Dev', dept: 'eng' },
			{ id: 'd2', name: 'Dennis', role: 'Dev', dept: 'eng' },
			{ id: 'd3', name: 'Bjarne', role: 'Dev', dept: 'eng' },
			{ id: 'ds1', name: 'Don', role: 'Designer', dept: 'product' },
			{ id: 'ae2', name: 'Woz', role: 'AE', dept: 'sales' }
		]
	];
	let levels = $state(LEVELS);

	const REPORTS: Record<string, string[]> = {
		ceo: ['vpe', 'vpp', 'vps'],
		vpe: ['em1', 'em2'],
		em1: ['d1', 'd2'],
		em2: ['d3'],
		vpp: ['pm1'],
		pm1: ['ds1'],
		vps: ['ae1'],
		ae1: ['ae2']
	};

	// Departments follow the site palette; color follows the bus.
	const DEPT_COLORS: Record<Person['dept'], string> = {
		exec: '#34d399',
		eng: '#8b5cf6',
		product: '#ec4899',
		sales: '#fb923c'
	};

	const people = new Map(LEVELS.flat().map((p) => [p.id, p]));
	// bus per (manager, department): the CEO's lines to differently-colored
	// VPs must not share one trunk
	const edges: GridEdge[] = Object.entries(REPORTS).flatMap(([mgr, reports]) =>
		reports.map((r) => ({
			id: `${mgr}-${r}`,
			source: mgr,
			target: r,
			bus: people.get(r)?.dept ?? ''
		}))
	);

	let res = $state(12);
	let exitCost = $state(6);
	let hops = $state(true);
	let showGrid = $state(false);
	let routedMs = $state(0);

	function shuffle() {
		levels = levels.map((level) =>
			level
				.map((p) => ({ p, k: Math.random() }))
				.sort((a, b) => a.k - b.k)
				.map(({ p }) => p)
		);
	}

	let hoveredBus = $state<string | undefined>(undefined);
	let hoveredNode = $state<string | undefined>(undefined);
	const busKey = (e: GridEdge) => `${e.source}|${e.bus ?? ''}`;
	const activeBuses = $derived.by(() => {
		const s = new Set<string>();
		if (hoveredBus) s.add(hoveredBus);
		else if (hoveredNode) {
			for (const e of edges) {
				if (e.source === hoveredNode || e.target === hoveredNode) s.add(busKey(e));
			}
		}
		return s;
	});
	const anyHover = $derived(activeBuses.size > 0);
	const teamNodes = $derived.by(() => {
		const s = new Set<string>();
		if (hoveredNode) s.add(hoveredNode);
		for (const e of edges) {
			if (activeBuses.has(busKey(e))) {
				s.add(e.source);
				s.add(e.target);
			}
		}
		return s;
	});
</script>

<div class="demo">
	<p class="hint">{t.hint}</p>

	<div class="knobs">
		<label>
			{t.res} <b>{res}px</b>
			<input type="range" min="8" max="20" step="2" bind:value={res} />
		</label>
		<label>
			{t.exitCost} <b>{exitCost}</b>
			<input type="range" min="0" max="20" step="1" bind:value={exitCost} />
		</label>
		<label class="check"><input type="checkbox" bind:checked={hops} /> {t.hops}</label>
		<label class="check"><input type="checkbox" bind:checked={showGrid} /> {t.grid}</label>
		<button class="shuffle" onclick={shuffle}>⤮ {t.shuffle}</button>
		<span class="ms">{t.routed(routedMs)}</span>
	</div>

	<div class="board">
		<GridDiagram
			{edges}
			opts={{ res, exitCost }}
			{hops}
			{showGrid}
			revision={levels}
			onrouted={(info) => (routedMs = info.ms)}
			connStyle={(c) => ({
				color: DEPT_COLORS[people.get(c.target)?.dept ?? 'exec'],
				class: anyHover ? (activeBuses.has(c.bus) ? 'active' : 'dim') : ''
			})}
			onconnenter={(c) => {
				hoveredNode = undefined;
				hoveredBus = c.bus;
			}}
			onconnleave={(c) => {
				if (hoveredBus === c.bus) hoveredBus = undefined;
			}}
		>
			{#snippet children(register)}
				{#each levels as level, li (li)}
					<div class="level">
						{#each level as p (p.id)}
							<!-- svelte-ignore a11y_no_static_element_interactions -->
							<div
								class="person"
								class:lit={teamNodes.has(p.id)}
								class:faded={anyHover && !teamNodes.has(p.id)}
								style:--dept={DEPT_COLORS[p.dept]}
								use:register={p.id}
								onpointerenter={() => {
									hoveredBus = undefined;
									hoveredNode = p.id;
								}}
								onpointerleave={() => {
									if (hoveredNode === p.id) hoveredNode = undefined;
								}}
							>
								<span class="dot"></span>
								{p.name}
								<small>{p.role}</small>
							</div>
						{/each}
					</div>
				{/each}
			{/snippet}
		</GridDiagram>
	</div>
</div>

<style>
	.hint {
		color: var(--muted);
		font-size: 0.9rem;
		margin: 0 0 1rem;
	}

	.knobs {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 1.2rem;
		margin-bottom: 1.2rem;
		font-size: 0.85rem;
		color: var(--muted);
	}

	.knobs label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.knobs b {
		color: var(--text);
		font-variant-numeric: tabular-nums;
	}

	.knobs input[type='range'] {
		accent-color: var(--cyan);
		width: 7rem;
	}

	.knobs input[type='checkbox'] {
		accent-color: var(--cyan);
	}

	.shuffle {
		font: inherit;
		font-weight: 600;
		color: var(--cyan);
		background: color-mix(in srgb, var(--cyan) 12%, transparent);
		border: 1px solid color-mix(in srgb, var(--cyan) 35%, transparent);
		border-radius: 999px;
		padding: 0.35rem 0.9rem;
		cursor: pointer;
		transition: background 0.2s;
	}

	.shuffle:hover {
		background: color-mix(in srgb, var(--cyan) 20%, transparent);
	}

	.ms {
		margin-left: auto;
		font-family: var(--font-display);
		font-size: 0.78rem;
		color: var(--muted);
		font-variant-numeric: tabular-nums;
	}

	.board {
		background: var(--surface);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: var(--radius);
		padding: 1.4rem;
		overflow-x: auto;
		--grid-diagram-bg: var(--surface);
	}

	.level {
		display: flex;
		justify-content: center;
		gap: var(--gr-chip-gap, 16px);
		min-width: 640px;
	}

	.level + .level {
		margin-top: var(--gr-row-gap, 44px);
	}

	.person {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.45rem 0.9rem;
		border-radius: 10px;
		background: var(--bg);
		border: 1px solid rgba(255, 255, 255, 0.12);
		font-size: 0.85rem;
		font-weight: 600;
		white-space: nowrap;
		transition: opacity 0.2s, border-color 0.2s;
	}

	.person small {
		color: var(--muted);
		font-weight: 400;
	}

	.person .dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--dept);
	}

	.person.lit {
		border-color: var(--dept);
	}

	.person.faded {
		opacity: 0.35;
	}

	.board :global(path.gr-conn.active) {
		stroke-width: 2.2;
	}

	.board :global(path.gr-conn.dim) {
		opacity: 0.15;
	}
</style>
