*RxJS* fait partie des [Reactive Extensions](http://reactivex.io/). Cette librairie a pour principal avantage de faciliter la gestion des évènements asynchrones. Pour cela, elle met à disposition plusieurs outils, mais le coeur de ceux-ci sont les *Observables*. Dans cet article, je vais vous présenter ce que c'est, et en quoi ça peut changer votre façon de concevoir vos applications.

À la fin de cet article, si j'ai pas trop mal fait mon boulot, vous devriez avoir les bases pour comprendre le fonctionnement de RxJS, et ce que ça apporte. Cependant, il faudra ensuite pas mal de pratique pour en tirer le meilleur.

## À quoi ça sert&nbsp;?

Pour répondre à cette question, demandons-nous d'abord de quel genre de données a-t-on besoin pour créer une application web ?

* De données qui viennent d'actions de l'utilisateur ?
    Ça peut être déclenché au scroll, au click ou à la soumission d'un formulaire.
    ```js
    const form = document.getElementById('sendMessage')
    form.addEventListener('submit', (event) => {
      displayMessage('Le message vient d\'être envoyé!')
    }, false)
    ```
* De données qui viennent d'une requête API ?
    Aujourd'hui c'est plutôt fait via un mécanisme de promesse via `fetch`. Mais l'idée est qu'on lance une action. Et celle-ci finira soit par retourner un résultat, soit par lever une erreur.
    ```js
    // Souvent via un système de promesse
    // on aura
    fetch('/message/1')
      .then((response) => response.json())
      .then((message) => displayMessage(message))
      .catch((message) => displayMessage('Nope.'))
    ```
* De données qui viennent d'une websocket ?
    En ouvrant une connexion sur un serveur distant, on peut recevoir plein de messages tant que la connexion reste ouverte.
    ```js
    const ws = new WebSocket('ws://socket.server')
    const onMessageReceived = (event) => {
      const message = event.data
      displayMessage(message)
    }
    ws.addEventListener('message', onMessageReceived, false);
    ```
* De données qui viennent d'un tableau ?
    La donnée n'est pas asychrone. Ça ne nous empêche pas d'intéragir avec elle.
    ```js
    ['Bienvenue !', 'Entrez un message pour commencer une discussion.']
      .forEach((item) => displayMessage(item))
    ```
* etc.

Cela fait un sacré paquet de possibilités déjà. Pourtant dans chacun des exemples ci-dessus le but est d'afficher un message via la méthode `displayMessage`. C'est ce que j'appelle des sources de données&nbsp;: ce sont les bouts de codes qui seront à l'origine d'autres actions.

Maintenant, imaginons que nous voulons réutiliser les sources de données qu'on a mises en place pour en faire autre chose. Si maintenant, on veut afficher le nombre de messages reçus, comment fait-on&nbsp;? Et le nombre de messages envoyés&nbsp;? Et si on veut uniquement compter le nombre de nouveaux messages depuis un temps donné&nbsp;?

Ce genre de modification sera difficile à mettre en place parce que vous allez avoir besoin de modifier chacune de vos sources de données pour y ajouter des comportements spécifiques. Le résultat risque d'être un amoncellement de cas particuliers qui rendront le code indigeste.

Pour faciliter cela, nous allons essayer de changer notre façon de penser.

## Comment faire&nbsp;?

### Penser réactif

Comme l'indique bien le nom de la librairie, il va falloir se rapprocher de la programmation dite *reactive*.

C'est une façon de penser différente par rapport à ce à quoi nous sommes habitués. Ça va donc demander de l'entraînement, et il y a de fortes chances qu'à la fin de ce premier tutoriel, ce soit encore flou pour vous. Mais je vais essayer de semer des petites graines qui finiront par germer. <small>Parce que c'est le printemps et que la vie, c'est cool.</small>

À mon sens, la plus grande différence réside dans le rôle de la source de données. En programmation *réactive*, une source ne doit pas *faire*, elle doit seulement *prévenir*. Dans notre exemple, les sources affichent un message à l'aide de la méthode `displayMessage`. Ainsi, si on devait les coder de manière *réactive*, elles devraient plutôt *émettre un évènement* qui prévient qu'il y a un nouveau message. Quiconque pourra venir s'y enregistrer et faire ce qui lui chante avec ce nouveau message. La source n'a plus d'autre responsabilité que celle de récupérer les données.

La valeur ajoutée de notre code sera donc uniquement dans la façon dont on réagit aux données, et non plus dans la provenance des données qui sont censées être des détails d'implémentation. Lorsqu'on veut afficher un message, ce qui est important, c'est comment on l'affiche. Mais qu'il vienne d'une API REST ou d'une WebSocket, ce n'est pas censé impacter l'affichage de celui-ci.

### Coder réactif

Comment est-ce que RxJS s'insère dans ce mode de pensées ? Il va falloir qu'il réponde à deux questions&nbsp;:
* Comment est-ce qu'on met à disposition une source de données ?
* Comment est-ce qu'on réagit à celle-ci ?

#### La source de données

En RxJS, une source de données est appelée *Observable* en référence au [Design Pattern Observer](https://fr.wikipedia.org/wiki/Observateur_(patron_de_conception)).

Pour en créer une, on utilise la structure de code suivante :

```js
const Observable = require('rxjs').Observable
const source = Observable.create((observer) => {
  observer.next('Bonjour!')
  observer.error(new Error('Erreur. :/'))
  observer.complete()
})
```

En paramètre de `Observable.create`, on donne une fonction dont le but est de remonter les données. Pour cela, trois fonctions&nbsp;:
* `next` : met à disposition une nouvelle donnée dans l'observable (elle peut être appelée autant de fois que nécessaire)
* `error` : notifie qu'il y a eu une erreur (appelée une seule fois)
* `complete` : met fin à la source de données (appelée une seule fois)

Avec ça, même si c'est juste la théorie, vous connaissez toute l'API nécessaire pour créer n'importe quel *Observable*. Et mine de rien, une petite API, c'est cool parce que ça fait moins de choses à apprendre.

Mais comment peut-on utiliser cette API pour transformer nos sources de données plus haut&nbsp;?

L'idée est d'entourer nos sources par un `Observable.create` et de remplacer le lancement de l'action (`displayMessage`) par `observer.next`.

Voici donc à quoi ressembleraient les exemples donnés en introduction en RxJS&nbsp;:

* Event listener
  ```js
  const Observable = require('rxjs').Observable
  const element = document.getElementById('id')

  // On crée l'Observable
  const source = Observable.create((observer) => {
    // On ajoute l'event listener à l'élément
    element.addEventListener('click', (event) => {
      // À chaque nouveau clic, on ajoute l'objet
      // `event` dans l'Observable
      observer.next(event)
    }, false)
  })

  // Ou la méthode qui existe déjà en Rx
  const source = Observable.fromEvent(element, 'click')
  ```

* Requête API (avec fetch)
  ```js
  const Observable = require('rxjs').Observable

  // On crée l'Observable
  const source = Observable.create((observer) => {
    fetch('/message/1')
      .then((response) => {
        // On passe à l'Observable le body de
        // la requête
        observer.next(result)
      })
      .catch((error) => {
        // Il y a eu une erreur, donc on
        // prévient l'Observable
        observer.error(error)
      })
      .then(() => {
        // On met fin à l'Observable parce qu'une
        // promesse n'a qu'un seul résultat
        observer.complete()
      })
  })

  // Ou la méthode qui existe déjà en Rx
  const source = Observable.fromPromise(fetch('/message/1'))
  ```
  A noter qu'il existe la méthode [`Observable.ajax`](http://reactivex.io/rxjs/test-file/spec-js/observables/dom/ajax-spec.js.html#lineNumber12) même si celle-ci n'est [pas documentée](https://github.com/ReactiveX/rxjs-docs/issues/4#issuecomment-333528501).

* WebSocket
  ```js
  const Observable = require('rxjs').Observable

  // On crée l'Observable
  const source = Observable.create((observer) => {
    const ws = new WebSocket('ws://socket.server')
    // On s'enregistre à l'arrivée des nouveaux messages
    ws.addEventListener('message', (message) => (
      // Et on ajoute chaque message dans l'Observable
      observer.next(message)
    ), false);

    // On s'enregistre au erreurs qui surviendraient
    // dans la websocket
    ws.addEventListener('error', (error) => {
      // Si un erreur est survenue, on prévient
      // l'Observable
      observer.error(error)
    }, false);

    // On s'enregistre à la fermeture du websocket
    ws.addEventListener('close', () => {
      // On met fin à l'Observable
      observer.complete()
    }, false)
  })
  ```
  A noter qu'il existe la méthode [`Observable.webSocket`](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-webSocket) qui a l'avantage d'autoriser aussi l'envoi de messages.

* Tableau
  ```js
  const Observable = require('rxjs').Observable
  const array = ['Bonjour', 'Que puis-je pour vous ?']
  // On crée l'Observable
  const source = Observable.create((observer) => {
    // On ajoute les éléments de l'array un par un
    array.forEach((item) => observer.next(item))
  })

  // Ou la méthode qui existe déjà en Rx
  Observable.from(array)
  ```

#### Réagir à la source

Maintenant que nous avons créé les sources de données, le but va être de réagir à celle-ci (ex&nbsp;: afficher le message). Pour cela, nous avons la fonction `subscribe`&nbsp;:

```js
source.subscribe(
  (data) => displayMessage(data),
  (error) => console.error('error', error),
  () => console.log('complete')
)
```

Globalement, ce qu'il va se passer, c'est qu'on va recevoir dans les trois fonctions passées à `subscribe` exactement la même chose que ce qu'on a passé dans le `Observable.create`. Par exemple, si dans la source on a cet ordre d'appel&nbsp;:

```js
const source = Observable.create((observer) => {
  observer.next(1)
  observer.next(2)
  observer.next(3)
  observer.complete()
})
```

Alors, il se passera cette suite d'opération&nbsp;:
```
displayMessage(1)
displayMessage(2)
displayMessage(3)
console.log('complete')
```

Ca y est. Nous avons une source de données réactive. Elle ne sait pas ce qu'il va advenir de ses données, mais d'autres peuvent venir s'enregistrer pour réaliser des actions sur ces données. Cool.

#### Adapter la source

Maintenant, imaginons que notre code d'affichage est fait pour afficher une liste de messages. Vraisemblablement, la première solution sera d'améliorer le code que nous avons dans le subscribe.

```
// Notre source de messages
const messageSource = Observable.create(/* ... */)

// La partie qui va réagir à cette source
// On stocke la liste des messages reçus
let messageList = []
messageSource.subscribe(
  (message) => {
    // On a reçu on nouveau message
    // donc on met à jour la liste
    messageList.push(message)

    // Et on affiche la nouvelle liste
    displayMessageList(messageList)
  },
  (error) => displayError(error),
  () => {}
)
```

Mais en voyant ce code, j'ai une alerte qui flashouille dans ma tête. En effet, même si on a décalé la complexité dans un `subscribe`, ce dernier fait trop de choses&nbsp;: il transforme la source de données (message&nbsp;&rarr;&nbsp;messageList) **et** l'affiche (`displayMessageList`).

Le but va donc être de séparer ces deux actions en partant du principe que `displayMessageList` a besoin d'une source de données qui contient la liste des messages agglomérés plutôt qu'une source qui envoie les messages un par un.

Comment peut-on faire&nbsp;?

```js
// Le but est de faire une nouvelle source
// Donc on utilise `Observable.create`
const messageListSource = Observable.create((observer) => {
  // On stocke la liste des messages reçus
  // C'est cette liste qui devra être mise
  // à disposition par l'observable
  let messageList = []

  // Le but de cette source est de réagir
  // aux messages de la première source. On
  // doit donc s'y inscrire.
  messageSource.subscribe(
    (message) => {
      // Un nouveau message est arrivé
      // On l'ajoute à la liste
      messageList.push(message)

      // On prévient la nouvelle source
      // qu'il y a une nouvelle liste
      // de messages
      observer.next(messageList)
    },
    // Si une erreur était présente dans le
    // premier observable on la remonte
    // telle quelle dans le nouveau
    (error) => observer.error(error),
    // On termine l'observable si la source
    // initiale est elle aussi terminée
    () => observer.complete()
  )

  // S'il y a besoin de plusieurs de sources,
  // on pourrait tout à fait imaginer ajouter
  // d'autres subscribes ici
})
```

Et voilà&nbsp;! On a une nouvelle source de données qui contient la liste complète des messages à chaque fois qu'un nouveau message arrive. Pour afficher la liste des messages, il ne vous reste plus qu'à écrire un `subscribe` qui déclenchera `displayMessageList`.

Le hic, c'est que ça fait beaucoup de code et ce n'est pas forcément très lisible. Heureusement, le jour où vous lirez du code écrit en Rx, vous ne verrez jamais rien de tel. En fait, je me suis attardé sur cette méthode pour bien vous montrer que lorsqu'on utilise les *opérateurs* en Rx, cela ne fait finalement rien de magique. Les opérateurs se contentent de créer un nouvel *Observable* (`messageListSource`) qui récupère ses données depuis le précédent (`messageSource`).

Et donc en RxJS, pour faire le bout de code que j'ai écrit au dessus, on va plutôt utiliser l'*opérateur* [`scan`](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-scan)&nbsp;:

```js
const messageListSource = source.scan(
  (messageList, message) => messageList.concat([message]),
  []
)
```

Que ce soit avec le `scan` ou avec le `Observable.create`, la transformation est strictement identique. L'[implémentation réelle](https://github.com/ReactiveX/rxjs/blob/a8d74d37550ee5f7c7aef0c9895efd3b0ac59d75/src/operator/scan.ts) n'est pas tout à fait la même parce qu'ils font des optimsations, ont fait en sorte d'avoir une lib extensible, et évitent les bugs. Mais l'essence est la même. Si tout ceci vous intéresse, je vous invite à regarder [la conférence d'André Staltz](https://www.youtube.com/watch?v=uQ1zhJHclvs) sur le sujet qui explique quelques petits détails en plus.

De plus, l'avantage majeur qu'apporte les *opérateurs* est qu'on n'a plus l'impression de travailler avec des données asynchrones quand on écrit le code. Ce pourrait être un tableau, ce serait pareil&nbsp;:

* `source.map` <=> `array.map`
* `source.filter` <=> `array.filter`
* `source.scan` <=> `array.reduce`
* `source.concat` <=> `array.concat`
* `source.last` <=> `array.last`
* `source.first` <=> `array.first`
* ...

cf. [Documentation](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html)

> **NB :** Par contre, un point à ne pas oublier, c'est qu'il faudra toujours qu'il y ait un `subscribe` en bout de chaîne. En effet, c'est celui-ci qui déclenche l'appel à la fonction passée dans `Observable.create` de la source. Donc c'est lui qui permet de déclencher la source de données. Pour comprendre ce mécanisme, vous pouvez vous renseigner du côté de l'appelation [*Hot vs Cold*](https://medium.com/@benlesh/hot-vs-cold-observables-f8094ed53339)

## Conclusion

C'est la fin de ce tutoriel sur RxJS. À vous de me dire maintenant si j'ai bien fait mon boulot ou non. :)

Dans tous les cas, s'il y n'avait que quelques points à retenir, ce serait ceux-là :

* Le but de la programmation réactive est d'éviter de donner trop d'importance à la source de données
* Le point de départ est toujours une source de données. Il existe beaucoup d'opérateurs pour vous éviter l'utilisation d'`Observable.create`, mais avec celui-ci vous pourrez faire celle que vous voulez.
* Les opérateurs vous permettront de transformer vos sources, les fusionner, les filtrer, etc. ([liste des opérateurs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html))
* Retardez le plus possible l'utilisation du `subscribe` en privilégiant les transformations via des *opérateurs*. Mais n'oubliez pas d'en mettre un en bout de chaîne !
* En vrai, en Rx on ne parle jamais de *sources de données* mais d'*Observables*.

En tout cas, n'espérez pas tout faire parfaitement du premier coup. Si vous n'avez pas l'habitude de penser réactif (en Rx ou non), cela va demander un temps d'adaptation. Mais je pense que le jeu en vaut la chandelle. Alors ce que je vous conseille, c'est d'y aller petit à petit. Le but n'est pas de tout réécrire, mais de commencer par identifier vos sources et les transformer au fur et à mesure. Au début votre `subcribe` sera responsable de beaucoup de choses, mais ce n'est pas grave, il finira par maigrir.

------

Merci à [Quentin](https://twitter.com/quentinpradet), [Maxime](https://twitter.com/01BoDuke01), [Euzèbe](https://github.com/euzebe), [Caroline](https://twitter.com/CaroBee31) et [Enguerran](https://twitter.com/ticabri) pour leur relecture attentive !

Si vous êtes intéressés pour jouer le rôle de beta lecteur, n'hésitez pas à surveiller les pulls requests de mon [dépôt github](https://github.com/JulienPradet/blog-posts). J'en ferai régulièrement en quête de feedback.

------

Sources complémentaires :

- [Site officiel de ReactiveX](http://reactivex.io/)
- [Documentation de RxJS](http://reactivex.io/rxjs/)
- [Liste des opérateurs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html) pour transformer vos sources
- [RxMarbles](http://rxmarbles.com/) visualisation des opérateurs
- [Conférence d'André Staltz](https://www.youtube.com/watch?v=uQ1zhJHclvs) qui a été la première brique de ce tutoriel
- [Model-View-Intent](http://futurice.com/blog/reactive-mvc-and-the-virtual-dom) un pattern pour structurer son code en RxJS
