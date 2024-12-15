## Mise en pratique

C'est bien beau tout ça, mais comment ça se passe en pratique&nbsp;? Si vous n'avez pas beaucoup eu l'occasion de plonger les mains dans RxJS, vous aimeriez sûrement voir à quoi ça pourrait ressembler en vrai.

Nous allons donc coder un tchat. Pour un seul article, c'est quand même assez ambitieux&nbsp;! Nous allons donc nous contenter de travailler sur la mise en place des **intentions** et la mise à jour du **modèle**. Ainsi&nbsp;:

- nous ne coderons pas la partie qui communique avec le serveur. Nous considérerons que nous avons déjà des Observables/Observer qui nous permettent de discuter avec le serveur.
- nous ne nous attarderons pas sur la **vue** car c'est la communication entre chaque bloc du MVI qui nous intéresse dans ce tutoriel. Si cela vous intéresse, l'[exemple mis à disposition](https://github.com/JulienPradet/blog-posts/tree/master/src/content/tutoriels/organiser-du-code-rxjs/tchat/examples/) montre une implémentation minimale avec [`virtual-dom`](https://github.com/Matt-Esch/virtual-dom) et reprenant la structure de [Cycle.js](https://cycle.js.org/).

### -1. Prérequis

Avant de commencer, il est indispensable d'avoir fait ses premiers pas en RxJS (ou tout autre librairie du même style - [Kefir.js](https://rpominov.github.io/kefir/), [Bacon.js](https://baconjs.github.io/), [xstream](https://github.com/staltz/xstream), [most](https://github.com/cujojs/most), &hellip;). Pour cela, vous pouvez [lire mon article d'introduction](/tutoriels/introduction-a-rxjs/), accéder aux [vidéos d'introduction d'André Staltz](https://egghead.io/courses/introduction-to-reactive-programming) (qui demandent un abonnement payant à egghead), ou y aller de manière plus empirique avec [Rx Visualizer](https://rxviz.com/).

Après cette première phase d'apprentissage, l'idéal sera d'être à l'aise avec les opérateurs suivants&nbsp;:

- [map](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-map)
- [filter](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-filter)
- [scan](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-scan) (a.k.a. reduce)
- [do](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-do)
- [mergeMap](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mergeMap) (a.k.a. flatMap)
- [merge](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-merge)

Si vous n'êtes pas encore tout à fait à l'aise, ce n'est pas grave. Des diagrammes et commentaires accompagnerons les bouts de code pour expliciter pourquoi j'utilise tel opérateur à tel moment.

### 0. Structure générale

Afin de répondre à l'exercice, nous allons partir du squelette de code suivant&nbsp;:

```js
// Le modèle devra exposer la liste des messages à
// afficher dans le tchat.
// A l'arrivée sur la page, la liste est vide.
const model$ = Observable.from([]);

// La vue devra exposer un objet qui contiendra la
// définition de la vue à afficher
const view$ = model$.map((messageList) => displayView(messageList));

// On lance l'application
// Si on oublie ce subscribe, il ne se passera
// absoluement rien. Aucun code ne sera executé
view$.subscribe();
```
