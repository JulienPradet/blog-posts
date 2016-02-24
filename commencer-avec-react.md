# Comment appréhender l'écosystème React ?

> *Disclaimer&nbsp;: Le but de cet article n'est pas de vous présenter la méthode parfaite. Cependant, il s'adresse aux personnes qui ne savent plus où commencer tellement il y a de choses à voir.*

Depuis que j'ai découvert React, j'en parle à qui je peux. Non pas parce que c'est à la mode, ou que je pense que React est **la** technologie qui va enfin durer dans le web. Mais parce que je pense que c'est une approche qui simplifie drastiquement le développement web, et que la communauté qui gravite autour est particulièrement dynamique et intéressante. Il y a des chances que cela fasse évoluer la façon dont vous concevez les applications web, y compris sur des anciennes technologies.

Je pense que si vous venez lire cet article, vous êtes déjà intéressés par React. Mais au cas où vous ne le seriez pas&nbsp;: React, c'est pour quoi faire ? Cet [excellent article d'Occitech](http://www.occitech.fr/blog/2015/12/utiliser-react-est-une-decision-strategique-pas-un-choix-technologique/) parvient à résumer les avantages que cela peut vous apporter sans entrer dans les détails techniques. D'un point de vue technique, React est une technologie qui transforme votre HTML en une fonction. En effet, le HTML n'existe plus mais est caché (virtualisé) grâce au javascript. Ainsi, plutôt que de vous occuper des changements dans votre application, vous vous concentrez sur le code business de votre application, et les vues en React se chargeront d'afficher cela sur le navigateur.

Le plus difficile cependant est d'éviter la [Javascript Fatigue](https://medium.com/@ericclemmons/javascript-fatigue-48d4011b6fc4#.ajuudc734)&nbsp;: de savoir comment plonger dans l'écosystème sans se noyer.

## La roadmap de votre apprentissage

> Vous voulez effectuer votre veille technologique, mais vous êtes un peu perdu. Le code que vous voyez dans tous les tutoriels ne vous semblent pas être écrit en JavaScript, et il y a plein d'outils à mettre en place pour sortir un Hello World. Au secours !

Je ne conseillerais pas de commencer par React, mais d'apprendre dans cet ordre&nbsp;:

1. [npm](#npm)&nbsp;: Gère vos dépendances et de lancer des scripts pour automatiser les phases de votre projet
- [ECMAScript6](#ecmascript6)&nbsp;: Le nouveau standard JavaScript pour écrire du code plus concis et plus robuste
- [Bundlers](#bundlers)&nbsp;: Transforme plusieurs fichiers en un seul pour l'incorporer directement dans votre navigateur.
- [React](#react)&nbsp;: Enfin !

## npm

[npm](https://docs.npmjs.com/getting-started/what-is-npm) fait deux choses&nbsp;: gérer vos dépendances et lancer des scripts. [@maxdow](https://twitter.com/maxdow) a fait une [excellente](http://maxlab.fr/2015/03/comprendre-npm-astuces-et-configuration/) [série](http://maxlab.fr/2015/03/comprendre-npm-astuces-et-configuration/) d'[articles](http://maxlab.fr/2015/07/maitriser-npm-au-coeur-du-workflow/) pour bien comprendre son fonctionnement. Cependant, en bref, voici une explication de ce que vous pouvez attendre de cet outil.

#### La gestion de dépendance

La gestion de dépendance vous assure que les librairies que vous utilisez sont à jour. Vous aviez peut-être l'habitude de travailler avant avec bower. Eh bien, c'est la même chose, mais npm est beaucoup plus suivi par la communauté React, et il vous gère toutes vos dépendances en node. Si vous n'êtes pas familiers avec bower ou un autre gestionnaire de dépendance, le plus simple est de se dire qu'il va s'occuper pour vous de télécharger vos librairies, les mettre à disposition et les mettre à jour tout seul pour éviter de se retrouver avec des outils dépassés. Pour ce faire, vous pouvez déclarer vos dépendances dans un fichier `package.json`. Il faut alors renseigner le nom des librairies ainsi que les numéros de version qui conviennent à votre projet. npm se chargera alors de les retrouver et de les installer pour vous.


#### Les scripts

Le lanceur de script exécute les différentes tâches dont vous avez besoin dans votre projet&nbsp;: la compilation, le démarrage de l'application, etc. C'est aussi un excellent moyen d'unifier les projets en proposant des standards valables sur tous les projets. Quand vous récupérez un projet dans le Grand Internet, généralement vous aurez les commandes suivantes&nbsp;:
- `npm install`&nbsp;: installe le projet sur votre machine.
- `npm start`&nbsp;: démarre le projet. Par exemple, sur un serveur web, il va faire toutes les étapes nécessaires pour le démarrer et vous n'aurez plus qu'à ouvrir votre navigateur au bon endroit.
- `npm run test`&nbsp;: lance les tests du projet.
- `npm run dev`&nbsp;: s'occupe de lancer un environnement de développement agréable. Par exemple il peut recompiler les assets à la volée et s'occuper de mettre à jour votre navigateur automatiquement.

L'intérêt du lanceur de script réside surtout dans le fait que vous n'avez qu'à écrire des lignes de commandes pour automatiser l'utilisation de vos outils. En effet, la ligne de commande est en général la première interface qui est à disposition dans un outil car c'est ainsi que testent les développeurs. Cela ne vous rend pas dépendant de la création du plugin qui va bien pour votre task-runner préféré (Gulp, Grunt, etc.), même si [certains ne sont pas d'accord](http://blog.zenika.com/2016/01/08/why-still-gulp/).

#### Ne prenez pas peur

En créant votre propre `package.json` (fichier de configuration de npm), vous apprendrez par vous même quels outils utiliser. Ne commencez pas un projet en vous disant que vous voulez avoir une suite d'outils parfaite. Faîtes à chaque fois le minimum vital pour avancer dans votre projet, puis incrémentez quand vous en ressentez le besoin.

[Keith Cirkel](https://twitter.com/keithamus) présente dans [cet article](http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/) comment construire ses scripts pour qu'ils soient maintenables. Vous réaliserez que votre `package.json` se construit par étape et n'apparaît pas magiquement.

#### Un exemple minimal

Dans le dossier [`./ressources/commencer-avec-react`](./ressources/commencer-avec-react), vous pouvez retrouver ce qui pour moi est la configuration minimale pour commencer avec React&nbsp;: Compilation ES6 + Bundling. Le but est toujours de pouvoir avoir quelque chose qui fonctionne puis de l'améliorer le jour où vous en avez vraiment besoin.

## ECMAScript6

En investissant du temps sur ECMAScript6 (ES6), vous investissez sur tout votre JavaScript et non uniquement sur du React. C'est le (pas si) nouveau [standard JavaScript](http://www.ecma-international.org/news/Publication%20of%20ECMA-262%206th%20edition.htm) qui sera implémenté dans un futur proche par [tous les navigateurs](http://kangax.github.io/compat-table/es6/). Ce sera donc valable pour tout code JS, et le jour où vous aurez à implémenter autre chose que du React, vous pourrez tout de même l'écrire en ES6.

#### Quelles priorités pour ES6 ?

La ressource qui fait référence est celle de [2ality](http://www.2ality.com/) et notamment le [livre dédié](http://exploringjs.com/es6/). Pour les francophiles, il existe pas mal d'articles sur le sujet sur [Putain de code !](http://putaindecode.io/fr/articles/). Afin d'éviter d'avoir trop à ingurgiter d'un coup, je vous conseille&nbsp;:

1. d'avoir une idée générale des fonctionnalités qui existent
2. de prendre en main les indispensables&nbsp;:
    - `const` et `let`
    - `import` de modules (**très important**)
    - `class` qui sont importantes pour React mais [controversées](https://github.com/joshburgess/not-awesome-es6-classes/)
3. de prendre en main les moins indispensables&nbsp;:
    - `arrow-functions`
    - `destructuring`
    - `spread operator`

Il existe d'autres éléments tout aussi intéressants telles que les `blocks`, les `generators`, les `templates literals`, les `Map`, ou autres fonctionnalités qui ont été ajoutées. L'idée est de savoir qu'elles existent pour être capable de les apprendre quand vous en aurez besoin&nbsp;: pas avant.

#### Babel

Afin de faire du ES6 dès aujourd'hui, il faut le compiler, ou le *transpiler* (si on veut faire genre on s'y connaît). Pour cela il y a notamment [Babel](https://babeljs.io/) qui va transformer pour vous le code en ES5 (version qui est supportée par tous les navigateurs modernes). Il peut aller plus loin que de l'ES6 et a tendance à proposer des solutions via un système de plugin pour les propositions qui sont parfois encore en draft.

Heureusement, il y a le système de `preset` qui regroupe les plugins et configurations, afin de ne pas avoir à tout gérer soit même. Notamment, pour ES6 il y a `babel-preset-es2015` et pour React il y a `babel-preset-react`.

Voici la commande pour installer toutes ces dépendances avec npm&nbsp;:
```
npm install --save-dev babel-cli babel-preset-es2015 babel-preset-react
```

Ensuite, la commande magique qui va compiler un fichier `source.js` en un fichier `output.js` qui est en ES5 et qui est du React lisible par le navigateur (sans [JSX](#react)), est&nbsp;:
```
babel source.js -o output.js --presets es2015,react
```

## Bundlers

Le bundler condense tout le code de votre application pour n'avoir qu'un seul fichier javascript à importer dans votre page HTML. L'intérêt majeur c'est que vous n'êtes plus contraints d'avoir un fichier obèse quand vous codez du JavaScript, où il est impossible de retrouver votre fonction. Vous pouvez faire des modules (fichiers isolés), y faire référence dans un autre fichier et tout de même être capable de les utiliser dans le navigateur sans ajouter une balise `<script>` à chaque fois que vous ajoutez un fichier.

Les deux outils majeurs sur le marché sont [Browserify](http://browserify.org/) et [Webpack](https://webpack.github.io/docs/). Le premier se contente de bundler, tandis que l'autre a tendance à faire le café en plus. Préférant avoir des outils n'ayant qu'une seule responsabilité, j'utilise Browserify.

Pour être plus performant, vous pouvez directement compiler le code ES6 au cours du bundling grâce au plugin babelify.

Ajoutez donc dans un premier temps les dépendances avec npm&nbsp;:
```
npm install --save-dev browserify babelify watchify babel-preset-es2015 babel-preset-2016
```

Ensuite, la nouvelle commande magique, qui va compiler un fichier `source.js` en un fichier `output.js` qui est en ES5, qui est du React lisible par le navigateur (sans [JSX](#react)) et qui contient tous les modules et sous-modules nécessaires au fichier source.js, est&nbsp;:
`browserify source.js -o output.js -t [ babelify --presets [ es2015 react ] ]`

Vous pouvez ensuite importer directement votre fichier output.js dans votre code html comme vous l'auriez fait avant de mettre en place cette stack d'outils.

## React

> Pas trop tôt !

Maintenant que vous avez plein de nouvelles connaissances qui vous sont déjà utiles dans tous vos autres projets, vous pouvez mettre les pieds dans le plat. C'est finalement la partie où je vais vous être le moins utile.

Le [tutoriel officiel de React](https://facebook.github.io/react/docs/tutorial.html) est vraiment une très bonne ressource. Il est d'ailleurs en ES5 pour ne pas dépayser ceux n'ayant pas encore fait le pas. Pour les plus frileux en anglais, rassurez vous, il est largement fourni en exemple de code, ce qui devrait normalement faciliter le processus. Les notions importantes sont les `Components` que l'on peut déclarer avec des *classes* ou des *fonctions*, les `properties`, le `state` et le `JSX`. Ce dernier n'est par contre que du sucre syntaxique pour avoir l'impression d'écrire du HTML : [vous pouvez vous en passer](https://facebook.github.io/react/docs/jsx-in-depth.html). Un bon premier exercice pour faire du React serait de transformer le résultat du tutoriel officiel en ES6. Vous pouvez trouver comment faire encore une fois sur [la documentation officielle](https://facebook.github.io/react/docs/reusable-components.html#es6-classes).

Si vous avez de bonnes ressources françaises en tête, je suis preneur afin de les ajouter ici même. J'ai cependant du mal à en trouver, sachant qu'elles sont souvent pleines de raccourcis qui parlent à des personnes qui se sont déjà battus avec React, mais qui sont abstraits pas pour les débutants.

Cependant, le plus agréable pour vous sera certainement de commencer un projet et de chercher vos réponses au fur et à mesure que les problèmes surviennent. Si vous n'êtes pas inspirés, vous pouvez partir sur des [katas](http://codingdojo.org/cgi-bin/index.pl?KataCatalogue) (petits exercices de programmation) et essayer de les adapter au web. Surtout que en prenant les choses dans l'ordre, vous pourrez&nbsp;:

1. Pratiquer de l'ES6 dans un premier temps pour la partie algorithmique
2. Implémenter une interface un peu plus cool que du `console.log`

## Pour la suite, que faire ?

Une fois que vous avez un peu plus de maîtrise sur le sujet, vous pouvez commencer à regarder ce qui gravite autour. Vous pouvez commencer où bon vous semble selon vos besoins. Cependant, l'ordre affiché vous fera gagner en compétence dans des domaines qui vous serviront aussi en dehors de React.
- [Immutable.js](https://facebook.github.io/immutable-js/)&nbsp;: L'immutabilité et un des fondements du paradigme fonctionnel. Vous pouvez le mettre en place avec du JavaScript pur, mais cette librairie expose une API que je trouve bien pratique.
- [Observables](http://reactivex.io/documentation/observable.html)&nbsp;: Un moyen de gérer les évènements très pragmatique quand on commence à apprécier la programmation fonctionnelle. La librairie la plus connue est [RxJS](https://github.com/Reactive-Extensions/RxJS).
- [Flux](https://facebook.github.io/flux/docs/overview.html)&nbsp;: Une architecture alternative au MVC. Son implémentation la plus populaire est [Redux](http://redux.js.org/). [Un cours vidéo](https://egghead.io/series/getting-started-with-redux) est d'ailleurs disponible (en anglais) pour expliquer le principe de Redux. Son écosystème vous aidera à résoudre des problèmes concrets. Je pense notamment à [redux-saga](https://github.com/yelouafi/redux-saga), [redux-thunk](https://github.com/gaearon/redux-thunk)
- Routing: Pour faire des Single Page Applications, vous aurez besoin de mapper l'URL avec des composants. Généralement, les gens utilisent [React Router](https://github.com/reactjs/react-router).

Le but est de toute façon de prendre les problèmes un par un. Ne cherchez pas à tout connaître sur le bout des doigts. Il faut se contenter de connaître vaguement les solutions qui existent pour pouvoir ensuite les approfondir le jour où vous tombez face à ces problèmes.
