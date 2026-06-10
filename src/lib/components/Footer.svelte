<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { translations } from '$lib/content/translations';
	import { site } from '$lib/content/site';

	const m = $derived(translations[i18n.locale]);
	const year = new Date().getFullYear();
</script>

<footer>
	<div class="container inner">
		<span>© {year} {site.name}</span>
		<span>
			{m.footer.builtWith}
			<a href="https://svelte.dev" target="_blank" rel="noopener noreferrer">Svelte</a>
			<span class="heart" aria-hidden="true">♥</span>
		</span>
	</div>
</footer>

<style>
	footer {
		border-top: 1px solid rgba(255, 255, 255, 0.06);
		padding-block: 2rem;
		color: var(--muted);
		font-size: 0.9rem;
	}

	.inner {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	a {
		color: var(--text);
		text-decoration: none;
		font-weight: 600;
	}

	a:hover {
		text-decoration: underline;
	}

	.heart {
		color: var(--pink);
	}
</style>
