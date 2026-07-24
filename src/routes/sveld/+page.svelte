<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { getApplication } from '$lib/content/applications';
	import AppShell from '$lib/components/AppShell.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	const app = getApplication('sveld');

	const example = `<script context="server">
  const { MongoClient } = require('mongodb')

  const client = new MongoClient('mongodb://localhost:27017')
  await client.connect()
  const users = await client.db('myapp')
    .collection('users').find().toArray()
  await client.close()

  return {
    data: { users },
    actions: {
      async addUser({ name }) {
        // runs in Node, callable from the view
        // via sveldAction('addUser', { name })
      }
    }
  }
<\/script>

<script>
  export let users = []
<\/script>

<ul>
  {#each users as user}
    <li>{user.name}</li>
  {/each}
</ul>`;

	const t = $derived(
		{
			en: {
				shotTitle: 'A database dashboard, in a text editor',
				shotText:
					'This is Tea Brew — my cold-brew tea tracker — running entirely inside VS Code. The right pane is a .sveld file; the left pane is that same file, rendered as a live view querying MongoDB.',
				shotAlt:
					'VS Code split view: a cold-brew tracker dashboard rendered live on the left, its .sveld source with a MongoDB server block on the right',
				how: 'How it works',
				howText1:
					'A .sveld file is a standard Svelte component with one extra block: <script context="server">. That block runs in the VS Code extension host with full Node.js access — require any npm package, query a database, read files, call APIs — and returns props for the component rendered in the webview.',
				howText2:
					'The server block can also expose actions: async functions the view calls with sveldAction(name, payload). An action that returns a value resolves as a Promise in the component; one that returns nothing triggers a full re-render with fresh data. That is enough to build real interactive tools — no web server, no build pipeline, just a file you open.',
				exampleTitle: 'A complete .sveld file'
			},
			fr: {
				shotTitle: 'Un dashboard base de données, dans un éditeur de texte',
				shotText:
					'Voici Tea Brew — mon tracker de thé cold brew — tournant entièrement dans VS Code. Le panneau de droite est un fichier .sveld ; celui de gauche est ce même fichier, rendu en vue interactive qui interroge MongoDB.',
				shotAlt:
					'Vue scindée VS Code : un dashboard de suivi de cold brew rendu à gauche, sa source .sveld avec un bloc serveur MongoDB à droite',
				how: 'Comment ça marche',
				howText1:
					'Un fichier .sveld est un composant Svelte standard avec un bloc en plus : <script context="server">. Ce bloc s’exécute dans l’hôte d’extension VS Code avec un accès Node.js complet — require de n’importe quel package npm, requêtes base de données, lecture de fichiers, appels d’API — et retourne les props du composant rendu dans la webview.',
				howText2:
					'Le bloc serveur peut aussi exposer des actions : des fonctions async que la vue appelle avec sveldAction(name, payload). Une action qui retourne une valeur se résout comme une Promise dans le composant ; une action qui ne retourne rien déclenche un re-rendu complet avec des données fraîches. De quoi construire de vrais outils interactifs — sans serveur web, sans build, juste un fichier qu’on ouvre.',
				exampleTitle: 'Un fichier .sveld complet'
			}
		}[i18n.locale]
	);
</script>

<AppShell {app}>
	<section class="app-section">
		<h2 class="gradient-text">{t.shotTitle}</h2>
		<p class="prose">{t.shotText}</p>
		<img class="shot" src="/sveld/screenshot.png" alt={t.shotAlt} loading="lazy" />
	</section>

	<section class="app-section">
		<h2 class="gradient-text">{t.how}</h2>
		<div class="prose">
			<p>{t.howText1}</p>
			<p>{t.howText2}</p>
		</div>
	</section>

	<section class="app-section">
		<h2 class="gradient-text">{t.exampleTitle}</h2>
		<CodeBlock
			code={example}
			lang="svelte"
			--code-max-width="46rem"
			--code-font-size="0.8rem"
			--code-padding="1.4rem 1.6rem"
		/>
	</section>
</AppShell>

<style>
	.shot {
		width: 100%;
		height: auto;
		margin-top: 1.4rem;
		border-radius: var(--radius);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

</style>
