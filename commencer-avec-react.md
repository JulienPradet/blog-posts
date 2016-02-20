# Comment appréhender l'écosystème React ?

Depuis que j'ai découvert React, j'en parle à qui je peux. Non pas parce que c'est à la mode, ou que je pense que React est **LA** technologie qui va enfin durer dans le web. Mais parce que je pense que c'est une approche qui simplifie drastiquement le développement web, et que la communauté qui gravite autour est particulièrement dynamique et intéressante. Il y a des chances que cela fasse évoluer la façon dont vous concevez les applications web, y compris sur des *anciennes* technologies.

*Disclaimer : Le but de cet article n'est pas de vous présenter LA méthode parfaite. Cependant, il s'adresse aux personnes qui ne savent plus où commencer tellement il y a de choses à voir. Je prends parfois des raccourcis afin de ne pas noyer d'informations. Vous pouvez toujours me demander de plus amples informations.*

## React c'est quoi ?

Mon but ne va pas être d'expliquer ici en quoi consiste React ou comment débuter avec. Ce n'est pas non plus de faire un voyage initiatique dans le monde du JavaScript.

Non, mon but est d'expliquer comment éviter la [Javascript Fatigue](https://medium.com/@ericclemmons/javascript-fatigue-48d4011b6fc4#.ajuudc734), et comment se former petit à petit pour comprendre l'écosystème et sortir la tête de l'eau.

## La roadmap de votre apprentissage

### Vous êtes pressés

> Vous avez trouvé une lib qui va bien, qui fait parfaitement ce que vous voulez mais vous n'arrivez pas a mettre en place les milliards d'outils a mettre en place pour que enfin ca fonctionne...

Votre but va être de comprendre les rudiments et d'avoir le minimum vital pour utiliser React :

