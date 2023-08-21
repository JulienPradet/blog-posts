Dans les articles précédents, je vous parlais de [pourquoi il est important d'optimiser la performance de ses pages web](/tutoriels/pourquoi-ameliorer-le-lcp/). Notamment, mesurer le Largest Contentful Paint (LCP) est un bon moyen de mesurer à partir de quand vos utilisateurices ont l'impression que votre page est chargée.

Pour améliorer ce LCP, nous avons vu que [bien maîtriser son réseau](/tutoriels/reseau-et-core-web-vitals/) était important. De plus, en commençant à peine à effleurer le sujet des images avec des histoires de [Lazyload et de Preload](/tutoriels/reseau-et-core-web-vitals/#lazyload-preload-des-images), nous avons gagné 20% (!) sur le LCP. Les images sont donc essentielles quand on parle de performance.

Dans cet article, nous allons continuer à améliorer celles-ci en approfondissant la gestion des images et notamment le comportement des balises `<picture>`, `<source>` et `<img>`. A la fin, vous en sortirez avec une méthode pour choisir les bons formats et les bonnes tailles en toute circonstance.

Si vous ressentez le besoin d'avoir plus d'accompagnement dans votre entreprise pour mettre en place ces sujets, n'hésitez pas à me contacter par [mail](mailto:julien.pradet+article-blog@gmail.com). Peut-être pouvons nous [travailler ensemble](/developpeur-web-performance-freelance/) afin de poser les premières briques ?

- [Pourquoi améliorer le LCP de vos pages ?](/tutoriels/pourquoi-ameliorer-le-lcp/)
- [Analyser le comportement réseau pour améliorer FCP et LCP](/tutoriels/reseau-et-core-web-vitals/)
- Optimiser la taille des images : s'en sortir avec picture, source & srcset **(vous êtes ici)**
  - [Rappels sur l'optimisation réseau](#rappels-sur-l-optimisation-reseau)
  - [Utiliser `<picture>` pour télécharger la bonne image en fonction du navigateur](#utiliser-picture-pour-telecharger-la-bonne-image-en-fonction-du-navigateur)
  - [Choisir le bon format d'image](#choisir-le-bon-format-d-image)
  - [Preload une image responsive](#preload-une-image-responsive)
  - [Récapitulatif](#recapitulatif)
- [Optimiser le chargement des fonts](/tutoriels/optimiser-le-chargement-des-fonts/)
- [Optimiser la gestion des icônes](/tutoriels/optimiser-le-chargement-des-icones/)
- [Comment diagnostiquer et corriger du Cumulative Layout Shift (CLS) ?](/tutoriels/comment-detecter-du-cls/)
- Quelles techniques pour diminuer la quantité de JavaScript ? (bientôt)
- Quelles métriques suivre en dehors des Core Web Vitals ? (bientôt)
- Et plus encore 🫶

## Rappels sur l'optimisation réseau

Afin de commencer à rentrer dans le dur du sujet, rappelons déjà les premières optimisations que vous pouvez faire à moindre coût :

1. [les images sont correctement **compressées**](/tutoriels/reseau-et-core-web-vitals/#optimisation-des-fichiers)

Généralement, vos images seront du jpg et/ou du png. Une image bien optimisée peut faire toute la différence en termes de poids de fichier (jusqu'à -80%).

Passez donc vos images dans [Squoosh](https://squoosh.app/) avant de les afficher sur vos pages.

Toutefois, la tentation est grande de sacrifier la qualité des images pour diminuer encore plus son poids. Est-ce que ces kilo octets valent toujours le coup ? [Pour certain·e·s, oui.](https://grouan.fr/2022/03/09/traitements-low-tech-images-audios-videos-passer-a-hugo-2/) [Pour d'autres, non.](https://cloudfour.com/thinks/new-recommendations-for-ecommerce-images/) C'est pour cette raison que Squoosh est un bon outil : il vous permettra de choisir le niveau de qualité pertinent pour vous.

2. [les images qui ne sont pas visibles sont **lazyloadées**](/tutoriels/reseau-et-core-web-vitals/#lazyload)

En ayant beaucoup d'images dans votre site, vous pouvez saturer la bande passante de vos utilisateurices. Pour éviter cela, toutes les images qui ne sont pas directement visibles au chargement de la page (= sans avoir besoin de scroll), doivent être marquées comme `lazy`.

```diff
 <img
     alt="Le plus choupichou des choupichats"
     src="cat.jpg"
     width="150"
     height="150"
+    loading="lazy"
 >
```

Selon votre parc utilisateur, ce n'est peut être [pas encore parfaitement supporté](https://caniuse.com/?search=loading). Mais nous en sommes quand même à 93% du web à date d'écriture de cet article.

3. [**Preloader** et `fetchpriority` pour votre image principale](/tutoriels/reseau-et-core-web-vitals/#fetch-priority)

Dans votre trace réseau, vous aurez peut-être des ressources qui passeront devant votre image principale. Afin d'éviter cela vous pouvez utiliser une balise `<link>` dans votre `<head>` afin d'aider le navigateur à mieux comprendre vos priorités.

```html
<link rel="preload" as="image" type="image/jpeg" href="/images/banner.jpg" fetchpriority="high" />
```

## Utiliser `<picture>` pour télécharger la bonne image en fonction du navigateur

Les optimisations ci-dessus reposent sur le principe qu'une seule image est disponible. Cependant, ce qui fait la beauté du web, c'est qu'il est accessible partout, sous plein de formes différentes : de la montre connectée, en passant par le téléphone, jusqu'à l'écran TV. Chaque écran aura son format, sa résolution, ses contraintes.

Prenons l'exemple de cette image en bas de page sur notre [site d'exemple](/examples/webperf/slow.html) :

<figure tabindex="0">
<img alt="Screenshot qui vient de la page d'exemple qui montre le changement de layout d'un block si on est sur mobile (320px) ou tablette (800px). Le ratio de l'image selon l'appareil change complètement." src="/images/posts/lcp/different-image-sizes.jpg">
<figcaption>Démonstration d'une image qui passe d'un format paysage à portrait selon la taille du navigateur</figcaption>
</figure>

La partie visible de l'image sur mobile est beaucoup plus resserrée en hauteur que sur desktop. Il est donc dommage d'envoyer l'image desktop sur mobile ou inversement. C'est d'autant plus vrai que je n'ai pris que 2 screenshots. Mais si on récupère toutes les tailles, on obtient ce graphique :

<figure tabindex="0">
<img alt="Graphique avec 2 courbes : la largeur et la hauteur de l'image en fonction de la largeur de l'écran" src="/images/posts/lcp/graph-image-sizes.png">
<figcaption>Largeur et hauteur de l'image en fonction de la taille de l'écran</figcaption>
</figure>

> 💡 Manuellement, il est laborieux de récupérer ces courbes. Je vous conseille de passer par ce Snippet que vous pouvez exécuter directement dans la console de votre navigateur.
>
> https://gist.github.com/JulienPradet/abfbff6577ecebd3d1ffe72f6063b1f7
>
> En suivant les instructions de celui-ci, vous pourrez récupérer dans votre presse-papiers la largeur et la hauteur de votre image en fonction de la taille de l'écran. Il ne vous restera plus qu'à coller ça dans une feuille de calcul (Google Sheets/Excel/Libre Calc) pour en générer un graphique.

Dans notre exemple, on se rend compte qu'au minimum l'image fait 256x208 et au maximum 532x208. Pour donner une échelle de comparaison, c'est du simple au double. Si l'image avait grandit verticalement, l'ordre de grandeur aurait été multiplé d'autant.

Avec toutes ces informations, comment on s'en sort pour livrer la bonne image au bon navigateur ?

### Méthode pour choisir les bonnes images

#### 1. Définir les breakpoints

La première étape est de connaître votre breakpoints : quelles sont les tailles d'écran pour lesquelles vous allez choisir de charger une image différente ? Cela va dépendre de vos media queries en CSS et de vos utilisateurices.

Dans le CSS de notre page d'exemple, nous avons :

- 600
- 1000

On les voit bien au niveau du graphe parce que cela correspond aux cassures sur les courbes. Cela dit, dans nos calculs d'images, nous n'allons pas les prendre tels quels, mais leur soustraire un pixel (599 et 999). En effet, c'est à ces valeurs-là que les images sont généralement plus grandes.

Ensuite, vos utilisateurices auront certainement des résolutions différentes. Notamment 375px de largeur est un format encore très répandu aujourd'hui pour les iPhones. Les tablettes sont environ vers 768px. Et sur ordinateur, on a l'habitude du 1920x1080. C'est vrai chez les devs, mais chez beaucoup de gens, les écrans de laptops sont par défaut zoomés à 150%, donc c'est plutôt du 1280x720.

> 💡 Il est difficile d'avoir des ressources fiables à ce sujet. Il est donc vivement conseillé de sortir ces données de vos analytics. Mais à défaut, n'hésitez pas à suivre Andy Bell ([@andy@bell.bz](https://bell.bz/@andy)) qui a fait [une étude récente](https://bell.bz/@andy/110628238964717341) à ce sujet et publiera plus d'informations bientôt.

Pour notre exemple, nous allons donc considérer les tailles suivantes et les récupérer de notre graphe :

- 375
- 599
- 768
- 999
- 1280
- 1920

<figure tabindex="0">
<img alt="Le même graphique que précédemment, mais avec des lignes verticales en pointillé représentant les breakpoints cités précédemment" src="/images/posts/lcp/graph-image-sizes-breakpoints.png">
<figcaption>Tailles de l'image en fonction des différents breakpoints</figcaption>
</figure>

Enfin, avant de passer à la prochaine étape, on constate qu'on peut simplifier le nombre de breakpoints parce que certains partagent des tailles d'images très similaires. C'est le cas par exemple de 1280 & 1920 : les images font toujours 336 x 260.

Par ailleurs, si on regarde entre 375 et 399, l'image grandit assez fortement et a un ratio très différent. Il est sûrement pertinent de couper la poire en deux et dire que la petite image utilisée sur une largeur de 375 le sera aussi pour des écrans légèrement plus grands.

Si on récapitule, nous devons donc générer le tableau suivant :

| Device Width | Media Query                               |
| ------------ | ----------------------------------------- |
| 375          | (max-width: 415px)                        |
| 599          | (min-width: 416px) and (max-width: 599px) |
| 999          | (min-width: 600px) and (max-width: 999px) |
| 1280         | (min-width: 1000px)                       |

**<span aria-hidden="true">·</span> Petit point au sujet des media queries**

Dans le tableau ci-dessus, je vous ai écrit les media queries de manière exhaustive. Dans les faits, le navigateur utilisera toujours la première source compatible. Donc on peut simplifier légèrement l'écriture en ne passant que par des min-width (Mobile First) et en inversant l'ordre du tableau.

| Device Width | Media Query         |
| ------------ | ------------------- |
| 1280         | (min-width: 1000px) |
| 999          | (min-width: 600px)  |
| 599          | (min-width: 416px)  |
| 375          |                     |

La dernière ligne n'a pas de media query parce que ce sera celle utilisée par défaut.

> 💡 **Que faire pour les images plein écran ?**
>
> L'exemple que nous avons pris est pour une image qui a une largeur relativement stable et fixe sur tous les écrans. Si je veux rajouter une bannière tout en haut de mon site, comment faire ?
>
> Il faut suivre exactement la même méthode. La seule réelle différence est que vous ne pouvez pas beaucoup simplifier vos breakpoints (l'image de 1280 ne sera pas du tout la même que l'image de 1920). Il y aura donc plus de lignes dans votre tableau.

#### 2. Définir les tailles d'images pour chaque breakpoints

Maintenant que nous savons quelles tailles d'écran regarder, nous pouvons aller récupérer les tailles d'images :

<table>
<thead>
<tr>
<th style="width: 25%; min-width: 5.5rem">Device Width</th>
<th style="width: 43%">Media Query</th>
<th style="width: 32%">Image Size</th>
</tr>
</thead>
<tbody>
<tr>
<td>1280</td>
<td>(min-width: 1000px)</td>
<td>336 x 240</td>
</tr>
<tr>
<td>999</td>
<td>(min-width: 600px)</td>
<td>240 x 300</td>
</tr>
<tr>
<td>599</td>
<td>(min-width: 416px)</td>
<td>535 x 208</td>
</tr>
<tr>
<td>375</td>
<td></td>
<td>311 x 208</td>
</tr>
</tbody>
</table>

Cela dit, ce n'est pas tout à fait fini. En effet, jusqu'à maintenant on a parlé de pixels. Mais ce ne sont pas de vrais pixels, ce sont des pixels CSS : 1 pixel CSS peut valoir 1, 2 ou 3 pixels physiques selon votre appareil. Par exemple, la plupart des téléphones en ont minimum 2. Les derniers iPhones en ont 3. Vous pouvez utiliser [`window.devicePixelRatio`](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio) pour connaître cette valeur.

C'est important parce que cela veut dire que selon l'écran physique utilisé par l'utilisateurice, une image de la bonne taille (ex : 311 x 208 sur un écran de 375px) pourra paraître flou. Pour qu'elle soit de bonne qualité sur un téléphone qui a un `window.devicePixelRatio` de 2, il faudra plutôt fournir une image de 622 x 416.

Nous allons appliquer les règles suivantes pour avoir la totalité de nos images :

- si width < 1000, mettre à disposition des images 2x
  - inutile de mettre à disposition des images 1x parce que tous les téléphones et tablettes aujourd'hui ont au moins un ratio de 2
  - inutile de mettre un ratio de 3x parce qu'il est illusoire de penser que l'œil humain puisse distinguer ce niveau de détail ([-33% de temps de chargement chez Twitter](https://blog.twitter.com/engineering/en_us/topics/infrastructure/2019/capping-image-fidelity-on-ultra-high-resolution-devices)).
- si width > 1000, mettre à disposition des images 1x ET 2x
  - beaucoup d'écrans de PC sont encore à une densité standard
  - mais les écrans à haute densité existent aussi (par exemple les écrans 4k)

> 💡 A nouveau, n'hésitez pas à adapter ces règles à la population qui visite votre site.

<div style="overflow-x: auto; margin: 2rem 0" id="definition-tailles">
<table style="margin: 0 auto">
<thead>
<tr>
<th style="min-width: 5.5rem">Device Width</th>
<th style="min-width: 10rem">Media Query</th>
<th style="min-width: 7rem">CSS Image Size</th>
<th style="min-width: 5rem">Pixel Ratio</th>
<th style="min-width: 7rem">Physical Image Size</th>
</tr>
</thead>
<tbody>
<tr>
<td rowspan="2">&gt; 1000</td>
<td rowspan="2">(min-width: 1000px)</td>
<td rowspan="2">336 x 240</td>
<td>1x</td>
<td>336 x 240</td>
</tr>
<tr>
<td>2x</td>
<td>672 x 480</td>
</tr>
<tr>
<td>&lt;= 999</td>
<td>(min-width: 600px)</td>
<td>240 x 300</td>
<td>2x</td>
<td>480 x 600</td>
</tr>
<tr>
<td>&lt;= 599</td>
<td>(min-width: 416px)</td>
<td>535 x 208</td>
<td>2x</td>
<td>1070 x 416</td>
</tr>
<tr>
<td>&lt;= 375</td>
<td></td>
<td>311 x 208</td>
<td>2x</td>
<td>622 x 416</td>
</tr>
</tbody>
</table>
</div>

Ca fait beaucoup de travail tout ça. Est-ce qu'il n'y a pas moyen de tricher et d'automatiser tout ça ? Ca dépend.

- Si votre image est critique / visible dès le chargement de la page, alors non, il n'y a pas de solution miracle si vous souhaitez conserver de bonnes performances. Certains outils peuvent vous mâcher le travail (ex: [Daltons](https://cleverage.github.io/daltons/)), mais globalement il vous faudra quand même générer le HTML manuellement et comprendre quelles tailles mettre à disposition dans vos sources.
- Si votre image est non critique, vous pouvez vous reposer sur JavaScript. En effet, en JS vous pouvez récupérer la taille nécessaire de votre image et du coup changer l'URL de votre image à la volée pour utiliser la bonne taille. C'est ce que propose par exemple [TwicPics](https://www.twicpics.com/) (récemment racheté par Frontify). Le seul inconvénient est que cela va potentiellement générer une myriade d'images et donc vous bénéficierez moins des gains liés au cache CDNs. Mais pour des images lazyloadées c'est tout à fait envisageable.

> 💡 **Pourquoi ne peut-on pas utiliser de JavaScript pour les images critiques ?**
>
> Parce que, qui dit JavaScript, dit exécution beaucoup plus tard dans le processus de chargement de votre page. Donc vous perdrez de nombreuses centaines de millisecondes sur votre LCP. Sur les quelques tests que j'ai fait sur un site e-commerce en React, cela représentait une perte de sèche de 40% du LCP.

En tout cas, dans ce guide, on a fait le plus dur : on a réussi à trouver les différentes images à utiliser en fonction du device. Passons au code !

#### 3. Générer les nouvelles images

Pour générer ces différentes tailles d'images, vous avez 2 options :

- soit vous mettez en place une CLI ou votre propre API qui vous permet de générer les différentes tailles d'images ([sharp](https://sharp.pixelplumbing.com/) étant de très loin la meilleure librairie pour faire ça dans l'écosystème Node.js aujourd'hui).
- soit vous passez par un service de redimensionnement d'image comme Cloudinary, imgix, etc. Ces services vous permettent d'uploader une première image en grande taille, puis vous met à dispositions des URLs qui, à l'aide de paramètres, vous permettent de générer des tailles à la demande.
  - Cloudinary : [`/w_500/h_200/`](https://cloudinary.com/documentation/resizing_and_cropping#setting_the_resize_dimensions)
  - Imgix: [`w=500&h=200`](https://docs.imgix.com/apis/rendering/size)
  - TwicPics: [`cover=500x200`](https://www.twicpics.com/docs/reference/transformations#cover)
  - Il existe aussi des services que vous pouvez héberger vous-même : [Pixboost/transformimgs](https://github.com/Pixboost/transformimgs), [serverless-image-handler](https://github.com/aws-solutions/serverless-image-handler)

A noter qu'ici je parle uniquement de redimensionnement, mais il existe dans sharp ou dans les solutions SaaS beaucoup d'options (cover/crop, focal point, manipulation d'image, etc.). N'hésitez pas à fouiller dans celles-ci afin de trouver le process qui vous convient le mieux.

#### 4. Transformer notre `<img>` en `<picture>`

Une fois les images générées passons au HTML. Initialement, il ressemblait à ceci :

<!-- prettier-ignore -->
```html
<img
	alt="Description de l'image"
	src="/images/image.jpg"
	loading="lazy"
/>
```

Pour l'adapter au tableau de la [section 2.](#definition-tailles), nous allons devoir utiliser 2 nouvelles balises : `<source>` et `<picture>`.

- `<source>` définit le type de sources disponibles grâce à ses attributs
  - `media` : indique le format d'écran pour lequel la source est éligible
  - `srcset` : indique quelle image charger en fonction de la densité de l'écran
- `<picture>` indique que plusieurs sources d'images sont disponibles et qu'il peut choisir la première qui est compatible. En plus de la liste de `<source>`, il faut conserver la balise `<img>` en tant qu'enfant de `<picture>`, elle servira de source par défaut pour votre navigateur.

Si on fait le rapprochement avec notre tableau, cela veut dire qu'on va avoir :

- une `<source>` par ligne du tableau, en reprenant la **media query**
- une URL d'image dans srcset par **pixel ratio**
- la balise `<img>` qui correspond à la dernière ligne du tableau

<!-- prettier-ignore -->
```html
<picture>
	<source
		media="(min-width: 1000px)"
		srcset="
			/images/image-336x240.jpg 1x
			/images/image-672x480.jpg 2x
		"
	/>
	<source
		media="(min-width: 600px)"
		srcset="/images/image-480x600.jpg 2x"
	/>
	<source
		media="(min-width: 416px)"
		srcset="/images/image-1070x416.jpg 2x"
	/>
	<img
		alt="Description de l'image"
		src="/images/image-622x416.jpg"
		loading="lazy"
	/>
</picture>
```

Et voilà, on a réussi à fournir la bonne taille au navigateur ! Si vous inspectez votre navigateur, vous verrez qu'à chaque rafraîchissement de page dans des dimensions différentes, c'est la bonne image qui est chargée.

#### 5. FAQ ❓

Si vous vous êtes déjà frotté aux images responsives, aux `srcset` et compagnie, vous trouvez peut-être que je suis allé un peu vite en besogne. N'hésitez pas à déplier les questions ci-dessous pour entrer plus en détails dans certains aspects.

<details>
<summary>Comment se comporte la balise <code>&lt;picture&gt;</code> d'un point de vue CSS ?</summary>

Grossièrement, vous pouvez considérer qu'une `<picture>` se comporte comme un `<span>`. Ca n'affiche rien de particulier dans votre page et se comporte donc plus ou moins de la même façon que si vous avez une balise `<img>` directement.

Cela dit, ce nouveau niveau de balise peut parfois poser des problèmes quand vous utilisez des Flexbox, des Grids ou autres outils de positionnement. Une solution pour cela est de lui assigner [`display: contents`](https://developer.mozilla.org/en-US/docs/Web/CSS/display#contents) ou de lui appliquer les mêmes règles que si vous aviez une `div` (`height: 100%`, `align-self: stretch` ou autre).

</details>

<details>
<summary>Que se passe-t-il si la taille de mon image dépend aussi de la hauteur du navigateur ?</summary>

Dans notre exemple nous avions dans notre code CSS uniquement des media queries en largeur (`min-width`) et pas d'unités basés sur `vh`. Cependant il est possible que vous ayez besoin de charger une image différente si vous tenez à ce que votre image tienne toujours en hauteur dans votre écran (ex : `max-height: 80vh`).

A ce moment là il faudra complexifier votre tableau. Au lieu d'avoir des media queries à une dimension, vous pourrez les combiner : `(min-width: 1000px) and (min-height: 720px)`.

</details>

<details>
<summary>Est-ce possible d'éviter les <code>&lt;source&gt;</code> et de se contenter de <code>srcset</code> et <code>sizes</code> ? On est passé par des descripteurs <code>1x</code> et <code>2x</code> mais ce n'est pas mieux de passer par <code>622w</code> ?</summary>

Réponse courte : non 😁 Si vous passez par ces solutions alternatives, vous vous retrouverez soit avec des images pixellisées, soit avec des images trop lourdes. Je m'explique.

`sizes` est un attribut qu'on peut mettre sur `<img>` (ou sur `<source>`), pour définir quelle taille utiliser en fonction de quelle media query. Si on reprend notre tableau, c'est un peu la combinaison des colonnes **Media Query** et **CSS Image Size**. La différence est qu'il n'y a pas besoin de connaître le type de devices qui visitent notre site parce qu'on se contente de décrire factuellement les différentes tailles d'images pour tous les devices. Cela va ressembler globalement à quelque chose de ce style :

```html
<img
	sizes="
        (min-width: 1000px) 336px,
        (min-width: 600px) 240px,
        95vw
    "
/>
```

En combinaison avec l'attribut srcset, cela permet au navigateur, si on lui donne une liste d'image élligible, de choisir celle qui correspondra le mieux.

```html
<img
	srcset="
		/images/image-336x240.jpg   336w,
		/images/image-480x600.jpg   480w,
		/images/image-622x416.jpg   622w,
		/images/image-672x480.jpg   672w,
		/images/image-1070x416.jpg 1070w
	"
	sizes="
        (min-width: 1000px) 336px,
        (min-width: 600px) 240px,
        95vw
    "
/>
```

Vous pouvez constater que dans le `srcset`, j'ai utilisé le descripteur `w` en fin de ligne. Celui-ci dit au navigateur non pas quelle densité de pixel a le droit d'utiliser cette image, mais combien de pixels physiques sont présents dans l'image.

Charge au navigateur donc de choisir la bonne. Si je suis sur un iPhone de 375px, avec un devicePixelRatio = 3, alors il va comprendre qu'il a besoin d'une image de 375 \* 0.95 (grâce à l'attribute sizes) \* 3 (devicePixelRatio) = 1068w.

La plus proche est `/images/image-1070x416.jpg` donc c'est celle là qu'il choisit.

**Dommage**, nous on lui avait juste besoin de 622x416. Le navigateur aurait pu télécharger 40% moins d'octets pour fournir la même qualité de service à l'utilisateurice.

Plus gênant, il peut arriver des cas où l'image choisie n'aura pas assez de pixels en hauteur. Prenons un exemple très fréquent : une image de bannière (sizes="100vw") qui a la règle CSS `height: 15rem` (= 240px). Pour bien faire je vais donc mettre à disposition mes images en x2 sur mobile et x1 + x2 sur desktop.

<div style="overflow-x: auto; margin: 2rem 0">
<table style="margin: 0 auto">
<thead>
<tr>
<th style="min-width: 5.5rem">Device Width</th>
<th style="min-width: 10rem">Media Query</th>
<th style="min-width: 7rem">CSS Image Size</th>
<th style="min-width: 5rem">Pixel Ratio</th>
<th style="min-width: 7rem">Physical Image Size</th>
</tr>
</thead>
<tbody>
<tr>
<td rowspan="2">1980</td>
<td rowspan="2">(min-width: 1440px)</td>
<td rowspan="2">1980 x 240</td>
<td>1x</td>
<td>1980 x 240</td>
</tr>
<tr>
<td>2x</td>
<td>3960 x 480</td>
</tr>
<tr>
<td rowspan="2">1439</td>
<td rowspan="2">(min-width: 1280px)</td>
<td rowspan="2">1439 x 240</td>
<td>1x</td>
<td>1439 x 240</td>
</tr>
<tr>
<td>2x</td>
<td>2878 x 480</td>
</tr>
<tr>
<td rowspan="2">1279</td>
<td rowspan="2">(min-width: 768px)</td>
<td rowspan="2">1279 x 240</td>
<td>1x</td>
<td>1279 x 240</td>
</tr>
<tr>
<td>2x</td>
<td>2558 x 480</td>
</tr>
<tr>
<td>767</td>
<td>(min-width: 416px)</td>
<td>767 x 240</td>
<td>2x</td>
<td>1534 x 480</td>
</tr>
<tr>
<td>375</td>
<td></td>
<td>375 x 240</td>
<td>2x</td>
<td>750 x 480</td>
</tr>
</tbody>
</table>
</div>

Et donc avec un srcset unique, cela donneraît ceci (j'ai trié les images par taille croissante pour plus de clarté):

```html
<img
	srcset="
		/images/image-750x480.jpeg   750w,
		/images/image-1279x240.jpeg 1279w,
		/images/image-1439x240.jpeg 1439w,
		/images/image-1534x480.jpeg 1534w,
		/images/image-1980x240.jpeg 1980w,
		/images/image-2558x480.jpeg 2558w,
		/images/image-2878x480.jpeg 2878w,
		/images/image-3960x480.jpeg 3960w
	"
	sizes="100vw"
/>
```

Donc avec cette nouvelle image, reprenons mon exemple de tout à l'heure : je suis sur un device de 375px avec une densité 3x. Alors il me faut une image de 1125 pixels physiques. L'image la plus proche est 1279 x 240.

L'utilisateurice se retrouve avec une image qui est maintenant trop grande en largeur, mais trop petite en hauteur. Le ratio est totalement déformé, et l'image devient floue à l'écran.

<figure tabindex="0">
<img alt="Comparaison face à face des deux méthodes de selection des images : sur le premier exemple on voit toute la photo, sur le deuxième l'image est floue, trop zoomée et mal centrée" src="/images/posts/lcp/wrong-image.jpg">
<figcaption>Comparaison de l'affichage de l'image en 750x480 face à l'image 1279x240</figcaption>
</figure>

Ce cas est représentatif de la majorité des images avec lesquelles j'ai pu travailler.

Il reste tout de même un dernier cas : celui pour lequel le ratio de l'image est toujours strictement identique. Ainsi, l'image est toujours correctement affichée, mais il nous reste le problème de la densité de pixel trop élevée.

En effet, les derniers iPhones ont une densité de 3x. Il paraît que c'est censé rendre les affichages plus extraordinaires. En pratique, [ça ne sert à rien si ce n'est consommer plus de bande passante et d'énergie](https://blog.twitter.com/engineering/en_us/topics/infrastructure/2019/capping-image-fidelity-on-ultra-high-resolution-devices). Un jour, peut-être que les [navigateurs le géreront directement](https://twitter.com/yoavweiss/status/1231187496693895170). En attendant, limitons manuellement la taille des images téléchargées par exemple en utilisant la méthode des `<source>` montrée plus haut.

</details>

## Choisir le bon format d'image

Nous avons vu comment choisir la bonne taille pour nos images. Mais il y a un autre levier que nous pouvons utiliser pour améliorer leur performance : le type de fichier (ou format).

Historiquement, les images sur le web étaient réparties sur deux formats :

- **JPEG** : très répandu, il permet de choisir son niveau de qualité. Généralement, on le repère parce qu'il a tendance à créer des petits artefacts qui déforment l'image. On préfère l'utiliser pour toute image qui ne repose pas principalement sur des aplats de couleur.
- **PNG** : la seule option pendant longtemps pour gérer les images transparentes. C'est un format **lossless** : en l'utilisant, la qualité de l'image reste intacte. Au-delà des images transparentes, on prefère aussi l'utiliser dès que les images sont constituées d'applats de couleur, avec peu de dégradés. Dans ces conditions, il performe mieux que le JPEG.

Cependant, en allant chercher toujours plus d'optimisations des gens vachement intelligent·e·s ont fait apparaître d'autres formats :

- **WEBP** : plus petit de ~30% que JPEG et PNG, il est capable de gérer la transparence. De nos jours, ça peut être le nouveau format par défaut, [à quelques exceptions près](https://caniuse.com/webp) (~95% des devices).
- **AVIF** : plus petit de ~30% que WEBP, il gère lui aussi la transparence. Il n'est toutefois [pas supporté partout](https://caniuse.com/avif) avec un support inexistant sur Edge et très récent seulement sur Safari (~82% des devices).
- **JPEG XL** : niveau de performance similaire à **AVIF**. Il semble être meilleur sur des compressions lossless ([source : JPEG XL vs AVIF: A Comparison](https://tonisagrista.com/blog/2023/jpegxl-vs-avif/)). Cependant, l'intérêt majeur est vis a vis de son décodage progressif qui [change drastiquement la performance ressentie](https://www.youtube.com/watch?v=UphN1_7nP8U&t=13s&ab_channel=JonSneyers). Ce format est aujourd'hui [uniquement supporté](https://caniuse.com/jpegxl) par la toute dernière version de Safari et bientôt sur Firefox. Il est donc trop tôt mais ça s'annonce très prometteur.

Enfin, je n'en parle pas ici, mais si vous avez des images vectorielles (généralement pour des logo, des icons ou des schema) vous pouvez directement utiliser du **SVG**.

Cela fait donc tout un tas de format à avoir en tête. Mais le niveau de support des navigateurs est très fragmenté. Comment faire pour gérer tous les cas ?

### Se reposer sur la détection automatique

Pour générer des images de différentes tailles, je vous parlais tout à l'heure de services en ligne qui vous permettent de redimensionner votre image directement via des paramètres au niveau de l'URL. Ces mêmes services proposent généralement une option pour transformer votre image dans le format le plus optimisé. En effet, lorsque votre navigateur essaye de télécharger une image, il va faire une requête avec un Header `Accept` qui définit quels formats sont supportés :

```
Accept: image/avif,image/webp,image/apng,image/svg+xml,image/_,_/\*;q=0.8
```

Ainsi, à partir de ce header, le serveur qui reçoit la requête sait qu'il peut renvoyer du AVIF (`image/avif`) et du WEBP (`image/webp`) mais pas de JPEG XL par exemple. Pour activer cette option, vous pouvez utiliser les paramètres suivants :

- Cloudinary : [`f_auto`](https://cloudinary.com/blog/image_formats_getting_it_right#automatic_format_selection)
- imgix: [`auto=format`](https://docs.imgix.com/apis/rendering/auto/auto#format)
- TwicPics: [`output=auto`](https://www.twicpics.com/docs/reference/transformations#output)

> 💡 Vous avez peut-être entendu parler du fait que le format AVIF est plus lent à générer que les autres formats. C'était vrai au début, mais il paraît que [ce n'est plus le cas](https://web.dev/avif-updates-2023/#avif-encode-speed). Pour cette raison, nombres des services sus-cités ne proposent pas par défaut de l'AVIF. N'hésitez donc pas à vous référer à leur documentation pour voir comment ils gèrent la situation.

Toutefois, vous n'avez pas forcément accès à ces outils. Comment faire alors pour le gérer directement avec du HTML ?

### Utiliser l'attribut `type` sur vos `<source>`

Tout à l'heure quand nous avions construit le HTML pour mettre à disposition les différentes tailles d'images, je vous avais dit que `<source>` avait les attributs `media` et `srcset`. Il va en accepter un troisième : `type="image/xxx"`.

En ajoutant ce nouvel attribut, vous indiquez au navigateur qu'il ne doit prendre en compte cette source que s'il supporte le format indiqué. Ainsi, si vous voulez supporter à la fois du jpeg ET du webp, vous allez devoir dupliquer vos sources.

Attention, l'ordre reste important : c'est la première source qui est compatible avec le navigateur qui sera choisie. Les sources de type `image/webp` doivent donc apparaître **avant** les sources de type `image/jpeg`.

```diff
 <picture>
+	<source
+       type="image/webp"
+		media="(min-width: 1000px)"
+		srcset="
+			/images/image-336x240.webp 1x
+			/images/image-672x480.webp 2x
+		"
+	/>
	<source
+       type="image/jpeg"
		media="(min-width: 1000px)"
		srcset="
			/images/image-336x240.jpg 1x
			/images/image-672x480.jpg 2x
		"
	/>
+	<source
+       type="image/webp"
+		media="(min-width: 600px)"
+		srcset="/images/image-480x600.webp 2x"
+	/>
	<source
+       type="image/jpeg"
		media="(min-width: 600px)"
		srcset="/images/image-480x600.jpg 2x"
	/>
+	<source
+       type="image/webp"
+		media="(min-width: 416px)"
+		srcset="/images/image-1070x416.webp 2x"
+	/>
	<source
+       type="image/jpeg"
		media="(min-width: 416px)"
		srcset="/images/image-1070x416.jpg 2x"
	/>
+	<source
+       type="image/webp"
+		srcset="/images/image-622x416.webp"
+	/>
	<img
		alt="Description de l'image"
		src="/images/image-622x416.jpg"
		loading="lazy"
	/>
 </picture>
```

Comme vous pouvez le voir, cela devient vite très verbeux. Essayez donc au maximum de vous reposer sur la détection automatique. C'est d'autant plus vrai que pour supporter un maximum de navigateurs, il faudrait 4 formats : JPEG, WEBP, AVIF & JPEG XL. Vous vous retrouveriez donc avec 16 balises `<source>` différentes.

## Preload une image responsive

Nous sommes maintenant capables de fournir au navigateur une image de la bonne taille et du bon format en toute circonstance. Il nous reste un dernier point à voir ensemble avant de nous quitter : comment est-ce que ces nouveaux outils impactent le preload des images ?

En effet, nous avions vu dans l'article précédent que [preloader les images critiques](/tutoriels/reseau-et-core-web-vitals/#fetch-priority) pouvait avoir un impact sur le LCP. Pour cela, nous avions dû ajouter une balise `<link>` dans le `<head>` :

<!-- prettier-ignore -->
```html
<link
	rel="preload"
	as="image"
	type="image/jpeg"
	href="/images/banner.jpg"
	fetchpriority="high"
/>
```

Mais comme vous pouvez le voir, cela ne prend en compte qu'une seule URL d'image. Si vous voulez preload la bonne image en fonction de l'appareil utilisé, vous allez devoir multiplier vos balises `<link>` pour qu'elles ressemblent aux balises `<source>` de votre image. Cela peut se faire notamment en transformat les attributs:

- `srcset` devient `imagesrcset`
- `sizes` devient `imagesizes`
- `type` reste `type` (facultatif si vous vous reposez sur de la détection automatique)

<!-- prettier-ignore -->
```html
<link
    rel="preload"
    as="image"
    media="(min-width: 1000px)"
    imagesrcset="
        /images/image-336x240.jpg 1x
        /images/image-672x480.jpg 2x
    "
/>
<link
    rel="preload"
    as="image"
    media="(min-width: 600px)"
    imagesrcset="/images/image-480x600.jpg 2x"
/>
<link
    rel="preload"
    as="image"
    media="(min-width: 416px)"
    imagesrcset="/images/image-1070x416.jpg 2x"
/>
<link
    rel="preload"
    as="image"
    href="/images/image-622x416.jpg"
/>
```

Cependant, simplement renommer les attributs n'est pas suffisant. En effet, si vous mettez ça dans votre page et que vous chargez la page sur desktop, vous constaterez que 4 images seront preloadées au lieu d'une seule. Cela vient du fait que les balises `<link>` ne sont pas rassemblées sous une balise `<picture>`. Le navigateur ne sait donc pas qu'il en a besoin d'une seule et va toutes les télécharger.

Il vous faut donc transformer les `media` afin qu'elles contiennent un `min-width` ET un `max-width`.

<!-- prettier-ignore -->
```diff
 <link
    rel="preload"
    as="image"
    media="(min-width: 1000px)"
    imagesrcset="
        /images/image-336x240.jpg 1x
        /images/image-672x480.jpg 2x
    "
 />
 <link
    rel="preload"
    as="image"
-    media="(min-width: 600px)"
+    media="(min-width: 600px) and (max-width: 999px)"
    imagesrcset="/images/image-480x600.jpg 2x"
 />
 <link
    rel="preload"
    as="image"
-    media="(min-width: 416px)"
+    media="(min-width: 416px) and (max-width: 599px)"
    imagesrcset="/images/image-1070x416.jpg 2x"
 />
 <link
    rel="preload"
    as="image"
+    media="(max-width: 415px)"
    href="/images/image-622x416.jpg"
 />
```

Cette fois-ci c'est la bonne : le navigateur va être capable de n'en charger qu'une seule.

#### Définir les attributs `width` et `height` pour régler le problèmes de Layout Shifts

Avant de nous quitter, il y a un dernier élément que j'aimerais que vous ayez en tête quand vous définissez vos images. Pour cela, observons la différence entre les deux chargements suivants :

<figure>
<video controls src="/images/posts/lcp/compare-cls.mp4"></video>
</figure>

Petit indice, c'est particulièrement visible à 3.3s de chargement.

En effet, sur le chargement de gauche, on voit pendant un court instant le bandeau noir de fin de page. Puis, dans les instants qui suivent, le contenu bouge un peu dans tous les sens au fur et à mesure que les images arrivent. C'est ce qu'on appel du Layout Shift : un élément s'est déplacé sans action de la part de l'utilisateurice.

C'est un problème parce que si une personne commence à lire le bandeau noir _puis_ que les images commencent à arriver, décalant ainsi le contenu, alors elle va perdre le fil de sa lecture. Il va falloir scroller &ndash; parfois très loin &ndash; jusqu'à retrouver le contenu qui l'intéressait. Pire, si jamais la personne cherche à cliquer quelque part, et que juste avant de cliquer le contenu se décale, elle pourra faire la mauvaise action, menant à [beaucoup de frustration](https://codepen.io/cameronws/pen/WNEZebz).

Cela fait partie des indicateurs de performance qui sont observés par les Core Web Vitals : le [CLS (Cumulative Layout Shift)](https://web.dev/cls/) et peut impacter votre SEO en plus de déteriorer l'expérience de vos utilisateurices.

Le moyen le plus simple et souvent suffisant est d'ajouter les attributs `width` et `height` sur vos images. Il s'agit de la valeur en CSS Pixels.

<!-- prettier-ignore -->
```diff
 <picture>
 	<source
 		media="(min-width: 1000px)"
 		srcset="
 			/images/image-336x240.jpg 1x
 			/images/image-672x480.jpg 2x
 		"
 	/>
 	<source
 		media="(min-width: 600px)"
 		srcset="/images/image-480x600.jpg 2x"
 	/>
 	<source
 		media="(min-width: 416px)"
 		srcset="/images/image-1070x416.jpg 2x"
 	/>
 	<img
 		alt="Description de l'image"
 		src="/images/image-622x416.jpg"
 		loading="lazy"
+		width="311"
+		height="208"
 	/>
 </picture>
```

En ajoutant ces attributs, le navigateur va être en mesure de comprendre l'`aspect-ratio` de vos images et donc réserver suffisamment de place pour éviter les sauts de contenus. C'est le seul changement que j'ai mis en place sur la partie droite de la vidéo. Un petit changement comparé au bénéfice que ça apporte à l'utilisateurice. Donc un bon réflexe à prendre.

## Récapitulatif

Maintenant que nous avons vu la théorie, qu'est-ce que ça donne en pratique ? Est-ce que mettre en place tout ça améliore réellement les performances de nos pages ? Vous vous en doutez, si j'en vous parle, c'est que la réponse est oui. Mais concrètement, j'ai mis cela en place sur toutes les images de la [page d'exemple](/examples/webperf/fast.html). Et grâce à cela, on passe de 2.4s de LCP à 1.8s, soit -25% ! 🎉

<figure tabindex="0">
<img alt="Filmstrip provenant de WebPageTest.org avant le changement des images : l'image du bandeau finit de charger à 2.4s" src="/images/posts/lcp/before-image-srcset.jpg">
<figcaption>Screenshot de la vue Filmstrip dans WebPageTest.org : LCP à 2.4s</figcaption>
</figure>

<figure tabindex="0">
<img alt="Filmstrip provenant de WebPageTest.org après le changement des images : cette fois-ci l'image du bandeau fini de se charger à 1.8s" src="/images/posts/lcp/after-image-srcset.jpg">
<figcaption>Même screenshot après avoir appliqué les srcset et les bons formats d'image : LCP à 1.8s</figcaption>
</figure>

C'est donc réellement quelque chose qui peut drastiquement changer la performance ressentie de vos pages.

Afin que vous puissiez bénéficier des mêmes gains sur votre site, et parce qu'il est difficile de garder en tête la totalité des bonnes pratiques, voici une checklist pour rester rigoureux·se et qui pourra vous servir de pense-bête :

- [ ] Vérifiez que vos images sont correctement compressées (gzip ou brotli)
- [ ] Faites une première implémentation avec une balise `<img>` normale
- [ ] Récupérez les stats des différentes tailles selon la dimension de votre page via ce [Snippet](https://gist.github.com/JulienPradet/abfbff6577ecebd3d1ffe72f6063b1f7)
- [ ] Déduisez-en les différents breakpoints à utiliser
- [ ] Pour chaque breakpoints, générez l'image à la bonne taille (1x et 2x si nécessaire) et au bon format (WEBP ? AVIF ? Autre ?)
- [ ] Associez breakpoints et images grâce aux balises `<picture>` et `<source>` dans votre HTML
- [ ] Lazyloadez les images qui ne sont pas visibles au chargement de la page
- [ ] Vérifiez que vos images principales ne dépendent pas de JavaScript
- [ ] Preloadez l'image principale de votre page et définissez la `fetchpriority`
- [ ] Définissez les attributs `width` & `height` sur la balise `<img>` pour éviter des problèmes de [Layout Shift](https://web.dev/cls/) (article à ce sujet à venir 👀)
- [ ] Mesurez la performance de vos images à l'aide de [Lighthouse](https://pagespeed.web.dev/) ou [WebPageTest](https://www.webpagetest.org/) afin de vérifier que tout est bon
- [ ] Partagez moi vos gains sur [Mastodon](https://piaille.fr/@julienpradet) ou [Twitter](https://twitter.com/JulienPradet) pour célébrer la victoire 🎉

Si vous avez toujours soif de Web Performance, sachez que je publie en ce moment un article par semaine à ce sujet. N'hésitez donc pas à me suivre sur les réseaux sociaux et à partager cet article, cela contribuera à me motiver à tenir le rythme 😁

Pour rappel, je suis aussi [disponible en freelance](/developpeur-web-performance-freelance/) et peut travailler avec vous sur vos travaux en rapport avec la web performance. Que vous ayez des lenteurs déjà identifiées ou que vous ayez besoin de savoir si oui ou non la performance est un enjeux pour votre entreprise, je peux vous aider.

Dans tous les cas, la semaine prochaine nous parlerons optimisation des fonts, stay tuned !
