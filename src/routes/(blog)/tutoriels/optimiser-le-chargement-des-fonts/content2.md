Pour mettre en place ce size-adjust, vous aurez besoin de deux parties :

1. déclarer votre font de fallback

   ```css
   @font-face {
   	font-family: 'Ovo-fallback';
   	size-adjust: 109.1%;
   	ascent-override: 72%;
   	src: local('Times New Roman');
   	unicode-range: U+20-5F, U+61-7A, U+7C, U+A0, U+A7, U+A9, U+AB, U+B2-B3, U+BB, U+C0, U+C2,
   		U+C6-CB, U+CE-CF, U+D4, U+D9, U+DB-DC, U+E0, U+E2, U+E6-EB, U+EE-EF, U+F4, U+F9, U+FB-FC,
   		U+FF, U+152-153, U+178, U+2B3, U+2E2, U+1D48-1D49, U+2010-2011, U+2013-2014, U+2019,
   		U+201C-201D, U+2020-2021, U+2026, U+202F-2030, U+20AC, U+2212;
   }
   ```

2. utiliser ce fallback dans votre déclaration de font-family

   ```css
   body {
   	font-family: 'Ovo', 'Ovo-fallback', serif;
   }
   ```

Ces quelques lignes fonctionneront pour Ovo, mais je pense qu'il y a quelques subtilités à expliquer :

