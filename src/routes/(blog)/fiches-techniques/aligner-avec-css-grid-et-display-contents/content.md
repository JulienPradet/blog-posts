La semaine dernière, je me suis retrouvé face à un dilemme en CSS : comment faire pour aligner les images des articles alors que la taille de mes textes sont dynamiques ?

<figure tabindex="0">
<picture>
<source type="image/avif" src="/images/posts/css-grid-display-contents/problem.avif">
<source type="image/webp" src="/images/posts/css-grid-display-contents/problem.webp">
<img src="/images/posts/css-grid-display-contents/problem.jpg" alt="Screenshot d'une interface web qui affiche 3 articles distincts constitués d'un titre, d'une image et d'un texte" width="944" height="478">
</picture>
<figcaption><a href="https://codepen.io/julienpradet/pen/gOZarGa">Code d'exemple</a></figcaption>
</figure>

Comme vous pouvez le voir, si on utilise une approche classique, ce n'est pas très esthétique : les images sont décalées, on a l'œil qui accroche sans que ce soit réellement l'intention.

Dans cet article, je vais vous présenter en quelques mots les différentes approches auxquelles j'ai pensé avant de vous parler de celle qui aujourd'hui me satisfait le mieux. [Par ici, si vous voulez directement la solution](/fiches-techniques/aligner-avec-css-grid-et-display-contents/#css-gird-display-contents-a-la-rescousse).

## Avant le style, le HTML

Avant de commencer à penser CSS, il faut déjà qu'on ait en tête le HTML qui permet d'afficher ce contenu. Notamment le but est d'être le plus sémantique possible. Par exemple ici avec l'utilisation de la balise `article`, en prenant bien soin de mettre le bon niveau de heading, etc.

<!-- prettier-ignore -->
```html
<div class="article-list">
	<article class="article">
		<h2 class="article__title">Pawsitively Mysterious Purring</h2>
		<!--
            N'oubliez pas d'optimiser vos images en vous referrant à mon super article 😁
            https://www.julienpradet.fr/tutoriels/optimiser-le-chargement-des-images/
        -->
		<img
			alt="A cute random kitten"
			src="https://placekitten.com/g/300/200"
			width="300"
			height="200"
		/>
		<p>
			Cats are the only animals that can purr while both inhaling and exhaling,
            and the exact reason behind this unique behavior remains a scientific puzzle.
		</p>
	</article>

	<article class="article">
		<!-- Idem -->
	</article>
</div>
```

## Les approches abandonnées

### Première option : tronquer les textes

Une solution, certainement la plus simple techniquement est de tronquer les textes. Ainsi, on s'assure que rien ne dépasse jamais et que tout est parfaitement aligné.

<figure tabindex="0">
<img src="/images/posts/css-grid-display-contents/truncate.jpg" alt="Même screenshot qu'en début d'article mais avec des `...` à la fin du premier titre pour s'assurer qu'il est bien sur une seule ligne" loading="lazy" width="934" height="387">
</figure>

```css
.article-list {
	display: grid;
	grid-template-columns: repeat(3, 18rem);
	gap: 0 1rem;
	width: fit-content;
	margin: 0 auto;
}

.article__title {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
```

> 💡 Petite astuce technique : pour que `text-overflow: ellipsis` fonctionne, il faut que l'élément ait une taille fixe. Cela peut être un `%` ou comme ce que j'ai fait ici une taille fixe (`18rem`). Mais des unités telles que `1fr` ou `auto` ne fonctionneraient pas parce que le navigateur adapterait la largeur des articles plutôt que de bloquer la largeur du titre.

Le problème de cette approche, c'est qu'on va, par essence, découper du texte. Et cela peut amener à des situations... cocasses.

<figure tabindex="0">
<a href="https://mastodon.tetaneutral.net/@KToche@mamot.fr/110949639552785049"><img src="/images/posts/css-grid-display-contents/truncate-bad-idea.jpg" alt="Screenshot d'une prévisualisation d'article de journal qui est titré 'Pénurie d'eau : la Cour des comptes invite l’État à frapper les gros cons...' parce que le dernier mot est tronqué" loading="lazy" width="408" height="350"></a>
</figure>

Plus d'exemples et explications dans le Toot de Natouille ["#UXWriting du jour : tronquer les textes ? Mauvaise idée."](https://mastodon.tetaneutral.net/@Natouille/110949547359953561) sur Mastodon.

Dans mon cas, ça avait l'inconvénient supplémentaire que le titre était utilisé pour des noms d'artistes. Si j'écris "Anne-Sophie B...", ça ne sert pas à grand chose. Il y a certainement plein d'artistes dans le monde qui ont leur nom de famille qui commence par "B". Et au delà de l'aspect utile, je trouve que c'est tout simplement une marque de respect que de ne pas écorcher les noms.

### Deuxième option : réserver suffisamment de place

Au maximum, mes titres peuvent être sur 3 lignes. Qu'à cela ne tienne, je vais simplement réserver suffisamment de place pour afficher 3 lignes puis aligner sur cette hauteur le texte en bas.

```css
.article__title {
	/* J'aligne par le bas grâce à flexbox */
	display: flex;
	align-items: end;
	/* 3 lines * font-size * line-height */
	min-height: calc(3 * 1em * 1.3);
}
```

A nouveau plusieurs inconvénients :

- Aujourd'hui je sais que je ne dépasserai jamais les 3 lignes. Que se passera-t-il si quelqu'un·e ajoute un nouvel article qui a un titre sur 4 lignes ? Que se passe-t-il pour les traductions dans les autres langues (exemple au hasard : l'allemand qui a tendance à être bien plus long que l'anglais) ?

  Pour cette raison je vous conseille fortement de toujours utiliser `min-height` plutôt que `height`. En effet, en passant par `min-height`, vous vous assurez que votre contenu reste lisible. Mais àa ne vous prémunira pas du décalage.

- Que se passe-t-il si la sélection d'article du moment n'a que des titres courts ? On aura un trop grand espace blanc réservé au dessus des articles. Ce n'est pas idéal non plus.

### Troisème option : aligner par le bas

Dans certains cas, aligner par le bas peut être une option :

```css
.article-list {
	display: grid;
	grid-template-columns: repeat(3, 18rem);
	/* La totalité d'un article est aligné par le bas grâce à align-items */
	align-items: end;
	gap: 0 1rem;
	width: fit-content;
	margin: 0 auto;
}
```

Mais dans notre cas, ce n'est pas possible parce que non seulement la taille des titres est dynamique, mais la taille des descriptions sous l'image l'est aussi. Ainsi, même si la dernière ligne des descriptions est alignée, l'image ne l'est pas.

<figure tabindex="0">
<img src="/images/posts/css-grid-display-contents/align-bottom.jpg" alt="Même screenshot qu'en début d'article mais la dernière ligne des descriptions sont cette fois-ci bien alignées. Les images et les titres ne le sont toujours pas." width="944" height="478" loading="lazy">
</figure>

Ce n'est pas une solution qui nous convient, mais bien des situations, cette option m'a sauvé lorsque les éléments du bas étaient de taille fixe.

## CSS Gird & `display:contents` à la rescousse

Venons-en donc à la solution que j'ai finalement adoptée.

Ma première idée était de considérer que, si je veux aligner convenablement les éléments, je vais devoir passer par une grille qui va sous découper mes articles en plusieurs parties.

<figure tabindex="0">
<img src="/images/posts/css-grid-display-contents/align.jpg" alt="Schema qui montre un tableau de 3 colonnes et 3 lignes. Une colonne par article. 1ère ligne pour le titre, 2ème pour l'image, 3ème pour la description." width="800" height="347" loading="lazy">
</figure>

En réfléchissant de la sorte, ça me permet de forcer l'alignement des lignes de mon tableau. De plus, il est alors possible d'avoir des règles d'alignement différentes en fonction de la ligne traitée (titre = aligné en bas, description = aligné en haut).

Cependant, par défaut, CSS Grid ne permet de positionner que ses enfants directs : il serait donc nécessaire d'aplatir la structure de notre HTML en enlevant la balise `article` pour pouvoir les placer individuellement.

```html
<div class="article-list">
	<h2 class="article__title">...</h2>
	<img ... />
	<p>...</p>
	<h2 class="article__title">...</h2>
	<img ... />
	<p>...</p>
	<h2 class="article__title">...</h2>
	<img ... />
	<p>...</p>
</div>
```

Et le CSS devrait ressembler à quelque chose de ce style :

```css
.article-list {
	display: grid;
	/* On indique au navigateur de remplir les columns en premier
     * afin que le titre, l'image et la description soient sur une
     * même colonne plutôt que sur une même ligne */
	grid-auto-flow: column;
	/* On indique qu'il peut y avoir 3 lignes, pour qu'au 4ème élément
     * on passe sur une nouvelle colonne */
	grid-template-rows: repeat(3, auto);
	grid-auto-columns: 18rem;
	gap: 0 1rem;

	margin: 0 auto;
	/* Les lignes suivantes ne sont pas en lien direct avec ce tuto mais 
     * permettent de centrer les articles horizontalement quand il y a assez
     * de place et de les aligner à gauche quand il n'y en a plus assez.
     * (Si vous ne voulez pas de scroll mais réduire le
     * nombre de colonnes à la place, privilégiez des media queries) */
	max-width: fit-content;
	overflow: auto;
}

.article__title {
	/* On s'assure que le titre est bien aligné en bas */
	align-self: end;
}
```

⚠️ Ca marche, mais on a vraiment pas envie d'enlever la balise `article`. Cela nuirai notamment au SEO en détériorant la sémantique de votre page. Bof.

A la place, on va plutôt expliquer au navigateur que certes il y a une balise `article` dans le HTML
mais que pour gérer son CSS, il devra faire comme si elle n'existe pas (= lire le HTML comme l'exemple ci-dessus).

