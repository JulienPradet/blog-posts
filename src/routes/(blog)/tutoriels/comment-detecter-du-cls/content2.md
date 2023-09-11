C'est un exemple inoffensif, mais si c'était une action importante (ex : acheter, supprimer, etc.), ce serait beaucoup plus énervant.

Ainsi, si on devait **définir le Layout Shift** sans utiliser de termes techniques, ce serait un changement de l'affichage de la page, qui ne vient pas d'une action de l'utilisateurice et donc qui peut entraîner un mauvais clic ou une perte de repères au cours de la lecture.

Une subtilité à noter : ce Layout Shift est calculé uniquement sur ce qui est visible à l'utilisateurice. En effet, si votre page bouge mais que ce n'est pas dans la partie visible de l'écran, ce n'est pas un problème.

On a donc définit le Layout Shift qui correspond au LS de CLS. Mais à quoi correspond le C ? Cumulative : c'est une manière de dire qu'on va mesurer l'ensemble des mouvements qui y a eu sur la page. Par exemple, si vous avez plusieurs bandeaux qui apparaissent les uns après les autres, ce sera d'autant plus gênant. Mais ça veut aussi dire que si vous scrollez plus loin dans votre page et que pendant le scroll il se passe des chargements, alors ces Layouts Shifts seront aussi comptabilisés dans le CLS.

## Quels outils pour mesurer et diagnostiquer le CLS ?

Comme d'habitude, la réponse est : ça dépend 😁

### Obtenir une idée générale du CLS en un click : [PageSpeed Insights](https://pagespeed.web.dev/)

En renseignant l'URL que vous souhaitez tester, vous recevrez un audit Lighthouse. Vous pourrez ainsi voir si vous avez du Layout Shift ou non. Par exemple sur notre démo, on peut voir que le CLS est de 0.328. (De manière très schématique on peut en comprendre que 1/3 de la page a été affectée par du Layout Shift &ndash; cf. [Layout shift score](https://web.dev/cls/#layout-shift-score) pour plus de détails)

<figure tabindex="0">
<img src="/images/posts/cls/cls-pagespeed.jpg" alt="Audit Lighthouse de la page de démo qui montre les différents scores des Core Web Vitals, dont le CLS à 0.328">
<figcaption>Rapport d'audit pour la <a href="https://www.julienpradet.fr/examples/webperf/slow-cls.html">page d'exemple</a> sur mobile</figcaption>
</figure>

Pensez à aussi bien vérifier sur desktop parce que les contraintes y sont très différentes et il est très courant d'avoir du CLS sur un device mais pas l'autre.

Lighthouse vous donnera aussi des premières pistes pour régler les problèmes associés au CLS. Pour cela, il vous faut cliquer sur le petit tag "CLS" en bas à droite des screenshots de votre page.

<figure tabindex="0">
<img src="/images/posts/cls/cls-lighthouse.jpg" alt="Affichage des conseils spécifiques au CLS dans la section 'Diagnostic' d'un audit Lighthouse">
<figcaption>La section Diagnostic de l'audit Lighthouse ne contient maintenant que des conseils associés au CLS</figcaption>
</figure>

L'autre intérêt de PageSpeed Insights est que si votre site est suffisamment fréquenté, il vous présentera les données du <abbr title="Chrome UX Report">CrUX</abbr> qui sont des données mises à disposition par Google qui indiquent quelle a été la rapidité d'affichage de votre site pour les utilisateurices de Chrome. Cela inclut le CLS. L'intérêt est que cela vous donnera une vision sur ce que ressentent réellement vos utilisateurices plutôt que de vous contenter de données dîtes de laboratoire. N'hésitez pas à vous référer à <a href="/tutoriels/pourquoi-ameliorer-le-lcp/#commencer-par-analyser-le-chargement-de-votre-page">mon article d'introduction pour en savoir plus sur le CrUX</a>.

<figure tabindex="0">
<img src="/images/posts/cls/crux.png" alt="Core Web Vitals ">
<figcaption>Exemples de chiffres du CrUX sur <a href="https://www.singulart.com/fr/">SINGULART</a>, n'ayant pas assez de visites sur ma page de démo</figcaption>
</figure>

### Comprendre en détail d'où vient le CLS : [WebPageTest](https://www.webpagetest.org/)

WebPageTest peut être considéré comme une alternative à une analyse de la page dans l'onglet Performance des DevTools de Chrome. Je le privilégie parce que je trouve qu'il est plus facile d'y faire la corrélation entre le chargement d'une ressource et l'origine du CLS.

