<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	const code = `import { configureLayout, nodeFactories,
         LayoutNode, layout } from 'panels-layout';

const { makeGroup, makeSplit } = nodeFactories;

configureLayout({
  panelList,          // [{ type, label }]
  components,         // { type: SvelteComponent }
  storageKey: 'my-app-layout-v1',
  buildDefault: () => makeSplit('h', 0.55,
    makeGroup(['welcome', 'code']),
    makeGroup(['features']),
  ),
});

// then render the tree
<LayoutNode node={$layout} />`;
</script>

<CodeBlock {code} frame={false} --code-padding="1rem 1.2rem" />
