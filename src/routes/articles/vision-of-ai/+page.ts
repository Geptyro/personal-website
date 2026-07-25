import { site } from '$lib/content/site';

// This article has its own share card; the layout picks this up via page.data.ogImage.
export const load = () => ({
	ogImage: `https://${site.domain}/og/vision-of-ai.png`
});
