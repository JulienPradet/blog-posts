Le terme **Progressive Web Apps** (ou PWA) vient de [Frances Berriman](https://fberriman.com/2017/06/26/naming-progressive-web-apps/) et [Alex Russel](https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/). Le but derrière ce nouveau mot est de promouvoir une façon de penser et de concevoir des sites webs. Ce n'est donc pas une technologie. Le but de ce terme est purement marketing afin de convaincre les gens de faire mieux&nbsp;: s'il apparaît dans tous les fils de discussion, on est bien obligé de s'y intéresser à un moment ou à un autre. Et ils y arrivent plutôt bien. On le voit **partout**.

Voici donc une série d'articles où j'essaierai de vous présenter ce que c'est et surtout comment le mettre en place pour vos utilisateurs. Accrochez-vous, ça fait pas mal de choses à découvrir&nbsp;:
1. <a href="/fiches-techniques/pwa-rendre-un-site-web-disponible-grace-aux-services-workers/">Rendre un site web disponible grâce aux Services Workers</a> (Vous êtes ici.)
2. <a href="/fiches-techniques/pwa-declarer-un-service-worker-et-gerer-son-cycle-de-vie/">Déclarer un Service Worker et gérer son cycle de vie</a>
3. <a href="/fiches-techniques/pwa-intercepter-les-requetes-HTTP-et-les-mettre-en-cache/">Intercepter les requêtes HTTP et les mettre en cache</a>
4. Proposer une expérience hors ligne (à paraître)

Commençons donc par un bref récap' de ce qui se cache derrière ce terme. Est-ce vraiment quelque chose de révolutionnaire&nbsp;? Qu'est ce que ça implique pour nos utilisateurs et nos utilisatrices&nbsp;?

## Définition théorique d'une PWA

Tout d'abord, je tiens à préciser que *ce n'est **pas** estampillé Google*. Les Google Developers font [beaucoup de contenu](https://developers.google.com/web/progressive-web-apps/) et d'[évangelisation sur le sujet](https://events.withgoogle.com/progressive-web-app-dev-summit/), mais ce n'est pas piégeux comme peut l'être AMP par exemple.

Les PWAs sont bel et bien des sites webs qui répondent **aux standards du web**. Il n'y a pas besoin d'installer quoique ce soit pour en utiliser une. Il suffit d'entrer l'URL de celle-ci dans un navigateur pour qu'elle s'affiche. Mais qu'est ce que ça a de plus alors&nbsp;? Pour avoir le droit de s'appeler ainsi, un site doit répondre aux trois critères suivants&nbsp;:

* C'est **performant**&nbsp;: un<span aria-hidden="true">&sdot;e</span> utilisateur<span aria-hidden="true">&sdot;rice</span> peut accéder au contenu, quelle que soit la rapidité de son réseau ou de son appareil.
* C'est **disponible**&nbsp;: un<span aria-hidden="true">&sdot;e</span> utilisateur<span aria-hidden="true">&sdot;rice</span> peut toujours avoir accès au site, indépendamment de l'appareil utilisé (c'est à dire responsive) ou de la qualité de sa connexion internet (fibre, 2G, hors ligne, etc.).
* C'est **comme une application native**&nbsp;: un<span aria-hidden="true">&sdot;e</span> utilisateur<span aria-hidden="true">&sdot;rice</span> peut l'installer sur son appareil et ainsi recevoir des notifications (même en n'ayant pas le site sous les yeux).

Si votre site répond déjà à ces trois critères alors félicitations, votre site est en fait une PWA. 🎉

Si ce n'est pas le cas et que vous pensez que c'est inutile, je vous invite à lire [un argumentaire qui prend le point de vue des utilisateurs](https://blog.clever-age.com/fr/2016/12/29/les-progressive-web-apps-pour-booster-ux/) de Thibault  Walle ou [un argumentaire commercial](https://frank.taillandier.me/2016/08/09/argumentaire-commercial-pour-les-progressive-web-apps/) de Frank Taillandier. Ils vous expliqueront mieux que moi les tenants et aboutissants.

Sinon, cela veut dire que vous êtes intéressés et que vous êtes au bon endroit pour en découvrir un petit peu plus.

## Transformer un site existant en PWA

Le but est donc de prendre un site existant qui a plus ou moins de dette technique et de le rendre *top-of-the-pop*&trade;.

Cependant, ne partez pas du principe que vous ferez tout d'un coup. Commencez par le point qui sera utile à la majorité de vos utilisateurs<span aria-hidden="true">&sdot;rices</span> et itérez à partir de là. Vous pouvez par exemple commencer par améliorer la performance de votre site, puis mettre à disposition un service hors ligne et enfin rajouter les fonctionnalités d'installation.

Plusieurs raisons à cela&nbsp;:
1. Votre site doit rester fonctionnel pour les utilisateurs<span aria-hidden="true">&sdot;rices</span> n'ayant pas accès aux dernières fonctionnalités du web, que ce soit temporaire ou non. En implémentant tout à la fois, vous risquez de vous mélanger les pinceaux et ne pas respecter le principe de l'[amélioration progressive](https://developer.mozilla.org/fr/docs/Glossaire/Am%C3%A9lioration_progressive) (a.k.a. progressive enhancement).
2. Plus la tâche à réaliser est grosse, moins il est facile de convaincre les décideurs<span aria-hidden="true">&sdot;ses</span>. En améliorant votre site par petites itérations, vous pourrez mesurer les conséquences (positives ou négatives) et rassembler ainsi des arguments pour les convaincre de continuer dans cette voie.
3. Chaque point est difficile en soi. Si la performance était un problème résolu, personne n'attendrait jamais 5 secondes devant une page vide sur son téléphone. Si les systèmes de synchronisation et de cache étaient aisés, personne ne dirait que les deux seules choses difficles en informatique sont *l'invalidation de cache et le nommage* ([Phil Karlton](https://martinfowler.com/bliki/TwoHardThings.html)). Etc. Evitez donc de cumuler les difficultés afin d'améliorer vos chances de réussite.

Pour mesurer vos progrès, vous pouvez utiliser [Lighthouse](https://developers.google.com/web/tools/lighthouse/) qui remontera les bonnes pratiques que vous n'auriez pas respecté sur votre site. C'est disponible directement dans le DevTools de Chrome ou en [ligne de commande](https://developers.google.com/web/tools/lighthouse/#cli) et c'est plein de bons conseils&nbsp;!

Cela dit, je ne me permettrais pas de pas vous laisser seuls<span aria-hidden="true">&sdot;es</span> avec cet outil. Je vais donc essayer de vous accompagner un petit peu pour présenter comment mettre en place certaines briques des PWAs. Je ne pourrai malheureusement pas aborder tous les sujets dans cette série d'articles. Nous nous intéresserons donc uniquement à la **disponibilité** d'un site web (ce qui aura la chance d'améliorer par la même occasion la performance ressentie). Le but sera de faire en sorte que votre site web soit de moins en moins dépendant de la connexion internet de vos visiteurs<span aria-hidden="true">&sdot;euses</span>. En particulier nous nous intéresserons à la nouveauté majeure qui a permis de mettre en place ces choses là&nbsp;: les Services Workers.

## Les Services Workers

Cette technologie est un poil plus vieille que l'apparition du terme PWA. Cependant, généralement, quand quelqu'un<span aria-hidden="true">&sdot;e</span> vient vous voir et vous dit qu'il<span aria-hidden="true">&sdot;elle</span> a fait une PWA, il y a de fortes chances que ce soit parce que son site utilise un Service Worker et non parce qu'il est performant ou qu'il a des notifications.

### Qu'est-ce&nbsp;?

Un Service Worker est un bout de code qui va tourner sur le navigateur de vos utilisateurs<span aria-hidden="true">&sdot;rices</span>, à côté de votre site. Il va pouvoir intercepter les requêtes émises par ce dernier et échanger des messages avec lui.

Si vous savez déjà ce qu'est un Service Worker, peut être que cette définition vous parlera. Dans le cas contraire, je parierai plutôt sur le fait que ca vous paraisse carrément flou&nbsp;! Essayons donc d'expliciter chaque partie pour voir ce que ça peut nous apporter&nbsp;:

* **C'est un bout de code qui va tourner à côté de votre site**&nbsp;: un Service Worker est lancé par le javascript de votre site. Cependant, il a la particularité d'être executé dans un *thread* séparé. Autrement dit, cela veut dire qu'il ne s'execute pas au même endroit que le javascript de votre site. Pourquoi est-ce un détail important&nbsp;?
    * Un Service Worker peut ainsi rester actif alors que l'utilisateur<span aria-hidden="true">&sdot;rice</span> n'est pas sur votre site. Il devient alors possible de faire des actions tant bien même que l'utilisateur<span aria-hidden="true">&sdot;rice</span> n'est pas sur votre site. C'est grâce à cela qu'on va pouvoir mettre en place des notifications comme on peut le faire avec une application mobile.
    * En étant dans un thread séparé, le navigateur peut utiliser le même Service Worker pour tous les onglets ouverts de votre site. Cela lui permet de consommer moins de ressources système.
    * Tout ce que vous faites dans le Service Worker ne va pas affecter négativement la performance ressentie par l'utilisateur<span aria-hidden="true">&sdot;rice</span>. En effet, en temps normal, le javascript de votre site s'exécute au même endroit que l'UI. Ainsi, si vous faites trop de choses en même temps, vous allez empêcher l'utilisateur<span aria-hidden="true">&sdot;rice</span> d'intéragir avec votre site. Il ne pourra plus cliquer sur les boutons, remplir les formulaires, scroller, etc. En décalant le travail dans un Service Worker (ou un [Web Worker](https://developer.mozilla.org/fr/docs/Utilisation_des_web_workers)), vous libérez de la place et évitez les lags.
* **Un Service Worker va pouvoir intercepter les requêtes émises par votre site**&nbsp;: en implémentant votre Service Worker, vous engagez une sorte d'agent de sécurité qui va réguler le passage entre votre site et Internet. On va ainsi pouvoir contrôler chacune des requêtes et en faire ce qu'on veut&nbsp;: modification des requêtes émises, modification des réponses reçues, mise en cache, etc. C'est ce mécanisme qui fait que cette technologie est aussi prisée en ce moment. La gestion du cache et des requêtes vers l'extérieur est grandement facilitée et permet tout un tas de nouvelles applications. C'est **la** fonctionnalité qui permet de rendre votre site disponible même en étant hors ligne.
* **Un Service Worker va pouvoir échanger des messages avec votre site**&nbsp;: cela veut dire qu'au delà des requêtes, vous pouvez communiquer avec votre Service Worker en échangeant des messages à l'image de ce qui se ferait avec un thread. C'est un complément très important à l'interception des requêtes lorsque l'on souhaite faire un site accessible hors ligne.

Vous l'aurez compris, les Services Workers vont nous être très utiles pour répondre au critère de disponibilité des PWAs. Les prochains articles rentreront donc dans les détails techniques pour savoir précisément comment les mettre en place.

Ainsi, <a href="/fiches-techniques/pwa-declarer-un-service-worker-et-gerer-son-cycle-de-vie/">l'article de la semaine prochaine</a> présentera comment déclarer et mettre à jour un Service Worker. Mon but sera de vous y montrer les bases mais aussi de discuter des pièges à éviter. En attendant, si vous avez des questions ou des commentaires, n'hésitez pas à m'en faire part sur [Twitter](https://twitter.com/JulienPradet), [Github](https://github.com/JulienPradet/blog-posts) ou autre. :)

Merci à [Quentin](https://quentin.pradet.me/blog/) et [Sylvain](https://twitter.com/hihuz) pour leur relecture attentive&nbsp;!

---

Sources Complémentaires :
* [Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/) via Google Developers
* [Les Progressive Web Apps pour booster l’UX de vos services](https://blog.clever-age.com/fr/2016/12/29/les-progressive-web-apps-pour-booster-ux/) par Thibault  Walle
* [L’argumentaire commercial pour les Progressive Web Apps](https://frank.taillandier.me/2016/08/09/argumentaire-commercial-pour-les-progressive-web-apps/) par Frank Taillandier
* [Lighthouse](https://developers.google.com/web/tools/lighthouse/) pour mesurer les PWAs