Il y a un mois, j'ai poussé des changements sur les icones d'un site en production qui nous a fait gagné 8% sur le [FCP](https://web.dev/fcp/) de nos utilisateurices.

Pourtant, quand on a commencé à ajouter des icones, ils n'avaient aucun impact. Comment en sommes-nous arrivés là ? Dans cet article je vous présente les différentes méthodes par lesquelles nous sommes passées, leurs avantages, leurs inconvénients et je terminerai avec un petit laius sur comment le mettre en place dans votre projet.

Cet article fait partie d'une série d'articles en lien avec la Web Performance où j'essaye d'apporter des méthodes pour analyser la rapidité de vos pages et des solutions concrètes à des problèmes récurrents :

- [Pourquoi améliorer le LCP de vos pages ?](/tutoriels/pourquoi-ameliorer-le-lcp/)
- [Analyser le comportement réseau pour améliorer FCP et LCP](/tutoriels/reseau-et-core-web-vitals/)
- [Optimiser les images sur le web : checklist des bonnes pratiques](/tutoriels/optimiser-le-chargement-des-images/)
- [Optimiser le chargement des fonts](/tutoriels/optimiser-le-chargement-des-fonts/)
- Optimiser la gestion des icônes **(vous êtes ici)**
  - [Etape 1 : Une image par icone](#etape-1-une-image-par-icone)
  - [Etape 2 : les fonts d’icones](#etape-2-les-fonts-d-icones)
  - [Etape 3 : Inline SVG Symbol](#etape-3-inline-svg-symbol)
  - [Etape 4 : Remote SVG Symbol](#etape-4-remote-svg-symbol)
  - [Comment mettre en place ces méthodes quand je code en React ?](#comment-mettre-en-place-ces-methodes-quand-je-code-en-react)
  - [Matrice de décision](#recapitulatif)
- [Comment diagnostiquer et corriger du Cumulative Layout Shift (CLS) ?](/tutoriels/comment-detecter-du-cls/)
- Quelles techniques pour diminuer la quantité de JavaScript ? (bientôt)
- Quelles métriques suivre en dehors des Core Web Vitals ? (bientôt)
- Et plus encore 🫶

Si vous avez besoin d'une entrée en matière plus rapide, je suis aussi [disponible en freelance pour vous accompagner sur des problématiques de performance](/developpeur-web-performance-freelance/).

## Etape 1 : Une image par icone

Généralement quand on commence à développer un site web, on a encore aucun outil en place et on a juste une maquette à disposition. Alors le plus naturel est de commencer par utiliser une balise `<img>`.

```html
<img src="/icone/home.svg" alt="Accueil" />
```

Histoire qu'elle ne soit pas pixelisée, on va préférer le format SVG. On le passe un petit coup dans [SVGOMG](https://jakearchibald.github.io/svgomg/), un outil pour optimiser et réduire la taille de nos fichiers SVG. On vérifie que celle-ci est correctement mise en cache au niveau réseau. Et on envoie en prod.

### Attention à la surcharge réseau

Cependant, le problème de cette approche est qu'au fur et à mesure cela risque de surcharger votre réseau. C'était très vrai à l'époque de HTTP1. Beaucoup vous diront que ce n'est plus le cas pour HTTP2 mais ce n'est pas vrai. Au delà d'un certain nombre de requêtes simultanées des problèmes se manifestent :

- le navigateur ne sait plus comment prioriser les requêtes (quel fichier doit être téléchargé en premier ?)
- le navigateur peut perdre du temps en orchestration (cela se manifeste par beaucoup de hachure et une bandewidth saturée dans votre [cascade réseau](/tutoriels/reseau-et-core-web-vitals/#lazyload-preload-des-images))
- chaque fichier est gzippé de manière indépendante : or, ces algorithmes de compression sont d'autant plus efficaces que vos fichiers sont gros et répétitifs. Vous gagnerez donc en bande passante en fusionnant vos icones plutôt qu'en les téléchargeant séparément

L'objectif est donc de trouver une manière de fusionner les icones en un fichier.

> 💡 Si vous n'êtes pas en mesure de changer de méthode de chargement d'icones, pour régler cette problématique : assurez vous que vos icones qui ne sont pas directement visibles ont l'attribut `loading="lazy"`, et vérifiez que vous êtes bien en HTTP2. Vous aurez adressé le plus gros du problème.

### Interaction limitée

Une autre problématique de cette méthode est sa capacité à changer d'image à la volée.

<figure>
<table>
<thead>
<tr><th width="50%">Normal</th><th width="50%">Hover / Focus</th></tr>
</thead>
<tbody>
<tr>
<td>
<img width="24" height="24" src="/images/posts/lcp/heart-solid.svg" alt="Coeur noir"/>
</td>
<td>
<img width="24" height="24" src="/images/posts/lcp/heart-solid-color.svg" alt="Coeur coloré"/>
</td>
</tr>
</tobdy>
</table>
<figcaption>Source d'icone : Font Awesome (en utilisant une <code>&lt;img&gt;</code> SVG)</figcaption>
</figure>

Si vous voulez par exemple faire en sorte que votre icone change de couleur au survol, vous allez devoir :

- ajouter du JavaScript pour changer l'URL de votre image à la volée (ce qui provoquera des lenteurs lors de la transition parce qu'il faut télécharger la nouvelle image)
- ou utiliser des astuces CSS à base de [Sprite](https://developer.mozilla.org/fr/docs/Web/CSS/CSS_images/Implementing_image_sprites_in_CSS)
- ou passer par [filter](https://developer.mozilla.org/en-US/docs/Web/CSS/filter) en CSS (ex: de base votre image est colorée, et vous la passez en noir en appliquant `filter: grayscale(100%) brightness(0);`)

C'est somme toute assez compliqué, et il existe des méthodes pour simplifier cela.

## Etape 2 : les fonts d'icones

La première solution à cela est l'utilisation de fonts d'icones.

A mon époque (j'ai le droit de dire ça après 30 ans, n'en déplaise aux vieux 😤), la lib que tout le monde utilisait pour mettre des icones sur son site était [Font Awesome](https://fontawesome.com/). C'était facile à installer, ça permet d'ajouter en un clin d'oeil les icones.

### Comment ça marche ?

1. **Un fichier de font** qui permet d'associer un caractère à un icone.

   ```css
   @font-face {
   	font-family: 'Font Awesome 6 Free';
   	font-display: block;
   	src: url(/icons/font-awesome.woff2) format('woff2');
   }
   ```

2. **Une classe CSS** qui permet de choisir quel caractère afficher (ici le caractère `\f015` correspond à un icone <span aria-label="Maison">🏠</span>)

   ```css
   .fa {
   	font-family: 'Font Awesome 6 Free';
   	-moz-osx-font-smoothing: grayscale;
   	-webkit-font-smoothing: antialiased;
   	display: var(--fa-display, inline-block);
   	font-style: normal;
   	font-variant: normal;
   	line-height: 1;
   	text-rendering: auto;
   }
   .fa-house::before {
   	content: '\f015';
   }
   ```

3. **une balise HTML** vide qui reprend la classe définie en CSS pour choisir l'icone à afficher

   ```html
   <i class="fa fa-house"></i>
   ```

Avec ces trois éléments vous avez ce qu'il vous faut pour gérer des icones sur votre site. Ca fonctionne bien, et l'avantage supplémentaire par rapport aux balises `<img>` est que vous pouvez facilement configurer la couleur de vos icones en modifiant la couleur du texte en CSS :

```css
:hover,
:focus {
	color: red;
}
```

Cependant, cette méthode aussi vient avec son lot d'inconvénients.

### Pourquoi éviter les fonts d'icones ?

#### Plus vous ajoutez des icones, plus vous avez des problèmes

Si votre base d'icone grossit (ou que vous utilisez une base toute faite) : **les fichiers d'icones deviennent vite énormes**. A l'heure de la rédaction de l'article, les icones gratuits de Font Awesome, c'est [148KB](https://ka-f.fontawesome.com/releases/v6.4.0/webfonts/free-fa-solid-900.woff2) ! Sans compter le fichier CSS qui vient rajouter **24KB** de plus.

Il est certes possible d'appliquer les mêmes [méthodes de subsetting que l'optimisation des fonts](/tutoriels/optimiser-le-chargement-des-fonts/#1-1-recuperer-le-fichier-de-font), mais le concept pousse quand même à utiliser une seule et même source (le fichier woff2) qui grossiera tant que vous avez des icones à ajouter.

D'ailleurs, dans un de mes projets, nous passions par [fontastic](https://fontastic.me/) pour générer la font. Au bout d'un certain nombre d'icones, la génération commençait à crasher parce que nous avions trop d'icones. Peut-être que ça venait du fait qu'on avait juste _trop_ d'icones, mais c'est quand même l'indice d'un problème 🙈

#### Lenteur d'affichage et gestion des fallbacks

Autre problème : vos icones ne sont pas visibles tant que le fichier de font n'a pas été chargé. Elles peuvent donc mettre du temps à venir, d'autant plus si vous n'avez pas [preload la font](/tutoriels/optimiser-le-chargement-des-fonts/#rappels-sur-les-bonnes-pratiques-reseau).

Plus gênant, à une époque, la propriété `font-display` n'existait pas. Du coup, si la font n'arrivait pas à se charger, on se retrouvait avec des caractères bizarres affichés à l'écran (ex : "``").

#### Conflit avec des outils d'accessibilité

Dans la majorité des documentations de font d'icones, vous devrez fouiller pour trouver la mention d'accessibilité. Pourtant, une icone, comme une image mérite d'être correctement labelisée. Cela est possible en adoptant ce HTML :

```html
<!-- Si le picto est redondant avec un texte à côté -->
<i class="fa fa-house" aria-hidden="true"></i> Accueil

<!-- Si l'icone est seule -->
<span>
	<i class="fa-solid fa-house" title="Accueil" aria-hidden="true"></i>
	<span class="sr-only">Accueil</span>
</span>
```

En prenant le coup de main, c'est donc possible de correctement renseigner les labels pour les icones. Cependant, là où c'est plus handicapant, c'est le fait que ce soit une _font_. En effet, certaines personnes surchargent les fonts utilisées dans les navigateurs pour en faciliter la lecture (ex : [OpenDyslexic](https://opendyslexic.org/)). Votre CSS ne sera donc plus maître de la font utilisée et risque d'afficher des lettres ou des caractères unicodes à la place des icones.

## Etape 3 : Inline SVG Symbol

Ok, les font icones : pas ouf.

Si on accumule les contraintes, on cherche donc une solution :

- qui évite des tonnes de requêtes
- qui ne passe pas par une font pour des questions de poids et d'accessibilité
- qui soit facile à changer lors d'une interaction

### Est-ce qu'on pourrait utiliser du SVG directement dans la page ?

```html
<svg height="1em" viewBox="0 0 24 24" aria-labelledby="icon-title-ajx18rtJBjSu">
	<title id="icon-title-ajx18rtJBjSu">Accueil</title>
	<path d="M0 24 v-24 h24 a12,12 11 0,1 0,24 a12,12 11 0,1 -24,0z" fill="currentColor" />
</svg>
```

Ainsi notre page HTML ne contient que les icones dont elle a besoin et cela a l'avantage de se charger immédiatement, pas besoin de requête supplémentaire.

Cette méthode répond à la totalité des contraintes ci dessus. Par contre, si un icone est utilisé plusieurs fois dans votre page, le HTML sera alourdi d'autant vu que vous allez devoir répéter le SVG. C'est à nuancer parce que cette duplication sera certainement compensée par gzip. Mais c'est toute de même dommage alors qu'on peut faire mieux.

### Utilisation des `<defs>` en SVG

En effet, en SVG il existe une méthode pour éviter de dupliquer du code : l'utilisation des `<symbol>` avec `<use>`. Voyons comment ça marche.

Au sein de votre page HTML (généralement en fin de page, et en `display: none`), vous devez définir une balise `<svg>` qui va contenir une liste de définitions (`<defs>`). Cette liste de définitions est généralement utilisée par votre image en SVG pour décrire des [`clipPath`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/clipPath), des [filtres](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/SVG_Filters_Tutorial) ou des [dégradés](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient). Mais dans notre cas, nous allons utiliser des [`<symbol>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol). Grosso modo, un symbol est un sous SVG que l'on va pouvoir référencer ailleurs. Pour chaque icone, nous allons donc devoir ajouter une nouvelle balise `<symbol>` :

```html
<svg xmlns="http://www.w3.org/2000/svg">
	<defs>
		<symbol id="icon-home" viewBox="0 0 24 24">
			<path d="M0 24 v-24 h24 a12,12 11 0,1 0,24 a12,12 11 0,1 -24,0z" fill="currentColor" />
		</symbol>
		<symbol id="icon-user" viewBox="0 0 24 24"><!-- ... --></symbol>
	</defs>
</svg>
```

Pour générer cette balise, il va falloir :

1.  Passer le SVG de l'icone initial dans [SVGOMG](https://jakearchibald.github.io/svgomg/) afin de s'assurer qu'il est bien optimisé
2.  Ouvrir ensuite l'onglet "Markup" pour y lire la balise `<svg>`
3.  Récupérer la viewBox de celle-ci et la mettre en attribut de votre balise `<symbol>`
4.  Récupérer tout ce qu'il y a à l'intérieur de la balise `<svg>` et le mettre à l'intérieur de votre balise `<symbol>`
5.  Définir enfin un attribut `id` sur votre balise `<symbol>` (ex: `id="icon-home"`) Attention il est important que cet id soit unique dans toute votre page.

Une fois fait, passons à l'affichage de l'icone dans notre page. En effet, pour l'instant, vous n'avez fait que définir des règles d'affichage, mais vous n'avez pas indiqué au navigateur _où_ l'afficher. Pour cela, nous allons définir une nouvelle balise SVG que nous pouvons mettre dans notre HTML :

```html
<svg height="32" width="32" viewBox="0 0 24 24" aria-labelledby="icon-title-ajx18rtJBjSu">
	<title id="icon-title-ajx18rtJBjSu">Accueil</title>
	<use href="#icon-home"></use>
</svg>
```

Celle-ci est très similaire au [SVG Inline](#est-ce-qu-on-pourrait-utiliser-du-svg-directement-dans-la-page) que nous avions écrit plus haut. La seule différence est que nous remplaçons l'intérieur du `<svg>` (à l'exception du `<title>`) par une balise `<use>`. Son attribut `href` permet en quelque sorte d'importer le `symbol` en y faisant référence via son `id`. Il se construit de la même manière qu'une [ancre](https://www.alsacreations.com/astuce/lire/5-comment-faire-un-lien-vers-un-endroit-prcis-de-la-page-ancrenbsp.html) dans une page.

Ainsi, le partie lourde du SVG (`<path>`, etc.) n'est pas répétée dans votre page HTML, et vous pouvez facilement définir de nouveaux icones au fur et à mesure.

> 💡 **Vous n'aimez pas définir la liste des `symbol` manuellement ?** N'hésitez pas à fouiller internet pour trouver l'outil qui vous le générera pour vous. C'est par exemple le cas de [Icon Pipeline](https://github.com/DavidWells/icon-pipeline).
>
> Honnêtement, vu que c'est 5min de manipulation et qu'on n'ajoute pas des icones tous les 4 matins, ce n'est pas une tâche que j'ai automatisé sur les projets où je travaille. Mais ça dépend de la taille de votre équipe et du type de profils qui manipulent le code.
>
> La partie que l'on a automatisé est la génération du SVG de l'icone lui même (celui qui contient la balise `<use>`). N'hésitez pas à abstraire cette partie derrière une fonction ou un composant qui automatisera la génération d'ids, forcera l'utilisation d'un texte alternatif et de la définition d'une taille.

### Quels bénéfices aux SVG Symbol pour gérer les icones ?

C'est quand même pas mal de manutention. Alors quels avantages est-ce que ça apporte ?

#### Modifier la couleur du SVG en CSS

Un des avantages majeurs des fonts d'icones est la possibilité de changer la couleur de l'icone au survol.

C'est aussi possible avec les Symbol SVG. En effet, vous n'y avez peut-être pas prêté attention, mais dans le `<path>` j'ai mis l'attribut `fill="currentColor"`. [`currentColor`](https://developer.mozilla.org/fr/docs/Web/CSS/color_value#mot-cl%C3%A9_currentcolor) est en fait une valeur en CSS qui permet de dire au navigateur d'utiliser la couleur courante du texte.

Ainsi, si votre icone est dans une balise `<a>` et que vous ajoutez le CSS suivant, alors au survol votre icone passera de bleu à rouge.

```css
a {
	color: blue;
}

a:hover,
a:focus {
	color: red;
}
```

Vous pouvez même aller plus loin et manipuler plus en profondeur le style de votre SVG directement en CSS :

```css
/* Par défaut, seule la bordure de l'icone est visible, en noir */
a svg {
	stroke: #000000;
	fill: transparent;
}

/* Au survol et au focus, la bordure devient rouge, et l'intérieur se remplit en rouge */
a:hover svg,
a:focus svg {
	stroke: red;
	fill: red;
}
```

C'est donc une méthode très versatile qui pourra vous amener bien plus loin dans l'animation de vos icones.

#### Les icones sont immédiatement visibles

Etant donné que l'icone est présent dans le HTML, le navigateur est en mesure de parser votre SVG et l'afficher directement. L'inconvénient cependant est que le navigateur va du coup le parser de manière synchrone. Si vous avez beaucoup d'icones, cela peut finir par impacter vos performance. Dans notre cas, il s'agissait de 8% de FCP.

#### Possibilité d'importer uniquement les `symbol` dont a besoin la page

Etant donné que la liste de `symbol` est générée directement dans le HTML, il est possible de n'y mettre que les `symbol` dont la page a besoin et pas un de plus. Je le nuancerai en disant que ça dépend beaucoup de votre tooling. Dans notre cas, la liste de symbol a grossi jusqu'à atteindre 46 icones. C'était moins que nos icon fonts, mais c'était quand même beaucoup (trop).

### Quels inconvénients aux SVG Symbol ?

#### Plus vous avez d'icones, plus vous ralentirez le chargement de votre page.

Même si cette méthode a beaucoup de bénéfices, j'ai commencé à mentionner ci-dessus que cela pouvait poser des problèmes dès lors que le nombre d'icones différents utilisés dans votre page augmente (les fameux -8% de LCP quand nous avons arrêté d'utiliser cette méthode).

Ce sera d'autant plus vrai si vos pages présentent beaucoup d'interactivité. En effet, vous vous demandez peut-être comment on a pu se retrouver avec 46 icones différents sur _chaque page_. A tout cassé, au premier affichage, nous en avions peut-être 10 maximum. D'où venaient les 36 autres ? Ils étaient utiles à des modales globales. Nos outils n'étaient pas configurés pour importer des icones de manière asynchrone dans la page. Ainsi, les icones dont nous avions besoin pour les modales de connexion, d'inscription, de newsletter, etc. étaient tous importés au chargement de la page plutôt qu'au chargement de la modale.

> 💡 Je tiens à préciser que ce problème venait principalement de la manière dont nous utilisions cette technique. Absoluement rien ne vous empêche de configurer vos outils pour gérer l'ajout de manière asynchrone. Cependant, plutôt que d'aller vers une solution technique complexe en JS, fetch, Ajax & co, l'étape 4 montrera comment régler cette problématique simplement.

#### Les icones ne sont pas en cache

Contrairement aux fonts, les icones ne sont pas chargés via un fichier externe. La conséquence est donc qu'à chaque nouvelle page HTML, vos utilisateurices devront retélécharger la liste d'icones SVG au même titre qu'ils téléchargerons le HTML. Dans notre cas, ça représentait entre 10 et 30kB supplémentaires par page, soit parfois jusqu'à 30% de poids de page supplémentaire.

## Etape 4 : Remote SVG Symbol

Notre nouvelle solution devrait donc ajouter les contraintes suivantes :

- qui évite des tonnes de requêtes
- qui ne passe pas par une font pour des questions de poids et d'accessibilité
- qui soit facile à changer lors d'une interaction
- <span style="color: #7fac5e; font-weight: var(--weight-bold);">+</span> qui puisse être téléchargé à la demande (ex : à l'ouverture d'une modale)
- <span style="color: #7fac5e; font-weight: var(--weight-bold);">+</span> qui puisse être mis en cache entre chaque page

Pour régler ces nouvelles contraintes, la solution est de faire en sorte que les icones soient récupérés de manière externe. En effet, si nous reprenons la manière dont on a écrit le SVG à l'endroit où on veut afficher l'icone, nous avions une balise `use`:

```html
<use href="#icon-home"></use>
```

Celle-ci passe par un attribut `href` parce qu'en réalité on n'est pas obligé de définir une ancre dans la page courante. On peut aller chercher la définition SVG à une autre URL.

Ainsi plutôt que de mettre votre SVG qui contient la liste de `<defs>` au sein de la page, nous allons l'enregistrer dans son propre fichier:

```html
<!-- /images/icon-defs.svg -->
<svg xmlns="http://www.w3.org/2000/svg">
	<defs>...</defs>
</svg>
```

A ce moment là, nous pourrons changer notre balise `use` afin qu'elle utilise la nouvelle URL:

```diff
-<use href="#icon-home"></use>
+<use href="/images/icon-defs.svg#icon-home"></use>
```

Grâce à cela, la liste d'icone se retrouve en dehors de la page HTML et pourra donc être téléchargé et mis en cache au même titre que n'importe quel asset externe.

⚠️ Attention toutefois, **il y a une contrainte forte** : votre SVG distant doit impérativement être hébergé sur le même nom de domaine. Si ce n'est pas le cas, les navigateurs vont considérer que c'est une faille de sécurité et votre icone ne marchera pas.

Ca tombe bien, c'est de toute façon [une recommendation si vous voulez que votre site soit performant](/tutoriels/reseau-et-core-web-vitals/#utiliser-un-seul-nom-de-domaine). Cela sera une raison de plus pour migrer vos assets sur votre nom de domaine principal si ce n'est pas déjà le cas.

En vrai, il semble y avoir [une méthode alternative qui existe](https://kurtextrem.de/posts/svg-in-js#in-the-case-of-cors-css-to-the-rescue) si vraiment vous n'avez pas la maîtrise de vos noms de domaines. Cependant, elle offre moins de liberté sur la gestion du lazyloading & des changements de couleur à l'interaction.

> 💡 **Comment est-ce que cela se comporte dans le cas des modales/tabs/dropdown ?**
>
> Je vous parlais des problèmes d'interactivité : on ne veut télécharger les icones que quand ils sont visibles. Si le HTML de votre modale n'est pas présent initialement dans votre page, alors le fichier nécessaire à l'affichage de son icone (ex : `icon-modal-defs.svg`) ne sera pas téléchargé. Il existe toutefois une petite subtilité ici. Si votre HTML existe déjà dans votre page mais est en `display: none`, alors votre fichier d'icones sera quand même téléchargé.
>
> Ce n'est généralement pas quelque chose auquel vous serez confronté avec des frameworks modernes tels que React, Vue ou même des solutions alternatives telles que Simulus/Turbo ou htmx. Mais si vous n'avez pas d'autres choix que d'avoir le HTML déjà présent dans votre page, essayez de l'entourer d'une balise [`<template>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template). Cela aura l'avantage de rendre tout le HTML à l'intérieur de celle-ci inerte. Le navigateur ne parsera donc pas le SVG, et donc ne téléchargera pas le fichier référencé par la balise `<use>`.
>
> C'est de toute façon une bonne pratique parce que cela indiquera à votre navigateur qu'il n'a pas besoin de parser cette partie de la page pour pouvoir afficher le reste du contenu.

### Quelles nouvelles opportunités offrent les Remote SVG Symbol ?

#### Séparation en plusieurs fichiers

L'avantage de cette méthode est que vous pouvez rapidement séparer vos définitions d'icones : il vous faut créer différents sets d'icones (ex : icon-global-defs.svg, icon-product-defs.svg, etc.) et modifier l'URL de la balise `use` en conséquence.

#### Optimisation des icones critiques

Dans votre site, certains icones sont plus importants que d'autres. Vous avez par exemple certainement des icones dans votre menu que vous voulez afficher le plus rapidement. Mais les icones de réseau sociaux dans votre footer, un peu moins.

Avec cette solution, vous pouvez à nouveau gérer la priorisation de vos ressources.

Par exemple, vous pouvez faire en sorte que vos icones critiques restent en inline (en général il y en a entre 2 et 5, ça n'alourdira pas de manière significative votre page). Pour cela, vous pouvez rester sur l'étape 3 uniquement pour ces icones. (C'est la solution que nous avons choisi dans le projet sur lequel je travaille.)

Ou alors, si la mise en cache est importante pour vous, vous pouvez considérer que ces icones feront partie d'un fichier `icon-critical-defs.svg` que vous pourrez preload dans votre page afin d'augmenter sa priorité de téléchargement.

#### Lazyloading des icones non critiques

A l'inverse, pour les icones qui sont beaucoup plus loin dans votre page, si vous mesurez que les Remote SVG Symbol ralentissent le chargement de votre page, n'hésitez pas à mettre en place une méthode de lazyloading. Malheureusement, il n'en existe pas de native à ce jour qui mimiquerai le comportement de [`loading="lazy"` sur une balise `img`](/tutoriels/optimiser-le-chargement-des-images/#rappels-sur-l-optimisation-reseau).

Mais vous pourriez imaginer mettre en place un mécanisme en JavaScript. Cela pourrait ressembler à :

```js
const lazyloadIconObserver = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			const useTags = entry.target.querySelectorAll('use[data-href]');
			useTags.forEach((tag) => {
				tag.setAttribute('href', tag.dataset.href);
			});
			lazyloadIconObserver.unobserve(entry.target);
		}
	});
});

const lazyIcons = document.querySelectorAll('svg.lazy-icon');
lazyIcons.forEach((icon) => {
	lazyloadIconObserver.observe(icon);
});
```

Il vous faudrait alors changer l'endroit où l'icone est affiché ainsi :

```diff
-<svg height="32" width="32" viewBox="0 0 24 24" aria-labelledby="icon-title-ajx18rtJBjSu">
+<svg class="lazy-icon" height="32" width="32" viewBox="0 0 24 24" aria-labelledby="icon-title-ajx18rtJBjSu">
 	<title id="icon-title-ajx18rtJBjSu">Accueil</title>
-	<use href="#icon-home"></use>
+	<use data-href="/images/icon-defs.svg#icon-home"></use>
 </svg>
```

## Comment mettre en place ces méthodes quand je code en React ?

Jusqu'à maintenant, je vous ai montré comment le principe de base fonctionne : quel est le HTML/CSS que vous aurez besoin d'ajouter dans votre page pour que ça fonctionne. Cependant, selon votre niveau d'aisance avec le tooling que vous utilisez, peut-être que la mise en place sera douloureuse.

C'est d'autant plus vrai qu'une pratique assez répandue dans l'écosystème React est d'utiliser un loader webpack pour transformer votre SVG en composant React/JSX.

La conséquence, comme le montre [Jason "developit" Miller](https://jasonformat.com/) dans son [tweet](https://twitter.com/_developit/status/1382838799420514317), est que vous pouvez vous retrouver avec votre SVG à la fois dans votre HTML **et** dans votre JS. Dans le cas qu'il a trouvé, 50% du JS était en fait du SVG, soit 125KB, avec les conséquences en terme de performance qui vont avec. Oops.

Pour éviter ces problèmes, vous devrez donc configurer votre bundler pour faire en sorte que votre SVG soit traité comme une image classique. Ainsi, dans votre code, quand vous importerez le SVG qui contient la liste de définitions, vous ne récupérerez pas le contenu du SVG, mais une URL où il sera accessible. Cette même URL dont on a besoin avec la méthode [Remote SVG Symbol](#etape-4-remote-svg-symbol).

Pour Webpack (5+), vous aurez besoin de modifier votre configuration pour configurer les fichiers SVG en tant que [`asset/ressource`](https://webpack.js.org/guides/asset-modules/#resource-assets).

```js
// webpack.config.js
const config = {
	// …
	module: {
		rules: [
			// …
			{
				test: /\.svg/,
				type: 'asset/resource'
			}
		]
	}
};
```

Pour Vite, c'est déjà [le comportement par défaut](https://vitejs.dev/guide/features.html#static-assets).

Ensuite, dans votre code React, vous pourrez écrire vos Icons de cette façon :

```jsx
import IconDefs from './home-icon-defs.svg';

const Icon = ({ icon, title, size }) => {
	/* J'inclue ici la gestion du texte alternatif de l'icone */
	const randId = Math.random() * Number.MAX_SAFE_INTEGER;
	const titleId = `icon-title-${randId}`;
	const pixelSize = size === 'big' ? 32 : 24;

	return (
		<svg height={pixelSize} width={pixelSize} viewBox="0 0 24 24" aria-labelledby={titleId}>
			<title id={titleId}>{title}</title>
			{/* Mais la partie qui nous intéresse est surtout ce use */}
			<use href={`${IconDefsUrl}#icon-${icon}`}></use>
		</svg>
	);
};

// …

<Icon icon="home" title="Accueil" size={32} />;
```

Ainsi, vous utilisez bel et bien un `use` et votre quantité de JS ne se retrouve pas pénalisée par le nombre d'icones que vous avez dans votre SVG.

Pour approfondir cette partie, n'hésitez pas à jeter un oeil à [Breaking Up with SVG-in-JS in 2023 (EN)](https://kurtextrem.de/posts/svg-in-js).

## Récapitulatif

Ok donc je vous ai montré 4 façons de faire des icones. Chacune a ses avantages et inconvénients et comme d'habitude il n'y a pas de [silver bullet](https://fr.wikipedia.org/wiki/Silver_Bullet).

Si on devait résumer tout ça dans une matrice de décision :

- Si l'icone est utilisé une seule fois dans votre page,
  - Si cet icone est critique ou a besoin de changer de couleur lors d'une interaction,
    - ➡️ utiliser le [SVG en inline](#est-ce-qu-on-pourrait-utiliser-du-svg-directement-dans-la-page) dans le HTML
  - Si non,
    - ➡️ utiliser une [balise `<img>`](#etape-1-une-image-par-icone)
- Si l'icone est utilisée plusieurs fois,
  - Si l'icone est critique
    - ➡️ utiliser des [Inline SVG Symbol](#utilisation-des-defs-en-svg)
  - Si l'icone n'est pas critique,
    - S'il est possible d'héberger du SVG sur votre propre domaine
      - ➡️ utiliser des [Remote SVG Symbol](#etape-4-remote-svg-symbol)
    - Si non,
      - ➡️ Essayez de convaincre très fort votre admin sys de [l'importance d'avoir le même domaine pour vos assets](/tutoriels/reseau-et-core-web-vitals/#utiliser-un-seul-nom-de-domaine)
      - ➡️ Ou passez par un fallback avec des [CSS mask](https://kurtextrem.de/posts/svg-in-js#in-the-case-of-cors-css-to-the-rescue)
      - ➡️ Ou utilisez des [Inline SVG Symbol](#utilisation-des-defs-en-svg)
- Si vous utilisez une font d'icone,
  - ➡️ repartez en haut de cette matrice et choisissez une autre méthode. Vos utilisateurices vous remercieront.

Ce qu'il faut aussi retenir, c'est que tant que vous avez une quantité limitée d'icones, utiliser une balise SVG inline ou une balise `<img>` sera certainement largement suffisant. N'hésitez donc pas à mesurer votre site avant de vous lancer dans des optimisations prématurées.

Vous avez du mal à déterminer quelle est la meilleure solution pour vous ou sur quels chantiers de performance vous lancer ? [Contactez-moi](mailto:julien.pradet@gmail.com). Nous pouvons certainement [travailler ensemble](/developpeur-web-performance-freelance/) afin de rendre votre site rapide et [améliorer votre taux de conversion](/tutoriels/pourquoi-ameliorer-le-lcp/#taux-de-conversion).

Si vous avez trouvé tout cela fort intéressant et êtes curieuse·x de connaître la suite, n'hésitez pas à me suivre ou à me poser des questions sur [Mastodon](https://piaille.fr/@julienpradet) ou [Twitter](https://twitter.com/JulienPradet). Notamment, dans mon prochain article, je parlerai des différentes stratégies pour diminuer votre quantité de JavaScript.

Pour les plus habitué·e·s d'entre vous, sachez que je publierai cette suite dans 2 semaines, ne pouvant pas assurer la rédaction la semaine prochaine. Je vous souhaite un bel été et de bonnes vacances à celleux qui en ont et vous dit à très vite ⛱️
