Le terme **Progressive Web Apps** (ou PWA) vient de [Frances Berriman](https://fberriman.com/2017/06/26/naming-progressive-web-apps/) et [Alex Russel](https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/). Le but derrière ce nouveau mot est de promouvoir une façon de penser et de concevoir des sites webs. Ce n'est donc pas une technologie. Le but de ce terme est purement marketing afin de convaincre les gens de faire mieux&nbsp;: s'il apparaît dans tous les fils de discussion, on est bien obligé de s'y intéresser à un moment ou à un autre. Et ils y arrivent plutôt bien. On le voit **partout**.

Voici donc une série d'articles où j'essaierai de vous présenter ce que c'est et surtout comment le mettre en place pour vos utilisateurs. Accrochez-vous, ça fait pas mal de choses à découvrir&nbsp;:
1. <a href="/fiches-techniques/pwa-rendre-un-site-web-disponible-grace-aux-services-workers/">Rendre un site web disponible grâce aux Services Workers</a>
2. <a href="/fiches-techniques/pwa-declarer-un-service-worker-et-gerer-son-cycle-de-vie/">Déclarer un Service Worker et gérer son cycle de vie</a>
3. <a href="/fiches-techniques/pwa-intercepter-les-requetes-HTTP-et-les-mettre-en-cache/">Intercepter les requêtes HTTP et les mettre en cache</a>
4. <a href="/fiches-techniques/pwa-proposer-une-experience-hors-ligne/">Proposer une expérience hors ligne</a> (Vous êtes ici.)

Dans les articles précédents, je me suis concentré sur tous les détails techniques qui sont importants à savoir pour mettre en place son propre Service Worker et mettre en cache des requêtes.

Cependant, malgré certains points très pointilleux, je suis resté très théorique en expliquant les choses de manière très générale. Peut-être donc que certains points vous paraissent encore flous et vous ne voyez pas comment réellement appliquer ça sur votre site. Peut-être que vous ne voyez pas réellement comment cela peut être une bonne chose pour vos utilisateurs.

Dans ce dernier article de cette série sur les PWAs, nous allons donc construire une expérience hors ligne de A à Z en nous concentrant sur deux points&nbsp;:
* Comment afficher du contenu alors que l'utilisateur est hors ligne&nbsp;?
* Comment permettre à l'utilisateur de soumettre des informations (un formulaire) tandis qu'il est hors ligne&nbsp;?

## Quel genre de site&nbsp;?

Pour mettre en pratique tout ça, je vous propose d'améliorer le site de *Fred & Alex*. Ce sont deux personnes passionnées par la cuisine qui répartissent leur temps sur deux activités&nbsp;:
* rédaction de recettes et d'astuces de cuisine
* cours de cuisine dans un village pas très connu

Leur site est ainsi constitué d'un espace de blog pour recenser leurs explorations culinaires et d'un espace de contact qui permet aux éventuels intéressés de réserver des cours et récupérer les informations nécessaires pour aller sur place. La stack technique est un site en PHP (équivalent d'un Wordpress). Rien de très fou, mais ça fait le boulot&nbsp;!

Le budget que *Fred & Alex* souhaitent investir dans l'amélioration de leur site n'est pas exorbitant. Investir leur temps et leur argent dans du contenu de qualité leur paraît plus important.

Cependant, il y a tout de même un petit problème&nbsp;: leur bout de campagne n'est très connecté en terme de réseau. De ce fait, régulièrement, les élèves arrivent en retard parce que c'est mal indiqué sur le GPS et que la connexion internet fait que **le plan disponible sur le site est inaccessible une fois sur place**. Ce n'est pas bien grave, mais ça serait pas mal si ça pouvait être amélioré. Cela détendrait tout le monde.

De plus, il y a régulièrement des retours de personnes qui n'arrivent pas à prendre rendez vous sur le site. Celles-ci finissent par appeler parce que ça ne marche pas. Cependant, impossible de savoir combien abandonnent au lieu d'appeler. Après avoir regardé de plus près, ça ne vient pas du serveur, mais bien d'**un souci de connexion qui les empêche d'envoyer le formulaire**.

Notre mission, si on l'accepte, est de proposer des solutions à ces problèmes.

En réalité, *Fred & Lucy* n'existent pas. Cependant, cela va nous donner une base pour savoir quelles stratégies implémenter quand on aura des décisions à prendre plus tard.

## Afficher une page alternative en mode hors ligne

Maintenant que nous savons un peu plus où nous allons mettre les pieds, essayons de répondre à la première problématique&nbsp;: **le plan disponible sur le site est inaccessible une fois sur place**.

Ainsi, notre but ici, ne sera pas d'améliorer les performances avec du cache bien pensé, etc. Le but sera d'afficher une page qui a le minimum de contenu nécessaire pour satisfaire les utilisateurs<span aria-hidden="true">&sdot;rices</span>&nbsp;:
* Un message clair qui explique le fait qu'on est en mode hors ligne
* Les informations de contact (téléphone, mail, plan d'accès, etc.)

Pour faire cela, nous allons mettre en place un Service Worker afin de&nbsp;:
* télécharger la page offline
* afficher la page hors ligne si nécessaire

### Mise en cache de la page hors ligne

Commençons donc par télécharger la page hors ligne. A l'image de ce que nous avions vu dans [la deuxième partie de cette série d'article](/fiches-techniques/pwa-declarer-un-service-worker-et-gerer-son-cycle-de-vie/), le but sera de télécharger la page à l'initialisation du Service Worker. Ainsi, pour toute utilisation future, si Internet nous manque, la page sera disponible.

Pour cela, on considérera que tous les fichiers liés à la page sont dans un dossier `/offline`.

```js
// fichier /service-worker.js

// On utilise un nom de cache pour faciliter
// le nettoyage du vieux cache
const OFFLINE_CACHE_NAME = "offline-v2"

// On répertorie tout ce dont on a besoin
// pour afficher la page hors ligne
const offlineAssets = [
  '/offline/index.html',
  '/offline/css/style.css',
  '/offline/js/script.js',
  '/offline/img/logo.png'
]

const cacheAsset = (cache, url) => {
  const request = new Request(url)

  return fetch(request).then(response => {
    cache.put(request, response.clone())
  })
}

// A l'installation, on met en cache toutes les urls
// nécessaires à l'affichage de la page hors ligne
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(OFFLINE_CACHE_NAME).then(cache => {
      return Promise.all(
        offlineAssets.map(url => cacheAsset(cache, url))
      )
    })
  );
});

// A l'activation, on retire les anciens caches qui
// ne nous sont plus utile
self.addEventListener("activate", event => {
  caches.keys().then(cacheNames => {
    cacheNames
      .filter(cacheName => cacheName !== OFFLINE_CACHE_NAME)
      .forEach(cacheName => {
        caches.delete(cacheName)
      })
  })
});
```

Plusieurs choses à noter ici&nbsp;:
1. On fait au plus simple pour gérer la mise à jour des caches
2. On ne gère pas manuellement l'activation du Service Worker

### Affichage de la page hors ligne

Maintenant, le but est d'afficher la page hors ligne si une requête échoue. 

```js
const getOfflineEntrypoint = () => {
  return caches.open(OFFLINE_CACHE_NAME).then(cache => {
    return cache.match(offlineEntrypoint);
  });
};

const getOfflineAsset = request => {
  return caches.open(OFFLINE_CACHE_NAME).then(cache => {
    return cache.match(request);
  });
};

const shouldDisplayOfflinePage = requestUrl =>
  requestUrl.pathname.endsWith("/fred-lucy/")

self.addEventListener("fetch", event => {
  const requestUrl = new URL(event.request.url);
  if (shouldDisplayOfflinePage(requestUrl)) {
    if (!navigator.onLine) {
      event.respondWith(getOfflineEntrypoint());
    }
  }
});
```

https://developer.mozilla.org/fr/docs/Web/API/Document/ononline

https://caniuse.com/#search=online

Le problème, c'est que si l'on fait ça, on va constater que malgré le fait qu'on affiche la bonne page HTML pour la page hors ligne, les assets liés ne correspondent pas.

Cela vient du fait qu'ils sont en cache, mais que les requêtes liées ne sont aps interceptées.

```js
self.addEventListener("fetch", event => {
  const requestUrl = new URL(event.request.url);
  if (shouldDisplayOfflinePage(requestUrl)) {
    if (!navigator.onLine) {
      event.respondWith(getOfflineEntrypoint());
    }
  } else if (offlineAssets.indexOf(requestUrl.pathname) > -1) {
    event.respondWith(getOfflineAsset(event.request));
  }
});
```

Cool. Si hors ligne, ca marche. Mais quid si sa connexion est pas top ? (flaky wifi)

```js
self.addEventListener("fetch", event => {
  const requestUrl = new URL(event.request.url);
  if (shouldDisplayOfflinePage(requestUrl)) {
    if (!navigator.onLine) {
      event.respondWith(getOfflineEntrypoint());
    } else {
      event.respondWith(
        fetch(event.request).catch(error => {
          if (isNetworkError(error)) {
            return getOfflineEntrypoint();
          }
        })
      );
    }
  } else if (offlineAssets.indexOf(requestUrl.pathname) > -1) {
    event.respondWith(getOfflineAsset(event.request));
  }
});
```

## Synchronisation quand on revient en ligne

Ajoutons un formulaire de contact

```html
<form method="POST" action="/contact">
  <textarea name="content"></textarea>
  <button type="submit">Envoyer</button>
</form>
```

Lorsque l'on est hors ligne, le but sera donc d'intercepter la requête pour ne pas la perdre et la renvoyer quand on est de retour en ligne

```js
self.addEventListener("fetch", event => {
  const requestUrl = new URL(event.request.url);
  if (isContactSubmission(requestUrl)) {
    console.log(event.request)
  }
})
```

https://wicg.github.io/BackgroundSync/spec/

https://platform-status.mozilla.org/#background-sync