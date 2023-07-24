Dans l'article précédent, [je vous parlais du LCP (Largest Contentful Paint)](/tutoriels/pourquoi-ameliorer-le-lcp/) en expliquant ce que c'est et pourquoi il est important pour vos utilisateurs et votre entreprise.

Voici maintenant le premier article qui présente comment l'améliorer dans vos pages. Spoiler alert : dans celui-ci je parle de réseau. Si vous êtes dev front-end, cela vous fait peut-être un petit peu peur. Votre métier, comme le mien, est de faire en sorte que le bouton soit de la bonne couleur et qu'il affiche la bonne chose quand on clique dessus. Ce n'est pas de configurer le nom de domaine, la connexion au serveur, etc. Cependant, je peux vous assurer que vous êtes la personne la mieux placée pour pointer du doigt les problèmes de web performance : vous connaissez la multitude d'assets nécessaires à afficher votre page (CSS, JS, images, etc.). Ces choses là font encore plus peur aux devs back-end.

Pas de panique, on va y aller petit à petit et à la fin de cet article vous aurez une jolie liste de course à proposer à votre équipe. Si malgré tout vous aimeriez creuser plus loin dans votre entreprise, n'hésitez pas à me contacter par [mail](mailto:julien.pradet+article-blog@gmail.com). Peut-être pouvons nous travailler ensemble pour améliorer la performance de vos pages ?

