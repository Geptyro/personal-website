<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { translations } from '$lib/content/translations';
	import { site } from '$lib/content/site';
	import { proProjects, personalProjects } from '$lib/content/projects';
	import Hero from '$lib/components/Hero.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Contact from '$lib/components/Contact.svelte';

	const m = $derived(translations[i18n.locale]);
</script>

<svelte:head>
	<title>{site.name} — {m.meta.title}</title>
	<meta name="description" content={m.meta.description} />
	<meta property="og:title" content="{site.name} — {m.meta.title}" />
	<meta property="og:description" content={m.meta.description} />
	<meta property="og:url" content="https://{site.domain}/resume" />
</svelte:head>

<Hero />
<Projects id="work" title={m.work.title} subtitle={m.work.subtitle} projects={proProjects} />
<Projects
	id="projects"
	title={m.personal.title}
	subtitle={m.personal.subtitle}
	projects={personalProjects}
/>
<Experience />
<Skills />
<Contact />