1. Comprendre les rudiments du `ReactDOM.render`, des composants React et du JSX. Si vous n'avez vraiment pas le temps, n'utilisez pas JSX qui n'est que du sucre syntaxique. Sinon, renseignez vous du côté de babel-standalone.
- Utiliser des balises `<script>` pour importer [React](https://cdnjs.com/libraries/react/) et vos dépendances
- Trouver un peu de temps pour ensuite reprendre les choses dans l'ordre

La procédure des points 1. et 2. sont finalement assez bien expliqués du côté de [la documentation officielle](https://facebook.github.io/react/docs/tutorial.html).

### Vous voulez prendre les choses dans l'ordre

> Vous voulez simplement effectuer votre veille technologique, mais vous êtes un peu perdu. Le code que vous voyez dans tous les tutoriels ne vous semblent pas être en JavaScript, et il y a plein d'outils a mettre en place pour sortir un bête Hello World. Au secours !

Dans un premier temps, je conseillerais de ne pas commencer par React, mais d'apprendre ces notions :

1. [ECMAScript6](#ECMAScript6) : C'est le nouveau standard JavaScript qui vous permet d'écrire du code plus concis et plus robuste
- [Babel](#Babel) : Ecrire aujourd'hui du javascript de demain
- [npm](#npm) : Vous permet de gérer vos dépendances et de lancer des scripts pour automatiser les phases de votre projet
- [Bundlers](#bundlers) : Vous permet d'importer le système de modules directement dans votre navigateur, sans avoir trop de problème de latence.
- [React](#react) : Enfin !

## ECMAScript6

L'avantage majeur que vous aurez à apprendre ECMAScript6 (ES6), c'est que ce sont des connaissances durables. C'est le (pas si) nouveau [standard JavaScript](http://www.ecma-international.org/news/Publication%20of%20ECMA-262%206th%20edition.htm) qui sera implémenté dans un futur proche par [tous les navigateurs](http://kangax.github.io/compat-table/es6/). Ce sera donc valable pour tout code JS, et le jour où vous aurez à implémenter autre chose que du React, vous pourrez tout de même l'écrire en ES6.

### Quelles priorités pour ES6 ?

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

Il existe d'autres éléments tout aussi intéressants telles que la notion de `block`, les `generators`, les `templates literals`, les `Map`, et autres fonctionnalités qui ont été ajoutées. L'idée est de savoir qu'elles existent pour être capable de les apprendre quand vous en aurez besoin, pas avant.

### Et à propos d'ES7/2016 et des suivants ?

ECMAScript a adopté depuis l'année dernière un système de release qui les pousse à faire une avancée par an. Toutes les avancées qui étaient au [stage 4](http://www.2ality.com/2015/11/tc39-process.html) en début d'année sont acceptés et mises dans le nouveau standard. Cela permet de ne pas rester bloquer comme on l'a été pour ES5. Et c'est pour cela qu'on parle de ECMAScript2016 plutôt que de ES7.

Dans ES2016 il y a donc eu que deux nouvelles fonctionnalités, et certaines features attendues telles que les décorateurs sont pour l'instant repoussés. Si vous pouvez faire sans, faites sans. Si vous pensez que cela va drastiquement améliorer la qualité de votre code, allez-y. Mais pensez bien que cela risque d'augmenter la maintenance à effectuer si les spécifications changent.

## Babel

Ce [compilateur](https://babeljs.io/) va vous permettre de transformer du code ES6 en code ES5. C'est ce qui permet à n'importe quel développeur de coder en ES6, et de mettre son code en production dès aujourd'hui.

Pour être tout à fait exact, babel permet de compiler n'importe quoi vers n'importe quoi. Il est basé sur un système de plugin très fourni qui permet de faire du ES6, des décorateurs, et d'autres fonctionnalités qui ne sont aujourd'hui absoluement pas standardisées. C'est génial, mais cela risque d'être perturbant au début.

Heureusement, il y a le système de `preset` qui permet de regrouper les plugins et de les utiliser facilement. Notamment, pour ES6 il y a `babel-preset-es2015` et pour React il y a `babel-preset-react`. C'est personnellement l'unique configuration que je mets en place dans mes projets.

*Il existe aussi [Traceur](https://github.com/google/traceur-compiler), de google. Cependant, c'est Babel qui l'emporte largement dans la communauté React.*

## npm

### C'est quoi ?

[npm](https://docs.npmjs.com/getting-started/what-is-npm) était à l'origine le package manager de node (Node Package Manager). Il servait donc à importer des packages de js pour pouvoir l'utiliser sur votre serveur Node.JS. Cependant, aujourd'hui ce n'est plus le cas et il est plus général que ça.

C'est une gestionnaire de dépendance complet. Il vous permet de vous assurer que les librairies que vous utilisez sont à jour, que ce soit pour vos outils de développements, des libs back, des libs fronts ou des assets css. Précédemment, bower jouait ce rôle, mais la plupart des librairies React n'y sont pas disponibles. Donc faîtes vous du bien, et utilisez [npm](https://docs.npmjs.com/getting-started/what-is-npm.

[@maxdow](https://twitter.com/maxdow) a fait une [excellente](http://maxlab.fr/2015/03/comprendre-npm-astuces-et-configuration/) [série](http://maxlab.fr/2015/03/comprendre-npm-astuces-et-configuration/) d'[articles](http://maxlab.fr/2015/07/maitriser-npm-au-coeur-du-workflow/) pour bien comprendre le fonctionnement d'npm.

C'est aussi un excellent moyen d'unifier les projets grâce aux scripts. Quand vous récupérer un projet dans le Grand Internet, généralement vous aurez les commandes suivantes :
- `npm start` : démarre le projet. Par exemple, sur un serveur web, il va faire toutes les étapes nécessaires pour le démarrer et vous n'aurez plus qu'à ouvrir votre navigateur au bon endroit.
- `npm run test` : lance les tests du projet.
- `npm run dev` : s'occupe de lancer un environnement de développement agréable. Par exemple il peut recompiler les assets à la volée.

Mais vous pouvez aussi y définir tout un tas de commandes propres à votre projet, que ce soit de la CLI ou des scripts node.

Cette capacité à lancer des scripts peut vous faire abandonner les tasks runners tels que Gulp ou Grunt qui vous imposent d'apprendre la syntaxe et/ou de dépendre de la création de plugins propres au task runner choisi. Cependant, si vous avez déjà un task runner en place, vous pouvez aussi le lancer via un script npm. Cela vous évitera d'avoir à redéfinir ce qui est déjà en place, tout en adoptant les conventions largement répandues.

### Pour ne pas se sentir noyer

En créant votre propre package.json (fichier de configuration de npm), vous apprendrez par vous mêmes quels outils utiliser. Ne commencez pas un projet en vous disant que vous voulez avoir une suite d'outils parfaite. Faîtes à chaque fois le minimum vital qui vous permettra d'avancer dans votre projet, puis incrémentez quand vous en ressentez le besoin.

[Keith Cirkel](https://twitter.com/keithamus) présente dans [cet article](http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/) comment construire ses scripts pour qu'ils soient maintenables. Cela se permet de se rendre compte que c'est vraiment une construction et que cela se construit selon les besoins.

Vous pouvez retrouver ce qui pour moi est le package.json minimal ici. Il y a aussi le système de bundler décrit ci-dessous. // TODO package.json minimal


## Bundlers

Le bundler vous permet de condenser tout le code de votre application en un seul fichier javascript. Il permet ainsi de n'avoir qu'un seul fichier javascript à importer dans votre page HTML, et par la même occasion permet d'écrire du code qui fonctionnera à la fois côté serveur et côté client. Que du bon.

Les deux outils majeurs sur le marché sont [Browserify](http://browserify.org/) et [Webpack](https://webpack.github.io/docs/). Le premier se contente de bundler, tandis que l'autre a tendance à faire le café en plus. Préférant avoir des outils n'ayant qu'une seule responsabilité, j'utilise Browserify.

Vous avez deux solutions : soit vous compilez votre code ES6 pour ensuite le passer à Browserify, soit vous utilisez le plugin [babelify](https://github.com/babel/babelify) qui permet de faire les deux à la fois. La deuxième solution vous donne finalement cette ligne de commande :

`browserify script.js -o bundle.js -t [ babelify --presets [ es2015 react ] ]`

## React

> Pas trop tôt !

Maintenant que vous avez plein de nouvelles connaissances qui vous sont déjà utiles dans tous vos autres projets, vous pouvez mettre les pieds dans le plat. C'est finalement la partie où je vais vous être le moins utile.

Le [tutoriel officiel de React](https://facebook.github.io/react/docs/tutorial.html) est vraiment une très bonne ressource. Il est d'ailleurs en ES5 pour ne pas dépayser ceux n'ayant pas encore fait le pas. Pour les plus frileux en anglais, rassurez vous, il est largement fourni en exemple de code, ce qui devrait normalement faciliter le processus.

Un bon premier exercice serait de transformer le résultat de ce tutoriel en ES6. Vous pouvez trouver comment faire encore une fois sur [la documentation officielle](https://facebook.github.io/react/docs/reusable-components.html#es6-classes).

Il existe ensuite une foison de tutoriel sur Internet et vous êtes maintenant armés pour les comprendre et les mettre en place. Cependant, le plus agréable pour vous sera certainement de commencer un projet et de chercher vos réponses au fur et à mesure que les problèmes surviennent.

Si vous n'êtes pas inspirés, vous pouvez partir sur des [katas](http://codingdojo.org/cgi-bin/index.pl?KataCatalogue) et essayer de les adopter au web.

## Pour la suite, que faire ?

Une fois que vous avez un peu plus de maîtrise sur le sujet, vous pouvez commencer à regarder ce qui gravite autour. Vous pouvez commencer où bon vous semble selon vos besoins. Cependant, l'ordre affiché est en fait ce qui vous permettra de gagner en compétence dans des domaines qui vous serviront aussi en dehors de React.
- [Immutable.js](https://facebook.github.io/immutable-js/) : Un des fondements du paradigme fonctionnel.
- [Flux](https://facebook.github.io/flux/docs/overview.html) : Une architecture alternative au MVC. Son implémentation la plus populaire est [Redux](http://redux.js.org/).
- [Observables](http://reactivex.io/documentation/observable.html) : Un moyen de gérer les évènements très pragmatique. La librairie la plus connue est [RxJS](https://github.com/Reactive-Extensions/RxJS).
- Routing: Pour faire des Single Page Applications, vous aurez besoin de mapper l'URL avec des composants. Généralement, les gens utilisent [React Router](https://github.com/reactjs/react-router).

Mon petit chouchou du moment, c'est les **Observables**.

Le but est de toute façon de prendre les problèmes un par un. Ne cherchez pas à tout connaître sur le bout des doigts. Il faut se contenter de connaître vaguement les solutions qui existent pour pouvoir ensuite les approfondir le jour où vous tombez face à ces problèmes.
