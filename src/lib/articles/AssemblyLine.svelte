<script lang="ts">
	// The dev-as-pure-function idea: context that used to be gathered by hand
	// (Jira, GitLab, docs, threads, remembered state) folds into the input,
	// leaving a clean input → process → output line.
	const sources = ['Jira', 'GitLab', 'Docs', 'Threads', 'Prior state'];
	const stages = ['Input', 'Process', 'Output'];
</script>

<figure>
	<div
		class="diagram"
		role="img"
		aria-label="Context that used to be gathered by hand from Jira, GitLab, docs, threads, and remembered state is folded into a single Input, which then flows through Process to Output."
	>
		<div class="sources">
			<p class="col-label">The old friction — gathered by hand</p>
			<div class="chips">
				{#each sources as source (source)}
					<span class="chip">{source}</span>
				{/each}
			</div>
		</div>

		<div class="bundle" aria-hidden="true">
			<span class="bundle-arrow">→</span>
			<span class="bundle-label">folds into</span>
		</div>

		<div class="line">
			{#each stages as stage, i (stage)}
				<div class="stage" class:input={i === 0}>{stage}</div>
				{#if i < stages.length - 1}
					<span class="link" aria-hidden="true">→</span>
				{/if}
			{/each}
		</div>
	</div>
	<figcaption>
		The context assembly that used to eat half the day becomes part of the input. What's left is a
		function.
	</figcaption>
</figure>

<style>
	figure {
		margin: 2.5rem 0;
	}

	.diagram {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1.25rem;
		background: var(--surface);
		border: 1px solid rgba(255, 255, 255, 0.07);
		border-radius: var(--radius);
		padding: 1.75rem 1.5rem;
	}

	.col-label {
		margin: 0 0 0.6rem;
		font-size: 0.75rem;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--muted);
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		max-width: 15rem;
	}

	.chip {
		font-size: 0.8rem;
		color: var(--muted);
		border: 1px solid rgba(255, 255, 255, 0.14);
		border-radius: 8px;
		padding: 0.25rem 0.6rem;
	}

	.bundle {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: var(--muted);
	}

	.bundle-arrow {
		font-size: 1.4rem;
		line-height: 1;
		color: var(--violet);
	}

	.bundle-label {
		font-size: 0.7rem;
		font-style: italic;
		margin-top: 0.2rem;
	}

	.line {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.stage {
		font-family: var(--font-display);
		font-weight: 600;
		font-size: 0.95rem;
		color: var(--text);
		background: var(--bg);
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 10px;
		padding: 0.6rem 1rem;
	}

	/* The input carries the context now — mark it as the important box */
	.stage.input {
		background:
			linear-gradient(var(--bg), var(--bg)) padding-box,
			var(--gradient) border-box;
		border: 1px solid transparent;
	}

	.link {
		color: var(--violet);
		font-size: 1.2rem;
	}

	figcaption {
		margin-top: 0.9rem;
		font-size: 0.85rem;
		color: var(--muted);
		text-align: center;
	}

	@media (max-width: 560px) {
		.bundle {
			flex-direction: row;
			gap: 0.4rem;
		}

		.bundle-arrow {
			transform: rotate(90deg);
		}
	}
</style>
