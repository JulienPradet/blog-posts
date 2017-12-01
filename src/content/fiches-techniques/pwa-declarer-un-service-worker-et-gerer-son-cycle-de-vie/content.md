Le terme Progressive Web Apps (PWA) vient de [Frances Berriman](https://fberriman.com/2017/06/26/naming-progressive-web-apps/) et [Alex Russel](https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/). Le but derrière ce nouveau mot est de promouvoir une façon de penser et de concevoir des sites webs. Ce n'est donc pas une technologie. Le but de ce terme est purement marketing afin de convaincre les gens de faire mieux&nbsp;: s'il apparaît dans tous les fils de discussion, on est bien obligé de s'y intéresser à un moment ou à un autre. Et ils y arrivent plutôt bien. On le voit **partout**.

Voici donc une série d'article où j'essaierai de vous présenter ce que c'est et surtout comment le mettre en place pour vos utilisateurs. Accrochez-vous, ça fait pas mal de choses à découvrir&nbsp;:
1. <a href="/fiches-techniques/pwa-rendre-un-site-web-disponible-grace-aux-services-workers/">Rendre un site web disponible grâce aux Services Workers</a>
2. <a href="/fiches-techniques/pwa-rendre-un-site-web-disponible-grace-aux-services-workers/">Déclarer un Service Worker et gérer son cycle de vie</a> (Vous êtes ici.)
3. Intercepter les requêtes HTTP afin d'améliorer l'expérience de l'utilisateur
4. Proposer une expérience hors ligne

Dans le précédent article je présentais ce que signifait PWA et en quoi un Service Worker pouvait nous aider à rendre une application *disponible*. C'était une présentation très théorique. Nous allons maintenant pouvoir nous attaquer à l'implémentation technique.

Dans cet article, je vous présenterai comment déclarer votre premier Service Worker et comment gérer sa mise à jour en parlant du cycle de vie. A la fin de cet article, vous ne devriez donc être bien armé pour pouvoir utiliser un Service Worker en production.

Cependant, il faudra attendre le prochain article pour lui faire faire des choses utiles.

## Des outils pour de simplifier le travail

Avant de commencer, j'aimerais préciser que des outils sont entrain d'émerger pour simplifier la gestion de vos Service Workers. En tête, vous trouverez [Workbox](https://developers.google.com/web/tools/workbox/examples). Si vous cherchez une solution clé en main, ça peut être un bon point de départ.

Cependant, dans cet article nous n'allons pas utiliser de bibliothèque afin de comprendre comment ça fonctionne là dessous. Alors on se remonte les manches, et on y va&nbsp;! :)

## HTTPS Only

La toute première chose à faire est de s'assurer que son site est bien en HTTPS. En effet, votre Service Worker ne sera pas accepté par le navigateur si vous êtes sur un site en HTTP (sauf sur localhost afin de faciliter le développement).

## Déclarer un Service Worker


Une fois que c'est fait, on peut attaquer.

Pour les exemples de code que je mettrai par la suite, je préciserai à chaque fois au début, en commentaire, de quel type de fichier il s'agit&nbsp;:
* **`script.js`**&nbsp;: le script utilisé dans votre site web (ex&nbsp;: `<script src="/script.js"></script>`)
* **`service-worker.js`**&nbsp;: le script qui contient le code qui sera executé dans votre Service Worker.

```js
// fichier : script.js

// Avant d'enregistrer un Serivce Worker,
// on vérifie que c'est possible.
if ("serviceWorker" in navigator) {
  // On essaye d'enregistrer le service
  // worker
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
  // Le site fonctionnera comme avant.
}
```

```js
// fichier : service-worker.js

console.log(
  "SW: Il se passe quelque chose ici!"
);
```

Si tout va bien, vous verrez dans votre console les messages `App: Achievement unlocked.` et `SW: Il se passe quelque chose ici!`. Voici venu votre premier premier Service Worker&nbsp;! Si ce n'est pas le cas, [renseignez vous sur votre navigateur](https://jakearchibald.github.io/isserviceworkerready/#debugging) pour savoir où devrait s'afficher les messages.

Maintenant, rafraîchissez votre page. Vous pouvez constater que `SW: Il se passe quelque chose ici!` a mis plus de temps à s'afficher. Selon la configuration de votre navigateur, il est même possible que cela ne s'affiche pas du tout. Pourquoi&nbsp;?

TODO Vérifier parsing byte to byte

## Gérer son cycle de vie

Cela vient du fait qu'un Service Worker est déjà entrain de tourner.

En effet, un Service Worker n'est pas lié à une page spécifique mais à toutes les pages de votre nom de domaine. Ainsi, quand vous rafraîchissez une page, celle-ci va d'abord chercher à se brancher au Service Worker existant. S'il y en a un, la récupération du suivant n'est pas pressée et est repoussée à plus tard. S'il n'y en a pas, au contraire, le but va être de l'activer le plus vite possible et donc sera récupéré immédiatement.

Mais comment se passe le passage d'un Service Worker au suivant&nbsp;? Qui a la priorité&nbsp;? Comment se passe l'activation&nbsp;?

On peut considérer qu'il y a trois étapes&nbsp;:
1. **En cours d'installation**&nbsp;: Un Service Worker vient d'être demandé via `navigator.serviceWorker.register`. Il faut donc le télécharger. S'il est différent de celui présentement actif, le nouveau Service Worker s'initialise.
2. **En attente**&nbsp;: Dès que l'installation est finie, le Service Worker passe alors en phase d'attente. Il attend alors sagement que celui qui est actuellement actif ait fini pour prendre sa place. S'il n'y a pas d'actif, il prend directement la place et passe la phase d'attente.
3. **Actif**&nbsp;: une fois qu'un Service Worker est actif, chaque nouvelle page affichée est liée à celui-ci.

TODO IMAGE avec les différentes étapes
1. Arrivée dans un état vierge
2. Arrivée alors qu'il y a déjà un Service Worker
(cf. https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle)

Mais comment contrôler ces étapes&nbsp;? En se branchant sur les évènements du cycle de vie (ou [lifecycle](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle)) d'un Service Worker. Ceux-ci sont&nbsp;:
1. **Fin du téléchargement (`parsed`)**&nbsp;: pas d'interaction possible, le fichier est entrain d'être récupéré et parsé par le navigateur
2. **Installation (`installing`)**&nbsp;: execution des tâches d'initialisation d'un Service Worker
3. **Installé (`installed`)**&nbsp;: en attente que la place se libère pour se lier à la page
4. **Activation (`activating`)**&nbsp;: execution des tâches nécessaires à l'activation et nettoyage de l'ancien Service Worker
5. **Activé (`activated`)**&nbsp;: la liaison est faite entre le Service Worker et la page
6. **Redondant (`redundant`)**&nbsp;: il y a eu une erreur ou le Service Worker a été remplacé par un nouveau

TODO Image (cf. https://bitsofco.de/the-service-worker-lifecycle/)

On peut ainsi se brancher sur chacun des évènements et agir en conséquences.

### Se brancher au cycle de vie

Il y a deux façon de se brancher au cycle de vie&nbsp;:
* depuis le site web qui déclare le Service Worker
* ou depuis le Service Worker lui même

#### Depuis le site web

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

      registration.addEventListener(
        "updatefound",
        () => {
          // On récupère le Service
          // Worker en cours
          // d'installation
          const newWorker =
            registration.installing;
          // `registration` a aussi
          // les clés `active` et 
          // `waiting` qui permettent
          // de récupérer les Service
          // Workers correspondant

          newWorker.addEventListener(
            "statechange",
            () => {
              // Le service worker a
              // changé d'état
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

#### Depuis le Service Worker

```js
// fichier : /service-worker.js
console.log("SW: Téléchargement fini.");

self.addEventListener("install", event => {
    console.log("SW: Installation en cours.");

    // Un Service Worker a fini d'être
    // installé quand la promesse dans
    // `event.waitUntil` est résolue
    event.waitUntil(
        // Création d'une promesse
        // factice qui est résolue au
        // bout d'une seconde
        new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log("SW: Installé.");
                resolve();
            }, 1000);
        )
    });
});

self.addEventListener("activate", event => {
    console.log("SW: Activation en cours.");

    // Un Service Worker a fini d'être
    // activé quand la promesse dans
    // `event.waitUntil` est résolue
    event.waitUntil(
        // Création d'une promesse
        // factice qui est résolue au
        // bout d'une seconde
        new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log("SW: Activé.");
                resolve();
            }, 1000);
        )
    });
});
```

### Activer un nouveau Service Worker

Comment es

Maintenant que nous sommes capables de nous brancher n'importe où, nous allons pouvoir gérer plus finement l'activation de nos Service Workers. Il n'y a pas de méthode générique. Il faudra donc choisir en fonction de vos besoins. Cependant, voici quelques éléments auxquelles il faut réfléchir pour faire le bon choix&nbsp;:

* Le Service Worker actuel est-il entrain de faire des choses potentiellement longues/asynchrones&nbsp;? Si oui, est-ce dangereux d'interrompre le Service Worker&nbsp;? Risquez-vous de perdre des infos en le faisant&nbsp;? Exemple&nbsp;: processus de synchronisation avec le serveur en cours.
* Est-ce que votre nouveau Service Worker fonctionne avec votre ancien site&nbsp;? Exemple&nbsp;: changement de l'API de discussion entre le Service Worker et le site.
* Est-ce que l'arrivée du nouveau site est primordiale&nbsp;? Exemple&nbsp;: ce que vous récupérez sur le serveur a changé et ne peut pas être compris par l'ancien site.
* Est-ce que toutes les pages ouvertes réagiront de la même façon&nbsp;? N'oubliez pas qu'un Service Worker actif est partagé par tous les onglets ouverts sur votre site.

Comme vous pouvez le constater, mettre à jour un Service Worker, c'est compliqué et il faut prendre plein de paramètres en compte. En effet, dès l'instant où vous utilisez un Service Worker, vous ne pouvez plus vous dire qu'il suffit de rafraîchir les caches pour repartir d'un état propre. Votre Service Worker, lui, sera toujours là malgré vos Ctrl+F5.

Dans la mesure du possible essayez donc de faire en sorte qu'une mise à jour ne nécessite pas une activation manuelle du nouveau Service Worker. Vous vous éviterez bien des tracas. l'activation se fera lorsque tous les onglets de votre site auront été fermés et ainsi, la prochaine page ouverte sera prête à utiliser la mise à jour.

1. L'activation du Service Worker
2. Le rattachement d'une page existante au Service Worker activé

https://gist.github.com/Rich-Harris/fd6c3c73e6e707e312d7c5d7d0f3b2f9

navigator.serviceWorker.addEventListener('controllerchange', () => {
  // This fires when the service worker controlling this page
  // changes, eg a new worker has skipped waiting and become
  // the new active worker.
});


1. **Recharger la page** dès qu'un Service Worker est installé.

    Cette méthode peut présenter ses limites si plusieurs onglets sont ouverts. Si c'est un cas qui vous préoccupe, il faudra certainement mettre en place des mécanismes pour que cela rafraîchisse tous les onglets sous peine de manquer la mise à jour.
    ```js
    // fichier /script.js

    // idem que l'exemple "depuis le
    // site web", sauf que dans
    // l'évènement de changement
    // d'état (`statechange`), on
    // guette la fin de l'installation
    // du Service Worker.
    if (newWorker.state === "installed") {
        // Et dès qu'il est installé,
        // on recharge la page entièrement
        // https://developer.mozilla.org/fr/docs/Web/API/Location/reload
        window.location.reload();
    }
    ```

2. **Prévenir l'utilisateur** qu'une nouvelle version du site est disponible.

    Cela peut avoir l'avantage d'éviter à l'utilisateur<span aria-hidden="true">&sdot;rice</span> d'être coupé dans l'opération qu'<span aria-hidden="true">elle&sdot;</span>il est entrain de réaliser. Cependant, il risque d'y avoir le même souci qu'avec la première méthode si plusieurs onglets sont ouverts.
    ```js
    // fichier /script.js

    // idem que l'exemple "depuis le
    // site web", sauf que dans
    // l'évènement de changement
    // d'état (`statechange`), on
    // guette la fin de l'installation
    // du Service Worker.
    if (newWorker.state === "installed") {
        // Et dès qu'il est installé,
        // on ajoute un bandeau HTML
        // dans la page pour indiquer
        // à l'utilisateur.rice qu'elle.il
        // peut rafraîchir sa page
        const notif = document.createElement(
          'div'
        );

        notif.innerText = `
          Nouveau site !
          Vous pouvez rafraîchir.
        `;

        document.body.appendChild(
          notif
        );
    }
    ```

3. Le faire **directement à la fin de l'installation** d'un Service Worker.

    La mise à jour est transparent pour l'utilisateur. Cependant, si des éléments chargés dans la page ne sont plus valides, il faudra nettoyer le tout manuellement.

    ```js
    // fichier /service-worker.js

    self.addEventListener(
      "install",
      event => {
        event.waitUntil(
          self.skipWaiting()
        )
      }
    )
    ```

4. **Ne rien faire**

    Dans certains cas, il est tout à fait envisageable d'attendre la prochaine visite de l'utilisateur pour mettre à jour le site. Il faut juste garder en tête que certains utilisateurs n'auront pas accès aux nouvelles fonctionnalités immédiatement.

Personnellement, sur ce blog, j'ai adopté une méthode encore différente. Lorsqu'un nouveau Service Worker est détecté, je fais en sorte que tous mes liens ne soient plus interceptés par React afin qu'ils rafraîchissent la page au clic. Cela permet aux visiteurs<span aria-hidden="true">&sdot;euses</span> de continuer à lire le billet qu'<span aria-hidden="true">elles&sdot;</span>ils sont entrain de lire tout en étant sûr que le prochain lien rafraîchisse la page convenablement.

---- 

Sources complémentaires&nbsp;:
* [The Service Worker Lifecycle](https://bitsofco.de/the-service-worker-lifecycle/) par [Ire Aderinokun](https://ireaderinokun.com/)
* []