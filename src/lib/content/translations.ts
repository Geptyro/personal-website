export type Locale = 'en' | 'fr';

export const locales: Locale[] = ['en', 'fr'];

// ✏️ EDIT ME — every piece of text on the site lives here, in both languages.
export const translations = {
	en: {
		meta: {
			title: 'Senior Software Engineer',
			description:
				'Personal website of Cédric Dessalles — senior software engineer at Michelin, building AI agent platforms. Work, experience, skills and contact.'
		},
		nav: {
			apps: 'Applications',
			resume: 'Résumé',
			articles: 'Articles'
		},
		articles: {
			title: 'Articles',
			subtitle: 'Ideas and lessons from building with AI. Written in English.',
			metaDescription:
				'Articles by Cédric Dessalles — AI, software engineering, and building with coding agents.'
		},
		launcher: {
			metaTitle: 'Senior Software Engineer',
			metaDescription:
				'Personal website of Cédric Dessalles — senior software engineer. Pick an application: résumé, grid-router, panels-layout, Sveld, mesh-x, Falcra.',
			subtitle: 'Every project here is an application. Pick one.',
			open: 'Open'
		},
		app: {
			back: 'All applications',
			status: {
				published: 'Published',
				wip: 'Work in progress'
			}
		},
		hero: {
			hello: "Hey, I'm",
			role: 'Senior Software Engineer @ Michelin',
			availability: 'Open to work · freelance',
			location: 'Lyon area, France',
			tagline:
				'I build AI-agent platforms and web apps shipped to 54 countries — from LLM integrations and real-time chat to the pipelines behind them.',
			workStyle:
				'Today I build almost everything with AI coding agents, directed by ten years of engineering judgment — so I ship and iterate fast, without compromising on quality.',
			ctaWork: 'See my work',
			ctaContact: 'Get in touch'
		},
		work: {
			title: 'Professional work',
			subtitle: 'Platforms I build and ship at Michelin.'
		},
		personal: {
			title: 'Side projects',
			subtitle: 'Tools, libraries and experiments I build for fun.'
		},
		experience: {
			title: 'Experience',
			subtitle: 'Ten+ years of software — from Microsoft desktop apps to AI agents.',
			education: 'Education'
		},
		skills: {
			title: 'Toolbox',
			subtitle: 'What I work with day to day.'
		},
		contact: {
			title: "Let's build something",
			text: 'Got a project, a job offer, or just want to say hi? My inbox is open.',
			availability:
				'Open to new roles and freelance missions — remote or hybrid, based in Lyon, open to relocation.',
			button: 'Say hello'
		},
		footer: {
			builtWith: 'Built with'
		}
	},
	fr: {
		meta: {
			title: 'Ingénieur logiciel senior',
			description:
				'Site personnel de Cédric Dessalles — ingénieur logiciel senior chez Michelin, création de plateformes d’agents IA. Projets, parcours, compétences et contact.'
		},
		nav: {
			apps: 'Applications',
			resume: 'CV',
			articles: 'Articles'
		},
		articles: {
			title: 'Articles',
			subtitle: 'Idées et retours d’expérience sur le développement avec l’IA. Rédigés en anglais.',
			metaDescription:
				'Articles de Cédric Dessalles — IA, ingénierie logicielle et développement avec des agents de code.'
		},
		launcher: {
			metaTitle: 'Ingénieur logiciel senior',
			metaDescription:
				'Site personnel de Cédric Dessalles — ingénieur logiciel senior. Choisissez une application : CV, grid-router, panels-layout, Sveld, mesh-x, Falcra.',
			subtitle: 'Ici, chaque projet est une application. Choisissez-en une.',
			open: 'Ouvrir'
		},
		app: {
			back: 'Toutes les applications',
			status: {
				published: 'Publié',
				wip: 'En cours'
			}
		},
		hero: {
			hello: 'Salut, moi c’est',
			role: 'Ingénieur logiciel senior @ Michelin',
			availability: 'Ouvert aux opportunités · freelance',
			location: 'Région lyonnaise, France',
			tagline:
				'Je construis des plateformes d’agents IA et des applications web déployées dans 54 pays — de l’intégration de LLM au chat temps réel, jusqu’aux pipelines qui les font tourner.',
			workStyle:
				'Aujourd’hui, je construis presque tout avec des agents de code IA, pilotés par dix ans d’expérience d’ingénierie — pour livrer et itérer vite, sans compromis sur la qualité.',
			ctaWork: 'Voir mes projets',
			ctaContact: 'Me contacter'
		},
		work: {
			title: 'Projets professionnels',
			subtitle: 'Des plateformes conçues et mises en production chez Michelin.'
		},
		personal: {
			title: 'Projets perso',
			subtitle: 'Outils, bibliothèques et expérimentations, pour le plaisir.'
		},
		experience: {
			title: 'Parcours',
			subtitle: 'Plus de dix ans de logiciel — des applis de bureau Microsoft aux agents IA.',
			education: 'Formation'
		},
		skills: {
			title: 'Boîte à outils',
			subtitle: 'Ce que j’utilise au quotidien.'
		},
		contact: {
			title: 'Construisons quelque chose',
			text: 'Un projet, une offre, ou juste envie de dire bonjour ? Ma boîte mail est ouverte.',
			availability:
				'Ouvert aux nouvelles opportunités et missions freelance — remote ou hybride, basé à Lyon, mobilité possible.',
			button: 'Dire bonjour'
		},
		footer: {
			builtWith: 'Fait avec'
		}
	}
} satisfies Record<Locale, unknown>;