Et pour lui dire ça, on va utiliser la règle [`display: contents`](https://developer.mozilla.org/en-US/docs/Web/CSS/display#box).

```css
.article {
	display: contents;
}
```

Tout le reste du CSS que j'avais écrit juste au dessus peut rester identique ✨

<figure tabindex="0">
<img src="/images/posts/css-grid-display-contents/solution.jpg" alt="Screenshot d'une interface web qui affiche 3 articles distincts constitués d'un titre, d'une image et d'un texte" width="944" height="478" loading="lazy">
<figcaption><a href="https://codepen.io/julienpradet/pen/GRPpZrR">Code d'exemple</a></figcaption>
</figure>

On a donc tout le bénéfice des CSS grids sans pour autant devoir négocier avec le HTML. Et ça faisait longtemps que je n'avais pas eu besoin de triturer mon HTML pour des questions de style, alors j'avais envie de vous partager ça.

> 💡 Cette règle `display: contents` est très peu connue (en tout cas j'ai mis très longtemps avant de la découvrir). Mais elle est peut-être utilisée à plus d'endroits que vous ne l'imaginez. Notamment vous êtes peut-être familier avec la notion de [`<Fragment>` en `React`](https://react.dev/reference/react/Fragment). Et bien `Svelte` a choisi de l'implémenter en insérant une balise `div style="display: contents"` à la place de [`<svelte:fragment>`](https://learn.svelte.dev/tutorial/svelte-fragment) dans le HTML généré. C'est d'ailleurs comme ça que j'ai découvert son existence.
>
> Par ailleurs, d'autres articles avant moi parlent de cette méthode d'utilisation ([More accessible markup with `display: contents`](https://hidde.blog/more-accessible-markup-with-display-contents/)). Mais je n'en avais pas connaissance avant de faire des recherches pour cette article, alors le web mérite bien un nouvel article sur le sujet 😜

### A propos de l'accessibilité de `display: contents`

Je vous ai dit plus haut que `display: contents` faisait disparaître la balise aux yeux du navigateur. Au niveau des specs, c'est vrai uniquement pour le style. Par contre, la balise doit rester disponible notamment pour l'accessibilité de la page.

Cela dit, les navigateurs ont longtemps eu des bugs à ce sujet. C'est loin d'être mon expertise et Hidde en parle bien mieux que moi dans [Accessibility concerns with current browser implementations](https://hidde.blog/more-accessible-markup-with-display-contents/#heading-4).

Le TL;DR est que sur certains éléments, ça peut encore poser de réels problèmes aujourd'hui. Notamment, évitez à tout prix d'utiliser `display: contents` sur des éléments interactifs (ex: button) ou des éléments qui ont des `roles` importants pour la bonne compréhension de votre page (ex: ul, li, tr, td, etc.). Veillez donc à toujours bien tester avec des screen readers avant de vous lancer. Cette page tient à jour les soucis d'accessibilité qu'il peut exister : https://adrianroselli.com/2022/07/its-mid-2022-and-browsers-mostly-safari-still-break-accessibility-via-display-properties.html

## Bonus : `subgrid`

Pour ces mêmes cas d'usage, une nouvelle fonctionnalité CSS est en train d'arriver : [`subgrid`](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Subgrid).

En quelques mots, c'est une valeur que vous pouvez utiliser dans la définition de vos grid afin de préciser à une grille enfant de s'aligner avec les lignes et colonnes de la grille parente. Dans les faits, cela sera plus puissant que de juste appeler `display: contents` et c'est quelque chose qui méritera sûrement votre attention à l'avenir.

Cependant à ce jour c'est supporté par seulement [18%](https://caniuse.com/css-subgrid) des navigateurs. La bonne nouvelle c'est que c'est en train d'arriver dans Chrome 117 et donc on peut espérer une adoption large d'ici quelques mois quand ce sera essaimé dans les différents navigateurs basés sur Chromium.

## Bonus 2 : Avez-vous déjà rêvé d'un `::after-outer` ?

Les pseudo éléments `:before` et `:after` fonctionnent en ajoutant visuellement un balise `span` en début ou en fin des enfants d'un élément. Ainsi, le CSS suivant :

```css
.element::before,
.element::after {
	content: '👋';
	display: block;
}
```

Nous donne l'équivalent de ce DOM :

```html
<div class="parent">
	<div class="element">
		::before
		<!-- les enfants classiques -->
		::after
	</div>
</div>
```

Il peut arriver d'avoir besoin de les avoir **autour** du `.element` plutôt qu'à l'intérieur. (Je n'ai pas de cas d'usages en tête mais on m'a posé la question la semaine dernière 😁)

```html
<div class="parent">
	::before
	<div class="element">
		<!-- les enfants classiques -->
	</div>
	::after
</div>
```

L'astuce est alors d'ajouter une `div` autour de `.element`, de la mettre en `display: contents` et de déplacer les `:before` et `:after` sur celle-ci:

```html
<div class="parent">
	<div class="element-outer">
		::before
		<div class="element">
			<!-- les enfants classiques -->
		</div>
		::after
	</div>
</div>
```

```css
.element-outer {
	display: contents;
}

.element-outer::before,
.element-outer::after {
	content: '👋';
	display: block;
}
```

Ainsi, vu que `display: contents` fait disparaître la balise aux yeux du navigateur, vous vous retrouvez dans la même situation que si `::before`, `.element` et `::after` étaient des enfants directs du `.parent`.

Voici un exemple d'utilisation avec lequel vous pouvez jouer : https://codepen.io/julienpradet/pen/XWoXKRO

## Pour conclure

Bref, `display: contents` est une chouette solution mais pas non plus une solution miracle. Et `subgrid` réglera beaucoup plus de problème pour nous. Ca reste la meilleure que j'ai trouvé à un instant T.

Est-ce que vous auriez fait différemment ? Je serais très intéressé de comparer les différentes approches possibles. N'hésitez pas à me les envoyer sur les réseaux sociaux ([Mastodon](https://piaille.fr/@julienpradet), [LinkedIn](https://www.linkedin.com/in/julienpradet/) ou [Twitter](https://twitter.com/JulienPradet)).

En tout cas, si cet article vous a plu, sachez que j'essaye de publier un article par semaine autour du développement web. Beaucoup d'entre eux sont orientés autour de la [Web Performance](/tutoriels/pourquoi-ameliorer-le-lcp/) qui se rapproche de [mon activité de Freelance](/developpeur-web-performance/), mais vous n'êtes pas à l'abri de sujets autour de l'intégration, du développement front ou de l'organisation d'équipe. 😘
