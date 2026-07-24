<script lang="ts">
	import { highlight, type CodeLang } from '$lib/highlight';

	let {
		code,
		lang = 'jsx',
		frame = true
	}: { code: string; lang?: CodeLang; frame?: boolean } = $props();

	let highlighted = $state<{ code: string; html: string } | null>(null);

	$effect(() => {
		let stale = false;
		const source = code;
		highlight(source, lang).then((html) => {
			if (!stale) highlighted = { code: source, html };
		});
		return () => {
			stale = true;
		};
	});

	const html = $derived(highlighted?.code === code ? highlighted.html : null);
</script>

<pre class="code-block" class:frame><code
		>{#if html}{@html html}{:else}{code}{/if}</code
	></pre>

<style>
	.code-block {
		margin: 0;
		padding: var(--code-padding, 1.2rem 1.4rem);
		max-width: var(--code-max-width, none);
		max-height: var(--code-max-height, none);
		overflow: auto;
		font-size: var(--code-font-size, 0.78rem);
		line-height: 1.55;
		color: var(--muted);
		tab-size: 2;
	}

	.code-block.frame {
		background: var(--surface);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: var(--code-radius, var(--radius));
	}

	.code-block code {
		font-family: ui-monospace, 'JetBrains Mono', monospace;
	}
</style>
