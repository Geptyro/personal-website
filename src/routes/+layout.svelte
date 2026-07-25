<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { site } from '$lib/content/site';
	import favicon from '$lib/assets/favicon.svg';
	import { initLocale } from '$lib/i18n.svelte';
	import Background from '$lib/components/Background.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();

	// Site-wide share image. Any page can override by returning `ogImage` from its load
	// function (see /articles/vision-of-ai); otherwise every route falls back to this card.
	const ogImage = $derived(page.data.ogImage ?? `https://${site.domain}/og/site.png`);

	onMount(initLocale);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>

<Background />
<Header />
<main>
	{@render children()}
</main>
<Footer />