Notamment, après avoir lancé un audit, si vous cliquez sur un Filmstrip, vous vous retrouverez avec une vue comme celle-ci :

<figure tabindex="0">
<img src="/images/posts/cls/filmstrip.jpg" alt="Filmstrip représentant comme la page se charge : d'abord une page blanche, puis avec des couleurs, ensuite avec les fonts, et enfin avec le bandeau de notification">
<figcaption><a href="https://www.webpagetest.org/video/compare.php?tests=230820_BiDc95_66P-r:3-c:0">Filmstrip view</a> de la page d'exemple</figcaption>
</figure>

Si vous lisez l'article sur mobile, vous aurez du mal à le constater, mais les frames avec du Layout Shift sont encadrées en pointillé (orange ou rouge). Cela donne assez rapidement une compréhension de ce qui provoque du Layout Shift :

- Le chargement des fonts
- L'apparition du bandeau de notification

En ajustant les paramètres de Web Page Test vous pouvez aussi configurer le FilmStrip ("Adjust Filmstrip Settings") pour raccourcir l'interval entre chaque frame (0.5s, 0.1s, 60FPS, etc.) et cocher "Highlight Layout Shift" pour comprendre précisément l'origine du Layout Shift.

<figure tabindex="0">
<img src="/images/posts/cls/filmstrip-with-highlight.jpg" alt="Le même screenshot que ci-dessus mais cette fois-ci avec les parties qui impactent le Layout Shift en rouge">
<figcaption><a href="https://www.webpagetest.org/video/compare.php?tests=230820_BiDc95_66P-r:3-c:0">Filmstrip view</a> avec l'option "Highlight Layout Shift" activée</figcaption>
</figure>

Très pratique pour mettre en évidence le cœur du problème et à quel point est-ce que cela influence le CLS. Par exemple, sur le Layout Shift associé au chargement des fonts, juste en dessous du screenshot, on voit que la valeur est de 0.001. C'est très faible et donc pas impactant pour le commun des mortels : inutile d'essayer de le corriger. Par contre, on va devoir se pencher sur la question du bandeau.

Généralement je commence à me pencher sur du CLS si on est au delà de 0.01 même si la recommendation de Google est de ne pas dépasser 0.1. Ca ne veut pas dire qu'il y aura forcément quelque chose à corriger, simplement que cela vaut le coup de comprendre ce qui se passe pour savoir s'il y a un problème plus large qui mérite d'être adressé.

### Analyse le comportement lors de l'interaction : DevTools Chrome, onglet Performance

WebPageTest est donc un très bon outil pour analyser le chargement de la page. Cependant, comme j'ai pu l'évoquer précédemment, le CLS ne concerne pas que le chargement initial : si vous scrollez tout en bas de votre page et que vous cherchez à cliquer dans votre footer mais qu'un bandeau de Newsletter apparaît juste au dessus au moment du clic, vous aurez aussi du Layout Shift.

Ainsi, vous pouvez vous retrouver avec Lighthouse, WebPageTest & co qui vous disent que votre CLS est à 0 et quand même constater du CLS dans le CrUX. Pour cette raison, **je vous conseille vivement de mettre en place des <abbr title="Real User Monitoring">RUM</abbr>** afin de placer des sondes chez les vrais utilisateurices de votre site. Grâce à cela, vous aurez une vue beaucoup plus fine (et cross-browser) que ce que peut proposer le CrUX qui vous dira si vous avez du CLS à régler ou non.

Mais une fois que vous savez que vous avez des problèmes, comment savoir précisément d'où ils viennent ?

Personnellement, j'utilise les DevTools de Chrome, notamment dans l'onglet Performance :

1. Charger votre page web
2. Cliquer sur le petit icone "Record" en haut à gauche
3. Naviguer dans la page (dans mon cas, je survol une des images de la grille)
4. Recliquer sur l'icone afin d'arrêter l'enregistrement

<figure tabindex="0">
<img src="/images/posts/cls/performance-chrome.jpg" alt="Screenshot de l'onglet performance de Chrome après avoir réalisé un enregistrement">
<figcaption>Démonstration d'un enregistrement de performance dans Chrome en faisant entrer puis sortir la souris d'une image sur la <a href="https://www.julienpradet.fr/examples/webperf/slow-cls.html">page d'exemple</a></figcaption>
</figure>

