Le terme Progressive Web Apps (PWA) vient de [Frances Berriman](https://fberriman.com/2017/06/26/naming-progressive-web-apps/) et [Alex Russel](https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/). Le but derrière ce nouveau mot est de promouvoir une façon de penser et de concevoir des sites webs. Ce n'est donc pas une technologie. Le but de ce terme est purement marketing afin de convaincre les gens de faire mieux&nbsp;: s'il apparaît dans tous les fils de discussion, on est bien obligé de s'y intéresser à un moment ou à un autre. Et ils y arrivent plutôt bien. On le voit **partout**.

Voici donc une série d'articles où j'essaierai de vous présenter ce que c'est et surtout comment le mettre en place pour vos utilisateurs. Accrochez-vous, ça fait pas mal de choses à découvrir&nbsp;:
1. <a href="/fiches-techniques/pwa-rendre-un-site-web-disponible-grace-aux-services-workers/">Rendre un site web disponible grâce aux Services Workers</a>
2. <a href="/fiches-techniques/pwa-declarer-un-service-worker-et-gerer-son-cycle-de-vie/">Déclarer un Service Worker et gérer son cycle de vie</a>
3. <a href="/fiches-techniques/pwa-intercepter-les-requetes-HTTP-et-les-mettre-en-cache/">Intercepter les requêtes HTTP et les mettre en cache</a> (Vous êtes ici.)
4. Proposer une expérience hors ligne (à paraître)

Dans les articles précédents, je présentais ce qu'est une PWA et un Service Worker. Puis, nous avons vu comment déclarer un Service Worker et gérer la liaison avec une page web.

Maintenant, il est temps d'utiliser tout ça pour commencer à améliorer l'expérience de nos utilisateurs<span aria-hidden="true">&sdot;rices</span>. Pour cela, nous allons faire en sorte qu'un<span aria-hidden="true">&sdot;e</span> utilisateur<span aria-hidden="true">&sdot;rice</span> puisse revenir sur notre site et accéder au contenu quel que soit l'état de sa connexion internet.

Je vais ainsi commencer par présenter la fonctionnalité phare des Service Workers qui permet d'atteindre ce but : l'interception de requêtes. Ensuite, nous verrons comment nous pouvons coupler cela à la Cache API pour réutiliser des requêtes déjà émises et ainsi éviter d'être dépendant de la connexion internet.

A la fin de cet article vous aurez donc toutes les billes à votre disposition pour rendre votre site **disponible**. Cependant, nous n'en serons encore qu'à la présentation technique des fonctionnalités. Il faudra attendre le dernier article pour voir comment assembler tout ça pour proposer une version hors ligne de votre site à vos utilisateurs<span aria-hidden="true">&sdot;rices</span>.

## Intercepter les requêtes HTTP

Commençons donc par l'interception de requêtes. L'idée de cette fonctionnalité est de se positionner entre le site web et internet pour pouvoir éviter de passer par internet quand c'est possible.

Précédemment, nous avons vu qu'il y a des évènements sur lesquels nous pouvons nous brancher dans un Service Worker. Il y a par exemple `install` et `activate` qui offrent la possibilité de gérer le cycle de vie du Service Worker. Pour mettre en place l'interception de requêtes, il existe un autre évènement : `fetch`. Celui-ci est émis à chaque fois qu'une page liée à votre Service Worker émet une requête HTTP.

Ainsi, en se branchant à [`fetch`](https://developer.mozilla.org/fr/docs/Web/API/FetchEvent), nous pouvons voir ce qui est demandé par la page (`event.request`) et modifier la réponse en utilisant `event.respondWith`.

Ainsi, si je veux faire en sorte d'intercepter la requête vers `/toto` dans ma page, il faut que j'écrive le code suivant&nbsp;:

```js
// fichier /service-worker.js

// On se branche sur chaque requête émise
self.addEventListener("fetch", event => {
  const requestUrl = new URL(
    event.request.url
  );
  
  // Si la requête est bien celle que l'on
  // veut simuler
  if (requestUrl.pathname === "/toto") {
    // Alors, on modifie la réponse
    event.respondWith(
      // Ici je crée une réponse à partir
      // de rien qui contient uniquement
      // "Hello Toto"
      new Response(
        new Blob(
          ["Hello Toto"],
          {type : "text/html"}
        ),
        {
          status: 200,
          statusText: "OK",
          headers: {
            "Content-Type": "text/html",
          }
        }
      )
    );
  }
});
```

[Retrouvez cet exemple ici.](https://github.com/JulienPradet/blog-posts/tree/master/src/content/fiches-techniques/pwa-intercepter-les-requetes-HTTP-et-les-mettre-en-cache/examples/src/replace-response)

Si vous executez cet exemple, et que vous allez sur `/toto`, votre navigateur affichera "Hello Toto". Si ce n'est pas le cas, c'est que votre Service Worker n'a pas été déclaré (cf. [l'article précédent pour voir comment déclarer le Service Worker](/fiches-techniques/pwa-declarer-un-service-worker-et-gerer-son-cycle-de-vie/)).

Il nous est donc possible d'intercepter une requête et afficher du contenu sans passer par le serveur. En l'occurence, c'est une page HTML que l'on affiche, mais cela pourrait être n'importe quoi&nbsp;: des fichiers CSS, des fichiers JS, des requêtes API, etc.

### Prévoir une solution de secours

Là tout de suite, vous ne vous en rendez peut-être pas compte étant donné qu'on ne renvoie qu'un "Hello Toto", mais c'est très puissant comme fonctionnalité.

Il devient assez tentant de vouloir ajouter des traitements sur les requêtes au niveau du Service Worker. On peut rapidement en devenir dépendant. Cependant il est **très important de se débrouiller pour que le site fonctionne sans Service Worker**.

Il est par exemple tout à fait possible que le navigateur de l'utilisateur [ne supporte pas encore les Service Workers](https://jakearchibald.github.io/isserviceworkerready/#service-worker-enthusiasm) ou que ceux-ci soient désactivés. Mais il est aussi possible que votre page se retrouve détachée du Service Worker pour on ne sait quelle raison (<abbr title="Also Known As">a.k.a.</abbr> un bug).

Ainsi, il est interdit de faire en sorte que certaines requêtes ne fonctionnent que si un Service Worker est présent. Il faudra plutôt mettre en place un serveur qui fournisse `/toto` pour que la requête fonctionne aussi lorsque le Service Worker est absent. Ainsi, s'il y a un Service Worker, on améliore les performances ressenties par l'utilisateur. S'il n'y en a pas, il a toujours accès au contenu.

## Intercepter pour mettre en cache

Ok, mais l'interception de requête pour faire des réponses sorties de nulle part, ce n'est pas très intéressant dans la vie de tous les jours. Attaquons nous donc au coeur du sujet.

Notre but initial est de rendre notre site web [disponible](http://localhost:3000/fiches-techniques/pwa-rendre-un-site-web-disponible-grace-aux-services-workers/#definition-theorique-dune-pwa), afin que l'utilisateur<span aria-hidden="true">&sdot;rice</span> continue d'accèder au site en étant hors ligne (ou parce que le WiFi a sauté <span aria-hidden="true">`¯\_(ツ)_/¯`</span>). Pour y arriver, nous allons réutiliser les données déjà récupérées depuis le serveur et les servir à nouveau si l'utilisateur fait la même requête. C'est le principe de mise en cache.

### Cache API

Ca tombe bien, il y a une API prévue pour ça : la [Cache API](https://developer.mozilla.org/fr/docs/Web/API/CacheStorage). Celle-ci est disponible via la variable `caches`. L'idée derrière cette API est de pouvoir stocker une réponse pour une requête donnée. Ainsi, quand on reçoit une nouvelle requête, on peut vérifier s'il y a déjà une réponse stockée ou non.

```js
// Stockage d'une réponse pour
// une requête spécifique
// https://developer.mozilla.org/fr/docs/Web/API/Cache/put
cache.put(
  request,
  response.clone()
).then(() => {
  console.log(`
    Réponse mise en cache et
    associée à la requête donnée.
  `)
})

// Récupération d'une requête
// depuis le cache
// https://developer.mozilla.org/fr/docs/Web/API/Cache/match
cache.match(request).then((response) => {
  if (response) {
    console.log(
      'Réponse déjà en cache.',
      response
    )
  } else {
    console.log(`
      Pas encore de cache pour cette requête
    `)
  }
})

// Suppression d'un élément
// du cache
// https://developer.mozilla.org/fr/docs/Web/API/Cache/delete
cache.delete(request).then(() => {
  console.log(`
    Cache supprimé pour la requête donnée.
  `)
})
```

A noter qu'on a bien fait attention à cloner la requête avant de la stocker (`.clone()`). Cela permet d'éviter tout effet de bord lors de la récupération du corps de la requête (cf. [Response.clone() sur MDN](https://developer.mozilla.org/en-US/docs/Web/API/Response/clone)).

Un deuxième point à noter est qu'il est possible de séparer les différents de types de caches. Cela facilite notamment la suppression d'une partie du cache de manière ciblée. Il est par exemple souvent pertinent dans deux caches différents les *assets* et les *requêtes API*.

> **Lexique**&nbsp;: Je vais régulièrement parler d'*assets* et de *requêtes API*. Dans le cadre de cet article, il faudra comprendre ces termes comme suit&nbsp;:
> * **Asset**&nbsp;: tout fichier statique permettant d'afficher votre page web (javascript, css, images, etc.)  
> * **Requête API**&nbsp;: toute requête qui permet de récupérer le contenu dynamique de la page. Généralement il s'agit d'objets JSON, mais ça peut être du  HTML, du GraphQL, etc.

Ainsi, si l'on veut gérer les requêtes/réponses d'une partie du cache seulement, il faut utiliser [`open`](https://developer.mozilla.org/fr/docs/Web/API/CacheStorage/open)&nbsp;:

```js
caches.open("Nom du cache")
  .then(cache => {
    // Ici on a accès aux méthodes
    // cache.put, cache.match et
    // cache.delete
  })
```

### Mise en place du cache des requêtes

Maintenant que nous sommes capables de mettre des choses dans le cache, il faut se demander quoi mettre en cache, dans quel contexte, etc. On va parler de **stratégies**.

C'est intimement lié à la nature de application. Potentiellement, on pourrait imaginer une infinité de stratégies différentes. Cela dit, [les principales stratégies](https://jakearchibald.com/2014/offline-cookbook/#serving-suggestions-responding-to-requests) sont&nbsp;:
* **Network Only** : on ne veut pas de cache car l'opération est critique/ne peut pas fonctionner hors ligne. Si ce n'est qu'une partie de l'application, il est important d'expliquer clairement au niveau de l'interface pourquoi la fonctionnalité n'est pas disponible.
* **Cache First** : on récupère en priorité depuis le cache. S'il n'y a pas encore de cache, on va chercher sur le réseau et on stocke la réponse dans le cache. L'intérêt est qu'une fois qu'on a mis quelque chose en cache, on est capable de le servir très rapidement à l'utilisateur. La performance ressentie s'en retrouve grandement améliorée.
* **Network First** : on récupère en priorité depuis le réseau. Si le réseau ne répond pas, on sert le cache afin d'afficher du contenu. Cela permet d'afficher du contenu qui n'est peut-être plus à jour, mais qui a le mérite d'être là.
* **Stale While Revalidate** : on récupère le cache et on l'envoie. Le contenu est ainsi directement disponible. Ensuite, on va chercher la requête sur le réseau pour que ce soit à jour la prochaine fois qu'on fait la requête.

Ces quelques méthodes sont disponibles dans [Workbox](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-sw.Strategies#methods). Vous pouvez aussi retrouver un tout en tas de stratégies dans [The offline cookbook](https://jakearchibald.com/2014/offline-cookbook/#stale-while-revalidate) de Jake Archibald qui est une très bonne resource sur le sujet.

Comme vous pouvez le voir, chaque stratégie a ses avantages et ses inconvénients. Pour choisir laquelle est la bonne, personnellement, je me pose les questions suivantes&nbsp;:

* Est-ce que la ressource doit être délivrée très rapidement&nbsp;? Dans ce cas je privilégie le cache en premier.
* Est-ce que la fiabilité est plus importante que la vitesse&nbsp;? Dans ce cas, je privilégie le réseau.

Pour faire simple, la rapidité passe par le cache. La fiabilité passe par le réseau.

### Cas d'application&nbsp;: Cache First

Dans cet article, je n'aurai ni le temps ni la place de détailler chacune des stratégies. Cependant, en partant de l'implémentation d'une stratégie, il est généralement possible de l'adapter en modifiant l'ordre d'execution pour en arriver à une autre.

L'implémentation que nous allons voir ensemble est **Cache First**. Pour rappel, le principe est de voir si une requête est déjà présente dans le cache pour pouvoir la servir la plus rapidement possible. Si elle n'y est pas, on fait la requête réseau et on met à jour le cache.

```js
const ASSETS_CACHE_NAME = 'assets';

// En premier, deux méthodes d'aide
// pour faciliter la lecture de
// `getResponseFromCacheFirst`

const getResponseFromCache = (
  cacheName,
  request
) => {
  // On ouvre le bon cache
  return caches.open(cacheName)
    .then(cache => {
      // Et on récupère la réponse
      // correspondant à la requête
      return cache.match(request);
    });
};

const setResponseCache = (
  cachename,
  request,
  response
) => {
  // On ouvre le bon cache
  return caches.open(cacheName)
    .then(cache => {
      // Et on stocke la nouvelle
      // réponse pour la requête donnée
      return cache.put(
        request,
        response
      );
    });
};

// Mise en place de la stratégie 
// Cache First pour la requête
// donnée
const getResponseFromCacheFirst = (
  cacheName,
  request
) => {
  // Cette méthode permet de récupérer la
  // réponse d'une requête. Si celle-ci est
  // déjà en cache, on répond avec le cache
  // en priorité. Sinon, on fait la requête,
  // on met en cache la réponse, puis on
  // renvoie la réponse.

  // Récupération depuis le cache
  const response = getResponseFromCache(
    cacheName,
    request
  )
    .then((response) => {
      if (response) {
        // Si la requête est déjà en cache,
        // on renvoie la réponse trouvée
        return response;
      } else {
        // Sinon, on fait la vraie requête
        return fetch(request)
          .then(response => {
            // Une fois qu'on a reçu la
            // réponse, on met en cache
            // pour la prochaine fois
            setResponseCache(
                cacheName,
                request,
                response.clone()
            );
        
            // Et on retourne la réponse
            return response;
          });
      }
    });

  return response;
};

self.addEventListener("fetch", event => {
  const requestUrl = new URL(
    event.request.url
  );

  // Quand on intercepte une requête,
  // si c'est un asset, on applique la
  // stratégie Cache First
  if (
    requestUrl.pathname.startsWith("/assets")
  ) {
    event.respondWith(
      getResponseFromCacheFirst(
          ASSETS_CACHE_NAME,
          event.request
      )
    );
  }
});
```
[Retrouvez cet exemple ici](https://github.com/JulienPradet/blog-posts/tree/master/src/content/fiches-techniques/pwa-intercepter-les-requetes-HTTP-et-les-mettre-en-cache/examples/src/cache-first)

Et voilà, on a mis en place notre première stratégie de cache&nbsp;! <span aria-label="Chouette !">:)</span>

Pour vérifier que vous avez bien compris le fonctionnement de ce code, un bon exercice serait de le reprendre et d'implémenter [une autre stratégie](#mise-en-place-du-cache-des-requetes).

### Ne pas intercepter n'importe quoi

Dans l'exemple ci-dessus, vous pouvez constater que je n'ai mis en cache que les assets. Il est **très important de ne toucher qu'aux URLs que l'on maîtrise**. Sinon, on peut se retrouver dans des situations délicates. 

Imaginons un instant que nous n'ayons pas mis de filtre et que nous interceptions *toutes* les requêtes pour les mettre en cache. Dans ce cas, au rafraîchissement de la page, on ne va plus chercher les infos sur le serveur. Tout est déjà en cache. Cool&nbsp;!

Cependant, un détail auquel on n'a pas pensé, c'est qu'au chargement de la page, on fait une requête qui va chercher le nombre de notifications non lues. Etant donné qu'il n'y a pas de filtre au niveau de la mise en cache, cette requête se retrouve elle aussi en cache. Ainsi, si une nouvelle notification arrive, on récupère tout de même l'ancienne valeur. Oups.

Il faut donc faire très attention. D'autant plus que vous ne maîtrisez pas tout ce qui est sur votre site web. C'est par exemple le cas pour les outils d'analytics, les librairies externes, etc.

En tant que développeur<span aria-hidden="true">&sdot;euse</span>, lorsque l'on met en place son propre Service Worker, croyez-moi, on finit toujours par perdre du temps sur ce genre d'erreurs. Heureusement, les [DevTools de nos navigateurs](https://jakearchibald.github.io/isserviceworkerready/#debugging) sont là vous aider à repartir d'un état stable&nbsp;:
* Sur Firefox, ouvrez un nouvel onglet à l'URL `about:debugging#workers` et cliquez sur `unregister` sur le service worker qui vous intéresse.
* Sur Chrome, dans les DevTools (F12), allez dans l'onglet `Application` > ``Service Workers` et cliquez sur `Unregister`.

Cela dit, pour les utilisateurs<span aria-hidden="true">&sdot;rices</span> de votre site, il n'y a pas vraiment de solution miracle. <span aria-hidden="true">Elles&sdot;</span>ils seront obligé<span aria-hidden="true">&sdot;e&sdot;</span>s d'attendre la mise à jour votre Service Worker et la remise à plat du cache...

Mais comment faire cette remise à plat&nbsp;?

## Mettre à jour le cache

Même si nous avons tout bien fait, il y a toujours un moment où nous souhaitons invalider/vider le cache. Cela peut se produire quand on publie une nouvelle version du site par exemple. C'est aussi le cas quand le contenu à afficher change dans le temps (nouveau commentaire, notification, etc.).

L'idée est d'appeler `cache.delete()`. Mais où et quand faut-il le faire&nbsp;?

Comme d'habitude, la réponse est&nbsp;: ça dépend. En effet, si c'est une requête API ou un asset, vraisemblablement, ce sera très différent.

Les assets, par exemple, ont de fortes chances d'être mis à jour au même moment que le Service Worker. L'idée est alors de tenir une liste de tous les assets à aller récupérer lors de l'installation de votre nouveau Service Worker.

Au contraire, si des requêtes API ont été mises en cache, le sujet devient tout de suite beaucoup plus complexe. C'est tout un système de synchronisation qu'il faut mettre en place si on veut être sûr d'avoir toujours la dernière version. C'est donc un sujet suffisamment difficile pour mériter un ou plusieurs articles à lui tout seul. Cependant, parfois le fait de choisir la bonne stratégie de cache peut suffire (Network First&nbsp;?). 

### Mettre à jour le cache des assets

Afin de ne pas trop nous éparpiller, je me contenterai dans cet article de vous présenter une implémentation possible pour la mise en cache de fichiers statiques.

Evidemment, cela dépend de vos assets, mais en général cela se fait en trois étapes&nbsp;:
1. Pour chaque version, on liste la totalité des assets à télécharger.
2. Lors de la tâche d'installation du Service Worker, on met en cache tous les nouveaux assets. Ainsi, lorsque le Service Worker est activé, on n'est pas dépendant des pages qui ont déjà été visitées sur le site&nbsp;: tout est directement disponible.
3. Lors de la tâche d'activation du Service Worker, on retire tous les caches qui ne sont plus utiles afin d'éviter que le cache grossisse indéfiniment.

Cela donnerait donc quelque chose qui ressemblerait à ça&nbsp;:
```js
const ASSETS_CACHE_NAME = 'assets'

// (1) On recense l'ensemble des assets
// dans une variable.
const assetsList = [
  "/static/css/main.ez84s6df.css",
  "/static/js/main.aze4sd31.js",
];

// (2) Méthode permettant de mettre en
// cache un asset s'il n'est pas déjà
// en cache
const cacheAsset = (url) => {
  // On travaille dans le cache dédié aux
  // assets
  return caches.open(ASSETS_CACHE_NAME)
    .then(cache => {
      const request = new Request(url);

      // On regarde si l'asset est déjà
      // en cache (ex: déjà utilisé
      // dans le précédent Service Worker)
      return cache.match(request)
        .then(response => {
          if (!response) {
            // Si pas de cache existant
            // on récupère l'asset
            return fetch(request)
              .then(
                response => {
                  // Et on le met en cache
                  return cache.put(
                    request,
                    response.clone()
                  )
                }
              )
          }
        })
    })
}

self.addEventListener("install", event => {
  // (2) On considère qu'un Service Worker est
  // installé une fois que tous les assets
  // ont été mis en cache
  event.waitUntil(
    Promise.all(
      assetsList.map(url => cacheAsset(url))
    )
  )
});

// (3) Méthode permettant de retirer du
// cache tous les assets qui ne sont plus
// utilisés
const removeUnusedAssets = () => {
  return caches.open(ASSETS_CACHE_NAME)
    .then(cache => {
      // On récupère toutes les requêtes
      // stockées dans le cache
      return cache.keys().then(requests => {
        // On ne veut retirer que les
        // requêtes qui ne sont plus
        // dans `assetsList`
        const unusedRequests = requests
          .filter(request => {
            const requestUrl = new URL(request.url)
            return assetsList.indexOf(requestUrl.pathname) === -1
          })

        // Et on retire ces requêtes
        // une par une
        return Promise.all(
          unusedRequests
            .map(request => {
              return cache.delete(
                request
              )
            })
        )
      })
    })
}

self.addEventListener("activate", event => {
  // (3) Une fois qu'un Service Worker est
  // utilisé il faut penser à nettoyer le
  // cache pour qu'il ne grossisse pas
  // indéfiniment
  event.waitUntil(
    removeUnusedAssets()
  )
});
```

Cette implémentation est plus complexe que les ressources que l'on a l'habitude de trouver sur le sujet. En effet, souvent, c'est plutôt le nom de cache qui va changer de version en version. Ainsi, à l'installation, on récupère tous les assets sans distinction et on les met dans le cache `assets-vXXX`. Et à l'activation, on supprime tous les caches sauf `assets-vXXX`. C'est d'ailleurs l'[exemple proposé dans MDN](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage/delete#Examples).

Cependant l'avantage avec l'implémentation que je vous ai montré est qu'on économise des requêtes serveur. On ne va pas chercher deux fois la même URL. L'inconvénient, par contre, c'est qu'on considère que si une URL mise en cache a le même nom, c'est qu'elle n'a pas changé. Il faut donc bien faire attention à utiliser la bonne implémentation au bon moment.

Avec les méthodes de [cache busting](https://css-tricks.com/strategies-for-cache-busting-css/) aujourd'hui, c'est assez sûr d'utiliser cette implémentation sur les fichiers JS/CSS. Mais ça peut par exemple être piégeux de le faire sur un fichier HTML qui ressemble à un asset mais qui change à chaque fois que les fichiers JS/CSS importés changent.

Toute fois, si vous avez bien compris l'implémentation de cette stratégie, je pense que vous serez capables d'implémenter n'importe quelle stratégie de mise à jour du cache.

## Conclusion

Si on récapitule, nous avons intercepté une requête et nous sommes maintenant capables de renvoyer des informations du cache plutôt que d'aller récupérer les données depuis le serveur.

Ainsi, potentiellement, si les bonnes requêtes ont été mises en cache, il est maintenant possible sur vos sites webs d'afficher du contenu malgré une connexion hasardeuse. Mieux que ça, grâce aux Service Workers, vous êtes capables de détecter les mises à jour de vos sites et préparer le cache pour les futures utilisations de votre site.

Si vous avez tout compris, et que vous vous sentez à l'aise pour utiliser chacun de ces outils, alors ma mission est finie&nbsp;!

Cela dit, mêmes si nous sommes rentrés dans les détails techniques, nous sommes restés très vagues en répondant à beaucoup de questions par "ça dépend". Nous avons donc les armes pour la suite mais je ne pense pas que tout le monde se sente prêt à faire un site web accessible hors ligne dès demain.

Pour cette raison, j'ai prévu une dernière partie à cette série d'article : une mise en pratique de tout ce qu'on a vu pour transformer un site web standard en un site web qui propose une expérience hors ligne.

Cependant, cette dernière partie demandera certainement autant de préparation que les trois premières réunies&nbsp;! Je vous donne donc rendez-vous courant janvier pour lire la suite.

En attendant, je vous souhaite à tous d'excellentes fêtes&nbsp;! Si vous avez des questions ou des commentaires, n'hésitez pas à m'en faire part sur [Twitter](https://twitter.com/JulienPradet) ou [Github](https://github.com/julienpradet/blog-posts). Je me ferai une joie de vous répondre.

---

Sources complémentaires&nbsp;:
* [The offline cookbook](https://jakearchibald.com/2014/offline-cookbook/) par Jake Archibald
* [Workbox's strategies](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-sw.Strategies)
* [Caching strategies](https://serviceworke.rs/caching-strategies.html) par Mozilla