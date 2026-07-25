<script lang="ts">
	// Figures from Bun's Zig→Rust rewrite (May 2026): up to 64 concurrent agents,
	// ~$165k in tokens at public API pricing, 11 days. See sources in the article.
	const options = [
		{
			name: 'The agent fleet',
			figure: '~$165k',
			unit: 'in tokens, one rewrite',
			cost: 'up to 64 concurrent agents, 11 days',
			traits: ['1M+ lines, peaking 1,300/min', 'Impressive — and it shipped', 'Still needs humans to review'],
			highlight: false
		},
		{
			name: 'The augmented engineer',
			figure: '€200',
			unit: 'per month, flat',
			cost: 'one senior dev + a coding-agent subscription',
			traits: ['Smaller scope, days not hours', 'Judgment and verification included', 'Scales to the next project for free'],
			highlight: true
		}
	];
</script>

<figure>
	<div class="cards">
		{#each options as option (option.name)}
			<div class="card" class:highlight={option.highlight}>
				<p class="name">{option.name}</p>
				<p class="figure gradient-text">{option.figure}</p>
				<p class="unit">{option.unit}</p>
				<p class="cost">{option.cost}</p>
				<ul>
					{#each option.traits as trait (trait)}
						<li>{trait}</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
	<figcaption>Two ways to ship the same app in 2026. Today, the economics pick the engineer.</figcaption>
</figure>

<style>
	figure {
		margin: 2.5rem 0;
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
	}

	.card {
		background: var(--surface);
		border: 1px solid rgba(255, 255, 255, 0.07);
		border-radius: var(--radius);
		padding: 1.6rem 1.5rem;
	}

	.card.highlight {
		border-color: color-mix(in srgb, var(--violet) 55%, transparent);
	}

	.name {
		margin: 0;
		font-family: var(--font-display);
		font-weight: 600;
		color: var(--text);
	}

	.figure {
		margin: 0.7rem 0 0;
		font-family: var(--font-display);
		font-size: 2.6rem;
		font-weight: 700;
		line-height: 1;
	}

	.unit {
		margin: 0.25rem 0 0;
		color: var(--text);
		font-size: 0.95rem;
	}

	.cost {
		margin: 0.5rem 0 0;
		color: var(--muted);
		font-size: 0.85rem;
	}

	ul {
		margin: 1rem 0 0;
		padding: 0;
		list-style: none;
		display: grid;
		gap: 0.4rem;
	}

	li {
		color: var(--muted);
		font-size: 0.9rem;
		padding-left: 1.1rem;
		position: relative;
	}

	li::before {
		content: '·';
		position: absolute;
		left: 0.2rem;
		color: var(--violet);
		font-weight: 700;
	}

	figcaption {
		margin-top: 0.9rem;
		font-size: 0.85rem;
		color: var(--muted);
		text-align: center;
	}
</style>
