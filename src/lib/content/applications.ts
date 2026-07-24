import type { Locale } from './translations';

export type AppStatus = 'published' | 'wip';

export type Application = {
	/** URL of the app page, e.g. `/resume` */
	slug: string;
	/** External apps: the launcher tile links here instead of an internal page */
	external?: string;
	name: string;
	/** Glyph shown on the launcher tile */
	icon: string;
	/** CSS color the tile and page accents derive from */
	accent: string;
	year: string;
	status: AppStatus;
	tagline: Record<Locale, string>;
	tech: string[];
	links: { label: string; href: string }[];
};

// ✏️ EDIT ME — one entry per "application"; drives the launcher and each app page header.
export const applications: Application[] = [
	{
		slug: 'resume',
		name: 'Résumé',
		icon: '📄',
		accent: 'var(--violet)',
		year: '2016 →',
		status: 'published',
		tagline: {
			en: 'Who I am, what I ship — work at Michelin, experience, skills and contact.',
			fr: 'Qui je suis, ce que je livre — projets Michelin, parcours, compétences et contact.'
		},
		tech: ['Senior engineer', 'AI agents', 'Web'],
		links: []
	},
	{
		slug: 'grid-router',
		name: 'grid-router',
		icon: '🔀',
		accent: 'var(--cyan)',
		year: '2026',
		status: 'published',
		tagline: {
			en: 'Orthogonal edge routing on a grid — A*, bus joins and crossing hops for node-link diagrams.',
			fr: 'Routage orthogonal d’arêtes sur grille — A*, bus partagés et croisements pour diagrammes.'
		},
		tech: ['TypeScript', 'A*', 'Svelte 5'],
		links: [
			{ label: 'GitHub', href: 'https://github.com/Geptyro/grid-router' },
			{ label: 'npm', href: 'https://www.npmjs.com/package/grid-router' },
			{ label: 'Examples', href: 'https://geptyro.github.io/grid-router/' }
		]
	},
	{
		slug: 'panels-layout',
		name: 'panels-layout',
		icon: '🪟',
		accent: 'var(--orange)',
		year: '2026',
		status: 'published',
		tagline: {
			en: 'Tab & split panel layouts for Svelte 5 — drag-and-drop tabs, splits, stack mode. ~950 lines.',
			fr: 'Layouts à onglets et panneaux pour Svelte 5 — drag-and-drop, splits, mode pile. ~950 lignes.'
		},
		tech: ['Svelte 5', 'Runes', 'Zero dependencies'],
		links: [{ label: 'GitHub', href: 'https://github.com/Geptyro/panels-layout' }]
	},
	{
		slug: 'sveld',
		name: 'Sveld',
		icon: '🔮',
		accent: 'var(--pink)',
		year: '2026',
		status: 'published',
		tagline: {
			en: 'Svelte components as live, interactive views inside VS Code — no server, no build pipeline.',
			fr: 'Des composants Svelte en vues interactives dans VS Code — sans serveur ni build.'
		},
		tech: ['VS Code extension', 'Svelte', 'Node.js'],
		links: [
			{
				label: 'VS Code Marketplace',
				href: 'https://marketplace.visualstudio.com/items?itemName=CdricDessalles.sveld'
			}
		]
	},
	{
		slug: 'mesh-x',
		name: 'mesh-x',
		icon: '🧊',
		accent: 'var(--green)',
		year: '2026',
		status: 'published',
		tagline: {
			en: 'Write JSX, get 3D meshes — primitives, CSG, skinning and animations exported to GLB.',
			fr: 'Écrivez du JSX, obtenez des meshes 3D — primitives, CSG, skinning et animations en GLB.'
		},
		tech: ['JSX', '3D', 'glTF'],
		links: [{ label: 'GitHub', href: 'https://github.com/Geptyro/mesh-x' }]
	},
	{
		slug: 'gw1-bestiary',
		external: 'https://gw1-bestiary.cedricdessalles.dev',
		name: 'GW1 Bestiary',
		icon: '🐉',
		accent: 'var(--green)',
		year: '2026',
		status: 'published',
		tagline: {
			en: 'A searchable bestiary for Guild Wars 1 — every creature, faceted search, fully prerendered.',
			fr: 'Un bestiaire consultable pour Guild Wars 1 — toutes les créatures, recherche à facettes, entièrement prérendu.'
		},
		tech: ['SvelteKit', 'Static', 'Search'],
		links: []
	},
	{
		slug: 'uar',
		external: 'https://uar.cedricdessalles.dev',
		name: 'UAR Wiki',
		icon: '🧟',
		accent: 'var(--pink)',
		year: '2026',
		status: 'published',
		tagline: {
			en: 'A wiki for Undead Assault Reborn (SC2 arcade) — 428 units, classes, items and mission flow, extracted from the map files.',
			fr: 'Un wiki pour Undead Assault Reborn (arcade SC2) — 428 unités, classes, objets et missions, extraits des fichiers de la carte.'
		},
		tech: ['SvelteKit', 'Static', 'StarCraft II'],
		links: [{ label: 'GitHub', href: 'https://github.com/Geptyro/uar-website' }]
	},
	{
		slug: 'falcra',
		name: 'Falcra',
		icon: '🏰',
		accent: 'var(--violet)',
		year: '2024 →',
		status: 'wip',
		tagline: {
			en: 'My JavaScript game engine — ECS, worker-parallel simulation, three.js/WebGPU — with a live scene from the colony-defense game built on it.',
			fr: 'Mon moteur de jeu JavaScript — ECS, simulation parallèle en workers, three.js/WebGPU — avec une scène en direct du jeu de défense de colonie construit dessus.'
		},
		tech: ['three.js', 'ECS', 'Workers', 'WebGPU'],
		links: []
	}
];

export function getApplication(slug: string): Application {
	const app = applications.find((a) => a.slug === slug);
	if (!app) throw new Error(`Unknown application: ${slug}`);
	return app;
}
