# Comment appréhender l'écosystème React ?

> *Disclaimer : Le but de cet article n'est pas de vous présenter la méthode parfaite. Cependant, il s'adresse aux personnes qui ne savent plus où commencer tellement il y a de choses à voir.*

Depuis que j'ai découvert React, j'en parle à qui je peux. Non pas parce que c'est à la mode, ou que je pense que React est **la** technologie qui va enfin durer dans le web. Mais parce que je pense que c'est une approche qui simplifie drastiquement le développement web, et que la communauté qui gravite autour est particulièrement dynamique et intéressante. Il y a des chances que cela fasse évoluer la façon dont vous concevez les applications web, y compris sur des anciennes technologies.

Le plus difficile est d'éviter la [Javascript Fatigue](https://medium.com/@ericclemmons/javascript-fatigue-48d4011b6fc4#.ajuudc734), et de savoir comment plonger dans l'écosystème sans se noyer.

## La roadmap de votre apprentissage

> Vous voulez effectuer votre veille technologique, mais vous êtes un peu perdu. Le code que vous voyez dans tous les tutoriels ne vous semblent pas être écrit en JavaScript, et il y a plein d'outils a mettre en place pour sortir un bête Hello World. Au secours !

Je ne conseillerais pas de commencer par React, mais d'apprendre dans cet ordre :