- **Pourquoi Times New Roman plutôt que serif ?** Parce que chaque size-adjust va dépendre de la typo utilisée. Si vous avez utilisé `serif`, chaque OS aurait eu une font différente et donc vous n'auriez pas pu adopter un size-adjust unique. Par ailleurs, Times New Roman a l'avantage d'être disponible sur beaucoup d'OS. Si vous cherchez sa contrepartie en `serif`, alors **Arial** est certainement le meilleur choix. ([Safe web fonts](https://web.mit.edu/jmorzins/www/fonts.html))

  A noter toutefois que **Times New Roman** et **Arial** ne sont pas réellement disponibles partout, contrairement à ce qu'on trouve sur la majorité des sites qui en parlent. Notamment, elles le seront certainement sur Windows, Mac et Ubuntu. Mais sur mon [Manjaro](https://manjaro.org/), elles n'y sont pas. Si vous êtes jusqu'au-boutiste, il peut être intéressant d'ajouter un deuxième fallback avec les fonts **DejaVu Serif** ou **DejaVu Sans** qui, elles, sont libres de droit et donc largement disponibles dans l'écosystème Linux.

  Vous ne pourrez toutefois jamais être certain que vos font de fallback sont disponibles. Il est donc important de garder la notion de `serif` ou `sans-serif` dans la `font-family`.

- **Je vous ai parlé de `size-adjust`, mais un `ascent-override` a fait son apparition.** La différence entre les deux est que size-adjust va gérer l'alignement horizontal tandis que ascent-override s'occupe de l'alignement vertical.

  Comment choisir leurs valeurs ? La réponse la plus simple est avec cet outil qui peut bien vous macher le travail : [Automatic font matching](https://deploy-preview-15--upbeat-shirley-608546.netlify.app/perfect-ish-font-fallback/). Le seul souci c'est qu'il part du principe que Arial ou Times New Roman est installé sur votre PC. Si ce n'est pas le cas, il faudra faire la manipulation manuellement en tatonnant jusqu'à trouver la bonne valeur.

- **Pourquoi définir une unicode-range sur le fallback ?** Vous pouvez constater que j'ai conservé exactement la même unicode-range que pour la font finale. Le but ici est de s'assurer que la font de fallback ne fasse pas trop de zèle. Notamment certaines fonts contiennent des emojis noir et blancs. Si vous oubliez de mettre l'unicode-range, vous retrouvez donc avec un emoji en noir et blanc plutôt que l'emoji habituellement affiché par votre navigateur. En renseignant la bonne unicode-range, vous vous assurez que les emojis ne soient pas considérés par cette `@font-face`. Pour en savoir, cet excellent article résume bien [l'enfer des emojis (EN)](https://fullystacked.net/posts/using-emoji-on-the-web/) 😁

- **Enfin, que se passe-t-il si ma font a plusieurs graisses ?** En effet, quand on parle de size-adjust on parle d'alignement horizontal. Et la graisse impacte l'espacement horizontal. Vous allez donc avoir besoin d'un size-adjust différent. L'idée est alors d'ajouter une `@font-face` différente spécialement conçue pour cette graisse en spécifiant `font-weight: 700` :

  ```css
  @font-face {
  	font-family: 'Ovo-fallback';
  	font-weight: 700;
  	/* Adapter la valeur du size-adjust à la font */
  	size-adjust: 104.1%;
  	ascent-override: 72%;
  	/* Choisir la bonne graisse sur la font de fallback */
  	src: local('Times New Roman Bold');
  	unicode-range: U+20-5F, U+61-7A, U+7C, U+A0, U+A7, U+A9, U+AB, U+B2-B3, U+BB, U+C0, U+C2,
  		U+C6-CB, U+CE-CF, U+D4, U+D9, U+DB-DC, U+E0, U+E2, U+E6-EB, U+EE-EF, U+F4, U+F9, U+FB-FC,
  		U+FF, U+152-153, U+178, U+2B3, U+2E2, U+1D48-1D49, U+2010-2011, U+2013-2014, U+2019,
  		U+201C-201D, U+2020-2021, U+2026, U+202F-2030, U+20AC, U+2212;
  }
  ```

##### Que faire quand size-adjust n'est pas disponible ?

Je disais un peu plus haut que seulement 73% des navigateurs supportent size-adjust aujourd'hui. Que faire pour les 27% restants ?

Tout d'abord vous pouvez considérez que c'est du [progressive enhancement](https://developer.mozilla.org/fr/docs/Glossary/Progressive_Enhancement) : alors vous pouvez directement passer à la partie suivante sur les [Variable Fonts](#2-utiliser-plusieurs-graisses-de-fonts-grace-aux-variable-fonts)

Sinon, il vous faudra passer par du JavaScript. En effet, ce que nous avons vu, c'est que `size-adjust` et `ascent-override` permettent de gérer les espacements horizontaux et verticaux de la font. Mais quand on y pense, c'est aussi ce que font `letter-spacing` et `line-height` en CSS.

La seule différence est que dans le premier cas vous pouvez le définir au niveau d'une font unique, et dans l'autre vous êtes obligé de définir le même pour _toutes_ les fonts (fallback et finale).

L'astuce est alors d'utiliser des classes CSS qui vous permettent de savoir quelle font est en cours d'utilisation :

```css
body {
    font-family: 'Times New Roman', serif;
	letter-spacing: 0.05em;
	line-height: 1.45;
}

.font-loaded body {
    font-family: Ovo, serif,
	letter-spacing: 0;
	line-height: 1.5;
}
```

> C'est une représentation très simplifiée de la réalité. Vous aurez sûrement besoin de l'adapter pour chaque selecteur CSS qui à l'habitude de manipuler ces propriétés (ex : h1, h2, h3, h4, strong, etc.).

Pour obtenir cette nouvelle classe `font-loaded`, nous devons passer au JavaScript en utilisant [FontFaceObserver](https://www.npmjs.com/package/fontfaceobserver) :

```js
/* Utiliser le même nom que celui utilisé dans la propriété `font-family` */
const ovoFont = new FontFaceObserver('Ovo');
ovoFont.load().then(() => {
	document.documentElement.classList.add('font-loaded');
});
```

Ainsi, dès que la font `Ovo` a fini de se charger la classe `font-loaded` est ajoutée.

Ce JavaScript doit être ajouté de manière synchrone à l'aide d'une balise `<script>` inline dans le `<head>` de votre site si vous voulez éviter au maximum un Flash Of Unstyled Text. Même si la librairie en elle même est légère (1.3KB gzip), ça représente une légère perte de performance et un sacré effort de maintenabilité en plus pour penser à maintenir tous les `letter-spacing` & `line-height`, avec **et** sans fallback dans votre CSS.

Par ailleurs, il est impossible d'utiliser `FontFaceObserver` uniquement pour les navigateurs qui ne supportent pas `size-adjust`. Si vous souhaitez gérer les 27% de navigateurs qui ne gèrent pas `size-adjust`, vous devrez donc tout le temps passer par `FontFaceObserver` et subir la légère perte de performance et de maintenabilité que cela représente. La question qu'il vous reste à résoudre est donc de savoir si cela vaut le coup ou non.

### 2. Utiliser plusieurs graisses de fonts grâce aux Variable Fonts

Nous avons donc vu jusqu'à maintenant comment charger une unique font custom. La conséquence de ce choix est que si nous avons du gras dans la page, alors le navigateur utilisera de la [Font Synthesis](https://www.igvita.com/2014/09/16/optimizing-webfont-selection-and-synthesis/) : il simulera une graisse en la devinant à partir de la font normale.

Parfois c'est suffisant, mais parfois… c'est moche.

C'est là que les [variable fonts](https://developer.mozilla.org/fr/docs/Web/CSS/CSS_fonts/Variable_fonts_guide) peuvent être un bon moyen de préserver la simplicité de chargement et la légerté de vos fichiers tout en mettant à disposition plusieurs variantes de graisse. De manière simplifiée, ça fonctionne en enregistrant dans le fichier les glyphes fins ET les glyphes gras, puis en faisant une interpolation entre les deux pour obtenir la graisse choisie.

Vous en trouverez notamment un bon nombre sur Google Fonts si vous cochez la case ["Show only variable fonts"](https://fonts.google.com/?vfonly=true). Il y a même des trucs rigolos avec [des fonts colorées avec des effets 3D](https://fonts.google.com/specimen/Nabla/tester?vfonly=true&coloronly=true).

Si nous revenons à notre code, quelle différence par rapport à la font unique ?

Dans le cas de mon blog, j'ai choisi la font Assistant. Celle-ci a des graisses allant de 200 à 800. La seule différence se trouve au niveau de l'appel à `@font-face` avec l'ajout de la propriété `font-weight` :

```css
@font-face {
	font-family: 'Assistant';
	/* J'indique au navigateur que la font est capable
    de gérer des graisses allant de 200 à 800 */
	font-weight: 200 800;
	font-display: fallback;
	src: url(/fonts/Assistant.woff2) format('woff2');
	unicode-range: U+20-5F, U+61-7A, U+7C, U+A0, U+A7, U+A9, U+AB, U+B2-B3, U+BB, U+C0, U+C2, U+C6-CB,
		U+CE-CF, U+D4, U+D9, U+DB-DC, U+E0, U+E2, U+E6-EB, U+EE-EF, U+F4, U+F9, U+FB-FC, U+FF,
		U+152-153, U+178, U+2B3, U+2E2, U+1D48-1D49, U+2010-2011, U+2013-2014, U+2019, U+201C-201D,
		U+2020-2021, U+2026, U+202F-2030, U+20AC, U+2212;
}
```

> 🤔 A noter que vous verrez d'autres tutos & documentations la possibilité de changer le format pour indiquer au navigateur que c'est une Font Variable.
>
> <!-- prettier-ignore -->
> ```css
> @font-face {
> 	src: url(/fonts/Assistant.woff2) format('woff2') tech('variations'),
> 	     url(/fonts/Assistant.woff2) format('woff2-variations');
>}
>```
>
> Malheureusement chez moi ces syntaxes désactivent complètement les fonts. Pourtant, en restant sur la version simplifiée tout rentre dans l'ordre. Je n'ai pas réussi à trouver d'informations à ce sujet. Etant donné le support très large des variable fonts je pars donc du principe que, au pire, ça téléchargera la font dans tous les cas et _fallbackera_ si finalement la font ne fonctionne pas sur le navigateur.

Cette notion de `font-weight` est la seule différence comparée au chargement d'une [font unique](#1-utiliser-une-font-unique). Toutes les autres problématiques restent identiques. Pensez donc bien à :

1. [Optimiser le fichier de font avec `pyftsubset`](#1-1-recuperer-le-fichier-de-font)
2. [Utiliser les bonnes règles de font-display](#1-2-referencer-la-font-dans-notre-css)
3. [Gérer les fallbacks](#1-3-choisir-des-bons-fallbacks) et bien faire attention à l'ajustement des fallbacks en fonction des différentes graisses

Pour un exemple complet, vous pouvez vous référer à la [feuille de style de mon blog](https://github.com/JulienPradet/blog-posts/blob/5d35058ff47e70dab04716105b4c34de3bd29308/src/routes/%2Blayout.svelte#L14).

### 3. Utiliser plusieurs fonts

Dernier cas de figure : votre site est complexe, repose sur plusieurs fonts ou a minima une font qui a plusieurs graisses sans Font Variable disponible. Comment combiner tout ce qu'on a vu jusqu'à maintenant pour proposer la meilleure solution à l'utilisateur ?

Dans les exemples ci-dessous, j'utiliserai [Montserrat](https://fonts.google.com/specimen/Montserrat) pour les titres et [Cabin](https://fonts.google.com/specimen/Cabin) pour les paragraphes. En réalité celles-ci existent sous form de Font Variables, mais pour mieux illustrer la situation, je considérerai que non.

#### 3.1. Définir une @font-face par typo

Si on exclut les `@font-face` de fallback, nous avions eu besoin d'une unique `@font-face` jusqu'à maintenant. Si nous avons plusieurs fonts, il va donc falloir duppliquer ces déclarations pour chacunes d'elles :

```css
@font-face {
	font-family: 'Montserrat';
	font-weight: 400;
	src: url('/fonts/Montserrat.woff2') format('woff2');
}

@font-face {
	font-family: 'Montserrat';
	font-weight: 700;
	src: url('/fonts/Montserrat-Bold.woff2') format('woff2');
}

@font-face {
	font-family: 'Cabin';
	font-weight: 400;
	src: url('/fonts/Cabin.woff2') format('woff2');
}

@font-face {
	font-family: 'Cabin';
	font-weight: 700;
	src: url('/fonts/Cabin-Bold.woff2') format('woff2');
}
```

Mais cela apporte son lot de complexités :

- Plus de fichiers, donc plus long à télécharger : il est d'autant plus important de bien optimiser et prioriser vos ressources afin que votre site ait fini de s'afficher au plus vite.
- Chaque font arrive à son propre rythme : Admettons que vous receviez la font Cabin, puis, 500ms plus tard, Montserrat arrive pour les titres. A chaque fin de chargement le navigateur va changer le contenu et l'adapter à la nouvelle font. Au delà de l'effet sapin de Noël, le navigateur va être obligé de recalculer l'ensemble des positions du site (c'est l'étape de [Layout](https://www.julienpradet.fr/tutoriels/des-animations-performantes-1/#comment-fonctionne-un-navigateur-web)) à chaque font chargée. Cette étape peut être très couteuse si vous avez un site complexe (ex : [> 1500 éléments de DOM](https://developer.chrome.com/docs/lighthouse/performance/dom-size/)) ou qui utilise des systèmes de layout particulièrement complexes (ex : beaucoup de flexbox imbriquées, etc.).

Pour la lenteur de chargement, il s'agit essentiellement de bien optimiser les ressources pour limiter les impacts :

- les fonts sont hébergées sur le même domaine que votre site
- chaque font a été optimisée grâce à `pyftsubset`
- chaque `@font-face` a le fallback qui va bien en utilisant `size-adjust`

Cependant, pour les problèmes de rythme, c'est plus compliqué. En effet, il n'existe pas de moyen pour indiquer à votre navigateur de ne _pas_ afficher une font tant que l'autre n'est pas chargée. La solution serait donc d'orchestrer vos chargements de cette façon :

```css
body {
	font-family: Cabin-critical, Cabin-fallback, sans-serif;
}

h1,
h2,
h3,
h4,
h5,
blockquote {
	font-family: Cabin-critical, Montserrat-fallback, sans-serif;
}

.fonts-loaded body {
	font-family: Cabin, Cabin-fallback, sans-serif;
}

.fonts-loaded h1,
.fonts-loaded h2,
.fonts-loaded h3,
.fonts-loaded h4,
.fonts-loaded h5,
.fonts-loaded blockquote {
	font-family: Montserrat, sans-serif;
}
```

1. **Afficher une font de fallback** en utilisant une de celles déjà installées sur l'ordinateur de votre utilisateurice (ici `sans-serif`).
2. **Afficher ensuite la font la plus impactante** en l'optimisant agressivement.

   La font la plus impactante sera généralement celle pour les paragraphes (ici Cabin). Mais si votre site fonctionne essentiellement avec des splashscreens faits uniquement des titres, alors privilégiez celle de vos titres (ici Montserrat).

   Vous pouvez l'optimiser agressivement en réduisant encore plus le nombre de glyphes à disposition. Peut-être pouvez vous vous contenter d'un espace, de 0-9, a-z et A-Z ? Si oui, ce serait les charactères unicodes suivants : `U+20,U+30-39,U+41-51,U+61-7A`. C'est plus facile cela dit en anglais qu'en français où ça risque de faire légèrement bizarre pour les accents.

   ```
   pyftsubset \
        ./static/fonts/Cabin-Regular.ttf \
        --unicodes="U+20,U+30-39,U+41-51,U+61-7A" \
        --layout-features='*' \
        --flavor=woff2 \
        --output-file=./static/fonts/Cabin-Critical.woff2
   ```

   L'intérêt de cette étape est que le site respecte les tons typographiques de votre charte très rapidement, même si toutes les fonts n'ont pas réussi à charger.

   Par ailleurs dans le cas où vous n'avez qu'un seul type de fonts (ex: uniquement Montserrat), mais plusieurs graisses à charger, cela vous permet de vous reposer sur la [Font Synthesis](https://www.igvita.com/2014/09/16/optimizing-webfont-selection-and-synthesis/) qui sera vraisemblablement assez proche des graisses finales que vous comptez charger.

   Etant donné que c'est la seule font _critique_ au premier affichage, c'est sur ce fichier là que vous pouvez ajouter un `<link rel="preload">` dans l'entête de votre site.

   ```html
   <head>
   	<link
   		rel="preload"
   		as="font"
   		type="font/woff2"
   		href="/fonts/Cabin-Critical.woff2"
   		crossorigin
   	/>
   </head>
   ```

3. **Charger toutes les autres fonts** et attendre que la totalité soit téléchargée avant d'ajouter la classe `fonts-loaded` à votre document.

   Pour faire cela, vous pouvez utiliser la même technique que pour [les navigateurs qui ne supportent pas `size-adjust`](#que-faire-quand-size-adjust-n-est-pas-disponible) : en passant par [FontFaceObserver](https://www.npmjs.com/package/fontfaceobserver)

   ```js
   const cabinFont = new FontFaceObserver('Cabin');
   const cabinBoldFont = new FontFaceObserver('Cabin', {
     { weight: 700 }
   });
   const montserratFont = new FontFaceObserver('Montserrat');
   const montserratBoldFont = new FontFaceObserver('Montserrat', {
     { weight: 700 }
   });

   Promise.all([
     cabinFont.load(),
     cabinBoldFont.load(),
     montserratFont.load(),
     montserratBoldFont.load(),
   ]).then(() => {
   	 document.documentElement.classList.add('font-loaded');
   });
   ```

   Ainsi, grâce au `Promise.all`, on attend que _toutes_ les fonts soient téléchargées avant de les afficher. Le temps que l'on perd à attendre l'arrivée des fonts, on va le gagner en performance ressentie et en temps de calcul pour le navigateur.

   Attention toutefois à bien penser à rendre ce script inline et synchrone dans le `<head>` de votre page. Ainsi, si les fonts sont déjà en cache, le navigateur sera en mesure de les afficher directement.

## Récapitulatif

Nous voilà arrivé au bout. Félicitations ! 👏

Si on récapitule un peu tout ce qu'on vient de voir, voici quelques éléments que je veux que vous gardiez en tête :

- commencez par faire le bilan sur vos fonts : lesquelles sont utiles, lesquelles peuvent être évitées ?
  - est-ce qu'il est possible d'utiliser des fonts variables ?
- Faites en sorte que vos fonts soient les moins bloquantes possible :
  - les héberger sur le même nom de domaine que votre site
  - veiller à ce qu'elles soient en cache pour ne pas avoir à les retélécharger à la prochaine page
  - ajouter des `preload` sur les fonts critiques
  - optimiser les fonts pour n'avoir que les caractères nécessaires (`pyftsubset`)
  - utiliser `font-display: fallback` ou `swap` pour éviter les pages blanches sur connexions lentes
- Travaillez sur les fonts de fallback pour limiter les effets sapin de Noël :
  - en utilisant `size-adjust` sur les fonts de fallback
  - en utilisant FontFaceObserver pour grouper les mises à jour en une seule

Pfiou ! Ca en fait des choses. Vous en voyez d'autres ? En tout cas, avec ça vous devriez voir un joli boost de performance sur votre site si ce n'était pas déjà en place. N'hésitez pas à me partager vos avancées [Mastodon](https://piaille.fr/@julienpradet) ou [Twitter](https://twitter.com/JulienPradet).

A la semaine prochaine pour la suite ! Je me concentrerai cette fois sur les icones. 👀
