<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';
	import { initLocale } from '$lib/i18n.svelte';
	import Background from '$lib/components/Background.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();

	onMount(initLocale);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Background />
<Header />
<main>
	{@render children()}
</main>
<Footer />
