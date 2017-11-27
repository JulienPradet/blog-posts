Le terme Progressive Web Apps (PWA) vient de [Frances Berriman](https://fberriman.com/2017/06/26/naming-progressive-web-apps/) et [Alex Russel](https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/). Le but derrière ce nouveau mot est de promouvoir une façon de penser et de concevoir des sites webs. Ce n'est donc pas une technologie. Le but de ce terme est purement marketing afin de convaincre les gens de faire mieux&nbsp;: s'il apparaît dans tous les fils de discussion, on est bien obligé de s'y intéresser à un moment ou à un autre. Et ils y arrivent plutôt bien. On le voit **partout**.

Mais qu'est ce réellement&nbsp;? Qu'est ce que ça veut dire pour mon site&nbsp;? Faut-il s'y mettre&nbsp;? Et surtout, comment s'y mettre&nbsp;?

Dans cet article, je me contenterai d'une bref description du concept, étant donné que le sujet a déjà été couvert à de maintes reprises. Je me concentrerai plutôt sur le fonctionnement des Services Workers et en quoi ceux-ci peuvent améliorer l'expérience de vos utilisateurs<span aria-hidden="true">&sdot;rices</span>.

## Intercepter les requêtes HTTPs

Maintenant que nous sommes capables d'installer un Service Worker sur notre page, il est temps de lui faire faire des choses. Une fonctionnalité phare de cette technologie est la possibité d'intercepter des requêtes. Pour cela, il faut se brancher à un nouvel évènement du côte du Service Worker&nbsp;: `fetch`.

```js
// fichier /service-worker.js

// On se branche sur chaque requête émise
self.addEventListener("fetch", event => {
  const requestUrl = new URL(
    event.request.url
  )
  // On ne touche qu'aux URLs qu'on
  // maîtrise !
  if (requestUrl.pathname === "/toto") {
    // On modifie la réponse
    event.respondWith(
      // Pour renvoyer "Hello world"
      new Response(
        new Blob(
          ["Hello world"],
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
    )
  }
})
```

```js
// fichier /index.js

// On n'oublie pas d'enregistrer
// le Service Worker
if ("serviceWorker" in navigator) {
  // On essaye d'enregistrer le Service
  // Worker
  navigator.serviceWorker
    .register("/service-worker.js");
}

// Et dans le code de l'application
// on fait une requête vers une URL
fetch('/toto')
  .then(response => response.text())
  .then(body => console.log(body))
```

La première fois que vous chargerez la page, vous irez chercher l'URL en question sans passer par le Service Worker. En effet, celui-ci n'a vraisemblablement pas eu le temps de s'installer avant de faire votre requête. Cependant, après avoir rafraîchi votre page, celle-ci sera bien interceptée et affichera dans votre console "Hello world".

Rappelez vous donc que votre application devra toujours fonctionner même lorsque votre Service Worker n'est pas disponible. Ce n'est pas uniquement parce que tous les navigateurs ne supportent pas cette fonctionnalité. C'est aussi parce qu'il sera toujours difficile d'anticiper les différents cas dans lesquels vous pourriez tomber, même sur la dernière version des navigateurs.

### Ne pas intercepter n'importe quoi

Par ailleurs, il est vraiment très important de ne toucher qu'aux URLs que vous maîtrisez. Sinon, vous pourriez vous retrouver à débugger des choses innattendues. Imaginons un instant que nous n'avons pas mis de filtre et que nous interceptons *toutes* les requêtes. Au rafraîchissement de la page, la requête de la page HTML est donc interceptée par le Service Worker en place et est remplacée par "Hello world". Il n'y a donc plus de balise `<script src="/index.js"></script>`. Et donc on ne va plus chercher le nouveau service worker. Cela bloque la mise à jour et on est donc coincé avec notre éternel "Hello world". Oops.
TODO VERIFIER MES DIRES

Vous développeur<span aria-hidden="true">&sdot;euse</span>, lorsque vous mettrez en place votre propre Service Worker, croyez-moi, vous perdrez du temps sur ce genre d'erreurs. Heureusement, les [DevTools de vos navigateurs](https://jakearchibald.github.io/isserviceworkerready/#debugging) sont là vous aider à repartir d'un état stable&nbsp;:
* Sur Firefox, ouvrez un nouvel onglet à l'URL `about:debugging#workers` et cliquez sur `unregister` sur le service worker qui vous intéresse.
* Sur Chrome, dans les DevTools (F12), allez dans l'onglet `Application` > ``Service Workers` et cliquez sur `Unregister`.

Cependant, pour les utilisateurs<span aria-hidden="true">&sdot;rices</span> de votre site, il n'y aura pas de solution miracle. Attention !

### Intercepter pour mettre en cache

Grâce à la partie précédente, nous sommes capables d'intercepter des requêtes. Cependant, faire en sorte qu'elles retournent des données totalement décoréllées de la réalité n'est pas forcément très util. Il serait beaucoup plus intéressant de pouvoir mettre en cache des requêtes et en ressortir le résultat plus tard&nbsp;!

#### Cache API

Pour ce faire, il y a la [Cache API](https://developer.mozilla.org/fr/docs/Web/API/Cache) disponible via la variable `caches` dans vos scripts JavaScript (que ce soit du côté de la page Web ou du Service Worker). L'idée derrière cette API est de pouvoir stocker une réponse pour une requête donnée. Ainsi, quand on recoit une nouvelle requête, on peut vérifier s'il y a déjà une réponse stockée ou non.

```js
// Stockage d'une réponse pour
// une requête spécifique
// https://developer.mozilla.org/fr/docs/Web/API/Cache/put
cache.put(
  request,
  response.clone()
)

// Récupération d'une requête
// depuis le cache
// https://developer.mozilla.org/fr/docs/Web/API/Cache/match
cache.match(request)

// Suppression d'un élément
// du cache
// https://developer.mozilla.org/fr/docs/Web/API/Cache/delete
cache.delete(request)
```

A noter qu'on a bien fait attention à cloner la requête avant de la stocker (`.clone()`). Cela permet d'éviter tout effet de bord lors de la récupération du corps de la requête (cf. [Response.clone() sur MDN](https://developer.mozilla.org/en-US/docs/Web/API/Response/clone)).

Un deuxième point à noter est qu'il est possible de séparer les différents de types de cache. Cela permet par exemple facilement vider le cache de manière ciblée lorsque c'est nécessaire. Il est par exemple souvent pertinent de séparer le cache des *assets* du cache des *requêtes API*.

> Lexique&nbsp;: Je vais régulièrement parler d'*assets* et de *requêtes API*. Dans le cadre de cet article, il faudra comprendre ces termes comme suit&nbsp;:
> * **Asset**&nbsp;: tout fichier statique permettant d'afficher votre page web (javascript, css, images, etc.)  
> * **Requête API**&nbsp;: toute requête qui permet de récupérer le contenu dynamique de la page. Généralement il s'agit d'objets JSON, mais ça peut être des blocs HTML, du GraphQL, etc.

Pour ouvrir une partie du cache, il faut procéder de la manière suivante&nbsp;:

```js
caches.open("Nom du cache")
  .then(cache => {
    // Ici on a accès aux méthodes
    // cache.put et cache.match 
  })
```

#### Mise en place du cache des requêtes

Nous sommes maintenant capables d'intercepter une requête et de manipuler le cache des Services Workers. Il faut donc mélanger un peu tout ça pour améliorer l'expérience de nos utilisateurs. Le but ici est de permettre aux utilisateurs d'accéder au site même s'il est hors ligne en lui donnant accès aux informations qu'il a déjà réussi à récupérer lors de ses visites précédentes (ou avant que le WiFi saute <span aria-hidden="true">¯\\_(ツ)_/¯</span>). 

Pour cela il existe moult stratégies. Globalement, cela dépend beaucoup de ce qui est bon pour votre application, mais [les principales stratégies](https://jakearchibald.com/2014/offline-cookbook/#serving-suggestions-responding-to-requests) sont&nbsp;:
* Network Only : on ne veut pas de cache car l'opération est critique/ne peut pas fonctionner hors ligne.
* Cache First : on récupère en priorité depuis le cache. Si ce n'est pas dispo, on va chercher sur le réseau et on stocke la réponse dans le cache.
* Network First : on récupère en priorité depuis le réseau. Si ce n'est pas dispo, on va chercher dans le cache.
* Stale While Revalidate : on récupère le cache et on l'envoie. Et on en profite pour mettre à jour le cache pour la prochaine utilisation.

Ces méthodes sont disponibles dans [Workbox](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-sw.Strategies#methods).

Chaque stratégie a ses avantages et ses inconvénients. Pour choisir laquelle est la bonne, demandez vous si vous préférez que l'utilisateur ait un accès hyper rapide à la ressource demandée ou s'il est important que la ressource soit fiable. La rapidité passe par le cache en premier. La fiabilité passe par le réseau en premier.

#### Cas d'application&nbsp;: Cache First

Afin de bien comprendre comment ça fonctionne, voici une implémentation possible de la stratégie *Cache First*.

> *<span aria-hidden="true">/!\\</span> Attention, pavé !*

```js
const ASSETS_CACHE_NAME = 'assets'

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
      return cache.match(request)
    })
}

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
        // On n'oublie pas de .clone()
        // comme dit précédemment
        response.clone()
      )
    })
}

// Mise en place de la stratégie 
// Cache First pour la requête
// donnée
const getResponseFromCacheFirst = (cachename, request) => {
  // Cette méthode permet de récupérer la
  // réponse d'une requête. Si celle-ci est
  // déjà en cache, on répond avec le cache
  // en priorité. Sinon, on fait la requête,
  // on met en cache la réponse, puis on
  // renvoie la réponse.

  // Récupération depuis le cache
  const response = getResponseFromCache(
    ASSETS_CACHE_NAME,
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
            // réponse, on met en cache la
            // met en cache pour la
            // prochaine fois
            setResponseCache(
                ASSETS_CACHE_NAME,
                request,
                response
            )
        
            // Et on retourne la réponse
            return response
          });
        }
    })

  return response
}

self.addEventListener("fetch", event => {
  const requestUrl = new URL(
    event.request.url
  );

  // Le but ici est de transformer la
  // requête uniquement pour les assets
  // Rappel: on ne touche qu'à ce qu'on
  // maîtrise
  if (requestUrl.pathname.startsWith("/assets")) {
    // Puis on renvoie la réponse avec la
    // méthode voulue
    event.respondWith(
      getResponseFromCacheFirst(
          ASSETS_CACHE_NAME,
          event.request
      )
    )
  }
})
```

Et voilà, on a mis en place notre première stratégie de cache&nbsp;! <span aria-label="Chouette !">:)</span>

Pour vérifier que vous avez bien compris le fonctionnement de ce code, un bon exercice serait de le reprendre et d'implémenter [une autre stratégie](#mise-en-place-du-cache-des-requetes).

#### Mettre à jour le cache

Nous avons donc notre site qui est en place et qui intercepte des requêtes et les mets en cache. Le problème c'est que du cache, ça finit toujours pas s'invalider. Quand cela se produit, il faut le supprimer via `cache.delete()`. Mais comment savoir où et quand le faire&nbsp;?

Comme d'habitude, la réponse est&nbsp;: ça dépend. En effet, si c'est une requête API ou un asset, vraisemblablement, ce sera très différent.

Les assets, par exemple, ont de fortes chances d'être mis à jour au même moment que le Service Worker. L'idée est alors de tenir une liste de tous les assets à aller récupérer lors de l'installation de votre nouveau Service Worker.

Au contraire, si des requêtes API ont été mises en cache, le sujet devient tout de suite beaucoup plus complexe. C'est tout un système de synchronisation qu'il faut mettre en place si on veut être sûr d'avoir toujours la dernière version. C'est donc un sujet assez complexe qui méritera un article à lui tout seul.

Ici je vais me contenter de vous expliquer une implémentation possible pour la mise en cache de fichiers statiques&nbsp;:

```js
const ASSETS_CACHE_NAME = 'assets'

// On recense l'ensemble des assets
// dans une variable. Vraisemblablement
// c'est sûrement quelque chose
// que vous voudrez construire
// automatiquement à la compilation
// de vos fichiers
const assetsList = [
  "/static/css/main.ez84s6df.css",
  "/static/js/main.aze4sd31.js",
];

// Méthode permettant de s'assurer
// qu'un asset est bien mis en cache
const cacheAsset = (url) => {
  // On met en cache dans un cache
  // dédié aux assets
  return caches.open(ASSETS_CACHE_NAME)
    .then(cache => {
      // On vérifie si l'asset est déjà
      // en cache (ex: déjà utilisé
      // dans le précédent Service Worker)
      const request = new Request(url);

      return cache.match(request)
        .then(response => {
          if (!response) {
            // Si pas de cache existant
            // on récupère l'asset
            return fetch(request)
              .then(
                response => {
                  // Et on la met en cache
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

// Méthode permettant de supprimer toute
// requête mise en cache qui ne fait plus
// partie de assetsList
const removeUnusedAssets = () => {
  return caches.open(ASSETS_CACHE_NAME)
    .then(cache => {
      // On récupère toutes les requêtes
      // stockées dans le cache
      return cache.keys().then(requests => {
        return Promise.all(
          requests
            .filter(request => {
              const requestUrl = new URL(request.url)
              // On ne s'occupe pas des requêtes
              // qui doivent toujours être
              // mises en cache
              return assetsList.indexOf(requestUrl.pathname) === -1
            })
            .map(request => {
              // Cette requête n'est plus utile
              // On peut donc la supprimer du cache
              return cache.delete(request)
            })
      })
}

self.addEventListener("install", event => {
  // On considère qu'un Service Worker est
  // installé une fois que tous les assets
  // ont été mis en cache
  event.waitUntil(
    Promise.all(
      assetsList.map(url => cacheAsset(url))
    )
  )
});

self.addEventListener("activate", event => {
  // Une fois qu'un Service Worker est utilisé
  // il faut penser à nettoyer le cache
  // pour qu'il ne grossisse pas indéfiniment
  event.waitUntil(
    removeUnusedAssets()
  )
});
```

Cette implémentation est plus complexe que ce que vous allez habituellement trouver sur [les ressources sur le sujet](https://makina-corpus.com/blog/metier/2016/decouvrir-le-service-worker). En effet, souvent, c'est plutôt le nom de cache qui va changer et on va supprimer tous les autres caches (cf. [`CacheStorage.delete`](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage/delete#Examples)).

Cependant l'avantage avec l'implémentation que je vous ai montré est qu'elle économise des requêtes serveur. On ne veut pas chercher deux fois la même URLs. L'inconvénient, par contre, c'est qu'on considère que si une URL mise en cache a le même nom, c'est qu'elle n'a pas changée. Il faut donc bien faire attention à utiliser la bonne implémentation au bon moment.

Par ailleurs, vous pouvez noter qu'on attend dans les deux cas que la gestion du cache soit finie (`event.waitUntil`) avant de considérer qu'une étape est finie. Ce n'est absoluement pas obligatoire et il est tout à fait envisageable de considérer par exemple que la suppression du vieux cache n'a pas d'impacte sur le Service Worker.

### Intercepter pour proposer un contenu alternatif en hors ligne

Nous sommes maintenant capables de mettre en place tout un mécanisme de cache pour servir du contenu qu'on a déjà récupéré. Cependant, comment faire pour afficher une page lorsqu'il n'y a plus de connexion internet et qu'on n'a pas son contenu dans nos caches ?

Encore une fois plusieurs solutions possibles&nbsp;:
* Si c'est directement la page HTML que vous essayez d'afficher, vous pouvez retourner un contenu alternatif qui permet d'expliquer à l'utilisateur ce qui se passe
    ```js
    // fichier : service-worker.js
    self.addEventListener("fetch", event => {
      event.respondWith(
        fetch(event.request)
          .catch(error => {
            return caches.match(OFFLINE_URL)
          })
      )
    })
    ```
* Si c'est une requête API ou quelque chose qui est demandé par du code JavaScript&nbsp;: prévoyez une gestion d'erreur là où la ressource est demandée. Cela rend votre code plus robuste à une majorité d'utilisateurs.
    ```
    // fichier : index.js
    fetch("/toto")
      .then(successHandler)
      .catch(failureHandler)
    ```

Sources complémentaires&nbsp;:
* [L’argumentaire commercial pour les Progressive Web Apps](https://frank.taillandier.me/2016/08/09/argumentaire-commercial-pour-les-progressive-web-apps/) par [Frank Taillandier](https://frank.taillandier.me).
* [The Service Worker Lifecycle](https://bitsofco.de/the-service-worker-lifecycle/) par [Ire Aderinokun](https://ireaderinokun.com/)
* []