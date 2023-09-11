En ce moment il y a deux nouvelles APIs qui sont en train d'arriver dans les navigateurs qui font fureur :

- [Scroll Driven Animations](https://scroll-driven-animations.style/)
- [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)

> 💡 Pour info ces APIs sont disponibles sur Chrome uniquement pour le moment. Mais dans les 2 cas, Webkit (= Safari) et Gecko (= Firefox) sont d'accord avec la proposition, donc ça va finir par arriver aussi.

C'est pour moi la preuve qu'il y a une réelle appétence pour avoir un web plus dynamique, plus animé. Et personnellement, je pense que c'est l'unique raison pour laquelle, dans l'imaginaire collectif, les applications mobiles ont l'air plus <abbr title="qualitatives">quali</abbr> que le web (et, accessoirement, la quantité affolante de pubs et de bandeaux de cookies).

Et preuve supplémentaire de cette appétence, j'ai rarement vu autant de devs front se mettre à tester de nouvelles APIs, alors que ce n'est même pas encore dispo sur tous les navigateurs.

Notamment, cette démo de [@jhey](https://twitter.com/jh3yy), disponible sur [Codepen](https://codepen.io/jh3y/pen/YzdyjrG) a vraiment attiré mon attention. Les idées que j'aime beaucoup :

- animer l'avatar au moment où il passe en sticky ❤️
- réorganiser le header pour qu'il prenne moins de place au passage en sticky

> 💡 **Sticky :** qui reste visible à l'écran quelque soit le niveau de scroll

Ce sont ces petits moments qui me font des petits guilis au ventre et me rendent heureux quand je parcours le web.

<figure>
<video controls src="/images/posts/sticky/jhey-demo.mp4" title="En scrollant sur le site web, l'avatar et le nom s'animent pour passer en mode Sticky" width="720" height="720" style="aspect-ratio: 1;"></video>
</figure>

Pour construire cette démo, il a utilisé une Scroll Driven Animation. Dans cet article, je vais vous présenter en quelques mots comment ça fonctionne. Cela dit, mon but principal est de me concentrer sur les raisons pour lesquelles je pense que ce n'est pas la technique la plus adaptée qui est utilisée ici, et comment on pourrait faire différemment. Enfin, en toute fin d'article je partagerai quelques ressources où Scroll Driven Animation permet réellement d'améliorer l'état du web.

- [Comment fonctionne une Scroll Driven Animation ?](#comment-fonctionne-une-scroll-driven-animation)
- [Pourquoi n’est-ce pas très adapté sur cette démo du sticky ?](#pourquoi-n-est-ce-pas-tres-adapte-sur-cette-demo-du-sticky)
- [Re-codons ce sticky header sans Scroll Driven Animation](#re-codons-ce-sticky-header-sans-scroll-driven-animation)
  - [1. Mise en place de l’affichage initial et état final](#1-mise-en-place-de-l-affichage-initial-et-etat-final)
  - [2. Mise en place du JavaScript pour passer d’un état à l’autre](#2-mise-en-place-du-javascript-pour-passer-d-un-etat-a-l-autre)
  - [3. Faire fonctionner le sticky](#3-faire-fonctionner-le-sticky)
  - [4. Animons la transition vers le mode sticky](#4-animons-la-transition-vers-le-mode-sticky)
  - [5. Animons l’avatar](#5-animons-l-avatar)
- [Conclusion](#conclusion)

## Comment fonctionne une Scroll Driven Animation ?

Avant de parler de Scroll Driven Animation, parlons d'animation tout court. En effet, si on revient à la source de celle ci, il s'agit d'une manière de passer d'un état A, à un état B, tout en restant fluide.

<figure>
<img src="/images/posts/sticky/animation-concept.png" alt="Etat A : Un carré rouge. Etat B : Un carré vert tourné de 45 degré. Entre ces deux états, plusieurs carrés représentent les états transitoires (couleur qui change petit à petit + carré qui tourne petit à petit)." width="801" height="231">
</figure>

Traditionnellement, ce qu'on va utiliser pour calculer la transition entre les deux états est le temps (t) :

- Si t = 0, on est au tout début de l'animation, alors carré = rouge & angle = 0
- Si t = 1, on est à la fin de l'animation, alors carré = vert & angle = 45°

Et au milieu de tout ça on va faire des interpolations pour calculer les étapes intermédiaires :

- Si t = 0.25, on a un peu avancé dans l'animation, mais pas beaucoup, donc carré = plutôt rouge, et angle = ~11°
- Si t = 0.5, on est au milieu de l'animation, donc carré = moite-moite entre rouge et vert, et angle = 22.5°
- Si t = 0.75, on plutôt vers la fin, donc carré = plutôt vert, et angle = ~34°

Et on peut faire ce calcul pour chacune des images de notre animation.

Cependant, une animation n'est pas forcément dans le _temps_. Par exemple sur le schéma ci dessus, j'ai fait une animation et finalement sa progression c'est de gauche (t = 0) à droite (t = 1).

Dans le cas d'une Scroll Driven Animation, qu'est-ce qui va être utilisé pour t ? Ce sera la quantité de scroll qui a été effectuée :

- si on est en haut de la page, alors on sera à l'état A
- si on est en bas de la page, alors on sera à l'état B
- et si on est à la moitié de la page, alors on sera à la moitié de l'animation

En pratique, avec du code, ça veut dire que vous aurez besoin de définir plusieurs choses en CSS :

1. Une animation : qui traditionnellement est représentée avec des `@keyframes` en CSS

   ```css
   @keyframes rotate-and-color {
   	/* t = 0 si on reprend mon exemple ci-dessus */
   	0% {
   		background: red;
   		transform: rotate(0deg);
   	}

   	/* t = 1 */
   	100% {
   		background: green;
   		transform: rotate(45deg);
   	}
   }
   ```

2. Les règles `animation`, `animation-timeline` et `animation-range` sur l'élément que vous voulez animer

   ```css
   .square {
   	animation: rotate-and-color linear;
   	/* Ce n'est pas le temps, mais le scroll qui dicte la progression de l'animation */
   	animation-timeline: scroll();
   	/* Sur quelle distance de scroll doit se faire l'animation */
   	animation-range: normal 150px;
   }
   ```

   Ici je définis:

   - quelle animation doit être jouée via `animation`
   - que je dois utiliser le scroll et non le temps comme référentiel via `animation-timeline` (par défaut ce sera la première scrollbar parente qui sera utilisée - si vous n'en avez pas d'imbriquées ce sera donc la scroll bar principale)
   - que je ne vais animer que sur les 150 premiers pixels verticaux via `animation-range`

**Ce qui nous donne ceci :** (⚠️ Chrome only à ce jour)

<div class="custom-scroll-wrapper">
<div class="custom-scroll-container">
<div class="custom-square"></div>
</div>
</div>

<style>
@keyframes rotate-and-color {
	0% {
		background: red;
		transform: rotate(0deg);
	}

	100% {
		background: green;
		transform: rotate(45deg);
	}
}

.custom-scroll-wrapper {
    position: relative;
    overflow: auto;
    height: 300px;
}

.custom-scroll-container {
    height: 600px;
    background: var(--color-creme);
}

.custom-square {
    position: sticky;
    top: 50%;
    translate: 0 -50%;
    width: 4rem;
    height: 4rem;
    margin: 0 auto;
    background: green;
    transform: rotate(45deg);
	animation: rotate-and-color linear;
	/* Ce n'est pas le temps, mais le scroll qui dicte la progression de l'animation */
	animation-timeline: scroll();
	/* Sur quelle distance de scroll doit se faire l'animation */
	animation-range: normal 150px;
}
</style>

Quelques liens pour aller plus loin :

- [Animate elements on scroll with Scroll-driven animations](https://developer.chrome.com/articles/scroll-driven-animations/)
- [MDN : animation-timeline: scroll()](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline/scroll)
- [MDN : animation-range](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-range)

## Pourquoi n'est-ce pas très adapté sur cette démo du sticky ?

Nous avons donc vu que l'animation n'était plus basée sur le temps mais sur le nombre de pixels qui ont été scrollés. Ainsi, si on pousse les tests un peu plus loin ça veut dire que :

- Si je m'arrête en milieu de scroll, **le site peut paraître cassé**. En tant que dev je comprends ce qu'il se passe (et si j'ai bien écrit mon article, vous aussi :p) donc ça ne me choque pas outre mesure. Mais qu'en pensera une personne non dev ? Je ne sais pas, mais je présume que ça ne laissera pas la meilleure impression.

    <figure>
    <img src="/images/posts/sticky/temporary-scroll.png" alt="Screenshot après avoir scrollé quelques pixels : le pseudo est à cheval entre l'image foncée de la bannière et le fond clair de la page. Il est aussi écrit en blanc en anticipation de son passage sur la bannière, mais cela le rend illisible." width="801" height="231">
    </figure>

- Si je scroll suffisamment vite pour rapidement dépasser mon `animation-range`, **l'animation n'apparaît quasiment pas**. On passe du début à la fin trop rapidement pour voir l'animation se dérouler.

- Si vous allez sur le [CodePen](https://codepen.io/jh3y/pen/YzdyjrG) de Jhey, vous verrez qu'il y a **besoin de calculer beaucoup de choses** : chaque élément animé (l'avatar, la bannière de couverture, le texte, etc.) a sa propre `animation-range` pour que l'effet soit le plus chouette possible. Heureusement, étant donné que les Custom Properties (ou CSS Variables) sont disponibles dans les navigateurs, ce n'est pas une collection de [Magic Numbers](https://css-tricks.com/magic-numbers-in-css/). Mais ça demande quand même beaucoup de concentration à mon petit cerveau et je ne suis pas sûr d'être capable de relire ce genre de code 6 mois plus tard.

Nous allons donc voir ensemble comment j'ai codé le même concept mais en utilisant des techniques différentes.

## Re-codons ce sticky header sans Scroll Driven Animation

Ce n'est donc pas l'outil idéal pour mettre en place cette animation. Pourtant, on a très envie d'avoir le même effet. Parce que c'est stylé. Donc comment peut-on faire ?

Pour cela, codons ensemble cette démo. Vous gagnez en prime cette magnifique grimace quand ma tête passe en sticky.

<figure>
<video controls src="/images/posts/sticky/julien-pradet-sticky-demo.mp4" title="En scrollant sur le site web, l'avatar et le nom s'animent pour passer en mode Sticky, mais cette fois c'est sur mon site :)" width="304" height="502" style="aspect-ratio: 304 / 502"></video>
<figcaption><a href="https://www.julienpradet.fr/examples/sticky-header/vanilla/index.html">Site d'exemple du sticky header</a></figcaption>
</figure>

> 💡 Avant de commencer, je tiens à vous signaler que pour que l'article reste le plus digeste possible, je vais simplifier certains éléments. J'essayerai de mettre des laïus sur les parties difficiles qui me paraissent importantes à éclairer, mais il sera difficile d'être exhaustif. Donc si vous voulez une solution complète, n'hésitez pas à vous référer directement au [code source de la démo](https://github.com/JulienPradet/blog-posts/tree/e7a2fb616ee88449971a18e3f5b95f821958400e/static/examples/sticky-header/vanilla) ou à tout simplement me contacter sur les réseaux sociaux si vous avez une question en particulier.

### 1. Mise en place de l'affichage initial et état final

Comme d'habitude quand on fait du web, avant de parler style, animation ou quoique ce soit, commençons par nous mettre d'accord sur la structure HTML que nous allons utiliser. Il y a notamment 4 parties qui seront importantes :

- la bannière de couverture
- l'avatar
- le titre (et sous-titre)
- le bouton de contact

```html
<header class="main-header">
	<img class="cover" src="./cover.jpg" alt="Une magnifique étendue d'herbe" />
	<div class="author">
		<img
			src="./cover.jpg"
			alt="Julien Pradet, son casque sur les oreilles (parce qu'il a oublié de l'enlever pour la photo), sourire aux lèvres et pas vraiment sérieux."
			class="author__avatar"
		/>
		<div class="author__title">
			<h1 class="author__name">Enchanté, Julien Pradet</h1>
			<p class="author__description">Un dev' top moumoute</p>
		</div>
		<a class="author__contact" href="https://www.julienpradet.fr/">Me contacter</a>
	</div>
</header>
```

Sur cette base nous allons maintenant pouvoir commencer à appliquer des styles. Il est encore trop tôt pour parler animation, mais un peu plus haut nous avons vu qu'il fallait penser à 2 états : l'état initial et l'état final. Dans notre cas, nous allons donc devoir écrire le CSS :

- quand le header n'est pas sticky et qu'on peut se contenter d'afficher l'avatar, puis en dessous, le titre de la page
- quand le header est sticky et donc que l'avatar rétrécit et le titre de la page passe sur la droite

Généralement, dans ce genre de situations, je sors mon outil de layout préféré : CSS Grid.

<figure tabindex="-1">
<img src="/images/posts/sticky/grid.png" alt="Schema qui montre que pour l'état initial, on a besoin de 3 colonnes, 2 lignes. Et pour l'état sticky, on a besoin d'une seule ligne et 3 colonnes" width="963" height="491" loading="lazy">
</figure>

Ainsi, nous pouvons garder exactement la même structure HTML pour des affichages réellement différents. Le tout est de jouer avec les lignes et les colonnes pour aboutir à l'alignement rêvé. D'ailleurs, si jamais vous voulez aller plus loin, la semaine dernière je vous parlais de [Comment `display: contents` peut vous aider à conserver la même structure HTML avec CSS Grid](/fiches-techniques/aligner-avec-css-grid-et-display-contents/).

Voici par exemple à quoi pourrait ressembler le CSS pour l'état initial:

```css
.author {
	display: grid;
	grid-template-areas:
		'Avatar . .'
		'Title Title Contact';
	grid-template-columns: 8rem 1fr auto;
	gap: 2rem;
}

.author__avatar {
	grid-area: Avatar;
}

.author__title {
	grid-area: Title;
}

.author__contact {
	grid-area: Contact;
}
```

Ainsi, la seule chose qu'on a besoin de changer pour l'état final serait :

- d'ajouter une classe `.author--sticky` à la `div.author`
- ajouter ces quelques lignes de CSS pour préciser que l'organisation est différente en mode sticky
  ```css
  .author--sticky {
  	grid-template-areas: 'Avatar Title Contact';
  	grid-template-columns: 3rem 1fr auto;
  	gap: 1rem;
  }
  ```

Comme vous pouvez le constater, pour l'instant, pas de calculs particuliers. On code uniquement notre CSS afin qu'il soit capable d'afficher indépendamment l'état normal ou l'état sticky. La seule contrainte est de minimiser la modification du HTML en ne s'autorisant qu'à changer des classes (en l'occurrence `.author--stick`).

> 💡 Quelques petites subtilités que je n'ai pas mentionné qui viendront plus tard:
>
> - pas de `position: sticky` ni de `position: fixed` ?
> - à quel moment l'avatar dépasse-t-il sur la bannière de couverture ?

> 💡 Une autre question que vous pouvez vous poser : Comment gérer une max-width tout en s'assurant que le contenu est centré ?
>
> En effet, on ne peut pas réellement se contenter d'un `max-width: 60rem; margin: 0 auto;` parce qu'on veut que le fond dépasse à gauche et à droite. Il a plusieurs solutions à cela, mais celle que j'ai tendance à privilégier en ce moment est d'ajouter des pseudo éléments à la grille qui seront responsables de gérer l'espace à gauche et à droite. Sur le principe ça ressemble à quelque chose de ce style:
>
> ```css
> .author {
> 	--container-padding: 0.5rem;
> 	--max-container-width: 60rem;
> 	--gutter-width: max(
> 		var(--container-padding),
> 		calc((100% - var(--max-container-width)) / 2 + var(--container-padding))
> 	);
>
> 	grid-template-areas:
> 		'GutterLeft Avatar . . GutterRight'
> 		'GutterLeft Title Title Contact GutterRight';
> 	grid-template-columns: var(--gutter-width) 8rem 1fr auto var(--gutter-width);
> }
>
> .author::before {
> 	content: '';
> 	grid-area: GutterLeft;
> }
>
> .author::after {
> 	content: '';
> 	grid-area: GutterLeft;
> }
> ```
>
> Je passe un peu rapidement sur cette partie. Si ce n'est pas suffisamment clair, n'hésitez pas à m'envoyer un message. J'en ferai un article.

En tout cas, dans l'idée, ça nous a amené à ce résultat :

<figure tabindex="-1">
<img src="/images/posts/sticky/2-modes.png" alt="Affichage des 2 modes, normal avec le header qui prend beaucoup de place, puis sticky où le header est beaucoup plus petit" width="807" height="487" loading="lazy">
</figure>

### 2. Mise en place du JavaScript pour passer d'un état à l'autre

Passons maintenant au code JavaScript qui sera responsable de passer d'un état à l'autre. Le premier réflexe vu qu'on parle de changement qui doit apparaître au scroll est d'ajouter un listener sur l'événement `scroll`. Cependant cette méthode n'est pas pratique à utiliser et peut rapidement aboutir à des problèmes de performance. Essayez donc de l'éviter au maximum.

Nous allons donc passer par un [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). C'est une API disponible dans les navigateurs qui permet de déclencher un événement quand la visibilité d'un élément à changer.

```js
const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		console.log(entry.isIntersecting);
		// Affiche true si l'élément observé est visible
		// Affiche false sinon
	});
});

observer.observe(element);
```

Dans notre cas, quel serait l'élément qu'on voudrait observer ? Quand est-ce que la visibilité (ou l'invisibilité) d'un élément peut nous indiquer qu'on veut déclencher le mode sticky ? Généralement il s'agit de l'élément qu'on va manipuler. Mais ici le principe est justement que notre `.author` ne doit jamais disparaître. Nous allons donc plutôt observer l'image de la cover.

De plus, nous allons devoir configurer l'`IntersectionObserver` pour qu'il se déclenche non pas quand le dernier pixel de la cover n'est plus visible, mais un peu plus tôt pour que l'avatar soit encore majoritairement visible avant de passer en mode sticky. On va donc essayer de viser la ligne rouge ci-dessous qui vient couper l'avatar vers 1/4 de sa hauteur.

<figure tabindex="-1">
<img src="/images/posts/sticky/intersection-observer.png" alt="Représentation schématique du header en mode non sticky, avec une ligne rouge pour indiquer à quel niveau de scroll on veut déclencher le mode sticky" width="807" height="487" loading="lazy">
</figure>

Pour ce faire, nous allons passer des options supplémentaires à l'`IntersectionObserver` et plus précisément, nous allons devoir configurer la `rootMargin` : c'est elle qui nous permettra de dire à quelle distance de la fin de l'image on doit déclencher l'observer. Nous allons donc lui mettre quelques pixels négatifs.

```js
const author = document.querySelector('.author');
const cover = document.querySelector('.cover');

const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			// Si entry.isIntersecting, ça veut dire qu'une grande partie
			// de la cover est visible => on enlève la classe `author--sticky`
			// Si au contraire !entry.isIntersecting, on a dépassé la ligne
			// rouge => on ajoute la classe `author--sticky`
			author.classList.toggle('author--sticky', !entry.isIntersecting);
		});
	},
	{
		// Dès qu'il y a ne serait-ce qu'un pixel au dessus de la ligne rouge
		// => donc threshold = 1
		threshold: 0,
		// On met la hauteur en pixel entre la fin de l'image et la ligne rouge
		// C'est négatif parce qu'on entre à l'intérieur de l'image. Si le nombre
		// était positif, alors la ligne rouge se retrouverait sous l'image
		rootMargin: '-32px 0px'
	}
);

observer.observe(cover);
```

Et là, magie, nous avons le passage du mode normal au mode sticky.

<figure>
<video controls src="/images/posts/sticky/julien-pradet-mode-switch.mp4" title="En scrollant sur le site web, on constate que au bout d'un certain niveau de scroll le header change bien de mode d'affichage, mais si on scroll trop bas il n'est plus visible." width="329" height="540" style="aspect-ratio: 329 / 540"></video>
</figure>

Pas tout à fait cependant parce que même si l'organisation de l'affichage a changé, ce n'est pas "sticky" au sens où si on scroll en bas de la page, le header n'est plus visible.

### 3. Faire fonctionner le sticky

Dans la plupart des cas `sticky` vous allez pouvoir vous contenter d'utiliser `position: sticky`.

Cependant il y a plusieurs problèmes qui font que ce n'est pas possible dans notre cas:

- `position: sticky` est relatif à la balise parente.

  Étant donné que notre `div.author` est à l'intérieur d'une balise `header`, alors sa zone de stickiness s'arrêtera dès qu'on aura scrollé au delà du header. Ce n'est pas un problème totalement incontournable parce que nous pourrions travailler le HTML pour faire en sorte que notre `div.author` soit un enfant direct du `body`. Mais ça demanderait quelques ajustements sémantiques.

- Le navigateur n'arrivera pas à gérer un changement de hauteur en fonction de si on est `sticky` ou non.

  Dans le cadre de ma [démo](https://www.julienpradet.fr/examples/sticky-header/vanilla/index.html), il n'y a pas que la grille qui change. Afin de prendre le minimum de place, je change aussi le padding, la font-size et je cache le lien vers les réseaux sociaux. La conséquence c'est que la `height` de ma `div.author` va changer selon si elle est en `author--sticky` ou non. Et ça, le navigateur ne va pas du tout apprécier. Du tout. En gros, à peine vous aurez atteint le mode sticky, que le navigateur va vous en sortir instantanément parce que la hauteur totale de votre page aura changé et donc vous fera ressortir de l'IntersectionObserver. Vous pouvez vous référer à ce [CodePen](https://codepen.io/julienpradet/pen/BavLjvY) pour constater le problème.

Pour ces raisons, nous n'allons pas utiliser `position: sticky`, mais `position: fixed`.

```css
.author--sticky {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
}
```

Ainsi, quand on passe en mode sticky, la `div.author` viendra effectivement coller le haut de l'écran. Mais si vous essayez cette solution vous constaterez que la hauteur totale du scroll de la page change au moment de l'ajout de `author--sticky`. Cela vient du fait que la hauteur de `div.author` passe en `fixed` et donc n'est plus comptabilisée dans le flow du document.

L'astuce que j'ai appliquée pour régler ce problème est de définir une `min-height` sur `.main-header`. Et pour éviter des tailles en dur, c'est au niveau du JS que je vais gérer cela :

```js
const mainHeader = document.querySelector('.main-header');
mainHeader.style.minHeight = `${mainHeader.clientHeight}px`;

// ... puis le reste du code JS qu'on avait déjà écrit
// avec l'IntersectionObserver & co
```

Ainsi, au moment de l'initialisation de la page, je précise que le header devra toujours faire au moins sa taille courante. De fait, quand `div.author` passera en `position: fixed`, `.main-header` conservera la bonne taille.

> 💡 Quand on fait des calculs de taille au chargement de la page, il faut penser à gérer des redimensionnement de navigateur. En effet, un cas courant est le fait de tourner votre téléphone pour mieux voir le contenu. Or, en position portrait et en position paysage, la hauteur du `main-header` ne sera pas du tout la même. Souvent cette partie est assez complexe et ce n'est pas le cœur du sujet que je veux aborder dans ce tutoriel. Si toutefois vous voulez voir comment j'ai géré ça dans la démo, je vous invite à jeter un coup d'œil au [code source](https://github.com/JulienPradet/blog-posts/blob/e7a2fb616ee88449971a18e3f5b95f821958400e/static/examples/sticky-header/vanilla/script.js#L97-L113).

<figure>
<video controls src="/images/posts/sticky/julien-pradet-sticky.mp4" title="En scrollant sur le site web, on constate que au bout d'un certain niveau de scroll le header change bien de mode d'affichage, mais si on scroll trop bas il n'est plus visible." width="329" height="540" style="aspect-ratio: 329 / 540"></video>
</figure>

### 4. Animons la transition vers le mode sticky

A ce stade, nous avons donc un header qui peut être en mode normal ou en mode sticky en fonction du niveau de scroll. Mais ce que je disais en introduction, c'est que c'est l'animation qui améliore la perception de qualité de notre page. Donc voyons comment l'implémenter.

Pour cela, nous allons utiliser les animations FLIP. Pour celles et ceux qui me suivent depuis longtemps, ça vous parlera peut-être parce que j'ai déjà écrit <a href="/tutoriels/introduction-aux-animations-flips/" title="Introduction aux animations FLIP">un article à ce sujet</a> il y a plus de 5 ans.

En quelques mots, le but de ces animations est de calculer la différence entre l'état de départ et l'état d'arrivée pour ensuite être capable de faire l'animation uniquement en utilisant les propriétés CSS `transform` et `opacity` qui sont [le seul moyen d'avoir des animations performantes sur le web](/tutoriels/des-animations-performantes-1/).

Plus précisément cela se fait en 4 étapes, une par lettre :

- **F**irst : on enregistre la position de départ de l’élément (ex : `{top: 100, left: 50}`)
- **L**ast : on place l’élément dans sa position finale et on enregistre sa position (ex : `{top: 130, left: 50}`)
- **I**nvert : on calcule la différence entre les deux positions (ex : `{top: -30, left: 0}`) et on l’applique à l’élément. Ainsi, quand on applique cette transformation à l’élément avec la propriété CSS `transform`, on aura visuellement l'impression qu'il est à sa position initiale.
- **P**lay : puis on lance l'animation. Cela peut se faire en définissant la propriété CSS `transition: transform 0.4s ease-in-out`, puis en retirant la propriété `transform`.

Ce paradigme est assez répandu dans le domaine du web parce que c'est la méthode magique qui permet de faire des animations performantes. Quelques outils qui peuvent vous aider à mettre ça en place:

- GSAP via [FlipPlugin](https://greensock.com/docs/v3/Plugins/Flip/)
- Svelte via [`animate:flip`](https://learn.svelte.dev/tutorial/animate) ❤️
- Vue via [\<TransitionGroup\>](https://vuejs.org/api/built-in-components.html#transitiongroup)

Dans le cadre de ce tutoriel, je suis en Vanilla alors j'ai réutilisé ce que j'avais déjà commencé à écrire dans mon précédent tutoriel. J'ai cependant amélioré la librairie pour que l'étape **P**lay soit faite en CSS plutôt que de la gérer manuellement en JS. Les animations sont donc encore plus performantes qu'avant 🚀

J'ai par ailleurs ajouté un petit wrapper afin de simplifier son utilisation. De fait, on va pouvoir mettre en place l'animation en 2 étapes :

- Ajouter sur chacun des éléments que je veux animer une classe permettant de les identifier (ici `js-animate`) :
  - l'avatar
  - le titre
  - le contact
- Dans le JS, entourer le changement de class de [ma fonction `animate`](https://github.com/JulienPradet/blog-posts/blob/e7a2fb616ee88449971a18e3f5b95f821958400e/static/examples/sticky-header/vanilla/animate.js)

  ```diff
  +import { animate } from './animate.js';

  const observer = new IntersectionObserver(
  	(entries) => {
  		entries.forEach((entry) => {
  +			const elementsToAnimate = author.querySelectorAll('.js-animate');
  +			animate(elementsToAnimate, () => {
  				author.classList.toggle('author--sticky', !entry.isIntersecting);
  +			});
  		});
  	}
  	/* ... */
  );
  ```

  > 💡 Peut être remarquerez vous que l'API ressemble beaucoup à `document.startViewTransition`. C'est volontaire, mais je ne vais pas l'utiliser dans ce tutoriel par manque de support navigateur. Je ferai cela dit un article dans les prochaines semaines pour vous en parler en détail. J'ai notamment des problématiques de performance à vous partager à ce sujet.

Si vous en êtes arrivés à ce stade, le plus gros du travail est fait.

<figure>
<video controls src="/images/posts/sticky/julien-pradet-animate.mp4" title="En scrollant sur le site web, on constate que au bout d'un certain niveau de scroll le header change bien de mode d'affichage, mais si on scroll trop bas il n'est plus visible." width="329" height="540" style="aspect-ratio: 329 / 540"></video>
</figure>

Cela dit, il y a quelques difficultés que j'ai passé sous silence.

#### Le titre n'est pas toujours sur une seule ligne.

En effet sur certaines résolutions, le titre va être sur 2 lignes en mode normal et 1 seule en mode sticky.

<figure tabindex="-1">
<img src="/images/posts/sticky/2-lines-on-mobile.png" alt="Sur le screen de gauche, on voit que le titre &quot;Enchanté Julien Pradet&quot; est sur 2 lignes, mais sur le screen de droite, en mode sticky, cela passe sur une seule ligne" width="834" height="442" loading="lazy">
</figure>

L'astuce est alors de transformer le HTML pour découper chaque mot dans sa propre balise afin qu'elle ait sa propre transition :

```diff
-<h1 class="author__name js-animate">
-    Enchanté, Julien&nbsp;Pradet
+<h1 class="author__name">
+    <span class="js-animate">Enchanté,</span>
+    <span class="js-animate">Julien&nbsp;Pradet</span>
 </h1>
```

> 💡 A noter toutefois que ça ne marchera pas sur des éléments `inline` (le comportement par défaut d'un `span`). Il faudra donc penser à ajouter en CSS la propriété `display: inline-block`.
>
> Par ailleurs, si votre texte fait 5 paragraphes, ça va commencer à devenir assez lourd de calculer chaque animation FLIP. Donc à appliquer avec parcimonie.

#### Si je n'anime que les éléments internes, ça veut dire que le fond ne va pas s'animer.

Comment faire pour que pendant l'animation la zone couleur crème soit elle aussi animée ?

L'astuce est de considérer le fond comme un enfant supplémentaire. Nous allons donc ajouter une nouvelle div vide à l'intérieur de `div.author`:

```html
<div class="author">
	<div class="author__background js-animate"></div>
	<!-- le reste du HTML de div.author -->
</div>
```

Il faut bien penser à lui ajouter la classe `js-animate` vu qu'elle fait partie des éléments à animer.

Par ailleurs, étant donné qu'elle est vide, il va falloir trouver un moyen d'adapter sa taille au contenu. Pas question d'utiliser des hauteurs de pixel en dur. Une méthode qui marche en général assez bien est plutôt d'utiliser un `position: absolute` :

```css
.author {
	position: relative;
	/* C'est en définissant le z-index ici que je m'assure
    que les z-index des enfants n'impacteront pas l'extérieur */
	z-index: 1;
	/* Au passage, c'est grâce à ce margin-top négatif
    que l'avatar va venir dépasser par dessus la cover */
	margin-top: -4rem;
}

.author__background {
	position: absolute;
	inset: 0;
	top: 4rem;
	background: var(--color-creme);
	z-index: -1;
}

.author--sticky {
	position: fixed;
	/* Il faut bien penser à remettre à 0 le margin-top
    en sticky vu que l'avatar ne déborde plus */
	margin-top: 0;
}

.author--sticky .author__background {
	top: 0;
	/* Et vous pouvez en profiter pour changer d'autres choses */
	opacity: 0.5;
}
```

#### Enfin, il est important de ne jamais animer si `prefers-reduced-motion` est activé.

En effet, certains contenus animés peuvent donner des nausées aux personnes qui les regardent - même si l'animation vous paraît subtile.

Il existe une media query pour ça en CSS : `@media (prefers-reduced-motion: reduce)`. En JS, on peut donc la reproduire via `window.matchMedia('(prefers-reduced-motion: reduce)').matches`. Si vous êtes passé directement par ma librairie `animate` mentionnée plus haut, sachez que c'est déjà géré à l'intérieur. Mais si vous utilisez un autre système, pensez à bien vérifier qu'en activant l'option, vos animations ne sont plus déclenchées.

Pour le tester dans les DevTools de Chrome, vous pouvez aller dans <abbr title="Customize and control DevTools">⋮</abbr> > More tools > Rendering, puis activer l'option `prefers-reduced-motion: reduce`:

<figure tabindex="-1">
<img src="/images/posts/sticky/reduced-motion.png" alt="Screenshot de l'option &quot;Emulate CSS meda feature prefers-reduced-motion&quot; dans les DevTools de Chrome" width="339" height="94" loading="lazy">
</figure>

### 5. Animons l'avatar

Enfin, cerise sur le gateau, ce qui rend la démo de Jhey aussi chouette est le fait que son avatar s'anime quand il passe en sticky. Au début il regarde vers la droite, et une fois passé en sticky, il regarde vers le bas.

La technique utilisée pour ceci est d'utiliser un sprite. Le principe est d'avoir une seule image qui contient toutes les étapes de votre animation.

<figure tabindex="-1">
<img src="/examples/sticky-header/vanilla/sprite_avatar.jpg" alt="Screenshot de l'option &quot;Emulate CSS meda feature prefers-reduced-motion&quot; dans les DevTools de Chrome" width="4640" height="232" loading="lazy">
</figure>

On l'occurrence j'ai pris une vidéo de moi qui fait l'andouille, puis j'ai [récupéré les images intermédiaires via ce site](https://www.onlineconverter.com/extract-image-from-video). Puis en CLI, j'ai pu créer le montage ci-dessus:

```sh
montage images/*.jpg -mode concatenate -tile x1 sprite.jpg
```

Ensuite, en CSS l'astuce va être de jouer avec `object-position`. En effet, quand on affiche une image par défaut, elle va s'afficher en suivant le ratio de celle-ci. Cependant, notre avatar, on veut qu'il soit carré. Donc on va forcer en CSS une `width` et une `height` définie et ajouter `object-position: cover` pour que toute la hauteur de l'image soit affichée.

```css
.author__avatar {
	width: 8rem;
	height: 8rem;
	object-fit: cover;
}
```

<img class="custom-avatar-example" src="/examples/sticky-header/vanilla/sprite_avatar.jpg" alt="Le même sprite mais affiché avec les options CSS sus-mentionnées. Un carré est affiché avec sur la moitié gauche la partie droite de mon visage et sur la moitié droite, la partie gauche de mon visage." width="4640" height="232" loading="lazy">
<style>.custom-avatar-example { width: 8rem; height: 8rem!important; object-fit: cover;}</style>

Mais comme vous pouvez le constater, on se retrouve au milieu de deux images. C'est donc l'`object-position` va nous permettre de dire : est-ce qu'on veut afficher le début ou la fin ? En le mettant à 0, on va donc afficher le début.

```diff
.author__avatar {
	width: 8rem;
	height: 8rem;
	object-fit: cover;
+	object-position: 0 0;
}
```

<img class="custom-avatar-example-2" src="/examples/sticky-header/vanilla/sprite_avatar.jpg" alt="Le même sprite mais cette fois on ne voit que la première image, avec mon visage qui regarde la caméra." width="4640" height="232" loading="lazy">
<style>.custom-avatar-example-2 { width: 8rem; height: 8rem!important; object-fit: cover; object-position: 0 0;}</style>

Il ne reste plus qu'à créer une animation en utilisant `@keyframes` en CSS. L'astuce ici va être d'utiliser `steps(19)` comme `timing-function`. En effet, même si on est plutôt habitué à l'utilisation de `linear`, `ease-in-out` voire des `cubic-bezier()`, il est aussi possible de définir un nombre fini de frames dans votre transition. C'est donc ce `steps(19)` qui va nous permettre de faire en sorte que ce soit toujours une tête entière qui soit visible. N'hésitez pas à faire varier le nombre en fonction du nombre d'images présentes dans votre sprite.

```css
.author__avatar {
	animation: 0.4s steps(19) 0s 1 normal forwards look-down;
}

@keyframes look-down {
	from {
		object-position: 0 0;
	}
	to {
		object-position: 100% 0;
	}
}
```

Vous pouvez tester sur l'image ci-dessous en cliquant dessus:

<img tabindex="0" class="custom-avatar-example-3" src="/examples/sticky-header/vanilla/sprite_avatar.jpg" alt="Le même sprite mais cette fois on ne voit que la première image, avec mon visage qui regarde la caméra." width="4640" height="232" loading="lazy">
<p style="text-align: center;"><strong>Clique sur mon nez !</strong></p>
<style>
.custom-avatar-example-3 {
    width: 8rem;
    height: 8rem!important;
    object-fit: cover;
    object-position: 0 0;
}
@media (prefers-reduced-motion: no-preference) {
    .custom-avatar-example-3:focus {
        animation: 0.4s steps(19) 0s 1 normal forwards custom-look-down;
    }
    @keyframes custom-look-down {
        from {
            object-position: 0 0;
        }
        to {
            object-position: 100% 0;
        }
    }
}
</style>

> 💡 Pourquoi ne pas avoir utilisé `transition: object-position 0.4s steps(19)` plutôt qu'`animation` ?
>
> En effet, il est tout à fait possible d'utiliser la `transition-timing-function: steps(x)` pour une transition. Le souci est que si votre transition est interrompue en milieu d'animation, alors elle continuera d'utiliser `19` steps pour revenir à sa position initiale. Dans les faits, vous vous retrouverez donc avec une animation buggée. Cela n'arrive pas avec des `@keyframes` et une `animation` parce que cela démarrera toujours de l'état initial vers l'état final. L'animation ne pourra pas commencer dans un état intermédiaire.

Nous sommes maintenant capable d'animer notre avatar. Comment l'associer à notre animation du sticky ? Étant donné que l'animation doit être jouée qu'une seule fois à un moment précis (quand le sticky se met en place, ou quand on l'enlève), on va le faire en deux temps :

1. Ajouter une classe CSS `.author--animating` qui, quand elle est présente, déclenche l'animation :

```css
.author__avatar {
	/* On affiche la première frame */
	object-position: 0 0;
}

.author--sticky .author__avatar {
	/* En sticky, c'est plutôt la dernière frame */
	object-position: 0 0;
}

/* On ajoute la media query pour les questions d'accessibilité
évoquées plus haut */
@media (prefers-reduced-motion: no-preference) {
	/* Si pas author--sticky, alors on est en train de
    revenir au mode normal donc on `reverse` l'animation */
	.author--animating .author__avatar {
		animation: 0.4s steps(19) 0s 1 reverse forwards look-down;
	}

	/* Si au contraire, on est en train de passer
    en mode sticky, l'animation doit se dérouler dans
    le sens normal */
	.author--sticky.author--animating .author__avatar {
		animation-direction: normal;
	}
}
```

2. Et dans le JS, dans l'IntersectionObserver, on ajoute cette classe `author--animating` :

```diff
const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			const elementsToAnimate = author.querySelectorAll('.js-animate');
			animate(elementsToAnimate, () => {
+				author.classList.add('author--animating');
				author.classList.toggle('author--sticky', !entry.isIntersecting);
+			}).then(() => {
+				// Une fois que l'animation est terminée on retire la class
+				// pour être sûr que l'animation se rejouera au prochain coup
+				author.classList.remove('author--animating');
			});
		});
	}
	/* ... */
);
```

Et voilà 🎉 Notre avatar est animé !

<figure>
<video controls src="/images/posts/sticky/julien-pradet-sticky-demo.mp4" title="En scrollant sur le site web, on constate que au bout d'un certain niveau de scroll le header change bien de mode d'affichage, mais si on scroll trop bas il n'est plus visible." width="304" height="502" style="aspect-ratio: 304 / 502"></video>
</figure>

#### Lazyloader le Sprite pour garder un premier affichage rapide

J'ai une dernière remarque cela dit : nécessairement le sprite qui contient toutes les frames de l'animation de ma tête est assez lourd. Le problème de cette technique est donc que ça va ralentir l'affichage initial de la page par rapport à un avatar normal. On parle d'un ratio x15 sur le poids de l'image 😱 Histoire de garder des performances convenables, j'ai donc opté pour une sorte de lazyloading :

```html
<img
	src="./avatar.jpg"
	data-sprite-src="./sprite_avatar.jpg"
	width="232"
	height="232"
	class="author__avatar js-animate js-avatar"
/>
```

Initialement, le navigateur va charger mon avatar simple qui contient uniquement la première frame de ma tête. Puis, en JavaScript je vais venir modifier l'URL de l'image pour être en mesure de faire l'animation. Ainsi, la grosse image est chargée plus tard et elle n'est chargée que si le JavaScript a réussi à s'initialiser.

Pour appliquer cette méthode en JS j'ai ajouté ce petit script:

```js
const sprite = document.createElement('img');
sprite.src = avatar.dataset.spriteSrc;
sprite.addEventListener('load', () => {
	avatar.src = sprite.src;
});
```

L'astuce est de faire en sorte d'attendre que l'image ait fini de charger avant de changer l'attribut `src` de mon avatar. Si je n'avais pas fait ça, j'aurais pu avoir un flash blanc sur mon image.

## Conclusion

Nous voilà arrivé au bout. 🥳 Si vous ressentez le besoin de creuser un peu plus, n'oubliez pas que le [code source](https://github.com/JulienPradet/blog-posts/blob/e7a2fb616ee88449971a18e3f5b95f821958400e/static/examples/sticky-header/vanilla/) de la [démo](https://www.julienpradet.fr/examples/sticky-header/vanilla/index.html) est disponible sur mon GitHub.

Est-ce que malgré tout on a bien fait notre travail ? Pour ça revenons à la liste des problèmes qu'on avait repéré sur les Scroll Driven Animations :

- on ne reste plus bloqué dans un état intermédiaire pendant le scroll
- quelle que soit la vitesse de scroll, l'animation est lisible : tout le monde verra le header s'animer pour passer d'une position normale à sticky
- il n'y a plus de calcul savant pour calculer des positions et dimensions. Tout est géré avec CSS Grid puis calculé automatiquement en JS. La seule dimension manuelle est celle du `rootMargin` de l'`IntersectionObserver`

A priori, la mission est donc plutôt remplie. D'autant plus que cette technique permet aussi :

- de changer la taille du texte sans pour autant souffrir de problèmes de performance
- d'animer des changements plus complexes (ex : le texte qui passe de 2 lignes à une seule en mobile)

Par contre, **elle crée aussi de nouveaux problèmes**. Notamment, si on scroll peu, on se retrouve avec un grand espace blanc. Et si vraiment on joue avec la limite, on peut même se retrouver avec le sticky qui vient par dessus la cover.

<figure tabindex="-1">
<img src="/images/posts/sticky/sticky-overlap.png" alt="En étant au tout début du sticky, on voit une petite partie verte sous le sticky. Et il y a facilement 200px de blanc ensuite sous le sticky." width="374" height="402" loading="lazy">
</figure>

Personnellement je pense que le compromis est acceptable comparé à l'état cassé de la Scroll Driven Animation. Par contre c'est ce qui me fait dire que si je devais intégrer ce design sur un site en production, je continuerais à faire quelques adaptations. Notamment, j'essayerais de travailler pour que la différence de hauteur entre sticky et non sticky soit moins flagrante afin de diminuer la hauteur de l'espace blanc que cela crée.

En tout cas c'était une chouette démo à faire et ça m'a remotivé à faire des animations partout. Cela dit, je veux me pencher sur le sujet de l'API View Transitions parce qu'en se jetant corps et âmes dedans, j'ai peur que ça ouvre [des nouvelles problématiques de performance](https://twitter.com/JulienPradet/status/1697864631857868905). Je publierai un article à ce sujet courant septembre je pense.

Si vous voulez continuer de suivre mes tutoriels, n'hésitez pas à me suivre sur les réseaux sociaux ([Mastodon](https://piaille.fr/@julienpradet), [LinkedIn](https://www.linkedin.com/in/julienpradet/) ou [Twitter](https://twitter.com/JulienPradet), voire même [RSS](/feed.xml)). J'essaye de publier un article par semaine autour de la performance web et du développement front-end dans son ensemble pour partager mes découvertes et ma façon de travailler.

Si lire des articles vous paraît trop long et que vous avez des besoins plus urgents à adresser, sachez que je suis [disponible en freelance](/developpeur-web-performance/) pour vous aider à monter en compétence, régler vos soucis de performance ou ajouter un petit plus à votre site web. Alors n'hésitez pas à me contacter !

Des bisous et à la semaine prochaine 😘

---

Enfin, si cet article vous a ouvert l'appetit sur les Scroll Driven Animations, voici **quelques ressources qui méritent votre attention** :

- [Animate elements on scroll with Scroll-driven animations](https://developer.chrome.com/articles/scroll-driven-animations/)
- [A bunch of demos and tools to show off Scroll-driven Animations](https://scroll-driven-animations.style/)

Ce sont ces ressources qui me font dire qu'il y a bel et bien un usage pour cette nouvelle API. Cependant, je restreindrais son utilisation à certains cas :

- soit avec des zones de scroll très courtes
- soit avec du [Scroll Snap](https://developer.mozilla.org/fr/docs/Web/CSS/CSS_scroll_snap)
- soit avec des [jeux d'opacité](https://ryanmulligan.dev/blog/scroll-driven-animations/)
- soit pour d'autres usages très différents (cf. [Position-Driven Styles](https://kizu.dev/position-driven-styles/) & [Fit-to-Width Text](https://kizu.dev/fit-to-width-text/) qui révolutionneront votre perception des possibilités qu'ouvrent les Scroll Driven Animations)
- soit avec animations plus subtiles pour que ça n'ait jamais l'air cassé ou temporaire [Shrinking Header](https://scroll-driven-animations.style/demos/shrinking-header-shadow/css/)

Vous en voyez d'autres ? 🤔