En dessous de la timeline, vous pouvez voir plusieurs lignes différentes : Frames, Animation, Timings, Layout Shifts, Main, etc. Selon la page et l'interaction que vous avez réalisé, le nombre de lignes affichées peut changer. Notamment, si vous n'avez pas du tout de CLS, la ligne Layout Shifts n'apparaîtra pas du tout.

Par contre, dans notre cas présent, pendant la durée de l'animation (~1000-1200ms et ~1800ms-2000ms) nous pouvons constater qu'il y a bel et bien du Layout Shift. En cliquant sur les petites boîtes violettes, le navigateur va mettre en surbrillance l'élément concerné dans la page. De plus, en bougeant la souris sur la zone des screenshots, on va pouvoir faire le parallèle entre Layout Shift et ce qui s'est passé à l'écran.

<figure>
<video controls>
  <source src="/images/posts/cls/layout-shift-demo.webm" type="video/webm" />
  <source src="/images/posts/cls/layout-shift-demo.mp4" type="video/mp4" />
</video>
<figcaption>Démonstration de comment voir le Layout Shift et faire le parallèle avec les screenshots - j'y redis exactement ce que j'explique au dessus</figcaption>
</figure>

Avec tout ça, on sait donc ce qui a bougé à l'écran et sur quel élément du DOM il faut plus particulièrement se concentrer.

### Rendre le CLS visible pendant les développements

Les outils que je vous ai présenté ci-dessus sont pratiques quand vous êtes en phase de recherche ou d'audit. Cependant, il peut être intéressant d'être prévenu pendant vos devs sans forcément que cela vienne de vous.

Pour cela, l'extension [Web Vitals](https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma/related) vous permet à tout moment de savoir si la page que vous êtes en train de visiter respecte les critères de performance ou non. Très utile donc pendant les développements.

L'inconvénient que je lui trouve est qu'elle ne reste pas active pendant toute la durée de la page mais uniquement sur le chargement initial. Le CLS qui surgit lors d'interactions n'est donc pas pris en considération.

