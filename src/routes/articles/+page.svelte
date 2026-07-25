<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { translations } from '$lib/content/translations';
	import { site } from '$lib/content/site';
	import { articles } from '$lib/content/articles';

	const m = $derived(translations[i18n.locale]);

	const formatDate = (iso: string) =>
		new Date(iso).toLocaleDateString(i18n.locale === 'fr' ? 'fr-FR' : 'en-GB', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			timeZone: 'UTC'
		});
</script>

<svelte:head>
	<title>{m.articles.title} — {site.name}</title>
	<meta name="description" content={m.articles.metaDescription} />
	<link rel="canonical" href="https://{site.domain}/articles" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="{m.articles.title} — {site.name}" />
	<meta property="og:description" content={m.articles.metaDescription} />
	<meta property="og:url" content="https://{site.domain}/articles" />
	<meta name="twitter:title" content="{m.articles.title} — {site.name}" />
	<meta name="twitter:description" content={m.articles.metaDescription} />
</svelte:head>

<section class="section container">
	<h1 class="section-title">{m.articles.title}</h1>
	<p class="section-subtitle">{m.articles.subtitle}</p>

	<div class="list">
		{#each articles as article (article.slug)}
			<a class="card" href="/articles/{article.slug}">
				<p class="date">{formatDate(article.date)} · {article.readingMinutes} min</p>
				<h2>{article.title}</h2>
				<p class="description">{article.description}</p>
				<div class="tags">
					{#each article.tags as tag (tag)}
						<span>{tag}</span>
					{/each}
				</div>
			</a>
		{/each}
	</div>
</section>

<style>
	.list {
		margin-top: 3rem;
		display: grid;
		gap: 1.5rem;
	}

	.card {
		display: block;
		background: var(--surface);
		border: 1px solid rgba(255, 255, 255, 0.07);
		border-radius: var(--radius);
		padding: 1.8rem 1.9rem;
		text-decoration: none;
		transition: transform 0.2s, border-color 0.2s;
	}

	.card:hover {
		transform: translateY(-3px);
		border-color: color-mix(in srgb, var(--violet) 45%, transparent);
	}

	.date {
		margin: 0;
		font-size: 0.85rem;
		color: var(--muted);
	}

	h2 {
		margin-top: 0.5rem;
		font-size: 1.4rem;
		letter-spacing: -0.01em;
	}

	.description {
		margin: 0.6rem 0 0;
		color: var(--muted);
		max-width: 46rem;
	}

	.tags {
		margin-top: 1rem;
		display: flex;
		gap: 0.5rem;
	}

	.tags span {
		font-size: 0.75rem;
		color: var(--muted);
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 999px;
		padding: 0.15rem 0.7rem;
	}
</style>
