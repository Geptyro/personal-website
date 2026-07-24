import { createHighlighterCore, type HighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';

export type CodeLang = 'jsx' | 'svelte';

const THEME = 'catppuccin-mocha';

let highlighterPromise: Promise<HighlighterCore> | null = null;

function getHighlighter(): Promise<HighlighterCore> {
	highlighterPromise ??= createHighlighterCore({
		themes: [import('shiki/themes/catppuccin-mocha.mjs')],
		langs: [import('shiki/langs/jsx.mjs'), import('shiki/langs/svelte.mjs')],
		engine: createJavaScriptRegexEngine({ forgiving: true })
	});
	return highlighterPromise;
}

/** Returns highlighted spans only (no pre/code wrapper) — see CodeBlock.svelte. */
export async function highlight(code: string, lang: CodeLang): Promise<string> {
	const highlighter = await getHighlighter();
	return highlighter.codeToHtml(code, { lang, theme: THEME, structure: 'inline' });
}
