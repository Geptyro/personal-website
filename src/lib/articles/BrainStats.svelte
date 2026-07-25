<script lang="ts">
	const stats = [
		{ figure: '~86 billion', label: 'neurons' },
		{ figure: '~100 trillion', label: 'synapses' },
		{ figure: '~20 W', label: 'power draw' }
	];
</script>

<figure>
	<div class="tiles">
		{#each stats as stat (stat.label)}
			<div class="tile">
				<p class="figure gradient-text">{stat.figure}</p>
				<p class="label">{stat.label}</p>
			</div>
		{/each}
	</div>
	<figcaption>The hardware of human thought. Remarkable engineering — but engineering.</figcaption>
</figure>

<style>
	figure {
		margin: 2.5rem 0;
	}

	.tiles {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
		gap: 1.5rem;
	}

	.tile {
		background: var(--surface);
		border: 1px solid rgba(255, 255, 255, 0.07);
		border-radius: var(--radius);
		padding: 1.5rem 1.25rem;
		text-align: center;
	}

	.figure {
		margin: 0;
		font-family: var(--font-display);
		font-size: 1.9rem;
		font-weight: 700;
		line-height: 1.1;
	}

	.label {
		margin: 0.35rem 0 0;
		color: var(--muted);
		font-size: 0.9rem;
	}

	figcaption {
		margin-top: 0.9rem;
		font-size: 0.85rem;
		color: var(--muted);
		text-align: center;
	}
</style>
