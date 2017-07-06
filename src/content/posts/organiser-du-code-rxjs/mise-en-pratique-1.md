## Mise en pratique

C'est bien beau tout ça, mais comment ça se passe en pratique&nbsp;? Si vous n'avez pas beaucoup eu l'occasion de plonger les mains dans RxJS, vous aimeriez sûrement voir à quoi ça pourrait ressembler en vrai.

Nous allons donc faire une mini application de tchat. Deux points à noter cela dit&nbsp;:
* nous ne coderons pas la partie qui communique avec le serveur. Nous considérerons que nous avons déjà des Observables/Observer qui nous permettent de discuter avec le serveur
* nous ne nous attarderons pas sur la partie Vue car c'est la communication entre chaque bloc du MVI qui nous intéresse dans ce tutoriel. Si cela vous intéresse, l'exemple /!\ TODO /!\ mis à disposition montre une implémentation minimale.

### -1. Prérequis

Avant de commencer, je vous conseille d'être à l'aise avec les opérateurs suivants&nbsp;:
* map
* filter
* scan (a.k.a. reduce)
* do
* flatMap/switchMap
* merge

### 0. Structure générale

Afin de répondre à l'exercice, nous allons partir du squelette de code suivant&nbsp;:

```js
// Le modèle devra exposer la liste des messages à
// afficher dans le tchat.
// A l'arrivée sur la page, la liste est vide.
const model$ = Observable.from([])

// La vue devra exposer un objet qui contiendra la
// définition de la vue à afficher
const view$ = model$
  .map((messageList) =>  displayView(messageList))

// On lance l'application
// Si on oublie ce subscribe, il ne se passera
// absoluement rien. Aucun code ne sera executé
view$.subscribe()
```

Nous avons donc une magnifique application qui affiche une liste de messages vide. Cependant, vous pouvez profiter de cette étape pour changer le modèle initial et y mettre n'importe quelle donnée : un message unique recu, un message unique envoyé, une liste de message complète, ... Vous pourrez ainsi tester le comportement de la fonction `displayView` pour qu'elle affiche le modèle convenablement dans tous les cas.

La seule contrainte, est que la fonction `displayView` réponde au contrat suivant&nbsp;:
* affiche la liste de messages passée en entrée TODO préciser le format des messages
* affiche un formulaire d'envoi de message
* retourne les observables représentants les évènements du DOM : pour nous il n'y aura que la soumission des formulaires.

Comme indiqué en préambule, je ne détaillerai pas l'implémentation de cette fonction. Une solution serait d'utiliser la librairie [virtual-dom](https://github.com/Matt-Esch/virtual-dom) comme j'ai pu le faire dans l'exemple complet disponible sur github /!\ TODO /!\. Cependant, il est tout à fait possible de le remplacer par des composants React ou de l'adapter au framework de votre choix.

Une fois que la méthode `displayView` est implémentée, il est temps de rendre votre application dynamique.

### 1. Récupération des messages distants

Pour rendre cette liste de messages dynamique, la première étape consiste à récupérer des messages depuis le serveur. Pour cela, admettons que nous avons à disposition l'observable `receiveServerMessage$` qui va fournir, un par un, les messages envoyés par le serveur.
