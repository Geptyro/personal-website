<script lang="ts">
	import { site } from '$lib/content/site';
	import { articles } from '$lib/content/articles';
	import IterationLoop from '$lib/articles/IterationLoop.svelte';
	import AssemblyLine from '$lib/articles/AssemblyLine.svelte';
	import CostCompare from '$lib/articles/CostCompare.svelte';
	import PriceForces from '$lib/articles/PriceForces.svelte';
	import BrainStats from '$lib/articles/BrainStats.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const article = articles.find((a) => a.slug === 'vision-of-ai')!;
	const formattedDate = new Date(article.date).toLocaleDateString('en-GB', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: 'UTC'
	});

	const canonical = `https://${site.domain}/articles/${article.slug}`;
	const jsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'BlogPosting',
			headline: article.title,
			description: article.description,
			datePublished: article.date,
			dateModified: article.date,
			author: { '@type': 'Person', name: site.name, url: `https://${site.domain}` },
			publisher: { '@type': 'Person', name: site.name },
			mainEntityOfPage: canonical,
			image: data.ogImage,
			url: canonical
		})
	);
</script>

<svelte:head>
	<title>{article.title} — {site.name}</title>
	<meta name="description" content={article.description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={article.title} />
	<meta property="og:description" content={article.description} />
	<meta property="og:url" content={canonical} />
	<meta property="article:published_time" content={article.date} />
	<meta property="article:author" content={site.name} />
	<meta name="twitter:title" content={article.title} />
	<meta name="twitter:description" content={article.description} />
	{@html `<script type="application/ld+json">${jsonLd}<\/script>`}
</svelte:head>

<article class="container" lang="en">
	<header>
		<a class="back" href="/articles">← All articles</a>
		<h1>My vision of AI: <span class="gradient-text">two horizons</span></h1>
		<p class="meta-line">{formattedDate} · {article.readingMinutes} min read</p>
	</header>

	<div class="prose">
		<p class="lead">
			I build AI systems for a living — an agent platform at Michelin by day, a small fleet of
			personal tools at night. Ask me what I think about AI and my answer splits in two: what is
			true for the next few years, and what is true after that. Most debates about AI are two
			people arguing about different horizons without noticing.
		</p>

		<h2>Short term: the augmented engineer</h2>

		<h3>The iteration loop collapsed</h3>
		<p>
			Every developer runs the same loop, whether they name it or not: <strong
				>need → build → test → adjust the need → repeat</strong
			>. AI didn't change the shape of that loop. It changed the wall-clock time of one
			revolution — from hours or days to minutes, sometimes seconds.
		</p>
		<IterationLoop />
		<p>
			When implementation was the bottleneck, you batched your needs, tests came last (sometimes
			never), and re-scoping mid-flight was too expensive to consider. Now implementation is
			nearly free, and the other three phases finally get the room they always deserved: you
			re-scope mid-cycle because it costs nothing, and you test as you go because each delta is
			tiny. From the outside this looks like a looser quality bar. It isn't — <strong
				>the standards didn't drop, the blast radius per mistake shrank</strong
			>.
		</p>

		<h3>Building a tool is now cheaper than adapting to one</h3>
		<p>
			There used to be simple math behind every monolith: composing your own workflow cost
			weeks, so you adopted whatever heavy application covered 80% of your need (Blender,
			PowerPoint, a generic IDE) and bent yourself to its abstractions. That math inverted. When
			assembly costs minutes, <strong>the exact tool for your exact problem beats the generic one</strong>.
			I've stopped counting the throwaway tools I've built this year that would never have
			cleared the "worth building?" bar before: a dashboard for my own issue workflow, 3D assets
			generated as code because Blender wouldn't iterate at conversation speed, a VS Code
			extension for one workflow.
		</p>

		<h3>The UI flipped roles</h3>
		<p>
			This is the deeper reason the heavy applications are in trouble. Their interfaces were
			construction sites: every click mutated the artifact, and a tool's value was how fluent its
			menus were. Today intent goes in as text, output comes back as pixels, geometry, or code —
			and the interface's job is to let you <em>see, judge, and send the next instruction</em>.
			The UI didn't disappear; its role flipped. <strong
				>We don't build through UI anymore — we validate through it.</strong
			>
		</p>

		<h3>The assembly line reaches knowledge work</h3>
		<p>
			The industrial revolution's biggest lever wasn't the machine — it was reorganization. Work
			got split into a chain of dedicated stations, each stripped of everything that wasn't its
			core task, and output per person jumped by an order of magnitude. The friction between
			steps — fetching, carrying, waiting, remembering where you left off — got engineered out.
		</p>
		<p>
			The same reorganization is now coming for knowledge work, and building software is just the
			first station on the line. Look at how much of a developer's day <em>isn't</em> building:
			navigating Jira, cross-referencing GitLab, clicking through links, re-reading a thread to
			reload the state of a task into your own head. None of that is the work — it's friction
			around the work, and it's exactly what tooling and AI are stripping away. The dashboard I
			built for my own issue workflow exists for precisely this reason: it pulls the scattered
			state of every task into one place so I stop paying the navigation tax.
		</p>
		<p>
			Follow that to its end and the role changes shape. A developer — or whatever we call it
			next — starts to look less like someone who hunts across a dozen systems for context, and
			more like a <strong>pure function</strong>: an input arrives already carrying everything
			needed to act on it, you process it, you output the result. No trip to Jira, no digging
			through GitLab, no reconstructing where you left off.
		</p>
		<AssemblyLine />
		<p>
			There's a human half to this that tooling usually ignores. Even when the context is all
			present, a person still has to absorb it — and we're bad at reloading state cold. So the
			real design problem isn't only aggregating the data; it's presenting it the way human
			memory actually works. Lean on our cognitive biases instead of fighting them: <strong
				>recognition over recall</strong
			>
			(show me the thing, don't make me remember its name), spatial and visual memory (the same
			information in the same place every time), chunking, and cutting the cost of every context
			switch. The best context tool isn't the one that surfaces the most data — it's the one that
			gets a person back to <em>"I know where I am"</em> the fastest.
		</p>

		<h3>So what has value today?</h3>
		<p>
			If implementation is nearly free, the scarce resources move up the stack: <strong
				>taste, judgment, and verification capacity</strong
			>. Knowing what to build, recognizing when the output is wrong, and deciding when good
			enough is good enough. In practice I work in two modes: in a domain I know, I verify the
			output and iterate until it matches intent; in a domain I'm exploring, I don't audit the
			code at all — I audit the outcome. Both modes are judgment. Neither is typing.
		</p>

		<h3>The fleet versus the subscription</h3>
		<p>
			Can you already remove the human? Almost. In May 2026 the Bun team rewrote their runtime
			from Zig to Rust by orchestrating up to 64 concurrent Claude agents — over a million lines
			of code across 6,502 commits, peaking at 1,300 lines <em>per minute</em>, in eleven
			days.<sup><a href="#ref-1">1</a></sup> The numbers are genuinely hard to fathom. It worked.
			It also cost roughly $165,000 in tokens at public pricing,<sup><a href="#ref-1">1</a></sup>
			and the Zig language's own creator called the output "unreviewed slop"<sup
				><a href="#ref-2">2</a></sup
			> — which is the whole point: the fleet has velocity but no judgment on board. Meanwhile one
			senior engineer on a €200/month subscription ships a scoped app with taste, verification,
			and accountability included in the price.
		</p>
		<CostCompare />
		<p>
			That's why my short-term ideal is not "agents replace engineers" but <strong
				>engineers augmented by AI</strong
			>: the model supplies the velocity, the engineer supplies the scarce inputs. This
			equilibrium holds exactly as long as the economics above hold — which brings up the real
			question.
		</p>

		<h3>Will it stay this cheap?</h3>
		<p>
			Today's pricing is partly subsidized. OpenAI is deeply unprofitable — reportedly on track for
			a $14&nbsp;billion loss in 2026, with no profit expected before the end of the
			decade;<sup><a href="#ref-3">3</a></sup>
			Anthropic's path looks healthier, but the industry as a whole is spending far ahead of
			revenue, and at some point it has to earn margins — that pushes prices up. Pulling the other
			way: the cost of a fixed unit of capability keeps falling fast. Andreessen Horowitz calls it
			"LLMflation" — roughly a 10× drop per year for equivalent performance;<sup
				><a href="#ref-4">4</a></sup
			> Epoch AI measures a median of about 50× per year across benchmarks, though it cautions that
			the fastest recent drops may not persist.<sup><a href="#ref-5">5</a></sup>
			Both forces are real, and they pull in opposite directions.
		</p>
		<PriceForces />
		<p>
			My bet: capability-per-euro keeps improving even if sticker prices rise, and competition
			between labs keeps the corridor from drifting too far up. The augmented engineer stays the
			economic optimum for years — but it's an equilibrium worth watching, not a law of nature.
		</p>

		<h2>Long term: I don't see a ceiling</h2>
		<p>
			The honest long-term conversation starts with physics, not software. Energy, compute,
			land, cooling, chip supply — scaling AI runs into real, physical constraints, and they
			could slow everything down for a long time. I take those seriously.
		</p>
		<p>
			But if they get resolved (and industrial history is mostly the story of constraints
			getting resolved), I see nothing on the other side. <strong
				>I expect AI to eventually surpass humans in every domain.</strong
			>
		</p>
		<p>
			Why so confident? Because I don't believe in souls. A human mind is billions of neurons
			triggered by electricity and chemistry — about 86&nbsp;billion of them, forming trillions of
			synapses, running on roughly twenty watts.<sup><a href="#ref-6">6</a></sup> A biological
			computer, shaped by evolution. Extraordinary engineering. But engineering.
		</p>
		<BrainStats />
		<p>
			If there is no magic ingredient in the substrate, there is no property of thought that is
			reserved for it. The question was never <em>whether</em> another substrate can think — it's
			an engineering and economics question about when it gets cheap enough. Every argument for a
			permanent human ceiling that I've heard eventually smuggles in a soul through the back
			door.
		</p>

		<h2>Two horizons, one posture</h2>
		<p>
			Short term: the leverage belongs to engineers who adapt — who let the model do the typing
			and keep the judgment for themselves. Long term: I don't see a wall, only constraints we
			haven't cleared yet. I'd rather spend these years learning to wield the thing than
			debating whether it's allowed to surpass us.
		</p>

		<section class="references" aria-label="Sources">
			<h2>Sources</h2>
			<ol>
				<li id="ref-1">
					Bun's Zig→Rust rewrite — 1,009,272 lines added, 6,502 commits, ~1,300 lines/min peak,
					up to 64 concurrent agents, ~$165k in tokens, 11 days:
					<a href="https://bun.com/blog/bun-in-rust" target="_blank" rel="noopener noreferrer"
						>Bun's official write-up</a
					>.
				</li>
				<li id="ref-2">
					"Unreviewed slop" — the Zig creator's reaction:
					<a
						href="https://www.theregister.com/devops/2026/07/14/zig-creator-calls-buns-claude-rust-rewrite-unreviewed-slop/5270743"
						target="_blank"
						rel="noopener noreferrer">The Register</a
					>.
				</li>
				<li id="ref-3">
					OpenAI losses and profitability timeline:
					<a
						href="https://www.forbes.com/sites/paulocarvao/2026/05/21/anthropic-openai-enterprise-ai-profitability/"
						target="_blank"
						rel="noopener noreferrer">Forbes</a
					>.
				</li>
				<li id="ref-4">
					"LLMflation", ~10× annual drop for equivalent capability:
					<a
						href="https://a16z.com/llmflation-llm-inference-cost/"
						target="_blank"
						rel="noopener noreferrer">Andreessen Horowitz</a
					>.
				</li>
				<li id="ref-5">
					Inference price trends, ~50× median per year across benchmarks:
					<a
						href="https://epoch.ai/data-insights/llm-inference-price-trends"
						target="_blank"
						rel="noopener noreferrer">Epoch AI</a
					>.
				</li>
				<li id="ref-6">
					~86 billion neurons (Herculano-Houzel) and ~20 W brain power:
					<a
						href="https://www.pnas.org/doi/10.1073/pnas.1201895109"
						target="_blank"
						rel="noopener noreferrer">PNAS</a
					>
					·
					<a
						href="https://www.britannica.com/science/The-Human-Brain-Runs-on-Less-Power-than-a-Light-Bulb"
						target="_blank"
						rel="noopener noreferrer">Britannica</a
					>.
				</li>
			</ol>
		</section>
	</div>
</article>

<style>
	article {
		padding-block: 4rem 6rem;
	}

	.back {
		font-size: 0.9rem;
		color: var(--muted);
		text-decoration: none;
		transition: color 0.2s;
	}

	.back:hover {
		color: var(--text);
	}

	h1 {
		margin-top: 1.2rem;
		font-size: clamp(2rem, 5vw, 3.2rem);
		letter-spacing: -0.02em;
		max-width: 46rem;
	}

	.meta-line {
		margin-top: 0.8rem;
		color: var(--muted);
		font-size: 0.9rem;
	}

	.prose {
		max-width: 46rem;
		margin-top: 2.5rem;
	}

	.prose p {
		color: var(--muted);
		margin: 1.1rem 0;
	}

	.prose .lead {
		font-size: 1.15rem;
		color: var(--text);
	}

	.prose :is(strong) {
		color: var(--text);
	}

	.prose h2 {
		margin-top: 3.2rem;
		font-size: 1.8rem;
		letter-spacing: -0.01em;
	}

	.prose h3 {
		margin-top: 2.2rem;
		font-size: 1.25rem;
	}

	.prose sup {
		line-height: 0;
	}

	.prose sup a {
		color: var(--violet);
		text-decoration: none;
		font-weight: 600;
		padding: 0 0.1em;
	}

	.prose sup a:hover {
		text-decoration: underline;
	}

	.references {
		margin-top: 4rem;
		padding-top: 2rem;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}

	.references h2 {
		font-size: 1.3rem;
		margin-bottom: 1rem;
	}

	.references ol {
		margin: 0;
		padding-left: 1.2rem;
		display: grid;
		gap: 0.6rem;
	}

	.references li {
		color: var(--muted);
		font-size: 0.9rem;
	}

	.references a {
		color: var(--violet);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.references a:hover {
		color: var(--text);
	}

	/* Offset anchor jumps so the cited line clears the sticky header */
	:global(html) {
		scroll-padding-top: 5rem;
	}
</style>
