
Et voilà ! Nous avons de l'optimistic update dans notre application ! On a dû faire quelques modifications, mais dans l'ensemble, on n'a pas eu *beaucoup* de travail.

C'est d'une part grâce à la programmation réactive&nbsp;: en ajoutant des fonctionnalités, on n'a aucune chance de casser le reste à condition de ne pas renommer à tord et à travers les variables.

D'autre part, c'est grâce au pattern MVI&nbsp;: une fois que les intentions sont décrites, on peut en extrapoler beaucoup d'information sans avoir besoin de toucher ni à la vue ni aux autres intentions. C'est un vrai plus pour des applications à maintenir pendant longtemps. Rajouter des fonctionnalités veut souvent dire toucher à plein de petits endroits. Avec le MVI, il est possible de ne toucher qu'à de petits bouts de l'application à la fois. Si en plus, on sépare l'application en composants, on commence à dangeureusement se approcher du Nirvana. :)

### Pour aller plus loin

#### Dîtes oui à l'immutabilité&nbsp;!

A plusieurs endroits, j'ai muté des variables ou des objets (ex&nbsp;: `monTableau.push(maVariable)`). C'est mal parce qu'un Observable finira par mentir sur sa valeur à cause d'un effet de bord oublié.

Essayez donc de rester le plus possible sur des structures immutables. C'est un sujet à part entière, donc je ne vais pas pouvoir vous en expliquer plus ici. Cependant, vous pourrez trouver plus d'informations sur ces liens&nbsp;:

/!\ TODO Lien explicatif de l'immutabilité + lien article pour faire de l'immutable en JS + lien vers immutable.js /!\


#### Ajouter d'autres données dans le model$

Afin de rester sur un tutoriel à peu près digeste, j'ai fait en sorte que le `model$` soit constitué d'une unique liste. Cependant, dans une application, vraisemblablement, on doit stocker plusieurs valeurs dans le modèle. Comment faire ?

Il y a plusieurs cas d'utilisation. Cependant, l'idée est de dépendre le moins possible du reste de l'application. Par exemple, si je veux stocker dans mon modèle le nom de l'utilisateur connecté et le nom de la personne avec qui je suis entrain de discuter, je commencerais par construire deux nouveaux Observables `me$` et `contact$` sans prendre en compte le reste de l'application. Puis, je les ajouterai à mon modèle final de la façon suivante&nbsp;:

```js
const model$ = messageList$
  .combineLatest(me$, contact$, (messageList, me, contact) => ({
    messageList,
    me,
    contact
  }))
```

Ainsi, on est sûr de ne pas casser la liste des messages et que chaque partie de l'application va vivre indépendamment.

Cette méthode est d'ailleurs à privilégier plutôt que de complexifier une partie du modèle existant, sous peine d'avoir des effets de bords assez bizarres.

#### Comment faire plus joli/lisible/concis/à-mon-goût/à-votre-goût&nbsp;?

A plusieurs endroits, j'ai essayé de ne pas aller trop loin dans la manipulation des Observables et des principes fonctionnels afin que ce soit le plus abordable possible. N'hésitez pas à changer l'écriture à votre convenance. L'idée est de toute façon de faire en sorte que ça marche pour vous et votre équipe.

Cependant, il y a un point qui je pense mérite d'être abordé pour les plus à l'aise d'entre vous&nbsp;: la description des actions dans la partie 4.

Le principe que je vous ai montré consiste à transformer des situations en des objets qui décrivent les actions à réaliser. C'est ensuite lors de la fusion des différentes actions que l'on va *implémenter* ce qu'est censé faire chaque action.

Dans une application complexe, cela veut vraisemblablement dire que la partie qui traite les actions va exploser en complexité au fur et à mesure que des cas particuliers viendront se greffer. Il y a bien des méthodes pour s'en sortir (cf. l'écosystème de Redux), mais le plus simple à mon sens est de repenser la façon dont on décrit une action.

En effet, quand on décrit une action, vraisemblablement, la première idée qui vient à l'esprit est de faire un objet qui contiendra tous les paramètres utiles à celle-ci. C'est ce que nous avons fait dans la partie précédente. Pourtant, fondamentalement, le but d'une action n'est pas de *décrire* des changements, mais de *transformer* l'étape précédente en l'étape suivante.

Ca ressemble quand même beaucoup à une fonction&nbsp;! Et effectivement, une bonne pratique serait de retourner les actions sous forme de fonctions plutôt que d'envoyer des informations statiques qui seront transformées en fonction plus tard.

En pratique, comment ça peut se faire&nbsp;?

Prenons le cas de l'ajout de message. L'action consiste à prendre l'ancienne liste et lui ajouter le message reçu. On peut donc récupérer ce que nous avions codé dans le `model$` et le mettre directement dans l'action.

```js
receiveMessage$ = receivedMessageIntent$
  // [...] On transforme toujours le message
  // pour le préparer à l'ajouter dans la liste
  // (ajout du type "received_message", etc.).
  // Puis on transforme le message en une
  // action-fonction.
  .map((message) => {
    // Le but est de créer la fonction qui sera
    // appliquée à la liste de message actuelle.
    // Le paramètre est donc la liste de message.
    return (previousMessageList) => {
      // Et on renvoie la nouvelle liste qui
      // contient le nouveau message.
      // C'est exactement le même code que ce
      // qu'il y avait dans la clause
      // `action.action === 'ajouter_message'`
      // de `model$`
      previousMessageList.push(action.message)

      return previousMessageList
    }
  })
```

Nous avons donc maintenant un observable qui contient des actions représentées sous forme de fonctions. Il s'agirait de faire la même chose pour `optimisticSendMessage$` et `confirmSentMessage$`.

Une fois fait, il ne reste donc qu'à construire le modèle à partir de celui-ci&nbsp;:

```js
const model$ = Observable.merge(
  receiveMessage$,
  optimisticSendMessage$,
  confirmSentMessage$
)
  .scan((previousMessageList, actionFunction) => (
    actionFunction(previousMessageList)
  ), [])
```

En faisant cela, on a donc bien réussi à isoler les responsabilités : seules les actions sont responsables de savoir comment elles vont affecter le modèle final. Ce dernier n'a plus besoin de comprendre le fonctionnement une action. Il n'a qu'à l'appliquer.