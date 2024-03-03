Nous sommes à l'ère des frameworks JavaScript. React, Vue, Svelte, etc. Mais ils viennent avec leur lot de complexité. Notamment, mal utilisés, ils peuvent réellement impacter la performance de votre site.

En effet, si on veut que 75% des personnes qui accèdent à Internet dans le monde aient une expérience correcte, il faudrait que la totalité du JavaScript exécuté sur un site ne dépasse pas 300-350KB compressé ([Source](https://infrequently.org/2022/12/performance-baseline-2023/)). Cela prend en compte le JavaScript que vous écrivez, mais aussi les third parties (Analytics, Tracking, Support, etc.).

Croyez-moi, 300KB, c'est beaucoup par rapport à quelques années en arrière ([130-170KB en 2017](https://infrequently.org/2017/10/can-you-afford-it-real-world-web-performance-budgets/)). Mais très peu comparé à l'état du web, qui [charge ~900KB pour 75% des sites](https://almanac.httparchive.org/en/2022/javascript#how-much-javascript-do-we-load).

Mais assez parlé de l'état général du web. Parlons plutôt de votre site et de votre quotidien. Dans cet article, je vais vous montrer comment savoir si c'est une problématique qui vous concerne, et les différentes techniques que vous pouvez mettre en place pour les corriger.

Si vous vous voulez accélérer votre prise en main des sujets performance, sachez que je suis aussi disponible en [freelance pour rendre votre site plus rapide](https://www.julienpradet.fr/developpeur-web-performance/) et vous former sur ces sujets.

Cet article fait partie d'une série autour de la web performance qui contient :

- [Pourquoi améliorer le LCP de vos pages ?](/tutoriels/pourquoi-ameliorer-le-lcp/)
- [Analyser le comportement réseau pour améliorer FCP et LCP](/tutoriels/reseau-et-core-web-vitals/)
- [Optimiser les images sur le web : checklist des bonnes pratiques](/tutoriels/optimiser-le-chargement-des-images/)
- [Optimiser le chargement des fonts](/tutoriels/optimiser-le-chargement-des-fonts/)
- [Optimiser la gestion des icônes](/tutoriels/optimiser-le-chargement-des-icones/)
- [Comment diagnostiquer et corriger du Cumulative Layout Shift (CLS) ?](/tutoriels/comment-detecter-du-cls/)
- Comment alléger son JavaScript **(vous êtes ici)**
  - [Comprendre comment le JavaScript impacte votre site](#comprendre-comment-le-javascript-impacte-votre-site)
  - [Choisir la bonne solution en fonction de votre contexte](#choisir-la-bonne-solution-en-fonction-de-votre-contexte)
    - [Optimiser automatiquement](#optimiser-automatiquement)
    - [Optimiser en faisant moins](#optimiser-en-faisant-moins)
    - [Optimiser en faisant au bon moment](#optimiser-en-faisant-au-bon-moment)
- Quelles métriques suivre en dehors des Core Web Vitals ? (bientôt)
- Et plus encore 🫶

## Comprendre comment le JavaScript impacte votre site

La première chose à faire est de comprendre où vous en êtes. Pour cela, le mieux est de comprendre ce que vit votre audience en mettant en place du monitoring avec des outils tels que [SpeedCurve](https://www.speedcurve.com/), [RUMVision](https://www.rumvision.com/), etc.

Cela vous permettra d'avoir une meilleure vision du genre de périphériques et de connexions qu'utilisent les vraies personnes qui naviguent sur votre site. En effet, chaque audience est différente et aura en tout cas des devices très différents de votre PC de dev qui est sur une connexion fibrée.

Si vous n'avez pas accès à ces outils, le plus simple est de passer par [PageSpeed Insights](https://pagespeed.web.dev/) qui, au niveau de l'audit Lighthouse, vous donnera deux informations :

- Le [**Total Blocking Time (TBT)**](https://web.dev/tbt/)

    <figure tabindex="-1">
    <img src="/images/posts/lighter-js/tbt.png" alt="Section de l'audit Performance Lighthouse qui montre un TBT à 3 220 ms" width="977" height="258" loading="lazy">
    </figure>

  C'est le temps passé pendant lequel le navigateur est complètement freeze : vous ne pouvez plus interagir avec le navigateur parce qu'il est occupé à parser et executer du code. Idéalement, il faudrait donc que ce temps soit <&nbsp;200ms pour offrir une bonne expérience à vos utilisateurices. Cependant, ceci n'est qu'un symptôme et il est plus intéressant de mesurer l'[INP](https://web.dev/inp/) qui est la conséquence. Je vous en reparlerai dans un futur article.

- Des **Opportunités** et **Diagnostics** tels que "Réduisiez les ressources JavaScript inutilisées", "Réduisez le travail du thread principal" ou "Réduisez le temps d'exécution de JavaScript"

    <figure tabindex="-1">
    <img src="/images/posts/lighter-js/opportunites.png" alt="Section de l'audit Performance Lighthouse qui les trois pistes mentionnées ci-dessus avec des gain de temps estimés (de 1 à 8 secondes)" width="970" height="309" loading="lazy">
    </figure>

  Afin de corriger un TBT trop long, généralement le souci se trouve au niveau du JavaScript et c'est pour cette raison que Lighthouse met en avant ces pistes. Ce sont elles que nous allons explorer dans cet article.

### Pourquoi est-ce le JavaScript qui est à l'origine d'un TBT élevé ?

Premièrement, ce n'est pas théoriquement vrai : avoir une quantité importante de DOM ou du CSS très complexe peut aussi impacter votre TBT. Mais dans la pratique, sur l'extrême majorité des sites que j'ai audité, c'est à 90% (chiffre sorti du chapeau) lié au JavaScript.

Prenons l'exemple de cette trace d'un site e-commerce en React :

<figure tabindex="-1">
<img src="/images/posts/lighter-js/trace.jpg" alt="Audit Performance des DevTools qui permet de voir que la majorité du temps passé à charger le site est dédié à l'execution du JavaScript (sections 'Evaluate Script' en jaune)" width="772" height="408" loading="lazy">
</figure>

On peut constater que c'est la couleur jaune qui prédomine l'utilisation du CPU dans le graphique du haut : ça veut dire que c'est le Scripting, autrement dit, le JavaScript.

Et les bandes rouges et hachurées que l'on retrouve au niveau du flame chart, montrent que c'est lors de l'exécution du JavaScript qu'il y a des Long Frames.

En effet, en grande partie les navigateurs sont conçus pour exécuter le code relatif à votre page sur un seul thread : cela veut dire que si le navigateur est occupé à quelque chose, alors il ne pourra pas faire autre chose en attendant. Il faudra attendre que la tâche en cours soit finie pour passer à la tâche suivante.

Dans le cas montré ci-dessus, il faut attendre que React ait fini de se charger pour pouvoir faire autre chose. On le repère grâce au `t.hydrate` dans la zone cyan du flamechart. Cela représente 2s de bloquage (2094ms). Pendant ce temps là, rien d'autre ne peut être fait : si l'utilisateurice clique quelque part, il ne se passera rien, si une image a fini d'être téléchargée, elle ne pourra pas être affichée.

C'est d'autant plus gênant que sur cette trace en particulier, l'affichage du [LCP](/tutoriels/pourquoi-ameliorer-le-lcp/#qu-est-ce-que-le-lcp-et-pourquoi-s-y-interesser) est bloqué tant que le JavaScript ne s'est pas exécuté. Donc non seulement cela gêne l'interactivité mais cela peut aussi gêner l'affichage du contenu.

Avant d'aller plus loin, je vous invite à essayer de voir si vous avez la même problématique sur votre site. Ces fonctionnalités sont disponibles dans la majorité des navigateurs, mais voici comment faire avec les DevTools de Chrome :

<figure tabindex="-1">
<img src="/images/posts/lighter-js/audit.jpg" alt="Onglet Performance des DevTools Chrome, configuré en mode CPU: 4x slowdown." width="755" height="254" loading="lazy">
</figure>

1. Ouvrez vos DevTools
2. Allez dans l'onglet Performance
3. Activez le mode CPU: 4x slowdown afin d'être plus proche du comportement des mobiles milieu/bas de gamme
4. Lancez l'audit de performance en déclenchant un rafraîchissement de page

Vous aussi vous avez trop de JavaScript ? Alors voyons comment régler cela.

## Choisir la bonne solution en fonction de votre contexte

Nous savons donc que nous avons trop de JavaScript. Il nous reste donc à choisir entre plusieurs solutions. En matière de performance vous avez souvent trois pistes à explorer :

- optimiser automatiquement
- optimiser en faisant moins
- optimiser en faisant au bon moment

### Optimiser automatiquement

#### Optimiser en compressant et en mettant en cache vos assets

La première chose à faire, parce que c'est le meilleur ratio effort/performance, est de vérifier que vos assets sont correctement servis par votre serveur :

- **Sont-ils correctement encodés ?**

  En effet, il existe des méthodes de compression qui permettent de diminuer drastiquement le bande passante utilisée sur votre réseau. Généralement on va parler de [GZip](https://developer.mozilla.org/fr/docs/Glossary/GZip_compression) ou de [Brotli](https://developer.mozilla.org/fr/docs/Glossary/Brotli_compression). Pour cela, vous pouvez aller dans l'onglet Network de votre site en production et vérifier que dans les `Response Headers`, vous avez `Content-Encoding` avec la valeur `gzip` ou `br`. Dans le cas de mon fichier `app.f6bd4147.js` ci-dessous, cela permet à l'utilisateur de ne télécharger que 4.2kB alors que la taille réelle du fichier est de 28.4kB, soit -85% !

- **Sont-ils mis en cache ?**

  Les fichiers JavaScript sont souvent réutilisés de page en page. Il est donc pertinent d'indiquer au navigateur qu'il peut les mettre en cache pour éviter de les retélécharger à chaque nouvelle page. Pour cela, vous pouvez contacter votre admin sys pour ajouter le header `Cache-Control: public, max-age=31536000, immutable` sur vos assets (CSS, JS, fonts, images). Attention cependant, cela requiert d'avoir une stratégie de [cache busting](https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/Cache-Control#mise_en_cache_des_ressources_statiques_et_partie_de_casse-cache). Vérifiez donc que si votre JS change, le nom de vos fichiers aussi.

<figure tabindex="-1">
<img src="/images/posts/lighter-js/content-encoding.png" alt="Screenshot des DevTools montrant les Response Headers Cache-Control & Content-Encoding" width="943" height="209" loading="lazy">
</figure>

#### Optimiser en utilisant un bundler

Lorsque l'on écrit du JavaScript, nous allons écrire notre code de sorte qu'il soit facilement maintenable. Cela veut dire que l'on va utiliser des noms de variables compréhensibles par un·e humain·e, séparer notre code en plusieurs fichiers, etc.

Mais le navigateur, lui, n'a pas besoin de tout ça. Si votre variable s'appelle `a` ou `firstnameFormLabel`, le code fonctionnera tout aussi bien. Si votre code est rassemblé dans un seul fichier plutôt que de devoir les télécharger un par un, idem.

Nous avons donc des outils qui nous permettent de faire cela pour nous. Les plus connus à ce jour sont [webpack](https://webpack.js.org/), [Vite](https://vitejs.dev/) ou [Parcel](https://parceljs.org/). De plus, si vous utilisez un Meta Framework JS tel que [Next.js](https://nextjs.org/), [Nuxt](https://nuxt.com/), [SvelteKit](https://kit.svelte.dev/), cette partie sera déjà gérée pour vous.

Ces outils vont avoir pour responsabilité de :

- **minifier automatiquement votre code** en utilisant des variables plus courtes, supprimer les espaces inutiles, etc.
- **fusionner vos fichiers** (ou _bundler_) pour optimiser la manière dont ils sont chargés dans le navigateur
- **gérer automatiquement le cache busting** en ajoutant un `hash` au nom de vos fichiers
- **transformer votre JS moderne en une version comprise par les navigateurs** en transpilant vos fichiers via [@babel/preset-env](https://babeljs.io/docs/babel-preset-env)
- **fournir un environnement de dev pratique**, tout en s'assurant qu'il ne déborde pas sur l'environnement de production

**Pour s'assurer que vous avez un tel outil en place**, vous pouvez faire les vérifications suivantes sur votre site en production :

- ouvrir l'un des fichiers JS en production dans son propre onglet : il devrait ressembler à ceci

    <figure tabindex="-1">
    <img src="/images/posts/lighter-js/minified-js.png" alt="Contenu d'un fichier JavaScript minifié: code sur une seule ligne qui ne ressemble en rien à celui que lae dev a écrit" width="936" height="187" loading="lazy">
    </figure>

- vérifier que les fichiers JS ne sont pas chargés en cascade (leur téléchargement commence au même moment) et qu'il y en a relativement peu par rapport à votre nombre de fichiers (une analyse de l'équipe de Next.js a montré que [25 fichiers max est une bonne règle](https://web.dev/granular-chunking-nextjs/) à avoir en tête)

  > 💡 Ne regardez pas le temps de chargement sur les catpures ci-dessous. Elles ne sont pas effectués sur le même réseau. Ce qui est important de voir, c'est la quantité de fichiers différents et l'effet d'escalier visible quand il y a cascade. En production, cela aura un effet désastreux.

  **Avec Cascade**

    <figure tabindex="-1">
    <img src="/images/posts/lighter-js/cascade.png" alt="Cascade réseau avec beaucoup de fichiers JS" width="911" height="405" loading="lazy">
    </figure>

  **Sans Cascade**

    <figure tabindex="-1">
    <img src="/images/posts/lighter-js/no-cascade.png" alt="Cascade réseau avec 8 fichiers JS tous chargés au même moment" width="927" height="307" loading="lazy">
    </figure>

Si vous constatez que l'un de ces points n'est pas respecté, cela vaut le coup de vous pencher dessus parce que c'est certainement ce qui aura le plus fort impact à l'échelle globale de votre site. Mon conseil aujourd'hui est de partir sur [Vite](https://vitejs.dev/) qui a l'avantage d'être beaucoup plus performant tout en étant suffisamment mature pour répondre à l'extrême majorité de vos besoins. N'hésitez pas à me [contacter](/developpeur-web-performance/#contact) si vous avez besoin d'aide à ce sujet.

### Optimiser en faisant moins

La prochaine étape, quand vous aurez mis en place les optimisations automatiques, est de faire un état des lieux de votre code. En effet, si votre site existe depuis plus d'un an, il y a de grandes chances que son contenu ait évolué au cours des mois et des années.

Vous vous rappelez ce carousel que vous aviez mis en place pour Noël dernier ? Il a peut être disparu de votre site. Mais pour autant il n'est pas impossible que le code nécessaire à son fonctionnement soit toujours disponible.

Dans cette situation, il est pertinent de passer par 2 étapes :

1. Faire un [**audit de Coverage** dans Chrome](https://developer.chrome.com/docs/devtools/coverage/) : au chargement de la page le navigateur est en mesure de savoir quelle partie du code a été réellement exécutée ou non.

    <figure tabindex="-1">
    <img src="/images/posts/lighter-js/coverage.png" alt="Onglet Coverage de Chrome qui montre le taux d'utilisation des fichiers JavaScript" width="977" height="394" loading="lazy">
    </figure>

   Si vous constatez une trop forte concentration de rouge (Unused Bytes), c'est certainement que vous avez des choses à retirer. N'essayez toutefois pas de viser à tout prix 100% d'utilisation : en effet, vous pourriez dégrader la performance ressentie à l'interaction. Mais plus le pourcentage de code inutilisé est grand, plus il y aura quelque chose à explorer. Les valeurs absolues sont aussi un bon indicateur. 20kB de JS non utilisé n'aura pas le même impact que 500kB.

   > 💡 Certains frameworks JS sont optimisés pour répondre à cette métrique en particulier. Si cela vous intéresse, n'hésitez pas à creuser du côté de [Qwik](https://qwik.builder.io/) et notamment son concept de "Lazy execution".

2. **Analyser les fichiers générés** pour comprendre de quoi ils sont composés via [`source-map-explorer`](https://www.npmjs.com/package/source-map-explorer) :

   ```
   npx source-map-explorer build/*.js
   ```

    <figure tabindex="-1">
    <img src="/images/posts/lighter-js/source-map-explorer.png" alt="Screenshot de source-map-explorer  qui met en avant certains fichiers plus gros que d'autres en leur faisant prendre plus de place à l'écran" width="1907" height="874" loading="lazy">
    </figure>

   > 💡 Attention à bien vérifier que vous avez généré des source maps au moment du build de vos dépendances, sinon cela sera illisible et il sera plus pertinent de passer par les bundle analyzer mentionnés plus bas.

   Cet outil permet de refaire une carte de vos fichiers à partir des sources maps. Cela permettra de faire ressortir certaines dépendances particulièrement imposantes. C'est par exemple le cas dans mon screenshot avec le fichier en haut à gauche (`nodes/25.bbfa73a6.js`) qui est composé de 344kB de moment.js. C'est gigantesque.

   Pourtant, aujourd'hui, ce n'est utilisé qu'à un seul endroit de mon code et ça peut maintenant être remplacé par des alternatives plus modernes (exemple : [Intl.RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat)).

   Au début cela vous demandera un peu de temps pour fouiller dans les dépendances, mais avec l'habitude ce sera un excellent moyen de découvrir certaines problématiques en un coup d'œil.

   Si vous utilisez, webpack n'hésitez pas à creuser du côté de [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) ou du côté de [vite-bundle-visualizer](https://www.npmjs.com/package/vite-bundle-visualizer) si vous êtes sur Vite. Ce sont des outils qui font la même chose mais de manière simplifiée. Cependant, ils sont moins versatiles et ne m'ont pas permis d'afficher le bundle client avec SvelteKit par exemple.

Ainsi, grâce aux deux étapes sus-mentionnées, vous aurez une vision par page (grâce au Coverage) et globale (grâce aux source-map-explorer). Gardez toutefois en tête qu'on parle de code inutilisé ou trop lourd ici. Mais parfois la solution pourrait être différente :

- analyser le comportement de vos utilisateurices afin de savoir quelle partie de la page pourrait être supprimée (ex : la 8ème section de votre page d'accueil qui n'existe que pour des raisons politiques ([Loi de Conway](https://fr.wikipedia.org/wiki/Loi_de_Conway)) et non parce qu'elle est utile à vos utilisateurices)
- Trouver des alternatives qui demandent moins de JS (ex : CSS [Scroll Snap](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap/Basic_concepts) vs une librairie de Carousel)
- mettre à jour un framework pour profiter de ses dernières optimisations (ex : les [React Server Components](https://www.joshwcomeau.com/react/server-components/) et le dossier [app de Next.js](https://nextjs.org/docs/app/building-your-application/rendering/server-components))

### Optimiser en faisant au bon moment

Enfin, parfois il n'est pas réellement possible de faire moins : la 8ème section de la page d'accueil a en fait de la valeur et est importante. Cependant, il est important de se demander : **quand** est-elle importante ?

En effet, quand on parle de performance, on peut diminuer les ressources nécessaires, mais on peut aussi les prioriser : choisir ce que le navigateur doit faire en premier et différer ce qui peut être fait plus tard.

Pour cela, nous aurons globalement 2 options :

- séparer le JavaScript par page
- importer le JavaScript au moment où on interagit avec la page

#### Séparer le JavaScript par pages

De plus en plus de sites aujourd'hui sont des <abbr tabIndex="-1" title="Single Page Application">SPA</abbr>, cela veut dire que les pages ne sont pas rechargées complètement à chaque fois qu'on clique sur un lien. Le risque est alors de charger tout votre JavaScript d'un seul coup, y compris pour la page de FAQ cachée derrière trois liens.

La plupart des meta frameworks (Next, Nuxt, SvelteKit, etc.) le gèrent pour vous. Je ne rentrerai donc pas plus en détail sur ce sujet. Mais si votre site n'en utilise aucun, il est bon de vérifier le taux de Coverage de votre site.

#### Importer le JavaSript à l'interaction

Une fois le code séparé de page en page, il est bon de vérifier le comportement à l'intérieur d'une page.

Prenons l'exemple d'une modale : de quoi avons-nous besoin pour qu'elle puisse fonctionner ? Dans quelques temps, quand le support navigateur sera suffisamment répandu, nous pourrons utiliser [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog). Mais en attendant il nous faut toujours le gérer manuellement :

- tout d'abord il faut écouter le clic sur le bouton d'ouverture
  ```js
  button.addEventListener('click', () => {
  	openModal(modal);
  });
  ```
- puis il faut initialiser le code nécessaire à la gestion de la modale
  ```js
  function openModal() {
  	const modal = document.querySelector('.modal');
  	modal.focus();
  	modal.querySelector('.close').addEventListener('click', () => {
  		closeModal();
  	});
  	// etc.
  }
  ```

Mais cette deuxième partie n'est pas utile tant que la modale n'est pas affichée. C'est d'autant plus vrai que le pattern des modales est généralement utilisé pour des informations secondaires. Ainsi, pour 100 personnes qui affichent votre page, combien ouvrent la modale ? 5% ? Si oui, alors 95% des visites n'ont pas besoin de télécharger `openModal` (ou tout code nécessaire à son affichage).

Nous allons donc charger celle-ci de manière asynchrone en séparant notre code en 2 fichiers et en utilisant un [`import()` dynamique](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) :

1. `openModal.js` : qui contient et export la fonction openModal

   ```js
   export function openModal(modal) {
   	// reste du code qui manipule la modale
   }
   ```

2. `listenModal.js` : qui va écouter le click du bouton, et faire l'import dynamique à l'intérieur du listener

   ```diff
   -import openModal from './openModal.js';

   button.addEventListener('click', async () => {
   +	const {openModal} = await import('./openModal.js');
   	openModal(modal);
   });
   ```

La différence est donc qu'on va lancer l'import non pas au chargement du fichier, mais uniquement au moment où on en a besoin. Ainsi plutôt que de faire beaucoup de choses au début, on diffère l'execution à plus tard pour laisser la place à d'autres choses plus importantes.

<figure tabindex="-1">
<img src="/images/posts/lighter-js/dynamic-import.jpg" alt="Schema représentant le moment du chargement " width="1907" height="874" loading="lazy">
</figure>

> 💡 Vous remarquerez que je parle de `chunk` : en fait, votre bundler (webpack, Vite, etc.) va être responsable de rassembler vos fichiers pour en diminuer le nombre. En utilisant `import x from './x.js'` (import statique), vous indiquez au bundler que tout le javascript peut être dans un seul fichier, un seul chunk. En utilisant un `import('./x.js')` (import dynamique), vous lui indiquez où se trouve la limite et comment il doit séparer les fichiers.

⚠️ Attention toutefois, ce n'est pas une recette magique, cela vient notamment avec 2 problématiques :

- que se passe-t-il si, au moment du click, le navigateur a perdu sa connexion internet ? Il va être pertinent de gérer le cas d'erreur. Cela peut être en affichant une erreur ou tout simplement en s'assurant que la personne puisse relancer l'action plus tard.

  ```js
  button.addEventListener('click', async () => {
  	let openModal;
  	try {
  		const module = await import('./openModal.js');
  		openModal = module.openModal;
  	} catch (e) {
  		// gestion en cas d'erreur de connexion ici

  		// puis early return pour éviter d'ouvrir la modale
  		return;
  	}

  	// Je ne mets pas `openModal` dans le try/catch parce que si
  	// l'erreur vient d'openModal et non de l'import alors il faudra
  	// la traiter différemment. Pensez donc à adapter le code à
  	// votre usage.
  	openModal(modal);
  });
  ```

- que se passe-t-il pendant le chargement du fichier openModal.js ? Potentiellement, il peut prendre quelques millisecondes, ou quelques secondes s'il y a des ralentissements réseau. Il est alors pertinent de gérer des états de chargement (spinner, skeletons, etc.). En effet, rien de plus énervant qu'un bouton qui ne fait rien et se réveille au bout de quelques secondes.

**Comment je fais ça dans mon framework front ? (React, Svelte)**

Dans l'exemple ci-dessus, je suis revenu au concept initial, en Vanilla, mais comment ça marche pour les stacks modernes ?

- **React** : l'idée va être d'utiliser [`lazy`](https://react.dev/reference/react/lazy) pour importer son composant plutôt que de l'importer statiquement. Cela peut ensuite se gérer soit avec [`useTransition`](https://react.dev/reference/react/useTransition), soit avec [`Suspense`](https://react.dev/reference/react/Suspense). Ici j'ai utilisé `useTransition` parce que je veux _changer_ l'affichage de mon bouton pendant qu'il est en train de charger. `isPending` sera ainsi `true` tant que le fichier Modal.jsx sera en cours de téléchargement. J'ai ajouté par ailleurs react-error-boundary pour pouvoir réagir en cas d'erreur réseau au chargement de la Modal.

  ```jsx
  import { lazy, useState, useTransition } from 'react';
  import { ErrorBoundary } from 'react-error-boundary';

  const Modal = lazy(() => import('./Modal.jsx'));

  export default function App() {
  	const [isPending, startTransition] = useTransition();
  	const [opened, setOpened] = useState(false);

  	function openModal() {
  		startTransition(() => {
  			setOpened(true);
  		});
  	}

  	function onLoadError() {
  		// gestion en cas d'erreur de connexion ici
  	}

  	return (
  		<>
  			<button onClick={openModal}>{isPending ? 'Loading' : 'Open'}</button>
  			{opened && (
  				<ErrorBoundary onError={onLoadError}>
  					<Modal />
  				</ErrorBoundary>
  			)}
  		</>
  	);
  }
  ```

- **Svelte** : Svelte n'a pas de concept de lazy component à ce jour, mais gère les promesses nativement. Nous allons donc pouvoir mettre à disposition une promesse qui contiendra le composant et qu'on pourra utiliser à l'intérieur de `{#await}`.

  <!-- prettier-ignore -->
  ```html
  <script>
  	let lazyModalComponent;
  	let isPending = false;

  	function openModal() {
  		isPending = true;
  		lazyModalComponent = import(`./Modal.svelte`);
  		lazyModalComponent.catch((error) => {
  			// gestion en cas d'erreur de connexion ici
  		}).finally(() => {
  			isPending = false;
  		});
  	}
  </script>

  <button on:click={openModal}>
  	{#if isPending}
  		Loading
  	{:else}
  		Open
  	{/if}
  </button>

  {#if lazyModalComponent}
  	{#await lazyModalComponent then { default: Modal }}
  		<Modal />
  	{/await}
  {/if}
  ```

#### Importer le JavaScript quand le composant est visible

Nous avons vu comment charger une partie du code au click. Mais les interactions peuvent être bien plus variées. Reprenons l'exemple de la 8ème section de la page d'accueil. A priori, son JavaScript pourrait être téléchargé qu'au scroll : quand on va arriver sur la 8ème section.

Pour cela, nous pourrons utiliser un [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

Ainsi, plutôt que d'écouter le click, nous observerons la visibilité :

```js
const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach(() => {
			if (entry.isIntersecting) {
				import('./initSection')
					.then((module) => {
						// Code d'initialisation du composant
						module.initSection();
					})
					.catch((error) => {
						// Toujours penser à gérer le cas d'erreur ici
					});

				// Vu qu'on a géré le chargement de la section, il n'y en
				// aura plus besoin la prochaine fois que l'élément
				// devient visible
				observer.remove(section);
			}
		});
	},
	{
		// Définir une marge suffisamment grande pour que le
		// composant ait le temps de s'initialiser avant
		// d'arriver sur la section
		margin: '500px'
	}
);

observer.observe(section);
```

Cela peut être intéressant à faire notamment pour tout calcul coûteux que vous auriez à faire (calcul de positions, initialisation d'une vidéo, etc.).

#### Preload

L'`IntersectionObserver` peut aussi être utilisé pour faire du preloading. En effet, dans celui-ci vous n'êtes pas obligé de déclencher une action. Vous pouvez uniquement déclencher l'import.

```js
const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach(() => {
			if (entry.isIntersecting) {
				import('./openModal');
				observer.remove(button);
			}
		});
	},
	{ margin: '500px' }
);

observer.observe(button);
```

Ainsi, dans cet exemple, on ne déclenche l'import de `openModal` qu'à partir du moment où le bouton est visible. Cela donne le temps au navigateur de télécharger le JS afin qu'au moment du click, celui-ci soit déjà en mémoire et n'ait plus qu'à s'exécuter.

C'est un excellent moyen de diminuer les temps de chargement.

> 💡 Si vous utilisez un framework, sachez qu'il existe de nombreuses librairies sur npm qui l'encapsuleront pour vous. Mais il peut être un bon exercice de le coder vous même, car cela vous permettra de mieux comprendre son fonctionnement et vous retirera une dépendance externe. N'hésitez pas à [m'envoyer un message](/developpeur-web-performance/#contact) si vous avez besoin d'un coup de main.

Veillez cela dit à prendre en compte le paramètre [`navigator.connection.saveData`](https://web.dev/articles/optimizing-content-efficiency-save-data?hl=fr#detecting_the_save-data_setting) afin que les personnes qui préfèrent économiser leur bande passante ne téléchargent pas plus que nécessaire.

De plus, en voulant précharger trop de choses, on peut tomber dans l'effet inverse : le navigateur se retrouve surchargé à préparer l'avenir sans pouvoir exécuter ce dont il a besoin maintenant. Soyez donc sélectif sur ce que vous voulez précharger. Une autre piste est de creuser du côté de [la différence entre `preload` et `prefetch`](https://phuoc.ng/collection/this-vs-that/preload-vs-prefetch/).

Enfin, sachez que la visibilité n'est pas la seule solution pour savoir quand faire un preload. Vous pourriez par exemple imaginer utiliser le `mouseenter` (bien que celui-ci ne soit pas disponible sur mobile). N'hésitez donc pas à chercher la solution la plus adaptée à votre contexte.

## Récapitulatif

Si vous avez réussi à tout lire, bravo ! 🎉 Si j'ai bien fait mon boulot, vous devriez maintenant être paré à commencer vos travaux d'optimisation.

Pour cela, gardez en tête les étapes suivantes :

1. Le JS est souvent coupable de lenteurs de chargement et de freezes sur vos pages. Vérifiez cela en exécutant un audit `Performance` dans vos DevTools. S'il y a beaucoup de jaune/scripting, c'est mauvais signe.
2. Vérifiez que vos fichiers JS ont été correctement optimisés : compressés, mis en cache et rassemblés en un minimum de fichiers.
3. Vérifiez que vous n'avez pas de code mort/inutilisé avec l'audit de **Coverage** et en vérifiant le poids de vos dépendances via `source-map-explorer`. Essayez de toujours préférer l'utilisation du natif quand c'est possible.
4. Utilisez des `import()` dynamiques afin d'organiser votre code et ne télécharger vos fichiers que lorsqu'ils sont réellement nécessaires. Cela peut dépendre d'une page, d'une interaction (click) ou de la visibilité (IntersectionObserver).

Dans tous les cas, c'est un travail long et fastidieux notamment parce qu'il faut y réfléchir au cas par cas. De plus, une régression est vite arrivée. Si vous avez donc besoin d'aide sur ces sujets, n'hésitez pas à me contacter. Peut-être puis-je vous aider, vous et votre équipe, [à mettre en place ces bonnes pratiques en matière de performance](/developpeur-web-performance/).

Enfin, si cet article vous a intéressé, n'hésitez pas à le partager autour de vous. Je publie régulièrement des articles autour des performances et du développement web. Par exemple, semaine prochaine, je devrais vous parler d'astuces sur les Scroll Driven Animations. Stay tuned! 👀
