
Et voilà ! Nous avons de l'optimistic update dans notre application ! On a dû faire quelques modifications, mais dans l'ensemble, on n'a pas eu *beaucoup* de travail.

C'est d'une part grâce à la programmation réactive&nbsp;: en ajoutant des fonctionnalités, on n'a aucune chance de casser le reste à condition de ne pas renommer à tord et à travers les variables.

D'autre part, c'est grâce au pattern MVI&nbsp;: une fois que les intentions sont décrites, on peut en extrapoler beaucoup d'information sans avoir besoin de toucher ni à la vue ni aux autres intentions. C'est un vrai plus pour des applications à maintenir pendant longtemps. Rajouter des fonctionnalités veut souvent dire toucher à plein de petits endroits. Avec le MVI, il est possible de ne toucher qu'à de petits bouts de l'application à la fois. Si en plus, on sépare l'application en composants, on commence à dangeureusement se approcher du Nirvana. :)

### Pour aller plus loin

#### Dîtes oui à l'immutabilité&nbsp;!

A plusieurs endroits, j'ai muté des variables ou des objets (ex&nbsp;: `monTableau.push(maVariable)`). D'une manière général, c'est une assez mauvaise idée parce qu'on finit toujours par avoir des effets de bord innattendus.

Essayez donc de rester le plus possible sur des structures immutables. C'est un sujet à part entière, donc je ne vais pas pouvoir vous en expliquer plus ici. Cependant, vous pourrez trouver plus d'informations sur ces liens&nbsp;:

/!\ TODO Lien explicatif de l'immutabilité + lien article pour faire de l'immutable en JS + lien vers immutable.js /!\


#### Ajouter d'autres données dans le model$

Afin de rester sur un tutoriel à peu près digeste, j'ai fait en sorte que le `model$` soit constitué uniquement de la liste des messages. Cependant, dans une application, vraisemblablement, on doit stocker plus de choses dans le modèle. Comment faire ?

L'idée est de traiter chaque partie du modèle séparément puis de les fusionner. Par exemple, si je veux stocker dans mon modèle le nom de l'utilisateur connecté et le nom de la personne avec qui je suis entrain de discuter, je commencerais par construire deux nouveaux Observables `me$` et `contact$` qui auront leur propre cycle de vie. Une fois qu'ils sont construits, je peux alors les fusionner&nbsp;:

```js
const model$ = messageList$
  .combineLatest(me$, contact$, (messageList, me, contact) => ({
    messageList,
    me,
    contact
  }))
```

C'est un peu comme si on avait plusieurs petites applications dans une seule application. Cette méthode est d'ailleurs à privilégier plutôt que de complexifier le modèle existant.

#### Comment faire... mieux&nbsp;?

A plusieurs endroits, j'ai essayé de ne pas aller trop loin dans la manipulation des Observables et des principes fonctionnels afin que ce soit le plus abordable possible. Cependant, une fois que le squelette est posé, vous pouvez refactorer chaque partie tant que vous vous assurez que pour les mêmes entrées, il y aura les mêmes sorties. C'est tout l'avantage de la programmation réactive.

D'ailleurs, il y a des outils sympathiques pour tester votre code. Je vous invite à regarder du côté du [Marble Testing](https://www.ericponto.com/blog/2017/01/08/rxjs-marble-diagram-tests-with-qunit/).

Dans tous les cas, l'idée est de faire en sorte que ça marche pour vous et votre équipe&nbsp;: inutile d'aller trop loin si vous êtes le seul à comprendre votre code.
