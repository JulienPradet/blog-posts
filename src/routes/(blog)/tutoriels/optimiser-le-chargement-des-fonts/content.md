Nous voici de retour dans cette série d'articles liés à la web performance. Cette semaine, je vous propose de se concentrer sur les polices d'écriture. C'est souvent un élément essentiel de la charte graphique de votre site web. C'est aussi un élément qui peut ruiner vos performances s'il n'est pas bien géré.

Nous allons donc voir dans cet article les différentes configurations possibles et ce qu'il est pertinent de gérer pour améliorer au maximum la performance ressentie par vos utilisateurices.

Si vous ressentez le besoin d'avoir plus d'accompagnement dans votre entreprise pour mettre en place ces sujets, n'hésitez pas à me contacter par [mail](mailto:julien.pradet+article-blog@gmail.com). Peut-être pouvons-nous [travailler ensemble](/developpeur-web-performance-freelance/) pour proposer la meilleure expérience à vos utilisateurices ?

Récapitulatif des articles de cette série :

- [Pourquoi améliorer le LCP de vos pages ?](/tutoriels/pourquoi-ameliorer-le-lcp/)
- [Analyser le comportement réseau pour améliorer FCP et LCP](/tutoriels/reseau-et-core-web-vitals/)
- [Optimiser les images sur le web : checklist des bonnes pratiques](/tutoriels/optimiser-le-chargement-des-images/)
- Optimiser le chargement des fonts **(vous êtes ici)**
  - [Rappels sur les bonnes pratiques réseau](#rappels-sur-les-bonnes-pratiques-reseau)
  - [1. Utiliser une font unique](#1-utiliser-une-font-unique)
  - [2. Utiliser plusieurs graisses de fonts grâce aux Variable Fonts](#2-utiliser-plusieurs-graisses-de-fonts-grace-aux-variable-fonts)
  - [3. Utiliser plusieurs fonts](#3-utiliser-plusieurs-fonts)
  - [Récapitulatif des bonnes pratiques](#recapitulatif)
- Optimiser la gestion des icônes (bientôt)
- Quelles techniques pour diminuer la quantité de JavaScript ? (bientôt)
- Quelles métriques suivre en dehors des Core Web Vitals ? (bientôt)
- Et plus encore 🫶

Prérequis : cet article se concentre sur l'optimisations et les points d'attention sur la gestion des fonts. Si vous n'avez jamais installé de web font ou que vous n'avez jamais vu de `@font-face` jusqu'à maintenant, je vous conseille de commencer par suivre ce tutoriel [utiliser une web font (EN)](https://fonts.google.com/knowledge/using_type/using_web_fonts).

## Avez-vous vraiment besoin d'une font ?

Souvent, la première considération à avoir au sujet des performances est de savoir s'il est possible de faire **moins**. Est-ce que la police que vous utilisez est indispensable ?

Vous pourriez par exemple envisager d'utiliser cette règle par défaut :

```css
font-family: system-ui, sans-serif;
```

[Source: Modern Font Stacks](https://modernfontstacks.com/) (d'autres styles disponibles)

C'est une façon de dire au site web : utilise juste la police par défaut du système. Ainsi, l'utilisateurice ne devrait pas être trop choqué·e par celle-ci puisque c'est celle qu'iel voit au quotidien dans son OS. Ce blog a longtemps utilisé cette méthode. Mais ça ne représente que rarement la réalité d'un site web d'entreprise.

Bien souvent vous n'aurez pas en main les clés pour prendre cette décision. Il s'agit plutôt d'une considération de marque : la police d'écriture est un moyen efficace de [véhiculer une émotion](https://www.canva.com/learn/font-psychology/) et donc de se positionner.

<figure tabindex="0">
<img alt="Graphique représentant le nombre de sites web utilisant une font custom. La montée en puissance commence en 2012 et nous sommes en train d'arriver à un plateau autour des 84% en 2022" src="/images/posts/lcp/webfont-usage.png" loading="lazy">
<figcaption>84% des sites web utilisent une web font en 2022 (Source: <a href="https://almanac.httparchive.org/en/2022/fonts">Web Almanac 2022</a>)</figcaption>
</figure>

Mais peut-être pouvez-vous faire pencher la balancer vers _moins_ de fonts. Quand un·e designer·euse me demande combien de fonts utiliser pour le site, je réponds généralement 2 fonts avec un grand maximum de 3, graisses incluses. Par exemple, sur ce blog, c'est la font "Assistant" qui utilise 3 graisses différentes (`font-weight`). Mais si j'avais eu une font pour les titres et une font pour les paragraphes, j'aurais poussé pour que les titres aient toujours la même graisse.

## Rappels sur les bonnes pratiques réseau

Avant de rentrer dans le vif du sujet, je veux juste rappeler en quelques mots 2 bonnes pratiques que nous avions vu dans un des premiers articles de cette série [Comment analyser la trace réseau de votre site ?](/tutoriels/reseau-et-core-web-vitals/#eviter-les-effets-de-cascades) :

- **assurez vous que la font est hébergée sur le même domaine que votre page HTML :**  
  Sur une connexion classique, cela vous fera gagner facilement 100ms de temps de chargement. Mais sur des connexions plus ératiques, vous pouvez facilement considérer que cela vous fera gagner dans les 500ms.

- **évitez les effets de cascade en ajoutant un `<link rel="preload">`**  
  Classiquement, c'est le CSS qui indique à votre navigateur qu'il faut télécharger une nouvelle font. Pour gagner en temps d'attente, vous pouvez l'indiquer dans votre HTML afin que la font soit téléchargée en parallèle de votre CSS.

  <!-- prettier-ignore -->
  ```html
  <head>
  	<link
  		rel="preload"
  		as="font"
  		type="font/woff2"
  		href="/assets/fonts/ovo.woff2"
  		crossorigin
  	/>
  </head>
  ```

Ces premières bonnes pratiques pourront vous amener dans la bonne direction. Mais elles ne seront pas suffisantes.

## Comment faire alors pour charger rapidement les fonts ?

Comme à chaque fois en informatique, nous allons voir qu'il n'y a pas une manière unique de faire les choses. Il vous faudra donc choisir la bonne méthode en fonction de votre situation. Du plus simple au plus compliqué nous verrons donc :

- [utiliser une font unique](#1-utiliser-une-font-unique)
- [utiliser plusieurs graisses de fonts grâce aux Variable Fonts](#2-utiliser-plusieurs-graisses-de-fonts-grace-aux-variable-fonts)
- [utiliser plusieurs fonts](#3-utiliser-plusieurs-fonts)

Vous pouvez bien évidemment aller directement aux sections qui vous intéressent. Sachez cependant que je rentre dans pas mal de détails lors de la première section. Si les notions de `subset`, de `font-display` ou de `size-adjust` vous sont étrangères ou ont besoin de rappels, n'hésitez donc pas à prendre le temps de la lire avant de passer aux suivantes.

Par ailleurs, si vous voulez un historique de comment on en est arrivé là, sachez que [cet article par Zach Leatherman](https://www.zachleat.com/web/comprehensive-webfonts/) retrace les différentes techniques qui existent. Mon but ici est de vous proposer les méthodes qui vous seront utiles aujourd'hui avec le support des navigateurs qui s'est grandement amélioré.

### 1. Utiliser une font unique

Admettons que la seule font que vous souhaitez utiliser est [Ovo](https://fonts.google.com/specimen/Ovo?query=Ovo).

<figure tabindex="0">
<img alt="Screenshot de la police Ovo avec le texte : Considérant que la reconnaissance de la dignité" src="/images/posts/lcp/ovo.jpg" loading="lazy">
<figcaption>La police Ovo appliquée à un court extrait de texte</figcaption>
</figure>

#### 1.1. Récupérer le fichier de font

La première étape va être de récupérer la font et de la transformer dans le bon format. En effet, si vous télécharger la police directement depuis Google Font, vous la récupérerez en TTF. Mais :

- le format le plus performant est WOFF 2.0 qui est supporté par [96.4%](https://caniuse.com/woff2) des navigateurs aujourd'hui et peut vous faire économiser 67% de taille de fichier (48KB -> 16KB)
- il y a des chances que vous n'utilisiez qu'un nombre réduit de caractères. Par exemple si votre site est en français, vous utiliserez "é" et "œ", mais pas "ß" par exemple. Cela nous fait gagner quelques KB de plus (16KB -> 12KB).

Pour appliquer ces changements, vous pouvez exécuter la commande suivante :

```sh
pyftsubset \
    ./static/fonts/Ovo-Regular.ttf \
    --unicodes="U+20-5F, U+61-7A, U+7C, U+A0, U+A7, U+A9, U+AB, U+B2-B3, U+BB, U+C0, U+C2, U+C6-CB, U+CE-CF, U+D4, U+D9, U+DB-DC, U+E0, U+E2, U+E6-EB, U+EE-EF, U+F4, U+F9, U+FB-FC, U+FF, U+152-153, U+178, U+2B3, U+2E2, U+1D48-1D49, U+2010-2011, U+2013-2014, U+2019, U+201C-201D, U+2020-2021, U+2026, U+202F-2030, U+20AC, U+2212" \
    --layout-features='*' \
    --flavor=woff2 \
    --output-file=./static/fonts/Ovo-critical.woff2
```

> 💡 Pour installer [`pyftsubset`](https://fonttools.readthedocs.io/en/latest/index.html), vous pouvez exécuter `pip3 install fonttools[woff,unicode]`.
>
> Si vous n'avez pas python sur votre machine, vous pouvez utiliser le petit [Dockerfile](https://github.com/JulienPradet/blog-posts/blob/main/docker/tools/Dockerfile) que j'ai moi-même utiliser pour ce blog.

Cette commande va supprimer tous les caractères qui ne sont pas dans la liste `--unicodes`. Vous pouvez déterminer cette liste en utilisant [Character Table](https://character-table.netlify.app/) qui indique par langue quels caractères utiliser. Celle que j'ai utilisé dans l'exemple ci-dessus est pour le [Français](https://character-table.netlify.app/french/). Comme vous pouvez le voir à la fin du tableau, certains caractères ne font pas forcément partie de notre quotidien : †, ‡. N'hésitez donc pas à faire le tri par vous même.

Si vous voulez une liste très précise, vous pouvez récupérer la liste de votre site directement en utilisant [glyphhanger](https://github.com/zachleat/glyphhanger). En CLI, il peut parcourir votre site pour en lister les caractères utiliser, se concentrer sur des sections critiques, etc.

Pour les autres options telles que `--layout-features`, n'hésitez pas à vous référer à l'article complet de [Code Colibri](https://codecolibri.fr/optimiser-ses-polices-web-avec-le-font-subsetting/).

> 💡 Quand vous récupérez les polices depuis Google Font, vous pourrez tomber sur des subset tout prêts : latin, latin-ext, cyrillic, etc. Généralement, latin est la version la plus proche de ce que vous voulez si vous opérez principalement en occident. Mais gardez en tête qu'il y a quand même plus de caractères que nécessaire et donc qu'il est pertinent de construire vous même votre liste de caractères (`--unicodes`).

#### 1.2 Référencer la font dans notre CSS

Maintenant que nous avons notre fichier optimisé, nous allons pouvoir indiquer au navigateur qu'une web font est disponible en CSS via `@font-face` :

```css
@font-face {
	font-family: 'Ovo';
	font-display: fallback;
	/* Penser à bien héberger la font sur le même domaine que mon site */
	src: url(/fonts/ovo.woff2) format('woff2');
	/* Réutiliser ici exactement la même liste unicode que ci-dessus */
	unicode-range: U+20-5F, U+61-7A, U+7C, U+A0, U+A7, U+A9, U+AB, U+B2-B3, U+BB, U+C0, U+C2, U+C6-CB,
		U+CE-CF, U+D4, U+D9, U+DB-DC, U+E0, U+E2, U+E6-EB, U+EE-EF, U+F4, U+F9, U+FB-FC, U+FF,
		U+152-153, U+178, U+2B3, U+2E2, U+1D48-1D49, U+2010-2011, U+2013-2014, U+2019, U+201C-201D,
		U+2020-2021, U+2026, U+202F-2030, U+20AC, U+2212;
}

body {
	font-family: 'Ovo', serif;
}
```

Plusieurs choses intéressantes à noter ici.

**Je n'ai indiqué ni `font-style` ni `font-weight` dans `@font-face`.** Ainsi, le navigateur utilise la font `Ovo` quand bien même le fichier qu'on a utilisé ne fournit qu'un style roman (font-style: normal; font-weight: normal). En effet, quand le navigateur va tomber sur du gras et/ou de l'italique, il va alors faire de la [Font Synthesis](https://www.igvita.com/2014/09/16/optimizing-webfont-selection-and-synthesis/) : il va inventer une graisse et/ou un style à partir du style roman. Ce ne sera pas parfait, mais ce sera souvent mieux que d'utiliser une typo complètement différente pour le gras/italique. Selon la font choisie, le résultat pourra être décevant, voire rédhibitoire. Dans ce cas là vous devrez passer par une [Variable Font](#2-utiliser-plusieurs-graisses-de-fonts-grace-aux-variable-fonts) ou [plusieurs fonts](#3-utiliser-plusieurs-fonts).

**J'utilise la règle `font-display: fallback`.** Cette ligne indique comment doit se comportement le navigateur pendant le chargement de la font. Notamment, comment est-ce que la font doit s'afficher si le HTML et le CSS ont fini de se charger mais que le navigateur n'a pas encore reçu le fichier `ovo.woff2` ?

- si cela ne fait pas longtemps (< ~100ms), alors la typo n'est pas affichée (Flash Of Invisible Text (FOIT))
- si cela fait un peu longtemps (< ~3s), alors la première typo disponible dans la `font-family` s'affiche (Flash Of Unstyled Text (FOUT)).
- si cela fait longtemps (> ~3s), alors on abandonne le chargement de `ovo.woff2` et on reste sur la typo de l'étape précédente.

C'est un bon comportement par défaut parce que :

- Si la font est rapide à charger, on n'a pas de saut de texte au chargement des fonts
- Si la font met du temps à se charger, vos utilisateurices ne restent pas bloqué·e·s sur une page vide
- Si la font est vraiment trop lente, les personnes auront certainement commencé à lire le texte et seront au milieu de la page : pour éviter de perturber leur lecture, on évite de changer de font.

D'autres méthodes existent dans [font-display](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display). Je n'entrerai pas dans le détail, mais si vous décidez de choisir autre chose que `fallback`, privilégiez soit `optional` soit `swap`. Jamais `auto` ou `block` qui auront un effet désastreux sur les connexions lentes.

#### 1.3 Choisir des bons fallbacks

Dans la définition de la font-family (`font-family: 'Ovo', serif;`), vous pouvez constater que j'ai mis `serif` après `Ovo`. C'est une étape importante dans la définition de la font parce que vos utilisateurices verront cette font à un moment ou à un autre (dans un train, pendant leur voyage à la campagne ou juste parce que leur wifi a décidé d'être particulièrement lent).

Pourquoi `serif` ? Pour avoir un style proche de la typo finale, tout en étant sûr qu'elle soit disponible. `serif` est adapté si la police finale a des petits pieds au bout des lettres (= empattements). Sinon, privilégiez plutôt `sans-serif`.

<figure tabIndex="0">
<img loading="lazy" alt="La lettre T écrite en serif et en sans serif. La différence entre les deux se voit au niveau des bouts des branches de la lettre." src="/images/posts/lcp/serif-sans-serif.jpg">
<figcaption>sans-serif / serif (<a href="https://uxplanet.org/the-basics-of-typography-8edc709c2a65">Source</a>)</figcaption>
</figure>

Mais on peut mieux faire.

##### Size-adjust

Notamment, une nouvelle méthode est en train d'arriver dans les navigateurs : `size-adjust`. Celle-ci est [disponible sur 73% des navigateurs actuellement](https://caniuse.com/mdn-css_at-rules_font-face_size-adjust), on croise les doigts pour que ça arrive aussi sur Safari.

Ce size-adjust a pour but d'ajuster la font de fallback pour qu'elle se rapproche au maximum des espacements utilisés par la font finale. Ainsi, si la font de fallback est affichée puis remplacée par la font finale, on minimise les soucis de lecture.

Dans l'exemple ci-dessous, vous pouvez changer de tabs pour constater la différence que cela provoque :

- Si vous passez de "Fallback **sans** size-adjust" à "Font finale", vous constaterez que vous aurez du mal à vous repérer : il vous faudra un petit temps avant de pouvoir reprendre votre lecture
- Si vous passez de "Fallback **avec** size-adjust" à "Font finale", vous remarquerez un changement de graisse et de style, mais la différence est minime