1. [npm](#npm) : Vous permet de gérer vos dépendances et de lancer des scripts pour automatiser les phases de votre projet
- [ECMAScript6](#ecmascript6) : Le nouveau standard JavaScript qui vous permet d'écrire du code plus concis et plus robuste
- [Bundlers](#bundlers) : Vous permet d'importer le système de modules directement dans votre navigateur, sans avoir trop de problème de latence.
- [React](#react) : Enfin !

## npm

[npm](https://docs.npmjs.com/getting-started/what-is-npm) vous permettra de faire deux choses : gérer vos dépendances et lancer des scripts.

La gestion de dépendance permet de vous assurer que les librairies que vous utilisez sont à jour, que ce soit vos outils de développements, vos libs back-end ou front-end ou vos assets css. Précédemment, bower jouait ce rôle pour les assets front-end. Mais aujourd'hui, la plupart des librairies React n'y sont pas disponibles. Donc faîtes vous du bien, et utilisez [npm](https://docs.npmjs.com/getting-started/what-is-npm) qui dans l'ensemble est plus suivi par la communauté javascript. Et surtout, cela permet de ne pas avoir 10 gestionnaires différents dans votre projet.

Le lanceur de script permet de lancer les différentes tâches dont vous avez besoin dans votre projet : la compilation, le démarrage de l'application, etc. C'est aussi un excellent moyen d'unifier les projets en proposant des standards valables sur tous les projets. Quand vous récupérer un projet dans le Grand Internet, généralement vous aurez les commandes suivantes :
- `npm install` : installe le projet sur votre machine.
- `npm start` : démarre le projet. Par exemple, sur un serveur web, il va faire toutes les étapes nécessaires pour le démarrer et vous n'aurez plus qu'à ouvrir votre navigateur au bon endroit.
- `npm run test` : lance les tests du projet.
- `npm run dev` : s'occupe de lancer un environnement de développement agréable. Par exemple il peut recompiler les assets à la volée et s'occuper de mettre à jour votre navigateur automatiquement.

[@maxdow](https://twitter.com/maxdow) a fait une [excellente](http://maxlab.fr/2015/03/comprendre-npm-astuces-et-configuration/) [série](http://maxlab.fr/2015/03/comprendre-npm-astuces-et-configuration/) d'[articles](http://maxlab.fr/2015/07/maitriser-npm-au-coeur-du-workflow/) pour bien comprendre le fonctionnement d'npm.

#### Pour ne pas prendre peur

En créant votre propre `package.json` (fichier de configuration de npm), vous apprendrez par vous mêmes quels outils utiliser. Ne commencez pas un projet en vous disant que vous voulez avoir une suite d'outils parfaite. Faîtes à chaque fois le minimum vital qui vous permettra d'avancer dans votre projet, puis incrémentez quand vous en ressentez le besoin.

[Keith Cirkel](https://twitter.com/keithamus) présente dans [cet article](http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/) comment construire ses scripts pour qu'ils soient maintenables. Cela se permet de se rendre compte que c'est vraiment une construction et que cela se construit selon les besoins.

Vous pouvez retrouver ce qui pour moi est le package.json minimal pour faire du React : Compilation ES6 + Bundling. Ce n'est pas optimal et c'est certainement améliorable. Cependant, mon but est toujours de pouvoir avoir quelque chose qui fonctionne puis de l'améliorer le jour où j'en ai vraiment besoin. // TODO package.json minimal

## ECMAScript6

En investissant du temps sur ECMAScript6 (ES6), vous investissez sur tout votre JavaScript et non uniquement sur du React. C'est le (pas si) nouveau [standard JavaScript](http://www.ecma-international.org/news/Publication%20of%20ECMA-262%206th%20edition.htm) qui sera implémenté dans un futur proche par [tous les navigateurs](http://kangax.github.io/compat-table/es6/). Ce sera donc valable pour tout code JS, et le jour où vous aurez à implémenter autre chose que du React, vous pourrez tout de même l'écrire en ES6.

#### Quelles priorités pour ES6 ?

La ressource qui fait référence est celle de [2ality](http://www.2ality.com/) et notamment le [livre dédié](http://exploringjs.com/es6/). Cependant, afin d'éviter d'avoir trop à ingurgiter d'un coup, je vous conseille :

1. d'avoir une idée générale des fonctionnalités qui existent
2. de prendre en main les indispensables :
    - `const` et `let`
    - `import` de modules
    - `class` qui sont importantes pour React mais controversées
3. de prendre en main les moins indispensables :
    - `arrow-functions`
    - `destructuring`
    - `spread operator`

Il existe d'autres éléments tout aussi intéressants telles que la notion de `block`, les `generators`, les `templates literals`, les `Map`, ou autres fonctionnalités qui ont été ajoutées. L'idée est de savoir qu'elles existent pour être capable de les apprendre quand vous en aurez besoin, pas avant.

#### Babel

Afin de faire du ES6 dès aujourd'hui, il faut le compiler, ou le *transpiler* (si on veut faire genre on s'y connaît). Pour cela il y a notamment [Babel](https://babeljs.io/) qui va transformer pour vous le code en ES5 (version qui est supportée par tous les navigateurs modernes). Il peut faire aussi tout un tas d'autres choses grâce à un écosystème de plugin très riche.

Heureusement, il y a le système de `preset` qui permet de regrouper les plugins et configurations afin de les utiliser facilement. Notamment, pour ES6 il y a `babel-preset-es2015` et pour React il y a `babel-preset-react`.

Je vous conseille d'ajouter un .babelrc qui contient la configuration de babel :
```
{
  "presets": ["es2015", "react"]
}
```

Pour lancer la compilation il suffit alors de faire : 
```
babel source.js -o output.js
```

## Bundlers

Le bundler vous permet de condenser tout le code de votre application en un seul fichier javascript. Il permet ainsi de n'avoir qu'un seul fichier javascript à importer dans votre page HTML, et par la même occasion permet d'écrire du code qui fonctionnera à la fois côté serveur et côté client. Que du bon.

Les deux outils majeurs sur le marché sont [Browserify](http://browserify.org/) et [Webpack](https://webpack.github.io/docs/). Le premier se contente de bundler, tandis que l'autre a tendance à faire le café en plus. Préférant avoir des outils n'ayant qu'une seule responsabilité, j'utilise Browserify.

Pour être plus performant, vous pouvez directement compiler le code ES6 au cours du bundling grâce au plugin babelify. Ce qui donne :

`browserify script.js -o bundle.js -t [ babelify --presets [ es2015 react ] ]`

Vous pouvez ensuite importer directement votre fichier bundle.js dans votre code html comme vous l'auriez fait avant de mettre en place cette stack d'outils.

## React

> Pas trop tôt !

Maintenant que vous avez plein de nouvelles connaissances qui vous sont déjà utiles dans tous vos autres projets, vous pouvez mettre les pieds dans le plat. C'est finalement la partie où je vais vous être le moins utile.

Le [tutoriel officiel de React](https://facebook.github.io/react/docs/tutorial.html) est vraiment une très bonne ressource. Il est d'ailleurs en ES5 pour ne pas dépayser ceux n'ayant pas encore fait le pas. Pour les plus frileux en anglais, rassurez vous, il est largement fourni en exemple de code, ce qui devrait normalement faciliter le processus. Si vous avez de bonnes ressources françaises en tête, je suis preneur afin de les ajouter ici même.

Un bon premier exercice serait de transformer le résultat de ce tutoriel en ES6. Vous pouvez trouver comment faire encore une fois sur [la documentation officielle](https://facebook.github.io/react/docs/reusable-components.html#es6-classes).

Il existe ensuite une foison de tutoriels sur Internet et vous êtes maintenant armés pour les comprendre et les mettre en place. Cependant, le plus agréable pour vous sera certainement de commencer un projet et de chercher vos réponses au fur et à mesure que les problèmes surviennent.

Si vous n'êtes pas inspirés, vous pouvez partir sur des [katas](http://codingdojo.org/cgi-bin/index.pl?KataCatalogue) et essayer de les adapter au web. Surtout que cela vous permettra de :

1. Pratiquer de l'ES6 dans un premier temps pour la partie algorithmique
2. Implémenter une interface un peu plus cool que de la ligne de commande en React

## Pour la suite, que faire ?

Une fois que vous avez un peu plus de maîtrise sur le sujet, vous pouvez commencer à regarder ce qui gravite autour. Vous pouvez commencer où bon vous semble selon vos besoins. Cependant, l'ordre affiché est en fait ce qui vous permettra de gagner en compétence dans des domaines qui vous serviront aussi en dehors de React.
- [Immutable.js](https://facebook.github.io/immutable-js/) : Un des fondements du paradigme fonctionnel. Vous pouvez le mettre en place avec du JavaScript pur, mais cette librairie expose une API que je trouve bien pratique.
- [Observables](http://reactivex.io/documentation/observable.html) : Un moyen de gérer les évènements très pragmatique quand on commence à apprécier la programmation fonctionelle. La librairie la plus connue est [RxJS](https://github.com/Reactive-Extensions/RxJS).
- [Flux](https://facebook.github.io/flux/docs/overview.html) : Une architecture alternative au MVC. Son implémentation la plus populaire est [Redux](http://redux.js.org/). [Un cours vidéo](https://egghead.io/series/getting-started-with-redux) est d'ailleurs disponible (en anglais) pour expliquer le principe de Redux. Il y a tout un éco-système autour qui vous permettra de résoudre des problèmes concrets. Je pense notamment à [redux-saga](https://github.com/yelouafi/redux-saga), [redux-thunk](https://github.com/gaearon/redux-thunk) 
- Routing: Pour faire des Single Page Applications, vous aurez besoin de mapper l'URL avec des composants. Généralement, les gens utilisent [React Router](https://github.com/reactjs/react-router).

Le but est de toute façon de prendre les problèmes un par un. Ne cherchez pas à tout connaître sur le bout des doigts. Il faut se contenter de connaître vaguement les solutions qui existent pour pouvoir ensuite les approfondir le jour où vous tombez face à ces problèmes.
