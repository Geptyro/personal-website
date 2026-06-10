import type { Locale } from './translations';

export type SkillGroup = {
	label: Record<Locale, string>;
	items: string[];
};

export const skillGroups: SkillGroup[] = [
	{
		label: { en: 'AI & agents', fr: 'IA & agents' },
		items: ['LLM integration', 'MCP', 'RAG & vectorization', 'Agent evaluation', 'Real-time chat']
	},
	{
		label: { en: 'Frontend', fr: 'Front-end' },
		items: ['JavaScript / TypeScript', 'Svelte / SvelteKit', 'Web components', 'three.js', 'JSX']
	},
	{
		label: { en: 'Backend & data', fr: 'Back-end & data' },
		items: ['Node.js', 'Express', 'MongoDB', 'SQL Server', 'Dynamics 365 CRM']
	},
	{
		label: { en: 'DevOps & cloud', fr: 'DevOps & cloud' },
		items: ['Docker', 'GitLab CI/CD', 'Cloudflare', 'fly.io', 'Caddy', 'Microsoft Azure']
	},
	{
		label: { en: 'Practices', fr: 'Pratiques' },
		items: [
			'AI-first development',
			'i18n at scale',
			'Multi-region deployment',
			'Unit / e2e / mutation testing',
			'VS Code extensions',
			'Tech lead & mentoring'
		]
	},
	{
		label: { en: 'Spoken languages', fr: 'Langues' },
		items: ['Français (natif)', 'English (fluent)']
	}
];