- [Pourquoi améliorer le LCP de vos pages ?](/tutoriels/pourquoi-ameliorer-le-lcp/)
- Analyser le comportement réseau pour améliorer FCP et LCP **(vous êtes ici)**
  - [Comment lire une cascade réseau](#recuperer-et-lire-la-cascade-waterfall-reseau)
  - [Utiliser un seul nom de domaine](#utiliser-un-seul-nom-de-domaine)
  - [Eviter les effets de cascade](#eviter-les-effets-de-cascades)
  - [Lazyload & Preload des images](#lazyload-preload-des-images)
  - [Différer le JavaScript & CSS](#differer-le-javascript-et-le-css)
  - [Fetch Priority](#fetch-priority)
- [Optimiser les images sur le web : checklist des bonnes pratiques](/tutoriels/optimiser-le-chargement-des-images/)
- Optimiser le chargement des fonts (bientôt)
- Optimiser la gestion des icônes (bientôt)
- Quelles techniques pour diminuer la quantité de JavaScript ? (bientôt)
- Quelles métriques suivre en dehors des Core Web Vitals ? (bientôt)
- Et plus encore 🫶

Tout au long de ces articles, nous utiliseront [cette page d'exemple](/examples/webperf/slow.html). Celle-ci a été volontairement altérée pour mettre en évidence certaines erreurs communes. N'hésitez pas à y mener vos propres analyses avant de plonger dans les articles. Peut-être trouverez vous d'autres pistes intéressantes à [partager](https://github.com/JulienPradet/blog-posts/issues).

<figure tabindex="0">
<img loading="lazy" alt="Un site très classique avec une grand bannière en fond intitulée 'A la recherche des lenteurs perdues'. La suite du site ressemble à une liste de lien vers des articles imagés." src="/images/posts/lcp/example.jpg">
<figcaption>Screenshot de la <a href="/examples/webperf/slow.html">page d'exemple</a></figcaption>
</figure>

## Récupérer et lire la cascade (waterfall) réseau

Avant de commencer à regarder le code pour trouver des pistes d'amélioration, il faut déjà faire un état des lieux pour comprendre ce qui prend réellement du temps au chargement de vos pages. C'est d'autant plus vrai que beaucoup des bonnes pratiques évoluent au fur et à mesure du temps (arrivée d'HTTP2, optimisation dans les navigateurs, etc.).

Pour obtenir cette trace réseau, l'outil plus complet et celui très répandu dans la communauté WebPerf est [WebPageTest](https://www.webpagetest.org/). Il offre notamment plusieurs avantages :

- est gratuit (en dessous d'un certain nombre d'utilisation) et donc un excellent moyen de commencer
- récapitule quelques métriques clés (dont le LCP)
- simule le réseau, le device et le pays
- la répartition réseau est lisible au premier coup d'oeil (ça nous sera utile dans ce tutoriel)

Pour récupérer la cascade, [lancez un test](https://www.webpagetest.org/) de type "Site Performance" sur l'URL, le device et la localisation souhaités. Une fois le test effectué, vous trouverez dans la section "Individual Runs" une colonne "Waterfall". En cliquant sur l'image associée, vous y trouverez le graphique suivant&nbsp;:

<figure tabindex="0">
<img loading="lazy" alt="Visualisation de la trace réseau d'un site web. On aperçoit notamment plusieurs fichiers téléchargés, chacuns avec une couleur différente en fonction de leur type (HTML, CSS, Image, etc.)" src="/images/posts/lcp/waterfall.png">
<figcaption>Screenshot d'une waterfall de WebPageTest</figcaption>
</figure>

> 💡 Pensez à toujours lancer des traces mobiles (!) ET desktop. En effet les contraintes sont très différentes selon les devices. Un mobile par exemple va souvent être moins performant et n'aura pas beaucoup de place à l'écran. C'est souvent le point critique et certainement là où vous aurez la plus grande concentration d'utilisateurs (en 2023, [on estime à 65% la part de traffic mobile](https://www.similarweb.com/fr/platforms/)). Le desktop a généralement plus de ressources et de connectivité, mais on y affiche souvent plus de choses et le LCP peut être différent.

Ce qui va nous intéresser pour améliorer le LCP, c'est notamment de faire des optimisations qui déplaceront la barre verte en pointillés (~ 4.4s) vers la gauche. En tout il nous faut gagner 2 secondes (!) pour être dans les clous des [recommendations](/tutoriels/pourquoi-ameliorer-le-lcp/#seo).

Pour chaque requête, nous avons une ligne qui permet de comprendre comment a été réparti le temps réseau :

<figure tabindex="0">
<img loading="lazy" src="/images/posts/lcp/single-request.png" alt="Une ligne représentant le temps passé à télécharger une image."/>
</figure>

Pour comprendre comment la lire il faut se référer à la légende juste au dessus du graphe :

<figure tabindex="0">
<img loading="lazy" src="/images/posts/lcp/network-legend.png" alt="Association de chaque couleur et épaisseur à un type de données."/>
</figure>

Ce qu'il faut retenir c'est que :

- si la ligne est fine, il s'agit de la résolution réseau (= le téléchargement n'a pas commencé) :
  - le navigateur a fait une demande de connexion et doit s'assurer que la ligne est sécurisée (dns, connect, ssl)
  - ou bien il est occupé à autre chose et donc ne démarre pas la requête (wait)
- si la ligne est épaisse, la ressource est prête à être téléchargée :
  - la partie claire correspond à une attente (le serveur n'a pas encore envoyé de données au navigateur)
  - la partie foncée correspond à la réception de la donnée

Le but va donc être de repérer les parties qui prennent le plus de temps et les optimiser. C'est ce que nous allons essayer de faire dans chacune des parties suivantes.

## Utiliser un seul nom de domaine

Quand on regarde la cascade, ce qu'on peut constater c'est qu'on passe beaucoup de temps à attendre.

En particulier, regardons la troisième ligne : le téléchargement de `style.css`. Le navigateur a eu besoin de 1008ms pour télécharger le fichier. Pourtant, la partie épaisse, elle, n'a duré que 253ms. On perd 75% de notre temps à faire une connexion au serveur.

Cela vient du fait que le fichier `style.css` est sur le nom de domaine `https://assets.julienpradet.fr/` alors que nous sommes en train d'afficher une page sur `https://www.julienpradet.fr/`. Ainsi, virtuellement, le simple fait de déplacer notre ficher sur le bon nom de domaine peut nous faire économiser 750ms.

> ℹ️ Si vous êtes vous aussi dans cette configuration, il y a de grandes chances que ce soit parce que vous utilisez un <abbr title="Content Delivery Network">CDN</abbr>. Le but d'un CDN est généralement de mettre en cache et d'accélérer le téléchargement de certaines ressources. C'est assez pratique à mettre en place et représente un réel gain. Cependant par défaut c'est souvent configuré sur un nom de domaine propre au CDN que vous avez choisi (Cloudfront, Cloudflare, etc.). Si c'est le cas, contactez la personne en charge de l'infrastructure pour que vous ayez une route sur votre propre nom de domaine qui redirige vers le CDN (ex: toutes les URLs `www.julienpradet.fr/assets` font en fait proxy vers `cdn.example.com`).

Changeons donc cela : migrons tous les `assets.julienpradet.fr` vers `www.julienpradet.fr`. Attention cependant, pour que le gain soit effective, l'objectif est de le faire sur le plus de domaines possibles. Idéalement, vous ne devriez jamais voir d'étapes `dns` (turquoise), `connect` (orange), `ssl` (fuchsia) autre que pour la toute première requête tant que votre LCP n'est pas atteint. Dans cet exemple, nous migrerons donc aussi `images.julienpradet.fr`.

<figure tabindex="0">
<img loading="lazy" alt="Visualisation de la trace réseau du site web d'exemple après avoir migré les noms de domaines." src="/images/posts/lcp/single-domain.png">
<figcaption>Cascade réseau après avoir migré les sous domaines assets et images</figcaption>
</figure>

Après avoir effectué le changement, on se retrouve avec un LCP non plus à 4.4s mais à 3.6s. On vient donc d'économiser 0.8s juste avec cette optimisation ! Attention toutefois, n'imaginez pas que du jour au lendemain vous gagnerez 800ms de chargement sur votre site en prod. Nous sommes dans un environnement synthetic qui est pessimiste quant à la connexion du navigateur (4G avec beaucoup de latence). Cela dit, sur un site en prod, j'ai pu constater une amélioration de 10% sur le 75ème percentile de nos <abbr title="Real User Monitoring">RUM</abbr> sur des sites avec des dizaines de milliers de sessions par jour.

Par ailleurs, c'est une amélioration qui n'aura pas seulement un effet sur le LCP, mais aussi sur le FCP (First Contentful Paint). Cela veut dire que l'utilisateur verra la page plus tôt et aura un fort impact sur la performance ressentie du site.

## Eviter les effets de cascades

Si on continue d'inspecter notre trace réseau, vous pouvez constater que je n'ai pas totalement enlevé les domaines. Il me reste notamment 2 requêtes en rapport avec les polices :

- https://fonts.googleapis.com/css2?family=Ovo&display=fallback
- https://fonts.gstatic.com/s/ovo/v17/yYLl0h7WyfzTzI443XaFxQ.woff2

Sur elles aussi, nous allons devoir passer sur un seul domaine pour faire gagner ~900ms. Ce n'est d'ailleurs pas qu'une question de performance. C'est très largement préconisé aussi pour des questions de disponibilité (vous ne voulez pas que votre site rame parce que Google est down) ou des questions [RGPD](https://business.trustedshops.fr/blog/google-fonts-conforme-au-rgpd#prudent).

> ℹ️ A une époque, les fonts pouvaient être mises en cache à travers différents sites. Par exemple si je vais sur `example.com` qui charge la font Roboto et j'utilise exactement la même URL pour charger la Roboto sur `www.julienpradet.fr`, on pourrait imaginer que le navigateur connaît déjà le fichier et donc n'a pas besoin de le retélécharger sur `www.julienpradet.fr`. Pour des questions de sécurité, [ce n'est plus vrai](https://twitter.com/PixelAmbacht/status/1494272370076536840). Donc c'est toujours une meilleure idée en terme de performance de les mettre sur son propre domaine.

Nous allons donc récupérer le premier fichier et l'incorporer à nos styles CSS déjà existants.

Cependant, ce sur quoi je veux mettre l'accent avant de faire ce changement, c'est la cascade de requêtes.

<figure tabindex="0">
<img loading="lazy" alt="Visualisation des 2 requêtes associées au téléchargement de la font" src="/images/posts/lcp/fonts-waterfall.png">
<figcaption>Cascade réseau avec une vue centrée sur les fonts</figcaption>
</figure>

En effet, on peut constater que la police (`.woff2`) ne commence à être téléchargée qu'une fois que le premier fichier de CSS a fini d'être téléchargé. C'est ce qu'on appelle un effet de cascade. C'est dommage parce qu'on pourrait potentiellement télécharger la font dès le début pour la télécharger _en même temps_ que le CSS associé.

La manière de faire cela est en utilisant du preload : dans l'entête de la page, on prévient le navigateur qu'on va avoir besoin de télécharger la font dès que possible, avant même qu'il sache comment ce fichier va être utilisé.

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

Attention les attributs `as`, `type` et `crossorigin` sont importants. Ils permettent respectivement de :

- dire au navigateur comment le fichier sera utilisé (en tant que font) afin qu'il puisse le préparer
- renseigner le format de la font pour que le navigateur ne la télécharge _que_ s'il est capable de l'afficher
- règler des questions de sécurité sans quoi le preload serait ignoré et vous auriez un message dans la console de votre navigateur

<figure tabindex="0">
<img loading="lazy" alt="Visualisation de la trace réseau après avoir migré les fonts" src="/images/posts/lcp/after-fonts.png">
<figcaption>Cascade réseau après avoir migré et preload les fonts</figcaption>
</figure>

Avec ce changement on a donc bien enlevé le temps DNS associé aux fonts, mais on n'a malheureusement pas amélioré le LCP. On est toujours à 3.6s. Est-ce qu'on revert ?

Pour les raisons évoquées plus haut (résilience, RGPD), non. Mais de manière plus concrète, l'amélioration de performance va se voir ailleurs que sur le LCP. En effet, grâce à ce changement la font a maintenant le temps de se charger suffisamment tôt pour éviter d'afficher une font de fallback à l'utilisateur (et donc un Layout Shift ([CLS](https://web.dev/cls/))). On est donc gagnant.

C'est d'autant plus vrai que toutes les pages n'auront pas forcément une image en tant qu'élément de LCP. Ca peut tout à fait être un titre s'il n'y a aucune image visible (c'est le cas sur ce blog). Et à ce moment là, on aura bel et bien une amélioration du LCP.

> ⛏️ Pour aller plus loin sur l'optimisation des fonts, je vous invite à lire cet article en anglais par Zach Leatherman : [A Comprehensive Guide to Font Loading Strategies](https://www.zachleat.com/web/comprehensive-webfonts/)

### Est-ce la seule cascade sur le site ?

Nous avons étudié de près la font, mais <abbr title="qu'en est-il">quid</abbr> des autres ressources ? A-t-on d'autres cascades sur le site ?

Sans connaître réellement le fonctionnement du site, ça peut être difficile de le voir juste avec le graphe. Cependant, si on regarde le LCP, il a lieu juste après le chargement de l'image qui termine par `...ohOuk-unsplash.jpg`. En ouvrant cette image, on constate que c'est celle de la bannière. Alors même que ça devrait être la première à charger, elle se retrouve téléchargée en dernier. Pourquoi ?

Pour cela, dans le graphe de WebPageTest, vous pouvez cliquer sur la ligne qui concerne l'image et vous verrez les lignes suivantes :

> **URL:** https://www.julienpradet.fr/images/posts/lcp/artem-kniaz-uQ-SQ-ohOuk-unsplash.jpg  
> **Loaded By:** https://www.julienpradet.fr/examples/webperf/style-fast.css

Tout comme le `.woff2` était téléchargé par la feuille de style CSS, on a ici l'image de bannière qui est téléchargée via `style-fast.css` via `background: url('...ohOuk-unsplash.jpg')`. Le navigateur ne sait donc qu'il doit télécharger l'image qu'une fois qu'il a fini de télécharger le CSS `style-fast.css` et qu'il l'a appliqué au HTML de notre page.

Pour l'aider un petit peu nous pourrions donc faire comme pour la font : ajouter une balise preload qui forcera le navigateur à commencer à télécharger l'image plus tôt.

Cependant une bonne pratique plus saine à avoir en tête est de faire en sorte de **ne jamais utiliser des background-image** dans votre CSS sauf pour des textures ou des images non critiques. Cela sera une bonne pratique d'un point de vue accessibilité et cela évitera des oublis de cascade.

<figure tabindex="0">
<img loading="lazy" alt="Visualisation de la trace réseau après avoir changé le background-image en une balise img." src="/images/posts/lcp/after-background-image.png">
<figcaption>Cascade réseau après avoir changé le background CSS</figcaption>
</figure>

Nous voilà donc rendu à un LCP à ~3.0s. On s'approche !

Nous commençons à avoir une jolie trace parce qu'on peut constater qu'il n'y a plus beaucoup de requêtes qui s'executent longtemps après l'arrivée du HTML. Ca veut dire que le navigateur téléchargera a priori le plus tôt possible ce dont il a besoin pour afficher la page et donc avoir un bon LCP.

> 💡 Parfois votre cascade ressemblera plutôt à ça :
>
> <figure tabindex="0">
> <img alt="Visualisation de la trace réseau après lorsque le site est chargé en HTTP1" src="/images/posts/lcp/http1.png">
>
> <figcaption>Cascade réseau avec beaucoup de <code>wait</code> avant le téléchargement des dernières images</figcaption>
> </figure>
>
> La différence par rapport à une cascade classique est que vous voyez que la ressource commence tôt (ligne fine), mais que son téléchargement, lui, commence tard. Il faudra donc trouver la raison pour laquelle le navigateur attend. Dans le cas présent, c'est parce que le site est chargé en HTTP1. Aujourd'hui tous les navigateurs supportent le HTTP2, donc si vous l'observez sur votre site, contactez la personne en charge de l'infrastructure pour activer le HTTP2 voire HTTP3 sur votre serveur.

## Lazyload & Preload des images

Continuons à explorer d'autres opportunités d'amélioration sur notre site. Quand nous avons retiré l'effet de cascade sur l'image de la bannière, nous avons pu constater que le LCP s'affichait d'autant plus tôt. Nous devons donc trouver une méthode pour que l'image se termine encore plus tôt.

<figure tabindex="0">
<img loading="lazy" alt="Visualisation de la trace réseau en se concentrant uniquement sur le téléchargement des images." src="/images/posts/lcp/network-capped.png">
<figcaption>Cascade réseau après avoir changé le background CSS</figcaption>
</figure>

On peut constater sur cette trace que la partie violet foncé (= le navigateur est en train de télécharger les ko nécessaires à l'affichage de l'image) est hachurée. On peut aussi constater que sur le graphe de la bandwidth, pendant un long moment le réseau est saturé.

Cela s'explique par le fait que de nombreuses ressources essayent d'être téléchargées et sont en concurrence les unes les autres. Le navigateur ne sait pas laquelle prioriser et donc va télécharger toutes les images en même temps. Ca ne nous arrange pas parce qu'au moment où l'utilisateurice arrive sur le site, notamment sur mobile, la seule image qu'il voit c'est la bannière principale.

La solution va donc être d'indiquer au navigateur comment prioriser le chargement des images.

### Lazyload

Nous pouvons commencer par lazyloader les images qui ne sont pas critiques.

Cela correspond à prévenir le navigateur que certaines images ne sont pas importantes pour le premier affichage de la page et qu'il est libre de les télécharger plus tard, quand ça lui semble pertinent.

> ⚠️ Attention cependant, choisir quelles images sont lazy et quelles images ne le sont pas peut être subtil selon votre site web. En effet, prenons l'exemple d'un site e-commerce qui a une fine bannière d'accueil dans une page catégorie puis la liste des produits en dessous. Pour le navigateur, le LCP va vraisemblablement être la bannière d'accueil, pourtant elle n'est pas très importante pour l'utilisateurice : on préfère qu'iel voit l'image du premier produit le plus rapidement possible. Pensez donc toujours du point de vue utilisateurice et en fonction de votre domaine plutôt que de raisonner uniquement avec les métriques génériques.
>
> Il peut aussi être pertinent de se poser la question mobile vs desktop étant donné que les contraintes sont généralement différentes. J'ai tendance à suggérer d'optimiser en priorité le mobile car les connexions sont tellement meilleures sur desktop que ça n'aura que peu d'impact. Mais votre audience, le nombre d'utilisateurs desktop et leur connexion vous mènera peut-être à un arbitrage différent.

```diff
 <img
     src="cat.jpg"
     alt="Un chat trop mignon"
+    loading="lazy"
+    width="250"
+    height="200"
 />
```

❓ **J'ai parlé de lazyloading mais j'ajoute aussi des attributs width & height, pourquoi ?**

Ce qu'il faut savoir c'est que le navigateur va essayer d'appliquer la stratégie de chargement qui lui paraît la plus pertinente. Ca ne veut pas forcément dire qu'il ne chargera l'image _que_ si elle est visible. Notamment :

- il va aller chercher des images qui potentiellement peuvent être assez loin dans le document pour être sûr que l'image soit déjà chargée au moment où l'utilisateurice scroll
- il va être plus ou moins enthousiaste en fonction de la connexion de l'utilisateur (une 3G téléchargera moins qu'un réseau fibré)

Dans tous les cas, il va essayer de s'adapter à _où_ doit être affichée l'image. Et pour cela, il est important d'essayer d'indiquer au plus tôt combien de place va prendre l'image. C'est la même technique que pour éviter du [Layout Shift](https://web.dev/cls/) sur le chargement des images. Nous y reviendrons dans un prochain article de blog.

Si on ajoute donc les attributs `loading`, `width` et `height` sur toutes les images non critiques, nous nous retrouvons cette fois-ci avec le téléchargement de l'image principale qui est bien moins hachuré et la bandwidth qui n'est plus que rarement saturée.

<figure tabindex="0">
<img loading="lazy" alt="Visualisation de la trace réseau après avoir passé les images non critiques en lazy" src="/images/posts/lcp/after-lazy.png">
<figcaption>Cascade réseau après avoir définit les attributs <code>loading="lazy"</code></figcaption>
</figure>

Nous sommes donc passés à un LCP de ~2.8s. 🤩

### Preload

Il est souvent aussi conseillé de preload l'image principale (celle utilisée pour le LCP). Cependant, dans notre exemple si nous regardons la trace nous pouvons voir que nous n'en avons pas besoin : l'image est repérée très tôt par le navigateur (via le [preload-scanner](https://web.dev/preload-scanner/) automatique) et l'ajout d'une balise `preload` n'aurait pas d'intérêt.

Cela peut toutefois être une bonne idée si votre HTML est beaucoup plus lourd et que vous constatez que le démarrage du téléchargement est trop tardif. Il sera alors pertinent d'ajouter un `link` preload dans votre en-tête. Cette information est visible quand vous cliquez sur la ligne qui correspond à votre image dans la trace réseau, puis dans l'onglet "Details" > "Timing" > "Discovered".

```html
<link rel="preload" as="image" type="image/jpeg" href="/assets/images/banner.jpg" />
```

### Optimisation des fichiers

Nous n'avons donc pas besoin de preload pour le moment. Cependant nous avons toujours de la marge sur les images. En effet, on peut constater que l'image de la bannière est malgré tout très longue à télécharger. Notamment, si on compare aux autres ressources, on peut constater que la partie violet foncé est bien plus importante que sur les fichiers de style ou de CSS.

- Clair = en attente du serveur
- Foncé = en train de télécharger

Ca veut dire que le fichier est trop lourd. Nous devons donc travailler à optimiser les images. Nous pouvons commencer par réduire la taille des fichiers :

- s'assurer que le serveur est bien configuré pour que les ressources soient compressées via [gzip](https://developer.mozilla.org/fr/docs/Glossary/GZip_compression) ou [brotli](https://developer.mozilla.org/fr/docs/Glossary/Brotli_compression). Si vous passez par un CDN ce sera certainement déjà géré, sinon vérifiez que sur vos assets, vous avez bien le Response Header `Content-Encoding` avec la valeur `br` ou `gzip`. Si ce n'est pas le cas, allez voir votre administrateur·rice système.
- optimiser manuellement les images (par exemple en les passant dans [Squoosh](https://squoosh.app/) ou en utilisant [Sharp](https://www.npmjs.com/package/sharp) pour l'automatiser)

Optimiser manuellement n'est pas toujours une option (ex : contribution par une autre équipe). La semaine prochaine j'entrerai plus en détail sur comment fournir la bonne image au bon format à l'aide de `picture`, `source` & `srcset` et je parlerai de quelques solutions pour faire ça automatiquement. Mais dans un premier temps, si on se contente de faire les deux actions ci-dessus, nous nous retrouvons avec cette nouvelle trace réseau :

<figure tabindex="0">
<img loading="lazy" alt="Visualisation de la trace réseau après avoir optimisé les images avec Squoosh" src="/images/posts/lcp/after-squoosh.png">
<figcaption>Cascade réseau après avoir optimisé les images avec Squoosh</figcaption>
</figure>

La partie violet foncé des images a bien diminué (~ -50% sur la taille des images en moyenne) et cela a apporté un réel gain. Nous voilà arrivé à ~2.4s de LCP. 🎉

## Différer le JavaScript et le CSS

La dernière chose que l'on peut voir sur la trace réseau, c'est que le FCP se retrouve toujours bloqué _après_ le téléchargement du JavaScript. Cela est d'autant plus dommage que le JavaScript de cette page n'a pas utile à la première impression :

- afficher le nombre de jours depuis la publication des images pour des éléments qui sont visibles qu'après avoir scroll
- permettre à l'utilisteur de cliquer sur les images pour les afficher en plein écran

Une première action que l'on pourrait faire est donc d'indiquer au navigateur de télécharger et d'exécuter le JavaScript plus tard. Pour cela, nous pouvons nous contenter d'utiliser l'attribut `defer`.

```diff
 <script
     src="/examples/webperf/index-aa821ed2.js"
     type="module"
+    defer
 ></script>
```

❓ **Pourquoi defer ?**

La raison pour laquelle on utilise `defer` et pas autre chose ici, c'est que notre script n'est vraiment pas important pour les fonctionnalités principales de notre page. S'il s'exécute relativement tard, cela n'impactera pas la personne qui visite le site. On choisit donc l'option qui retarde le plus possible le téléchargement et l'execution du script.

De manière générale, c'est un bon comportement par défaut. Cependant, sachez qu'il y a d'autres attributs et que cela peut être combiné avec du preload pour chercher la meilleure stratégie possible. Vous pouvez retrouver le détail des attributs, la différence entre `async` et `defer` et les stratégies possibles sur [JavaScript Loading Priorities in Chrome](https://addyosmani.com/blog/script-priorities/) (cette page est orientée Chrome, mais le comportement est similaire dans les autres navigateurs).

<figure tabindex="0">
<img loading="lazy" alt="Visualisation de la trace réseau après avoir defer le JavaScript" src="/images/posts/lcp/after-defer.png">
<figcaption>Cascade réseau après avoir defer le JavaScript</figcaption>
</figure>

En appliquant le `defer`, le LCP reste plutôt stable. Cela vient du fait que au stade où nous en sommes, c'est le poids de l'image qui est la contrainte principale pour le navigateur. Cependant, ce que nous avons fait n'est pas inutile. Cela se voit notamment sur le FCP qui est vers ~1.6s avec ~200ms de gagnées sur le premier affichage de la page. En effet, sans l'attribut defer, le navigateur aurait attendu la fin du téléchargement du script et donc nous serions plutôt autour des ~1.8s. Cette différence, vos utilisateurs le ressentiront.

A noter que si nous avions une quantité suffisante de JavaScript pour saturer le navigateur pendant un long moment, cela aurait eu un impact sur le LCP. Il est donc important de rester vigilant quant au JavaScript exécuté et aux librairies que nous utilisons.

### Différer le CSS

Nous avons différé l'exécution du JavaScript mais l'idée va être de defer le maximum de choses pour ne se retrouver qu'avec le strict nécessaire.

Ce que vous pouvez constater au niveau de la trace réseau, c'est notamment qu'il y a 2 requêtes bloquantes (les lignes avec les petites croix oranges en début de ligne) :

- `style-fast.css` est le CSS nécessaire à l'affichage de la page
- `index-74fe18cc.css` est le CSS nécessaire à l'affichage des images zoomées quand on clique dessus

En théorie, pour le premier affichage nous n'avons donc pas besoin du deuxième tout de suite. Une méthode simple serait d'appliquer la méthode suivante pour que la requête ne soit pas bloquante.

```diff
-<link rel="stylesheet" href="index-74fe18cc.css" />
+<link rel="preload" href="index-74fe18cc.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
+<noscript><link rel="stylesheet" href="index-74fe18cc.css"></noscript>
```

Cette méthode est inspirée de cet article sur [web.dev](https://web.dev/defer-non-critical-css/).

Cependant, pour avoir mis cela en place sur un site en production, j'ai pu constater un **ralentissement** du FCP, notamment parce que le CSS différé était téléchargé suffisamment tôt par les clients sur le terrain et donc interrompaient l'étape du rendering du navigateur.

Ainsi, plutôt que d'utiliser cette méthode purement HTML, je vous préconise cette méthode qui, elle, a eu un impact positif sur le FCP en production.

```diff
-<link rel="stylesheet" href="index-74fe18cc.css" />
+<script>
+    window.deferredCss = window.deferredCss || [];
+    deferredCss.push('index-74fe18cc.css');
+</script>
+<noscript><link rel="stylesheet" href="index-74fe18cc.css"></noscript>
```

```js
// index.js
(window.deferredCss || []).forEach((file) => {
	const style = document.createElement('style');
	style.rel = 'stylesheet';
	style.href = file;
	document.head.appendChild(style);
});
```

C'est d'autant plus vrai ici que le fichier `index-74fe18cc.css` n'est utile qu'une fois que l'utilisateur a cliqué sur une image.

<figure tabindex="0">
<img loading="lazy" alt="Visualisation de la trace réseau après avoir defer le CSS" src="/images/posts/lcp/after-defer-css.png">
<figcaption>Cascade réseau après avoir defer le CSS</figcaption>
</figure>

En faisant cette dernière optimisation réseau, nous nous retrouvons ainsi avec un FCP à ~ 1.4s et un LCP à 2.4s.

## Fetch Priority

Nous avons donc defer à la fois le JavaScript et le CSS. Cependant, si on regarde le graphe, il reste quelque chose de curieux : le script JavaScript est téléchargé avant l'image. Pourtant nous l'avons `defer` et nous préférons qu'il soit téléchargé après pour prioriser le LCP.

Pour cela il nous faut réaliser deux actions :

1. Ajouter une balise preload : même si je vous ai dit tout à l'heure que ce n'était pas utile, cela devient utile parce que nous souhaitons que le téléchargement de l'image se passe _avant_ le téléchargement du JavaScript. Ce n'était pas le cas avant parce que le JavaScript était _synchrone_.
2. Ajouter une Fetch Priority sur l'image afin d'indiquer au navigateur que cette ressource est prioritaire par rapport au reste. A noter toutefois que cette API n'est pas disponible dans tous les navigateurs. A ce jour, ce n'est [supporté](https://caniuse.com/mdn-html_elements_img_fetchpriority) que par les navigateurs basés sur Chromium et est prévu pour Safari 17.

Nous allons donc ajouter la ligne suivante dans le `<head>` juste avant nos scripts JS.

```html
<link rel="preload" as="image" type="image/jpeg" href="/images/banner.jpg" fetchpriority="high" />
```

❓ **Pourquoi avoir choisi `fetchpriority="high"` ?**

Parce que mon objectif est de faire en sorte que l'image soit téléchargée _avant_ le script. Or, si on ouvre la console navigateur dans l'onglet "Network" dans la colonne "Priority", on peut constater que par défaut, l'image est marquée comme "Low" et que le script est marqué comme "High".

> 💡 Si vous n'avez pas la colonne "Priority" par défaut, vous pouvez faire un clic droit sur l'en-tête du tableau afin de cocher "Priority".

Mais dans ce cas, pourquoi ne pas utiliser la priorité highest ? Premièrement, parce que ça ne fait pas partie de la spec de [`fetchpriority`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/fetchPriority). Mais aussi parce qu'il est important de garder à l'esprit que nous parlons de _priorité_. Si tout est prioritaire, alors rien ne l'est. Il est donc important de limiter au maximum le nombre d'éléments prioritaires, ne pas marquer toutes ses images comme prioritaires et utiliser cette fonctionnalité avec parcimonie.

A noter aussi que l'ordre des éléments dans le header est important. C'est pour cette raison que j'ai bien précisé que le `preload` de l'image doit être _avant_ la balise `script` du JavaScript.

D'ailleurs, si on pousse la logique jusqu'au bout, il faudrait appliquer cette logique à toutes les balises dans le `<head>`. C'est ce que propose [capo.js](https://github.com/rviscomi/capo.js). Mais en pratique, sauf si votre `<head>` est démesurément grand, cela a peu de chance d'impacter vos performances. Commencez donc toujours par observer un problème avant d'essayer de le corriger.

<figure tabindex="0">
<img loading="lazy" alt="Visualisation de la trace réseau après réorganisé les fetch priorities" src="/images/posts/lcp/after-fetch-priority.png">
<figcaption>Cascade réseau après avoir réorganisé les fetch priorities</figcaption>
</figure>

Après avoir mis en place le changement, on peut constater qu'en pratique ça n'a pas réellement d'impact sur le FCP, ni le LCP. Cela vient problablement du fait que dans tous les cas notre bande passante n'est pas saturée et donc que le navigateur est capable de télécharger les deux en parallèles. Cependant, si vous êtes confronté à ce problème, implémenter les fetch priorites vous permettra peut-être d'obtenir [un gain de 4% sur le LCP comme Etsy](https://www.etsy.com/codeascraft/priority-hints-what-your-browser-doesnt-know-yet).

## Récapitualif

Si nous récapitulons tous les changements que nous avons fait jusque là :

1. utiliser qu'**un seul nom de domaine** pour toutes les ressources afin d'éviter de perdre du temps à chaque nouveau nom de domaine rencontré
2. **éliminer les effets de cascade**
   - soit en ajoutant des `<link rel="preload">` pour les fonts
   - soit en sortant les images du CSS
3. éviter la saturation du réseau
   - en **lazyloadant les images non critiques**
   - en **diminuant le poids** de nos assets
     - avec [Squoosh](https://squoosh.app/)
     - en s'assurant que la compression est bien activée (gzip ou brotli)
4. **différer le JavaScript & le CSS** afin d'améliorer le FCP
5. **ajouter des fetch priorities** pour aider le navigateur à télécharger en priorité les ressources les plus importantes

Comme vous pouvez le constater, nous nous sommes concentrés uniquement sur des optimisations réseau sans changer fondamentalement la manière dont le code était écrit. Pourtant nous sommes passés de ~4.4s à ~2.4s sur le LCP, soit **une réduction de -45%** !

Gardons quand même en tête que cela a été fait avec des mesures Synthetics qui ont des configurations assez extrêmes (mobile lent, connexion lente). Sur vos utilisateurs et sur vos <abbr title="Real User Monitoring">RUM</abbr>, vous n'observerez peut-être pas les mêmes valeurs. Cependant, ce sont des modifications que vous pouvez généralement configurer à l'échelle globale de votre site et donc être une bonne première étape pour tester comment la performance impacte vos utilisateurs et votre entreprise.

Si vous avez besoin d'aide dans ces premiers pas, n'hésitez pas à me contacter par [mail](mailto:julien.pradet+article-blog@gmail.com). Peut-être pouvons nous travailler ensemble pour réaliser vos premières analyses et mettre en place les outils dont vous aurez besoin pour faire progresser la culture de la performance dans votre entreprise.

En attendant, si ça vous a plu ou que suite à la lecture de cet article, vous arrivez à obtenir des améliorations sur votre site, n'hésitez pas à me le partager sur [Mastodon](https://piaille.fr/@julienpradet) ou [Twitter](https://twitter.com/JulienPradet)
