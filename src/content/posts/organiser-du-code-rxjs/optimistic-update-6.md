
Et voilà ! Vous avez de l'optimistic update dans votre application ! On a dû faire quelques modifications, mais dans l'ensemble, on n'a pas eu beaucoup de travail.

C'est d'une part grâce à la programmation réactive&nbsp;: en ajoutant des fonctionnalités, on n'a aucune chance de casser le reste à condition de ne pas renommer à tord et à travers les variables.

D'autre part, c'est grâce au pattern MVI&nbsp;: une fois que les intentions sont décrites, on peut en extrapoler beaucoup d'information sans avoir besoin de toucher ni à la vue ni aux autres intentions. C'est un vrai plus pour des applications que vous devrez maintenir pendant longtemps. Rajouter des fonctionnalités veut souvent dire que vous avez besoin de toucher à plein de petits endroits. Avec le MVI, vous ne devriez toucher qu'à de petits bouts de l'application à la fois. Si en plus, vous séparer votre application en composants, vous commencez à dangeureusement vous approcher du Nirvana. :)

### Pour aller plus loin

A bien des niveaux, j'ai essayé de ne pas aller trop loin dans la manipulation des Observables et des principes fonctionnels afin que ce soit le plus abordable possible. Il y a notamment un point qui je pense mérite d'être abordé pour les plus à l'aise d'entre vous&nbsp;: la description des actions dans la partie 4.

Le principe que je vous ai montré consiste à transformer des situations en des objets qui décrivent les actions à réaliser. C'est ensuite lors de la fusion des différentes actions que l'on va *coder* ce qu'est censé faire chaque action.

Dans une application complexe, cela veut vraisemblablement dire que la partie *code* va exploser en complexité au fur et à mesure que des cas particuliers viendront se greffer. Il y a bien des méthodes pour s'en sortir (cf. Redux), mais le plus simple est de repenser la façon dont on décrit une action.

En effet, quand on pense à décrire une action, vraisemblablement, la première idée qui vient à l'esprit est, comme nous l'avons fait, de faire un objet qui contiendra tous les paramètres utiles. Pourtant, fondamentalement, le but d'une action n'est pas de se décrire mais de transformer l'étape précédente en l'étape suivante. Autrement dit, c'est de prendre en paramètre l'étape précédente et de retourner l'étape suivante. Ca ressemble quand même beaucoup à une fonction&nbsp;! Et effectivement, une bonne pratique serait de retourner cette fonction plutôt que d'envoyer des informations statiques dont le seul but est de reconstruire celle-ci plus tard.

En pratique, comment est-ce que ça se traduit ?

Dans le cas de l'ajout de message, l'action consiste à prendre l'ancienne liste et lui ajouter le message reçu.

```js
receiveMessage$ = receivedMessage$
  // [...] On transforme toujours le message
  // pour le préparer à l'ajouter dans la liste
  // Puis on le transforme en action
  .map((message) => {
    // Le but est de créer la fonction qui sera
    // appliquée à la liste de message actuelle
    // On fait donc une fonction qui prend en
    // paramètre la liste de message
    return (previousMessageList) => {
      // Et on renvoie la nouvelle liste qui
      // contient le nouveau message
      // C'est exactement le même code que ce
      // qu'il y avait dans la clause
      // `action.action === 'ajouter_message'`
      previousMessageList.push(action.message)

      return previousMessageList
    }
  })
```

Nous avons donc maintenant un observable qui contient des actions représentées sous forme de fonctions. En reprenant le même principe, il est possible de faire de même avec `optimisticallySendMessage$` et `confirmSentMessage$`.

Il ne reste donc plus qu'à construire le modèle à partir de celui-ci&nbsp;:

```js
const model$ = Observable.merge(
  receiveMessage$,
  optimisticallySendMessage$,
  confirmSentMessage$
)
  .scan((previousMessageList, actionFunction) => (
    actionFunction(previousMessageList)
  ), [])
```

En faisant cela, on n'a donc bien réussi à isoler les responsabilités : seules les actions sont responsables de savoir comment elles vont affecter le model final plutôt que ce soit le rôle du modèle de savoir comment répondre aux demandes des actions.