Le terme Progressive Web Apps (PWA) vient de [Frances Berriman](https://fberriman.com/2017/06/26/naming-progressive-web-apps/) et [Alex Russel](https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/). Le but derrière ce nouveau mot est de promouvoir une façon de penser et de concevoir des sites webs. Ce n'est donc pas une technologie. Le but de ce terme est purement marketing afin de convaincre les gens de faire mieux&nbsp;: s'il apparaît dans tous les fils de discussion, on est bien obligé de s'y intéresser à un moment ou à un autre. Et ils y arrivent plutôt bien. On le voit **partout**.

Voici donc une série d'articles où j'essaierai de vous présenter ce que c'est et surtout comment le mettre en place pour vos utilisateurs. Accrochez-vous, ça fait pas mal de choses à découvrir&nbsp;:
1. <a href="/fiches-techniques/pwa-rendre-un-site-web-disponible-grace-aux-services-workers/">Rendre un site web disponible grâce aux Services Workers</a>
2. <a href="/fiches-techniques/pwa-declarer-un-service-worker-et-gerer-son-cycle-de-vie/">Déclarer un Service Worker et gérer son cycle de vie</a> (Vous êtes ici.)
3. <a href="/fiches-techniques/pwa-intercepter-les-requetes-HTTP-et-les-mettre-en-cache/">Intercepter les requêtes HTTP et les mettre en cache</a>
4. Proposer une expérience hors ligne (à paraître)

Dans l'article précédent, je présentais ce que signifie PWA et en quoi un Service Worker peut nous aider à rendre une application *disponible*. C'était une présentation très théorique. Nous allons maintenant pouvoir attaquer à l'implémentation technique.

Dans cet article, je vous présenterai comment déclarer votre premier Service Worker et comment gérer sa mise à jour en parlant du cycle de vie. A la fin de cet article, vous devriez donc être bien armé<span aria-hidden="true">&sdot;e</span> pour utiliser un Service Worker en production. [Tous les exemples liés à cette problématique sont disponibles sur le dépôt git de ce blog.](https://github.com/JulienPradet/blog-posts/tree/master/src/content/fiches-techniques/pwa-declarer-un-service-worker-et-gerer-son-cycle-de-vie/examples) Si vous en avez l'occasion, je vous suggère de faire tourner les exemples en local. Cela vous permettra notamment de trifouiller dans le code et mieux visualiser les impacts de telle ou telle fonction.

Il faudra tout de même attendre les articles suivants pour mettre en place des choses utiles à vos utilisateurs<span aria-hidden="true">&sdot;rices</span> (mise en cache, mode hors ligne, etc.).

## Des outils pour se simplifier le travail

Avant de commencer, j'aimerais préciser que des outils sont entrain d'émerger pour simplifier la gestion de vos Service Workers. En tête, vous trouverez [Workbox](https://developers.google.com/web/tools/workbox/examples). Si vous cherchez une solution clé en main, ça peut être un bon point de départ.

Cependant, dans cet article nous n'allons pas utiliser de bibliothèque afin de comprendre comment ça fonctionne là dessous. Alors on se remonte les manches et on y va&nbsp;! <span aria-hidden="true">:)</span>

## HTTPS Only

La toute première chose à faire est de s'assurer que son site est bien en HTTPS. En effet, votre Service Worker ne sera pas accepté par le navigateur si vous êtes sur un site en HTTP. La seule exception est en `localhost` afin de faciliter le développement.

## Déclarer un Service Worker

Une fois que c'est fait, on va pouvoir enregistrer notre premier Service Worker.

Pour [rappel](/fiches-techniques/pwa-rendre-un-site-web-disponible-grace-aux-services-workers/), un Service Worker est un bout de code qui va tourner à côté de votre site, sur le navigateur de vos utilisateurs<span aria-hidden="true">&sdot;rices</span>. Cependant, le point de départ reste votre page HTML. Il va donc falloir insérer un script qui demandera l'initialisation du Service Worker. 

Ainsi, dans les exemples de code que je mettrai par la suite, je préciserai quel est le fichier concerné&nbsp;:
* **`script.js`**&nbsp;: le script inséré dans votre page HTML (ex&nbsp;: `<script src="/script.js"></script>`)
* **`service-worker.js`**&nbsp;: le script qui contient le code executé par le Service Worker

```js
// fichier : script.js

// Avant d'utiliser un Service Worker,
// on vérifie que c'est possible.
if ("serviceWorker" in navigator) {
  // Puis on déclare celui-ci
  // via la fonction `register`
  navigator.serviceWorker
    .register("/service-worker.js")
    .then(registration => {
      // On a réussi ! Youpi !
      console.log(
        "App: Achievement unlocked."
      );
    })
    .catch(error => {
      // Il y a eu un problème
      console.error(
        "App: Crash de Service Worker",
        error
      );
    });
} else {
  // Si le navigateur ne permet pas
  // d'utiliser un Service Worker
  // on ne fait rien de particulier.
  // Le site devrait continuer à
  // fonctionner normalement.
}
```

```js
// fichier : service-worker.js

console.log(
  "SW: Il se passe quelque chose ici !"
);
```

[Retrouvez cet exemple ici.](https://github.com/JulienPradet/blog-posts/tree/master/src/content/fiches-techniques/pwa-declarer-un-service-worker-et-gerer-son-cycle-de-vie/examples/src/declaration)

Si exécutez cet exemple pour la première fois dans votre navigateur, vous verrez dans votre console les messages "`App: Achievement unlocked.`" et "`SW: Il se passe quelque chose ici !`". Voici venu votre premier premier Service Worker&nbsp;! Si ce n'est pas le cas, [renseignez vous sur votre navigateur](https://jakearchibald.github.io/isserviceworkerready/) pour vérifier que votre navigateur supporte bien les Service Workers. Si c'est bien le cas, pensez à désactiver (`unregister`) tout Service Worker qui serait enregistré sur cette page avant de rafraîchir.

Maintenant, rafraîchissez votre page. Dans la console, il n'y a plus que "`App: Achievement unlocked.`". C'est là que commence la magie (et les ennuis).

## Gérer son cycle de vie

En fait, pour comprendre pourquoi la page ne se comporte pas de la même façon au rafraîchissement, il faut se rappeler qu'un Service Worker est une entité séparée de la page web&nbsp;: même si on ferme la page à l'origine du Service Worker, celui-ci va continuer de s'executer en tâche de fond. Cela veut dire notamment que si l'on recharge la page, il y a aura déjà un Service Worker en cours d'execution. Le navigateur va alors en profiter pour brancher cette nouvelle page au Service Worker existant plutôt que d'en lancer un nouveau. Et donc, il n'y a que le script de la page qui s'exécute&nbsp;: une seule ligne de log.

Comment faire alors pour rafraîchir un Service Worker&nbsp;? Il y a [plusieurs façons de déclencher une mise à jour](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#updates) (techniquement, en anglais, on parle d'`update`), mais le plus simple est de se dire que ce sera à chaque fois qu'on recharge/change de page.

Cependant, cette mise à jour se déclenchera *uniquement* si le fichier demandé par `register` a été modifié. Le navigateur va donc télécharger le nouveau fichier et faire une comparaison octet par octet (*byte by byte*). Si le moindre octect change, le Service Worker est mis à jour.

Mais la mise jour n'est pas si simple dans les faits. En effet, si la page web en cours d'éxecution est déjà liée à un Service Worker, comment lui assigner un nouveau Service Worker sans tout casser&nbsp;? Si on change de Service Worker, il y a des chances que certaines choses ne fonctionnent plus comme avant. On doit certainement faire des actions pour que la page soit capable de gérer le nouveau Service Worker. [Le navigateur ne prendra donc pas cette décision seul.](https://extensiblewebmanifesto.org/)

Le but de cette partie sera donc d'expliquer comment il est possible de gérer ces mises à jour. Dans un premier temps, nous verrons quelles sont les différentes étapes par lesquelles passe un Service Worker. Puis, nous verrons comment prendre la décision d'activer ou non un nouveau Service Worker.

### Les différentes phases d'un Service Worker

Tout d'abord, parlons des différentes étapes, dites **cycle de vie**, d'un Service Worker.

La première est l'**installation**. Avant de lier un Service Worker a une page, on va le bichonner pour qu'il soit opérationnel dès qu'il sera lié à une page web. C'est par exemple le moment de mettre en cache ce qui doit l'être.

Une fois l'installation terminée, le Service Worker passe à la deuxième étape&nbsp;: **la phase d'attente**. En effet, s'il y a déjà un Service Worker dans la phase suivante, il va gentiment patienter jusqu'à ce que la place se libère. S'il n'y a personne devant lui, le Service Worker passe directement à la suite.

Enfin, le Service Worker arrive à la dernière étape&nbsp;: il est **activé**. Cela veut dire que toute nouvelle page web viendra se brancher automatiquement à ce Service Worker. Il sera alors possible de profiter des fonctionnalités telles que l'interception de requêtes HTTP ou des échanges de messages. C'est l'état à partir du quel un Service Worker devient utile.

[Retrouvez le très bon schéma explicatif de Jake Archibald sur Google Developers.](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#updates) Malheureusement il ne fonctionne pas sur Firefox. Pensez donc à essayer sur un autre navigateur.

### Se brancher au cycle de vie

Comment faire pour visualiser tout ça avec du code&nbsp;? Il y a deux façon d'y parvenir&nbsp;:
* depuis la page web
* depuis le Service Worker

#### Depuis la page web

Depuis la page web, cela est possible en récupérant les informations depuis l'objet qui recense les Service Workers : [`registration`](https://developer.mozilla.org/fr/docs/Web/API/ServiceWorkerRegistration). Celui-ci est le résultat de la promesse issue de `navigator.serviceWorker.register` ou de `navigator.serviceWorker.getRegistration`.

Sur cet objet [`registration`](https://developer.mozilla.org/fr/docs/Web/API/ServiceWorkerRegistration), nous avons accès aux clés `installing`, `waiting` et `active` qui contiennent les Service Workers correspondants.

Ainsi, si l'on veut par exemple savoir si un nouveau Service Worker est entrain de s'installer, il est possible de se brancher à l'évènement `updatefound` dans `registration` et récupérer la valeur de `installing` (cf. `(1)` dans le code ci-dessous).

De plus, si l'on veut savoir quand est-ce que ce nouveau Service Worker passe à l'étape suivante, on peut le faire en écoutant l'évènement `statechange` (cf. `(2)` dans le code ci-dessous).

```js
// fichier : /script.js

if ("serviceWorker" in navigator) {
  // On essaye d'enregistrer le service
  // worker
  navigator.serviceWorker
    .register("/service-worker.js")
    .then(registration => {
      // Le Service Worker a fini d'être
      // téléchargé.
      console.log(
        "App: Téléchargement fini."
      );

      // (1) A chaque fois qu'il y a une
      // mise à jour des Service Workers
      registration.addEventListener(
        "updatefound",
        () => {
          // (1) On récupère le Service
          // Worker en cours
          // d'installation
          const newWorker =
            registration.installing;
          // `registration` a aussi
          // les clés `active` et 
          // `waiting` qui permettent
          // de récupérer les Service
          // Workers correspondant

          // (2) A chaque fois que le
          // Service Worker en cours
          // d'installation change
          // de statut
          newWorker.addEventListener(
            "statechange",
            () => {
              // (2) On affiche son
              // nouveau statut
              console.log(
                "App: Nouvel état :",
                newWorker.state
              );
            }
          );
        }
      );
    })
    .catch(err => {
      // Il y a eu un problème
      console.error(
        "App: Crash de Service Worker",
        err
      );
    });
}
```

[Retrouvez cet exemple ici.](https://github.com/JulienPradet/blog-posts/tree/master/src/content/fiches-techniques/pwa-declarer-un-service-worker-et-gerer-son-cycle-de-vie/examples/src/lifecycle/script.js)

Il est ainsi possible de récupérer n'importe quel Service Worker et d'écouter chacune de ses mises à jour depuis la page web.

#### Depuis le Service Worker

Du côté du Service Worker, c'est un poil moins alambiqué étant donné que c'est le Service Worker lui-même qui gère les phases d'installation et d'activation. Il n'y a donc pas besoin de `registration`, ni de toutes les complications qui vont avec.

Pour accéder aux différentes étapes du cycle de vie, nous avons directement accès aux évènements `install` (cf. `(1)`) et `activate` (cf. `(2)`).

```js
// fichier : /service-worker.js
console.log("SW: Téléchargement fini.");

// (1) Installation
self.addEventListener("install", event => {
    console.log("SW: Installation en cours.");

    // Un Service Worker a fini d'être
    // installé quand la promesse dans
    // `event.waitUntil` est résolue
    event.waitUntil(
        // Création d'une promesse
        // factice qui est résolue au
        // bout d'une seconde.
        // Nous verrons dans l'article
        // suivant par quoi remplacer
        // cette promesse
        new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log("SW: Installé.");
                resolve();
            }, 1000);
        })
    );
});

// (2) Activation
self.addEventListener("activate", event => {
    console.log("SW: Activation en cours.");

    // Un Service Worker a fini d'être
    // activé quand la promesse dans
    // `event.waitUntil` est résolue
    event.waitUntil(
        // Création d'une promesse
        // factice qui est résolue au
        // bout d'une seconde.
        // Nous verrons dans l'article
        // suivant par quoi remplacer
        // cette promesse
        new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log("SW: Activé.");
                resolve();
            }, 1000);
        })
    );
});
```

[Retrouvez cet exemple ici.](https://github.com/JulienPradet/blog-posts/tree/master/src/content/fiches-techniques/pwa-declarer-un-service-worker-et-gerer-son-cycle-de-vie/examples/src/lifecycle/service-worker.js)

Vous remarquerez toute fois qu'il n'y a pas d'évènement pour savoir quand un Service Worker est en attente. Cela dit, ce n'est par pour autant un problème parce que :
* un Service Worker en attente est par définition **en attente** et donc n'est pas censé faire d'opérations.
* un Service Worker en attente est un Service Worker qui a fini de s'installer. Il serait donc possible de le déduire à partir de la promesse passée à `event.waitUntil`.

Avec ces deux exemples de code, nous sommes donc capables de repérer n'importe quel évènement depuis le Service Worker.

Si le fonctionnement du cycle de vie de vos Service Workers n'est pas encore tout à fait clair, n'hésitez pas à executer les [bouts de code ci-dessus](https://github.com/JulienPradet/blog-posts/tree/master/src/content/fiches-techniques/pwa-declarer-un-service-worker-et-gerer-son-cycle-de-vie/examples/src/lifecycle/) dans votre navigateur. En modifiant le Service Worker, puis en rechargeant la page, vous pourrez lire dans votre console chacune des étapes.

### Activer un nouveau Service Worker

Maintenant que nous connaissons le cycle de vie d'un Service Worker, intéressons nous aux moyens de *gérer* ce cycle de vie. Plus exactement, voyons comment il est possible de mettre fin à une phase d'attente.

Tout d'abord, il faut toujours garder en tête qu'il n'y a pas de méthode universelle. Choisissez donc en fonction de vos besoins. Vous pouvez par exemple commencer par vous poser les questions suivantes (liste non-exhaustive)&nbsp;:

* **Est-ce que la mise à jour est mineure&nbsp;?**  
  Si oui, autant ne rien faire. La prochaine fois que l'utilisateur<span aria-hidden="true">&sdot;rice</span> visitera le site, le nouveau Service Worker se sera activé automatiquement.
* **Est-ce que l'arrivée des nouvelles fonctionnalités est primordiale&nbsp;?**  
  Si oui, forcez l'activation du Service Worker.
* **Le Service Worker actuel peut-il être interrompu&nbsp;?**  
  Si non, attendez qu'il ait fini ce qu'il est entrain de faire avant d'activer le nouveau.
* **Peut-on interrompre l'utilisateur<span aria-hidden="true">&sdot;rice</span>&nbsp;?**  
  Si non, proposez de mettre à jour mais ne faites pas d'activation automatique. C'est en particulier cette méthode que j'ai choisi sur ce blog afin de ne pas vous couper dans la lecture des articles.

Le cas le plus simple est donc de ne rien faire. Dans la mesure du possible, on essaiera donc de faire en sorte que nos mises à jour soient compatibles avec les anciennes versions des Service Workers. Si ce n'est pas possible, voyons ensemble comment implémenter les différentes options qui se présentent à nous&nbsp;:
* Forcer l'activation dès qu'un nouveau Service Worker est disponible
* Attendre le bon moment pour activer un nouveau Service Worker

#### Forcer l'activation d'un Service Worker

Forcer l'activation sans se poser de question est finalement le cas le moins complexe à mettre en place. Dans le Service Worker, il faut appeler la méthode `self.skipWaiting`&nbsp;:

```js
// fichier : /service-worker.js

self.addEventListener("install", event => {
  self.skipWaiting();
});
```
[Retrouvez cet exemple ici.](https://github.com/JulienPradet/blog-posts/tree/master/src/content/fiches-techniques/pwa-declarer-un-service-worker-et-gerer-son-cycle-de-vie/examples/src/skip-waiting/)

Ainsi, dès que le Service Worker a fini de s'installer, celui-ci s'active et saute la phase d'attente.

#### Attendre le bon moment pour activer un nouveau Service Worker

Si nous ne souhaitons pas être autoritaires et attendre le bon moment, l'idée générale va être de faire la même chose que ci-dessus&nbsp;: appeler `self.skipWaiting`. La seule différence est que l'on va décaler l'appel de cette méthode en attendant le moment propice. En particulier, nous allons voir ensemble comment afficher une notification à l'utilisateur et déclencher la mise à jour au clic.

Commençons donc par afficher la notification. Pour cela, il va falloir se brancher au cycle de vie pour n'afficher la notification lorsqu'un Service Worker a fini de s'installer. En reprenant donc ce qu'on a écrit plus haut à propos du cycle de vie, cela donne quelque chose de cet ordre&nbsp;:

```js
//fichier : /script.js

function displayNotification() {
  document
    .querySelector("#notification")
    .style.display = "block";
}

navigator.serviceWorker
  .getRegistration()
  .then(registration => {
    registration.addEventListener(
      "updatefound",
      () => {
        // On récupère le Service
        // Worker en cours
        // d'installation
        const newWorker =
          registration.installing;

        // On se branche à ses mises
        // à jour pour savoir quand
        // il a fini de s'installer
        newWorker.addEventListener(
          "statechange",
          () => {
            if (newWorker.state ===
                "installed") {
              // Un nouveau Service
              // Worker est prêt.
              // Donc on affiche la
              // notification
              displayNotification();
            }
          }
        );
      }
    );
  });
```

[Retrouvez cet exemple ici.](https://github.com/JulienPradet/blog-posts/tree/master/src/content/fiches-techniques/pwa-declarer-un-service-worker-et-gerer-son-cycle-de-vie/examples/src/notification/)

Une fois ceci fait, il devient possible de prévenir le Service Worker que l'utilisateur souhaite mettre à jour son Service Worker. Pour cela, dans la notification, nous allons afficher un bouton qui envoie un message au Service Worker en cours d'installation afin de lui demander de s'activer.

```js
// fichier : /script.js

// Au clic du bouton de notification
document.querySelector("#on-activation-request")
  .addEventListener("click", () => {
    // On récupère le Service Worker
    // qui a fini de s'installer
    // (waiting)
    navigator.serviceWorker
      .getRegistration()
      .then(registration => {
        // Et on lui envoie le
        // message d'activation
        registration.waiting
          .postMessage("skipWaiting");
      });
  });
```

```js
// fichier : /service-worker.js

// A chaque fois qu'on reçoit un
// message d'une page web
self.addEventListener("message", event => {
  // On vérifie si c'est un signal
  // d'activation
  if (event.data === "skipWaiting") {
    // Et si c'est le cas, on force
    // l'activation
    self.skipWaiting();
  }
});
```

[Retrouvez cet exemple ici.](https://github.com/JulienPradet/blog-posts/tree/master/src/content/fiches-techniques/pwa-declarer-un-service-worker-et-gerer-son-cycle-de-vie/examples/src/trigger-activation/)

Ainsi, si tout va bien, une fois que l'utilisateur clique sur le bouton, on voit apparaître dans la console les changements d'états du Service Worker qui finit par être activé.

### S'assurer du bon état de la page après activation

Nous sommes maintenant capables de nous brancher à n'importe quelle étape du cycle de vie d'un Service Worker et nous avons profité pour gérer nous-même ce cycle de vie et ainsi activer un Service Worker à la volée.

Cependant, l'activation à chaud pour une page peut-être plus délicate que ça. Il se peut par exemple que la page ne soit pas capable de gérer la nouvelle version du Service Worker. L'idée est alors de repérer le changement du Service Worker qui contrôle la page (`controllerchange`) et d'agir en conséquence&nbsp;:

```js
// fichier : /script.js

navigator.serviceWorker
  .addEventListener(
    "controllerchange",
    () => {
      // Ici, on peut mettre à niveau
      // notre page web.
      console.log("controller change");
    }
  );
```

Le plus souvent, la solution sera finalement de recharger la page malgré les inconvénients pour l'utilisateur<span aria-hidden="true">&sdot;rice</span>.

```js
// fichier : /script.js

navigator.serviceWorker
  .addEventListener(
    "controllerchange",
    () => {
      // Ici, on rafraîchit la page
      // pour repartir à zéro.
      window.location.reload();
    }
  );
```
[Retrouvez cet exemple ici.](https://github.com/JulienPradet/blog-posts/tree/master/src/content/fiches-techniques/pwa-declarer-un-service-worker-et-gerer-son-cycle-de-vie/examples/src/reload/)

Mais encore une fois, c'est certainement quelque chose qui demandera réflexion à la conception de votre Service Worker.

#### self.clients.claim

Il reste un coin d'ombre qui vous aura peut-être titillé si vous avez déjà eu l'occasion de lire d'autres articles sur le sujet des Service Workers et leur activation&nbsp;: `self.clients.claim()`. En effet, on parle souvent de cette fonctionnalité en disant qu'il faut la coupler avec un `self.skipWaiting`.

Le but de la fonction `self.clients.claim()` que l'on appelle généralement depuis un Service Worker fraîchement activé est de forcer l'utilisation de celui-ci dans toutes les pages ouvertes. Mais en vérité, il se passe déjà à peu près la même chose quand un Service Worker s'active.

Pour le mettre en évidence, voici un bout de code qui, au clic d'un bouton, envoie un message au Service Worker qui contrôle la page. Une fois reçu, le Service Worker l'affiche.

```js
//fichier : /script.js

// On ajoute un event listener
// sur le bouton
document.querySelector('#button')
  .addEventListener(() => {
    console.log('App: Click !');

    // Et quand il y a eu un clic,
    // on l'envoie au Service Worker
    // qui est entrain de contrôler
    // la page
    navigator.serviceWorker
      .controller
      .postMessage("Click !");
  })
```

```js
//fichier : /service-worker.js

// On fait en sorte que le Service
// Worker s'active automatiquement
self.addEventListener('install', event => {
  self.skipWaiting()
})

// On écoute tous les messages que
// l'on reçoit et on les affiche
self.addEventListener('message', event => {
  console.log("SW: Message reçu");
  console.log("SW:", event.data);
})
```

[Retrouvez cet exemple ici.](https://github.com/JulienPradet/blog-posts/tree/master/src/content/fiches-techniques/pwa-declarer-un-service-worker-et-gerer-son-cycle-de-vie/examples/src/claim-clients/)

Si vous cliquez sur le bouton avant que le Service Worker ait eu le temps de s'activer vous verrez le contenu de l'ancien Service Worker. Si vous cliquez sur le bouton après l'activation, vous verrez le message du nouveau Service Worker. Il y a donc bien eu un changement de contrôleur. C'est d'ailleurs vérifiable à l'aide de l'évènement `controllerchange`.

```js
// fichier : /script.js

navigator.serviceWorker
  .addEventListener(
    "controllerchange",
    () => {
      console.log("controller change");
    }
  );
```

C'est aussi visible dans [la spec' de l'activation d'un Service Worker (étape 7)](https://www.w3.org/TR/service-workers-1/#activation-algorithm).

Mais alors quelle différence avec [`self.clients.claim()`](https://www.w3.org/TR/service-workers-1/#dom-clients-claim) ? En fait, cette méthode, s'assure que **toutes** les pages ouvertes s'associent au Service Worker activé. Contrairement au `skipWaiting`, cela comprend **aussi** les pages qui n'ont pas encore de Service Worker activé. Typiquement, si c'est la première fois que vous chargez un site, il n'y a pas d'ancien Service Worker. Grâce à cette méthode, la page sera tout de même liée au Service Worker.

```js
//fichier : /service-worker.js

// On fait en sorte que le Service
// Worker se branche à **toutes**
// les pages
self.addEventListener('activate', () => {
  self.clients.claim()
})
```
[Retrouvez cet exemple ici.](https://github.com/JulienPradet/blog-posts/tree/master/src/content/fiches-techniques/pwa-declarer-un-service-worker-et-gerer-son-cycle-de-vie/examples/src/claim-clients/)

Ainsi, même si elle n'est pas obligatoire, puisqu'une page sans Service Worker doit continuer de fonctionner, elle peut vous être utile si vous voulez vous **assurer** qu'un Service Worker est chargé dès que possible.

## Désactiver un Service Worker

Nous avons couvert la déclaration du Service Worker et la mise à jour d'un Service Worker. Pour bien faire les choses, il resterait donc uniquement la désactivation d'un Service Worker.

Cela dit, dans les faits, ce n'est pas utile. En effet, je ne vois aucune raison pour laquelle vous voudriez enlever les fonctionnalités apportées par votre Service Worker à vos utilisateurs<span aria-hidden="true">&sdot;rices</span>.

Cependant, je vous en parle parce que cela peut être pratique pour vous, développeurs<span aria-hidden="true">&sdot;euses</span>. En effet, cela peut être utile pour tester que votre site fonctionne toujours sans Service Worker, mais aussi pour développer les autres fonctionnalités sans risquer d'avoir des effets de bords désagréables.

Cela peut se faire [dans les DevTools](https://jakearchibald.github.io/isserviceworkerready/#debugging) ou via ce bout de code :

```js
navigator.serviceWorker
  .getRegistration()
  .then(registration => {
    if (registration) {
      registration.unregister();
    }
  });
```

## Conclusion

Félicitations à tous ceux qui sont arrivés au bout de cet article&nbsp;! Vous avez maintenant tout ce qu'il vous faut pour utiliser et mettre à jour un Service Worker dans n'importe quelle situation&nbsp;: déclaration, mise à jour et désactivation.

Cependant, il faudra retenir que ce n'est jamais *easy-peasy*. Il faut anticiper les cas d'utilisation pour que cela n'impacte pas négativement vos utilisateurs<span aria-hidden="true">&sdot;rices</span>. A titre d'exemple, sur ce blog, j'avais mis en place les Service Workers depuis quelques temps. Pourtant, en rédigeant cet article, je me suis rendu compte que la précédente version de mon Service Worker fonctionnait mal et continuait d'afficher une très vieille page d'accueil pour tous ceux qui étaient venus régulièrement sur mon site. Oups.

Ne soyons tout de même pas défaitistes parce que cela apporte beaucoup d'autres points (très) positifs que nous attaquerons dans les articles suivants.

Dans la suite, nous parlerons de [la mise en cache des requêtes grâce aux Service Workers&nbsp;!](/fiches-techniques/pwa-intercepter-les-requetes-HTTP-et-les-mettre-en-cache/) <span aria-hidden="true">\o</span> En attendant, n'hésitez pas me poser des questions ou me faire des commentaires sur [Twitter](https://twitter.com/JulienPradet) ou [Github](https://github.com/julienpradet/blog-posts).

Merci à Nicolas et Giovanni pour leurs retours :)

---- 

Sources complémentaires&nbsp;:
* [La spécification des Service Workers](https://www.w3.org/TR/service-workers-1)
* [The Service Worker Lifecycle](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle) par [Jake Archibald](https://twitter.com/jaffathecake)
* [The Service Worker Lifecycle](https://bitsofco.de/the-service-worker-lifecycle/) par [Ire Aderinokun](https://twitter.com/ireaderinokun)