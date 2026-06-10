import type { Locale } from './translations';

export type Project = {
	title: Record<Locale, string>;
	year: string;
	tech: string[];
	link?: string;
	linkLabel?: string;
	description: Record<Locale, string>;
};

// Professional work — shipped at Michelin.
export const proProjects: Project[] = [
	{
		title: { en: 'Enterprise AI agent platform', fr: 'Plateforme d’agents IA d’entreprise' },
		year: '2024 →',
		tech: ['LLM', 'MCP', 'RAG', 'Real-time chat'],
		description: {
			en: 'A platform where Michelin teams build their own AI agents — multi-LLM integration through MCP, automated web-crawling and vectorization pipelines, and an evaluation system to keep agents reliable.',
			fr: 'Une plateforme où les équipes Michelin créent leurs propres agents IA — intégration multi-LLM via MCP, pipelines automatisés de crawling web et de vectorisation, et système d’évaluation pour garantir des agents fiables.'
		}
	},
	{
		title: { en: 'Michelin B2C accounts', fr: 'Comptes B2C Michelin' },
		year: '2023–24',
		tech: ['Multi-brand', 'Auth', 'Personalization'],
		description: {
			en: 'The first user-account system on Michelin’s consumer websites: sign-up and personalized experiences on a multi-brand platform, leading a team of 5+ developers.',
			fr: 'Le premier système de compte des sites grand public Michelin : inscription et expériences personnalisées sur une plateforme multi-marques, à la tête d’une équipe de 5+ développeurs.'
		}
	},
	{
		title: { en: 'Global promotions platform', fr: 'Plateforme mondiale de promotions' },
		year: '2020–23',
		tech: ['i18n', '54 countries', '67 locales'],
		description: {
			en: 'Warranties, promotions and games for Michelin customers worldwide — one scalable, internationalized app with multi-region deployment.',
			fr: 'Garanties, promotions et jeux pour les clients Michelin du monde entier — une application évolutive, internationalisée et déployée multi-région.'
		}
	}
];

// Personal projects — built for fun, on my own time.
export const personalProjects: Project[] = [
	{
		title: { en: 'Sveld', fr: 'Sveld' },
		year: '2026',
		tech: ['VS Code extension', 'Svelte', 'Node.js'],
		link: 'https://marketplace.visualstudio.com/items?itemName=CdricDessalles.sveld',
		linkLabel: 'VS Code Marketplace',
		description: {
			en: 'A VS Code extension that renders .sveld files — Svelte components with a server-side data block — as live, interactive views right inside the editor. No web server, no build pipeline. Published on the Marketplace.',
			fr: 'Une extension VS Code qui rend les fichiers .sveld — des composants Svelte avec un bloc de données côté serveur — en vues interactives directement dans l’éditeur. Sans serveur web ni build. Publiée sur le Marketplace.'
		}
	},
	{
		title: { en: 'mesh-x', fr: 'mesh-x' },
		year: '2026',
		tech: ['JSX', '3D', 'VS Code extension'],
		link: 'https://github.com/Geptyro/mesh-x',
		description: {
			en: 'Author 3D assets in JSX — meshes described declaratively in code instead of a modeling tool. Since assets are code, AI coding assistants can generate and edit them, something Blender-style tools can’t do efficiently. Comes with its own VS Code extension.',
			fr: 'Création d’assets 3D en JSX — des meshes décrits déclarativement dans le code plutôt que dans un outil de modélisation. Les assets étant du code, les IA de codage peuvent les générer et les modifier — ce que Blender et consorts ne permettent pas efficacement. Livré avec sa propre extension VS Code.'
		}
	},
	{
		title: { en: 'Falcra', fr: 'Falcra' },
		year: 'WIP',
		tech: ['three.js', 'ECS', 'Workers', 'Multiplayer'],
		description: {
			en: 'A JavaScript game engine built on three.js — entity-component-system architecture, multithreading with workers, and multiplayer support. Work in progress.',
			fr: 'Un moteur de jeu JavaScript construit sur three.js — architecture ECS (entity-component-system), multithreading via workers, et support multijoueur. En cours de développement.'
		}
	},
	{
		title: { en: 'Starbor', fr: 'Starbor' },
		year: '2024',
		tech: ['Falcra', 'GitLab CI/CD', 'fly.io', 'Caddy'],
		description: {
			en: 'A game built on Falcra — and everything around shipping it: GitLab CI/CD pipelines, fly.io deployment, domain registration and a Caddy reverse proxy.',
			fr: 'Un jeu construit sur Falcra — et tout ce qui entoure sa mise en ligne : pipelines CI/CD GitLab, déploiement sur fly.io, enregistrement de domaine et reverse proxy Caddy.'
		}
	},
	{
		title: { en: 'sools', fr: 'sools' },
		year: '2024 →',
		tech: ['Full-stack', 'Express', 'MongoDB'],
		description: {
			en: 'A full-stack JavaScript framework to ship websites faster, with a strong emphasis on data handling — a modular ecosystem of packages covering auth, storage, modeling, wiki and more.',
			fr: 'Un framework JavaScript full-stack pour livrer des sites plus vite, avec un fort accent sur la gestion des données — un écosystème modulaire de packages : auth, stockage, modélisation, wiki…'
		}
	},
	{
		title: { en: 'hedera', fr: 'hedera' },
		year: '2024',
		tech: ['Custom elements', 'Web components', 'Reactivity'],
		description: {
			en: 'A frontend library built on custom elements: templating, inheritance and reactivity — all the good stuff, on top of web standards.',
			fr: 'Une bibliothèque front-end basée sur les custom elements : templating, héritage et réactivité — tout ce qu’il faut, au-dessus des standards du web.'
		}
	},
	{
		title: { en: 'panels-layout', fr: 'panels-layout' },
		year: '2026',
		tech: ['Svelte 5', 'Runes', 'Zero dependencies'],
		link: 'https://github.com/Geptyro/panels-layout',
		description: {
			en: 'A tab & split panel layout library for Svelte 5: drag-and-drop tabs, horizontal/vertical splits, stack mode and localStorage persistence — about 950 lines, no runtime dependencies.',
			fr: 'Une bibliothèque de layout à onglets et panneaux pour Svelte 5 : onglets en drag-and-drop, splits horizontaux/verticaux, mode pile et persistance localStorage — environ 950 lignes, sans dépendance.'
		}
	},
	{
		title: { en: 'Tea Brew', fr: 'Tea Brew' },
		year: '2026',
		tech: ['Sveld', 'MongoDB', 'Docker'],
		link: 'https://github.com/Geptyro/tea-brew',
		description: {
			en: 'A cold-brew tea tracker built on Sveld: live views to manage batches, compare brews and chart ratings — plus a Dockerized notifier that emails or texts me when it’s time for the next step.',
			fr: 'Un tracker de thé cold brew construit sur Sveld : vues live pour gérer les infusions, comparer les batches et visualiser les notes — plus un notifier Dockerisé qui me prévient par mail ou SMS à chaque étape.'
		}
	},
	{
		title: { en: 'cedricdessalles.dev', fr: 'cedricdessalles.dev' },
		year: '2026',
		tech: ['Svelte 5', 'TypeScript', 'Cloudflare'],
		link: 'https://github.com/Geptyro/personal-website',
		description: {
			en: 'The site you are looking at — Svelte 5, bold gradients, bilingual FR/EN.',
			fr: 'Le site que vous regardez — Svelte 5, dégradés audacieux, bilingue FR/EN.'
		}
	}
];
