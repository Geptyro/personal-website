import { browser } from '$app/environment';
import type { Locale } from '$lib/content/translations';

export const i18n = $state<{ locale: Locale }>({ locale: 'en' });

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

export function setLocale(locale: Locale) {
	i18n.locale = locale;
	if (browser) {
		localStorage.setItem('locale', locale);
		document.documentElement.lang = locale;
	}
}
