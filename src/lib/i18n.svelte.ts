import { tick } from 'svelte';
import { browser } from '$app/environment';
import type { Locale } from '$lib/content/translations';

export const i18n = $state<{ locale: Locale }>({ locale: 'en' });

function applyLocale(locale: Locale) {
	i18n.locale = locale;
	if (browser) {
		localStorage.setItem('locale', locale);
		document.documentElement.lang = locale;
	}
}

/** Restore the saved language, or fall back to the browser language. Call once on mount. */
export function initLocale() {
	if (!browser) return;
	const saved = localStorage.getItem('locale');
	let locale: Locale;
	if (saved === 'en' || saved === 'fr') {
		locale = saved;
	} else {
		locale = navigator.language.toLowerCase().startsWith('fr') ? 'fr' : 'en';
	}
	i18n.locale = locale;
	document.documentElement.lang = locale;
}

/** Switch language with a page crossfade where the View Transitions API is available. */
export function setLocale(locale: Locale) {
	if (locale === i18n.locale) return;
	const doc = browser
		? (document as Document & { startViewTransition?: (callback: () => Promise<void>) => unknown })
		: undefined;
	if (doc?.startViewTransition) {
		doc.startViewTransition(async () => {
			applyLocale(locale);
			await tick();
		});
	} else {
		applyLocale(locale);
	}
}
