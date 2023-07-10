Le [Largest Contentful Paint (LCP)](https://web.dev/lcp/) fait partie des Core Web Vitals : un ensemble de métriques poussées par Google dont le but est de mesurer la performance de vos pages.

Ce premier article est une introduction qui présente ce qu'est le LCP, pourquoi c'est important et quels outils utiliser pour l'analyser. Dans les prochains articles je vous parlerai de quelques bonnes pratiques testées et approuvées qui peuvent avoir un effet drastique sur la performance ressentie de vos pages.

- Pourquoi améliorer le LCP de vos pages ? **(vous êtes ici)**
- Analyser votre gestion réseau pour améliorer FCP et LCP (bientôt)
- Optimiser la taille des images : s'en sortir avec picture, source & srcset (bientôt)
- Optimiser le chargement des fonts (bientôt)
- Optimiser la gestion des icônes (bientôt)
- Quelles techniques pour diminuer la quantité de JavaScript ? (bientôt)
- Quelles métriques suivre en dehors des Core Web Vitals ? (bientôt)
- Et plus encore 🫶

Si vous avez dû faire face à ces problématiques mais que vous êtes toujours en guerre contre la lenteur de votre site, courage, tout n'est pas perdu. Chaque site est différent avec ses propres problématiques. Nous pourrions par exemple [travailler ensemble](/developpeur-web-performance-freelance/) pour prioriser les actions, former vos équipes et trouver des solutions.

En attendant, bonne lecture !

## Qu'est-ce que le LCP ? Et pourquoi s'y intéresser ?

Avant de commencer, si vous n'avez jamais entendu parler de LCP, voyons comment cela fonctionne.

Admettons que vous allez sur un site pour la première fois : à partir de quand est-ce que vous aurez l'impression que votre site sera chargé ? Généralement ce sera à l'instant où le plus grand élément de la page est chargé. Ca peut être la plus grande image, le plus grand titre, etc. En effet, quand bien même le navigateur continue de charger des choses en tâche de fond, vous pourrez commencer à consommer le contenu du site et ne serez pas frustré d'attendre.

<figure tabindex="0">
<img alt="Timelapse du temps de chargement de genart.social/@julienpradet qui montre d'abord une page blanche, puis une page avec un spinner pendant 3 secondes pour enfin afficher l'image principale au bout de 8 secondes." src="/images/posts/lcp/filmstrip.jpg">
<figcaption>Screenshot du filmstrip généré par <a href="https://www.webpagetest.org/">webpagetest.org</a></figcaption>
</figure>

> Attention, ce n'est pas la seule métrique : si votre navigateur est complètement freeze ([FID](https://web.dev/fid/)) ou s'il clignote dans tous les sens ([CLS](https://web.dev/cls/)), vous ne serez certainement pas ravi. Mais dans cet article nous resteront concentré sur le LCP.

**Pourquoi est-ce que ça vaut le coup de s'y pencher ?**

Première raison : ne pas frustrer ses utilisateurs, c'est bien. 😁

### Taux de conversion

De manière plus concrète, de nombreux cas montrent que cela [améliore aussi le taux de conversion](https://www.radware.com/blog/wp-content/uploads/2014/04/conversion-infographics.gif) : plus votre page va vite, plus vos utilisateurices aurons de chance d'acheter ou de faire l'action que vous attendez d'elleux.

<figure tabindex="0">
<img alt="A 2.4s, le taux de conversion est à 1.9%, à 4.2, il passe en dessous de 1%" src="/images/posts/lcp/conversion-rate-page-load-time.svg" width="500" />
<figcaption>Source: <a href="https://www.cloudflare.com/learning/performance/more/website-performance-conversion-rates/">Cloudflare</a></figcaption>
</figure>

C'est donc un excellent axe si vous êtes dans l'optimisation de votre parcours utilisateur.

Gardons toutefois en tête que ce sera très variable en fonction de votre domaine. Si vous êtes le seul service au monde à proposer un service, vos utilisateurs seront frustrés, n'auront pas le choix, et malgré tout iront jusqu'au bout de l'action, quelle que soit votre performance. A l'inverse, sur du e-commerce ou des sites d'actualité ultra concurrentiels vous constaterez certainement un gros impact.

Un autre élément à avoir en tête est qu'il y a souvent un biais dans ces métriques : les appareils qui vont vite convertissent mieux aussi parce que les personnes ont les moyens d'acheter de bons appareils et donc ont peut être plus de sous à mettre dans votre service.

Cela dit, les exemples sont tellement nombreux et variés qu'on peut quand même partir du principe que oui : la perf c'est important. (cf. [11 Statistiques sur l'impact de la performance](https://blog.hubspot.com/marketing/page-load-time-conversion-rates) ou [Corrélation entre Performance & Conversion chez Walmart (slides 38-41)](https://www.slideshare.net/devonauerswald/walmart-pagespeedslide))

### SEO

Un autre impact auquel on peut s'attendre est au niveau du <abbr title="Search Engine Optimisation">SEO</abbr> : Google considérera que votre site est rapide (et [le prendra en compte pour le ranking de votre page](https://support.google.com/webmasters/answer/9205520?hl=fr)) si LCP < 2.5s. Plus exactement, si 75% des personnes qui visitent votre page ont un LCP < 2.5s.

<figure tabindex="0">
<img alt="LCP : Good < 2.5s, Needs improvements < 4.0s, Bad >= 4.0s" src="/images/posts/lcp/lcp-good-bad.svg"/>
</figure>

Ce que j'ai pu constater sur des projets sur lesquels j'ai travaillé, c'est que ça a eu un réel effet sur l'indexation : dès que nous avons mis en production certaines améliorations de performance, le nombre de pages analysées repart à la hausse dans ce rapport de Google Search Console. L'effet concret au niveau des SERP n'est pas forcément évident pour le moment mais c'est un bon indice pour dire qu'on fait plaisir à Google et donc que ça ne peut aller que dans le bon sens.

<figure tabindex="0">
<img alt="Rapport des Core Web Vitals dans Google Search Console : un graphe qui montre que le nombre total de pages augmente lors que la performance des pages augmente" src="/images/posts/lcp/core-web-vitals-in-google-search-console.png"/>
</figure>

### Green IT

Enfin, si votre site va plus vite ce sera certainement partiellement parce qu'il est plus léger, donc consommera moins de ressources et donc tirera moins sur notre planète. Mais la Green IT est un [sujet complexe](https://hachyderm.io/@boostmarks/110659955640032635) que je ne maîtrise pas. Je me concentrerai donc sur la performance pure.

## Commencer par analyser le chargement de votre page

Ok très bien, la performance et le LCP sont importants. Mais est-ce que pour vous ça vaut le coup d'investir dedans à un instant T ? Pour cela nous devons faire un état des lieux de où nous en sommes. Quelle est la situation pour les utilisateurices ?

Un moyen simple est d'utiliser le CrUX : Chrome UX Report. A partir de l'URL de votre site, vous pouvez demander à Google quelle est la performance ressentie par les personnes qui visitent votre site. Ce sont des données anonymes récoltées par Google Chrome et disponibles pour les sites ayant suffisamment de visites quotidiennes. [Suivez le guide](https://developer.chrome.com/docs/crux/dashboard/).

Par exemple voici le rapport de performance de [MDN](https://developer.mozilla.org/en-US/).

![Rapport du LCP sur MDN via le Chrome UX Report quasiment tout vert !](/images/posts/lcp/lcp-mdn-apr-2023.png)

En faisant ce rapport vous saurez en un clic si vous avez beaucoup de travail à effectuer ou non. Pour MDN, 96.23% des pages qui ont un LCP < 2.5s et un 75ème percentile à 900ms, c'est très très **très** bien. Certainement une cible qui sera difficile à atteindre dans votre contexte.

Vous saurez que vous avez du travail à faire si à l'inverse le résultat ressemble à ça. Et cela ressemblera à ça. Ce sera sûrement pire si vous n'avez jamais abordé le sujet jusqu'à maintenant.

![Rapport du LCP pour un site anonyme via le Chrome UX Report avec un 75ème percentil dans le rouge](/images/posts/lcp/lcp-poor-apr-2023.png)

Une fois que vous aurez une idée de où vous en êtes, vous saurez si ça vaut le coup de mettre des efforts dans le LCP ou non.

> 💡 A noter que le Chrome UX Report par définition remonte les informations des utilisateurs sur **Chrome**. Ce n'est donc qu'une vision partielle, mais cela vous donnera une bonne première idée de la situation. Si par ailleurs votre site a trop peu de visites pour apparaître dans le Chrome UX Report, vous devrez vous contenter des sections suivantes.

### Utiliser des outils Synthetics pour entrer dans le détail

La deuxième étape va être de commencer à faire des rapports d'audit afin de comprendre quelles sont les étapes qui posent problème. On fait ça avec des outils Synthetics : ils prennent un snapshot de votre site à un instant T pour analyser en détail le comportement du navigateur. Ils vous permettront de prioriser les premières actions à prendre.

J'utilise personnellement 2 outils au quotidien :

1. **WebPageTest.org**
   - Une fois votre site déployé, vous donne un excellent récapitulatif de la trace réseau et vous proposera des opportunités d'amélioration accompagnées d'explications claires.
2. **Dev Tools Chrome**
   - Onglet **Lighthouse** : vous donnera des actions à effectuer pour améliorer votre site web (utiliser [PageSpeed Insights](https://pagespeed.web.dev/) directement si vous voulez éxecuter Lighthouse sur un site déjà déployé)
   - Onglet **Performance** : vous permettra de voir en détail les temps de chargement de votre réseau mais aussi les temps d'execution
   - Onglet **Performance Insights** : indique les étapes clés d'affichage de la page et propose une interface qui permet de facilement détecter l'élément LCP
   - Pensez à toujours faire ces analyses en navigation privée afin que vos extensions navigateur n'influencent pas vos résultats

C'est l'utilisation de ces outils que j'utiliserai comme base pour les prochains articles techniques.

### Mettre en place des RUM

En opposition aux outils Synthetics, nous avons les RUM ([Real User Monitoring](https://developer.mozilla.org/en-US/docs/Glossary/Real_User_Monitoring)). Il s'agit de sondes posées sur votre site afin de récupérer les données réelles de votre site par vos vrais utilisateurices. Cela vous permet de découvrir ainsi quels profils et appareils parcourent réellement votre site, connaître les pages qui posent problème et confirmer si vos changements ont réellement amélioré l'expérience du site ou si ça n'a fait que contenter les outils.

En récupérant ces informations, c'est ce qui vous permettra aussi de savoir quelle corrélation y a-t-il entre la performance de vos pages et vos taux de conversions.

Il existe beaucoup de solutions en SaaS qui iront plus ou moins loin en fonction de vos besoins. La compétition est rude et vous trouverez forcément votre bonheur. [SpeedCurve](https://www.speedcurve.com/) peut-être un bon premier outil pour commencer votre benchmark.

## Y a plus qu'à

Maintenant que vous avez les outils en main, il est temps de faire vos premières analyses. Comprendre où vous en êtes est la première étape avant d'entamer le changement.

Pour autant, au démarrage il ne sera pas forcément facile de faire le tri entre les optimisations bonus et les optimisations importantes. J'espère que les prochains articles pourront vous aider à y voir plus clair.

Stay tuned! 🩴

Et comme d'habitude, n'hésitez pas à me contacter sur [Mastodon](https://piaille.fr/@julienpradet), [Twitter](https://twitter.com/JulienPradet) ou à ouvrir une issue sur [GitHub](https://github.com/JulienPradet/blog-posts/issues) si vous avez des questions. 🤗