Ainsi, je préfère utiliser le [WebPerf Snippet CLS](https://webperf-snippets.nucliweb.net/CoreWebVitals/CLS) qui fait partie de toute une [liste de snippets très utile à l'analyse de la performance](https://webperf-snippets.nucliweb.net/) de vos pages webs.

## Correction du CLS

Avec les outils mentionnés ci-dessus, on a donc tout ce qu'il faut pour comprendre d'où vient le CLS. C'est à mon sens la partie la plus complexe. Il nous reste maintenant plus qu'à corriger les éléments qui posent problèmes, un par un, petit à petit.

Pour cet article, j'ai rassemblé 3 cas (et demi) qui selon moi sont les plus fréquents dans les développements quotidiens. Vous tomberez certainement sur d'autres situations très spécifiques, mais en ayant bien compris ces cas, vous devriez avoir les bases nécessaires pour les adapter à votre propre besoin.

### Réserver la bonne place pour des images/iframes/videos

Si on revient au [diagnostic Lighthouse](/tutoriels/comment-detecter-du-cls/#obtenir-une-idee-generale-du-cls-en-un-click-pagespeed-insights), un conseil mis en avant était :

> Les éléments d'image ne possèdent pas de `width` ni de `height` explicites

En effet, par définition, le navigateur n'est pas capable de réserver la bonne place dans la page s'il ne sait pas ce qu'il doit afficher. Est-ce que l'image téléchargée sera verticale ou horizontale ? Il ne le sait pas. Ainsi, par défaut, le navigateur allouera 0px à l'image puis changera le layout une fois celle-ci téléchargée.

La méthode est donc de prévenir le navigateur _avant_ qu'il ait téléchargé l'image. Pour ça il nous faut ajouter les attributs `width` et `height`:

```diff
 <img
 	alt="Un chat gris bronze dans les doux rayons de soleil matinaux"
	src="chat.png"
+	width="320"
+	height="240"
 >
```

cf. [Commit qui corrige la page de démo](https://github.com/JulienPradet/blog-posts/commit/afb8dd0eb1a5d8eb89d8f8595be7085957954336)

Cette méthode marchera pour la plupart des contenus que l'on peut mettre au milieu d'une page : `img`, `iframe`, `video`, etc.

Accéder à cette `width` et `height` n'est pas toujours évident selon la manière dont les images que vous manipulez sont gérées. Cela dit, si jamais vous êtes en train de concevoir un système d'upload d'image dans votre backend, je vous conseille vivement de récupérer les dimensions des images au moment de l'enregistrement de l'image dans votre BDD. Elles ne vous seront peut-être pas utile immédiatement, mais cela a toujours fini par payer sur les projets auxquels j'ai contribué.

**Que faire quand `width` et `height` ne suffisent pas ?**

Il reste des cas problématiques que je ne peux pas énumérer tant ils sont spécifiques à votre situation. Cependant, généralement, la solution est de passer par CSS pour le résoudre. Notamment, l'enjeu va être soit d'essayer de jouer avec les propriétés `width` et `height` en utilisant des valeurs spécifiques (100%, 100vh, etc.), soit en définissant des ratios. La solution moderne pour cela est d'écrire :

```css
img {
	width: 100%;
	height: auto;
	aspect-ratio: 3 / 4;
}
```

Ainsi, peu importe les attributs et votre image, vous êtes sûrs que l'image prendra le plus de place possible mais que son ratio restera toujours 3:4. C'est d'ailleurs ce que fait votre navigateur quand vous définissez les attributs `width` et `height` dans le HTML : il va générer automatiquement une propriété `aspect-ratio: width / height`.

A l'heure actuelle c'est supporté par tous les navigateurs evergreen, mais c'est encore assez récent pour Safari. Nous n'avons donc que [90% des navigateurs](https://caniuse.com/mdn-css_properties_aspect-ratio) qui le supportent.

Cela peut toutefois parfaitement être utilisé en tant que Progressive Enhancement, et a l'avantage d'être utilisable sur n'importe quel type de balise.

### Réserver la bonne place pour du contenu asynchrone

Le second point à améliorer, que l'on a vu grâce à notre [audit WebPageTest](/tutoriels/comment-detecter-du-cls/#comprendre-en-detail-d-ou-vient-le-cls-webpagetest), est le bandeau chargé de manière asynchrone.

Dans la page d'exemple, j'ai fait une balise `p` qui apparaît au bout de 3s avec un petit bout de JS. C'est un exemple faussé, mais qui représente :

- une [hellobar](https://www.hellobar.com/) ou tout bandeau qui apparaît après le premier affichage de votre page, tout en haut du site
- ou un bandeau de pub

Dans cette situation, vous avez 2 types de solutions :

1. vous faites en sorte que ce soit géré à la génération de la page plutôt que de le faire en JS : ainsi, le premier affichage pour l'utilisateurice est le bon. C'est souvent la meilleure solution d'un point de vue utilisateurice. L'inconvénient est que ça peut aussi ralentir le premier affichage de la page et donc n'est pas tout le temps dans le champ des possibles.
2. vous réservez suffisamment de place dans la page pour qu'après chargement, le nouvel élément vienne remplacer une zone tampon. En UI, on parle souvent de [Skeleton](https://www.nngroup.com/articles/skeleton-screens/#:~:text=A%20skeleton%20screen%20is%20a,exclusively%20for%20full%2Dpage%20loads.) : préparer la page avec du contenu qui mimique l'état final, mais qui est vide.

Dans mon cas, j'ai défini en dur la hauteur qu'est censé prendre le bandeau final, et j'ai ajouté un léger effet de scanner en CSS pour montrer qu'il s'agit d'un état temporaire.

<figure>
<video controls>
  <source src="/images/posts/cls/compare-skeleton.webm" type="video/webm" />
  <source src="/images/posts/cls/compare-skeleton.mp4" type="video/mp4" />
</video>
<figcaption>Démonstration de comment voir le Layout Shift et faire le parallèle avec les screenshots - j'y redis exactement ce que j'explique au dessus</figcaption>
</figure>

<details>
<summary>Exemple de code CSS qui pour afficher le placeholder (cf. <a href="https://github.com/JulienPradet/blog-posts/commit/9ea16763ba9278a026a4acbfb8bad9380027ec2c#diff-e9651868c9857e30ec9efbc1e9b4e5a9b640dfc3db4a39b0618a8b729b737421R126-R180" rel="nofollow">Commit</a>)</summary>

```css
.hellobar {
	/* L'idée est d'indiquer la hauteur qu'est censé prendre la hellobar une fois terminée */
	/* Utiliser min-height plutôt que height vous permettra d'éviter de casser les choses si
    finalement la hellobar finale est plus grande que prévue */
	min-height: 8rem;
}

/* Si la taille est différente sur desktop que sur mobile, utilisez des @media */
@media (min-width: 1059px) {
	.hellobar {
		min-height: 3.5rem;
	}
}

/* Partie qui concerne l'effet scanner */
.hellobar--placeholder {
	position: relative;
}
.hellobar--placeholder::before {
	content: '';
	position: absolute;
	inset: 0;
	background: #eee;
}
.hellobar--placeholder::after {
	content: '';
	position: absolute;
	inset: 0;
	background: #eee;
	background: linear-gradient(90deg, #eee, #fafafa, #eeeeee);
	background-size: 200px 100%;
	background-repeat: no-repeat;
	animation: placeholderAnimation 2s infinite;
}

@keyframes placeholderAnimation {
	0% {
		background-position: -200px 0;
	}
	100% {
		background-position: calc(200px + 100%) 0;
	}
}
```

</details>

C'est quand même vachement mieux non ?

### Eviter de déplacer du contenu par animation

Enfin, dans la section où je vous présentais l'[onglet Performance des Chrome DevTools](/tutoriels/comment-detecter-du-cls/#analyse-le-comportement-lors-de-l-interaction-devtools-chrome-onglet-performance), nous avons vu qu'il y avait du Layout Shift sur l'animation de la description d'une image au moment ou l'utilisateurice passe sa souris dessus.

> 💡 Déplacer au survol du contenu qui doit être cliquable : c'est globalement mauvaise idée. Vous naviguez sur la page, vous essayez de viser un lien et surprise, quand vous vous en approchez, il se déplace. Essayez donc d'éviter ce genre d'animations. Et c'est certainement la première question que vous devriez vous poser quand vous adressez des sujets de CLS : est-ce qu'il est plus pertinent de supprimer le comportement qui posait problème ou dois-je trouver une manière de le corriger techniquement ?

Dans le cadre de cet article, nous allons nous obstiner, notamment parce que la solution technique est intéressante et pourra vous servir. En effet, nous avons du Layout Shift parce que l'animation se passe en changeant la propriété CSS `padding-bottom`. Or, quand on change cette propriété, le navigateur est obligé de refaire une phase de Layout : il doit recalculer les positions de vos éléments dans le DOM avant de s'assurer que rien ne dépasse. Potentiellement cette étape est très coûteuse et on veut absolument l'éviter afin de garder des animations performantes sur mobile. C'est donc ce que nous allons faire.

Tout d'abord, avant de procéder au changement, je vous invite à lire mon article sur les [animations performantes](/tutoriels/des-animations-performantes-1/) où j'explique en détail le fonctionnement du navigateur et donc ce qu'il faut avoir en tête pour faire des animations performantes.

Ce qu'il faut en retenir c'est qu'il faut à tout prix essayer de n'animer que les propriétés CSS `transform` et `opacity`, parce que ce sont celles qui demanderont le moins de travail au navigateur (il n'y aura pas de Layout).

L'astuce ici est d'imaginer le contenu légèrement différemment. Plutôt que d'agrandir le padding-bottom, je vais dès le départ prévoir le `padding-bottom: 3rem`, et pendant l'animation je vais préférer animer la propriété `transform: translateY(-3rem)`.

<figure tabindex="0">
<img src="/images/posts/cls/animate.jpg" alt="Screenshot de l'onglet performance de Chrome après avoir réalisé un enregistrement">
<figcaption></figcaption>
</figure>

Et pour éviter que le background dépasse dans son état initial, il ne nous reste plus qu'à ajouter un `overflow: hidden`. Grâce à cette méthode, je ne fait que déplacer ma balise plutôt que de changer sa taille.

cf. [Commit qui corrige la page de démo](https://github.com/JulienPradet/blog-posts/commit/7e75a5c2bbeaf14a660b47f3c6ef09846439b381)

<figure tabindex="0">
<img src="/images/posts/cls/no-padding.png" alt="Screenshot de l'onglet performance de Chrome après avoir réalisé un enregistrement">
<figcaption>Nouvel audit après avoir utilisé <code>transform</code></figcaption>
</figure>

Si on relance un record dans les DevTools, on a bien la ligne "Layout Shifts" qui a disparu. 🎉

### Bonus : le piège de l'unité `ch`

Un dernier point que je mentionne au passage est l'impact du chargement des fonts sur votre CLS. Je vous avais présenté il y a 3 semaines [comment bien gérer le chargement de vos fonts](/tutoriels/optimiser-le-chargement-des-fonts/), notamment en parlant de preload, de `size-adjust` et d'`ascent-override` qui sont autant de choses à prendre compte pour améliorer la performance ressenti.

Cependant un point que je n'avais pas détaillé, parce qu'il ne s'agit pas de l'utilisation de la font elle même, est l'utilisation de l'unité CSS [`ch`](https://developer.mozilla.org/fr/docs/Web/CSS/length#unit%C3%A9s).

En effet, cette unité un peu particulière permet de préciser une longueur à partir de la taille du caractère `0` dans votre police. Cette unité est généralement utilisée pour caractériser des largeur maximales dans vos textes. Notamment, en ergonomie on considère que pour qu'un paragraphe soit lisible il faut qu'il soit entre 50 et 90 caractères. Je prends une fourchette très grande parce que [tout le monde n'est pas d'accord](https://ux.stackexchange.com/questions/108801/what-is-the-best-number-of-paragraph-width-for-readability) et que ça dépend de pleins de facteurs (un mobile ? un desktop ? quel genre de contenu ?). Mais dans l'idée on peut imaginer `max-width: 70ch;`

Or, ce que vous pouvez constater c'est que `0` ou 0 n'ont pas la même largeur. A quelques pixels ou dixième de pixels près, mais cette différence existe. Et en multipliant cette différence par `70`, on se retrouve avec d'assez grosses différences entre la largeur maximale de votre paragraphe selon si c'est la police de fallback (que ce soit <abbr title="Flash Of Unstyled Text">FOUT</abbr> ou <abbr title="Flash Of Inivisible Text">FOIT</abbr>) ou la police définitive qui est affichée.

Ainsi pour éviter au navigateur de recalculer la taille de vos colonnes et de vos textes, évitez d'utiliser l'unité `ch`.

## Récapitulatif

Nous voilà arrivé au bout de cet article dédié au CLS. La notion de Layout Shift est certainement moins évidente que d'autres métriques de performance. Mais avec les bons outils, c'est aussi la plus définitive à corriger. C'est pour cette raison qu'un bon score devrait être < 0.1.

Les outils à disposition sont multiples mais je vous conseille de :

- Commencer par comprendre à quel point est-ce que vos vrais utilisateurices sont impactés par le CLS ? Via des RUM ou a minima via le Chrome UX Report ;
- Analyser le chargement de la page problématique avec WebPageTest pour mieux visualiser l'origine du problèmeproblème ;
- Récupérer quelques pistes génériques grâce à un audit Lighthouse ;
- Utiliser l'onglet Performance des DevTools si WebPageTest et Lighthouse indiquent 0 de CLS mais que vos utilisateurices en ont quand même.

Les quelques bonnes pratiques à garder en tête :

- Toujours référencer la taille d'un élement pour que le navigateur puisse anticiper leur affichage
  - via des attributs `width` et `height`
  - ou en évitant des tailles dynamiques en CSS
- Privilégier des Skeletons pour tout chargement asynchrone de contenu
- Faire attention aux animations afin de n'animer que des [propriétés performantes](/tutoriels/des-animations-performantes-1/) (e.g. `transform` et `opacity`)
- Si vous faites parti des rares à utiliser `ch`, arrêtez 😘 (moi aussi j'en fais toujours le deuil)
  - mais veillez à [bien configurer vos fonts](/tutoriels/optimiser-le-chargement-des-fonts/)

Grâce à ces différentes techniques, nous n'avons plus de CLS sur la [page de démo (dans sa version corrigée)](https://www.julienpradet.fr/examples/webperf/fast-cls.html).

Enfin, si vous cherchez plus d'infos autour du CLS et que vous aimez les formats vidéos, je vous conseille vivement la conf de [Raphaël Goetter](https://vimeo.com/782994958).

En tout cas, j'espère que cet article vous aura été utile et que, grâce à celui-ci, vous allez rendre vos sites plus utilisables. Si vous êtes face à un problème épineux ou simplement que vous avez besoin de renfort sur ces sujets, n'hésitez pas à me [contacter](/developpeur-web-performance/).

En ce qui me concerne, je vais continuer à écrire régulièrement des articles autour de la Web Performance. Il y en a au moins 2 dans les bacs, alors n'hésitez pas à me suivre sur les réseaux sociaux ([Mastodon](https://piaille.fr/@julienpradet), [LinkedIn](https://www.linkedin.com/in/julienpradet/) ou [Twitter](https://twitter.com/JulienPradet)) et à me dire ce que je devrais améliorer pour la suite.

😶‍🌫️
