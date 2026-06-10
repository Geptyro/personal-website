import type { Locale } from './translations';

export type Experience = {
	company: string;
	role: Record<Locale, string>;
	period: Record<Locale, string>;
	summary: Record<Locale, string>;
};

export type Education = {
	school: string;
	degree: Record<Locale, string>;
	period: string;
};

export const experiences: Experience[] = [
	{
		company: 'Michelin',
		role: { en: 'Senior Software Engineer', fr: 'Ingénieur logiciel senior' },
		period: { en: 'Sept 2024 – today', fr: 'sept. 2024 – aujourd’hui' },
		summary: {
			en: 'Building an enterprise AI-agent platform for Michelin business units: multi-LLM integration with MCP, real-time chat, crawling and vectorization workflows, and an agent evaluation system.',
			fr: 'Développement d’une plateforme de création d’agents IA pour plusieurs équipes Michelin : intégration multi-LLM avec MCP, chat temps réel, workflows de crawling et de vectorisation, et système d’évaluation des agents.'
		}
	},
	{
		company: 'Michelin',
		role: { en: 'Technical Lead', fr: 'Technical Lead' },
		period: { en: 'Mar 2023 – Sept 2024', fr: 'mars 2023 – sept. 2024' },
		summary: {
			en: 'Technical coordination of a team of 5+ developers on a multi-brand platform; shipped the first account system on Michelin’s B2C websites; set coding standards and mentored junior developers.',
			fr: 'Coordination technique d’une équipe de 5+ développeurs sur une plateforme multi-marques ; lancement du premier système de compte des sites B2C Michelin ; standards de code et mentorat de développeurs juniors.'
		}
	},
	{
		company: 'Michelin',
		role: { en: 'Full Stack Developer', fr: 'Développeur full stack' },
		period: { en: 'Nov 2020 – Mar 2023', fr: 'nov. 2020 – mars 2023' },
		summary: {
			en: 'Built and maintained the global warranties, promotions and games platform serving 54 countries and 67 locales, with internationalization and multi-region deployment.',
			fr: 'Développement et maintenance de la plateforme mondiale de garanties, promotions et jeux desservant 54 pays et 67 locales, avec internationalisation et déploiement multi-région.'
		}
	},
	{
		company: 'Galadrim',
		role: { en: 'Full Stack Developer', fr: 'Développeur full stack' },
		period: { en: 'Jun 2018 – Nov 2019', fr: 'juin 2018 – nov. 2019' },
		summary: {
			en: 'MVP-oriented health platforms, from specification to delivery, working autonomously on full-stack client projects.',
			fr: 'Plateformes de santé orientées MVP, de la spécification à la livraison, en autonomie sur des projets clients full-stack.'
		}
	},
	{
		company: 'Projetlys',
		role: { en: 'Developer', fr: 'Développeur' },
		period: { en: 'Sept 2014 – Oct 2017', fr: 'sept. 2014 – oct. 2017' },
		summary: {
			en: 'Desktop and web applications on the Microsoft stack, covering the full project lifecycle from requirements to deployment.',
			fr: 'Applications de bureau et web sur la stack Microsoft, du recueil des besoins au déploiement.'
		}
	}
];

export const education: Education[] = [
	{
		school: 'École 42',
		degree: { en: 'Computer science', fr: 'Informatique' },
		period: '2017 – 2018'
	},
	{
		school: 'ISITECH',
		degree: { en: 'Information systems expert', fr: 'Expert en système d’information' },
		period: '2014 – 2017'
	},
	{
		school: 'Lycée Édouard Branly',
		degree: { en: 'BTS in computer science & networks (IRIS)', fr: 'BTS Informatique et Réseaux (IRIS)' },
		period: '2012 – 2014'
	}
];
