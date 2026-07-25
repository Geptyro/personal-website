export type Article = {
	slug: string;
	title: string;
	description: string;
	/** ISO date — publication (or last major revision) */
	date: string;
	readingMinutes: number;
	tags: string[];
};

// ✏️ EDIT ME — one entry per article. Articles are written in English for now.
export const articles: Article[] = [
	{
		slug: 'vision-of-ai',
		title: 'My vision of AI: two horizons',
		description:
			'Short term, the augmented engineer beats the agent fleet. Long term, I see no ceiling — a mind is a biological computer, and computers get faster.',
		date: '2026-07-25',
		readingMinutes: 8,
		tags: ['ai', 'opinion']
	}
];
