RxJS est une librairie permettant de tirer profit des *Observables* et ainsi coder de manière *réactive*. Si ces termes vous sont inconnus, n'hésitez pas à jeter un coup d'oeil à [mon article d'introduction sur le sujet](https://www.julienpradet.fr/posts/introduction-a-rxjs "Introduction à RxJS").

Ce que j'apprécie avec cette librairie, c'est son paradigme. On n'est plus sous l'étandard de la traditionnelle programmation impérative et on passe du côté de la programmation fonctionnelle et réactive. Malheureusement, en changeant de pardigme, on perd nos repères. Il faut donc les reconstruire, sous peine de faire des spaghettis.

Un des repères qui peut vous être le plus utile est le pattern Modèle-Vue-Intention (ou Model-View-Intent, ou MVI) qui a été introduit par [André Staltz/Medeiros](http://futurice.com/blog/reactive-mvc-and-the-virtual-dom). Celui-ci a été initialement pensé pour organiser des applications front-end entièrement écrites en RxJS (ex: CycleJS). Cependant le modèle de pensées qu'il représente vous sera utile quelque soit le type d'application que vous construirez.

## Model-Vue-Intention

Ce pattern est en fait inspiré du pattern <abbr title="Model-View-Controller">MVC</abbr>.

IMAGE MVC

* Modele&nbsp;: représente les données de l'application  
    * Prévient la **Vue** lorsque les données changent

* Vue&nbsp;: affiche l'application  
    * Demande des données au **Model** pour pouvoir s'afficher
    * Prévient le **Controleur** lorsque l'utilisateur fait une action

* Controleur&nbsp;: gère l'évolution de l'application  
    * Met à jour le **Modèle** à partir des actions de la **Vue**

> *A Noter&nbsp;:* MVC n'est pas un pattern très précis et peut varier en fonction des implémentations et des usages. Il est donc tout à fait possible que le schema représenté ci-dessus ne représente pas exactement l'implémentation que vous utilisez au jour le jour. Cependant, l'idée générale reste la même.

Le MVC a régné pendant un moment sur le développement d'applications clientes et est toujours très présent côté serveur. Il n'est pas donc pas à jeter, ni à oublier.

L'avantage de celui-ci est qu'il y a une distinction claire entre chaque partie de l'application. Grâce à cela, chaque élément peut évoluer de manière quasi isolée sans impacter le reste. Le problème, dans notre cas, est qu'il ne convient pas du tout à la programmation réactive.

En effet, chaque partie doit connaître l'existence et les méthodes de l'autre pour pouvoir fonctionner&nbsp;:
* la vue *active* le controleur
* le contrôleur *transforme* le modèle

Ils *font* des choses au lieu de *prévenir* qu'il se passe quelque chose. Ils ne sont donc pas *réactifs*. Il n'y a que le modèle qui est réactif. S'il change, il se contente de prévenir qu'il a été mis à jour. Il ne sait pas ce qu'il va advenir de ses données.

Donc, si on enlève tout ce qui n'est pas réactif, on se retrouve avec le diagramme suivant&nbsp;:

IMAGE MV

Cependant, l'application n'évolue plus. Il n'y a plus rien qui récupère les actions de la vue pour en faire quelque chose étant donné que c'était le rôle du Contrôleur. Il va donc falloir le remplacer.

C'est ici qu'entre en jeu les **Intentions**. Celles-ci récupérent les actions de l'utilisateur et les transforment un flux d'action métiers. Une intention n'a donc qu'un rôle de traduction : transformer un évènement technique (ex: évènement de click sur un élément du DOM) en un évènement métier. Cela permet de totalement isoler le modèle de la vue.

Nous arrivons donc au fonctionnement suivant&nbsp;:

IMAGE MVI

1. On initialise le modèle avec des données initiales
2. On affiche la vue à partir du modèle
3. On écoute les actions de l'utilisateur et les formalisent sous la forme d'intentions
4. On écoute ces intentions pour mettre à jour le modèle
5. On écoute le modèle pour modifier la vue en conséquence
6. Passer à l'étape 3.

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

Pour rendre cette liste de messages dynamique, la première étape consiste à récupérer des messages depuis le serveur. Pour cela, admettons que nous avons à disposition l'observable `receivedMessages$` qui va fournir, un par un, les messages envoyés par le serveur.

IMAGE représentant le flux de messages

Le but est d'ajouter les messages reçus au fur et à mesure dans le model. Si on revient sur notre diagramme du MVI, on constate que seules les intentions peuvent impacter le modèle. Et effectivement, c'est une intention&nbsp;! Elle ne vient pas du DOM, mais il ne faut pas s'arrêter là puisque le serveur nous communique l'intention d'ajouter un message à la liste de messages.

```js
const receiveMessageIntent$ = receivedMessages$

// Dans la liste que nous construisons, nous
// allons avoir besoin de savoir si un message
// est reçu ou envoyé. Nous ajoutons donc le
// type 'received_message' à tous les messages
// qui viennent de l'intention de réception
const receivedMessage$ = receiveMessageIntent$
  .map((message) => ({
    ...message,
    type: 'received_message'
  }))

const model$ = receivedMessage$
  // A chaque nouveau message dans receivedMessages$
  // on va compléter le tableau qui les contiendra
  // tous
  .scan((previousMessageList, newMessage) => {
    return previousMessageList.concat(newMessage)
  }, [])
  // On commence par une liste vide en attendant
  // de recevoir les premiers messages du serveur
  .startWith([])
```

IMAGE Transformation de receiveMessageIntent$ => model$

Cool. On a maintenant des messages qui arrivent du serveur et qui sont enregistrés dans le modèle. La vue gérant déjà l'affichage des messages, il n'y a donc rien d'autre à changer pour voir des messages arriver du serveur.

Personnellement, quand j'ai aussi peu de choses à faire pour synchroniser mon serveur et ma vue, je saute de joie.

### 2. Envoi d'un message

Maintenant que nous sommes capables de recevoir de doux messages, on va s'ouvrir au monde et commencer à envoyer nous aussi des messages.

Au niveau applicatif, comment ça se passe pour envoyer un message&nbsp;? Un utilisateur entre un message dans un formulaire et le soumet. Une fois soumis, nous récupérons le message et l'envoyons au serveur. Une fois enregistré côté serveur, nous allons pouvoir le recevoir et l'ajouter à la liste des messages à afficher. Il nous faut donc la transformer en intention.

```js
// On part de l'observable contenant les évènements
// de soumission du formulaire et on le transforme
// en intention
const sendMessageIntent$ = submitMessageEvent$
  // A partir de l'évènement, on récupère le formulaire
  .map((event) => event.sourceTarget)
  // A partir du formulaire, on récupère les données
  .map((formElement) => new FormData(formElement))
  .map((formData) => formData.serialize())
```

Image transformation submitMessageEvent => sendMessageIntent$

Cependant, si vous executez ce code&nbsp;: *`submitMessageEvent$` is undefined*. Il va donc falloir le récupérer depuis `view$`. En effet, on a dit que `displayView` était responsable de mettre à disposition un tel Observable. il va donc être possible de faire découler `sendMessageIntent$` de `view$`. Et ça tombe bien, cela nous permet de respecter le MVI. :)

```js
const sendMessageIntent$ = view$
  // On récupère l'observable et on l'*aplatit*
  // cf. paragraphe ci-dessous
  .flatMap((view) => view.submitMessageEvent$)
  // On transforme event$ en intent$
  // (idem que code plus haut)
  .map((event) => event.sourceTarget)
  .map((formElement) => new FormData(formElement))
  .map((formData) => formData.serialize())
```

La subtilité ici est dans un observable (`view$`), on a un sous-observable (`view.submitMessageEvent$`). Pourtant, nous ne voulons pas que l'`intent$` soit un Observable qui contient des Observables qui contiennent des valeurs. Nous voulons uniquement un Observable qui contient des valeurs. C'est pourquoi nous utilisons `flatMap`. Cet opérateur récupére toutes les valeurs présentes dans les sous-observables et les met à disposition directement dans l'observable qu'il crée.

IMAGE view$ => sendMessageIntent$

Si vous n'avez pas encore eu l'occasion de vous battre avec des `flatMap`, cette notion ne sera pas forcément facile à appréhender. Mais globalement, ce que vous pouvez vous dire, c'est que si dans un observable, vous vous attendez à recevoir des valeurs mais que vous avez un observable, c'est qu'il manque un `flatMap`/`switchMap` quelque part.

Ok. Nous avons donc notre `intent$` permettant de dire qu'on souhaite envoyer un message. Il est donc temps de l'envoyer au serveur et de l'ajouter à la liste des messages.

```js 
// Création de l'observable des messages envoyés
const sentMessage$ = sendMessageIntent$
  // Pour chaque intention, on décide d'envoyer
  // le message au serveur
  .map((sentMessageData) => (
    // On envoie le message au serveur qui
    // nous le retourne lorsqu'il est
    // correctement enregistré
    fetch.post('/message', sentMessageData)
      .then((response) => response.json())
  ))
  // On transforme la promesse en un observable
  // pour pouvoir mieux le manipuler
  .map(sendMessagePromise =>
    Observable.fromPromise(sendMessagePromise))
  // On applatit les réponses pour avoir un
  // Observable final qui contient tous les
  // messages envoyés avec succès
  .flatMap(sentMessageResponse$ => sentMessageResponse$)
  // On précise que c'est un message envoyé
  .map((message) => ({
    ...message,
    type: 'sent_message'
  }))

// La partie des messages reçus ne bouge pas
const receivedMessage$ = receiveMessageIntent$
  .map((message) => ({
    ...message,
    type: 'received_message'
  }))

// On met bout à bout avec les receivedMessages$
const model$ = Observable.merge(
  sentMessage$,
  receivedMessage$
)
  // Et le reste du code ne change pas
  // scan et startWith restent identiques
  .scan(/* ... */)
  .startWith([])
```

IMAGE

L'envoi des messages au serveur peut sembler un poil alambiqué si vous n'êtes pas habitués à Rx. mais n'est pas si terrible que ça parce que &nbsp;:
* vous allez vous habituer à Rx :P
* ça pourrait être fait différemment&nbsp;: on pourrait envisager d'ecrire `sentMessages$` de manière plus impérative à l'aide d'un `Observable.create` comme montré dans mon précédent tuto /!\\ TODO /!\\
* la partie compliquée est petite et isolée&nbsp;: ça peut donc être refactoré à loisir

Mais globalement, on peut dire que quand même, on a le droit de faire un deuxième saut de joie. Pour ajouter des messages d'une source totalement différente, nous n'avons quasiment pas modifié le code qui existait déjà et dans le code ajouté est relativement concis.

Donc on est content, mais dans l'ensemble on n'a quand même rien fait de très compliqué en terme applicatif. On va donc essayer de mettre en place quelque chose qui demande un petit peu plus de travail en temps normal et qui est de plus en plus demandé de nos jours&nbsp;: de l'Optimistic Update.

### 4. Affichage du message *avant* confirmation serveur

Le principe de l'Optimistic Update /!\\ TODO lien /!\\ est de mettre à jour votre application avant même d'avoir reçu la confirmation du serveur. Cela améliore grandement la performance ressentie de votre application et dans l'ensemble est très positif pour l'expérience utilisateur.

Dans le cadre d'un tchat, il s'agirait d'afficher le message envoyé par l'utilisateur avant même que le serveur nous confirme la réception du message. Comment adapter notre code pour atteindre ce résultat&nbsp;?

Il va falloir faire deux changements&nbsp;:

* Construire la liste des messages non pas à partir de la confirmation mais de l'intention d'envoie du message
* Modifier le message une fois la confirmation reçue

Pour faire cela, nous allons devoir changer notre manière de construire le modèle. En effet, jusqu'à maintenant, nous prenions des messages et les fusionnions afin de construire une liste. C'était possible parce que chaque message représentait un bout de la frise à construire et qu'il suffisait de les mettre bout à bout. Cependant, maintenant, nous avons une nouvelle situation qui affectera différemment la frise : plutôt que de l'agrandir, nous allons devoir faire des petites corrections en plein milieu.

IMAGE Aggrégation Avant/Après

Pour faire cela, nous allons :
1. Identifier les différentes situations possibles
2. Construire des observables qui réprésenteront chaque situation
3. Décrire comment chaque situation affecte notre état

#### Réception d'un message

```js
// La situation se présente dès qu'on reçoit
// l'intention de la part du serveur
const receiveMessage$ = receiveMessageIntent$
  // Le message n'est pas assez complet pour la
  // vue et donc, comme avant, on y ajoute les
  // données nécessaires
  .map((message) => ({
    ...message,
    type: 'received_message'
  }))
  // Et pour chaque message, on décrit comment
  // celui-ci va transformer l'état précédent
  .map((message) => ({
    action: 'ajouter_message',
    message: message
  }))
```

#### Affichage d'un message non confirmé

```js
// De la même façon que pour la réception, cette
// situation se présente dès qu'on a l'intention
// d'envoyer un message
const optimisticallySendMessage$ = sendMessageIntent$
  // Le message n'est pas assez complet pour la
  // vue et donc, de même, on y ajoute les
  // données nécessaires
  .map((message) => ({
    ...message,
    is_confirmed: false,
    type: 'sent_message'
  }))
  // Chaque message va s'ajouter exactement de la
  // même façon que pour la réception de messages
  .map((message) => ({
    action: 'ajouter_message',
    message: message
  }))
```

> A noter&nbsp;: étant donné qu'on fait exactement la même opération d'ajout pour les messages reçus ou pour les messages envoyés, il serait envisageable de faire un petit peu de refactoring à l'aide d'un `Observable.merge` pour éviter de la dupplication de code.

#### Confirmation d'un message

```js
// Cette fois, le but va être d'envoyer le
// message au serveur, d'écouter la réponse
// et de modifier le message optimiste par
// le nouveau
const confirmSentMessage$ = sendMessageIntent$
  // [...] envoi au serveur
  // Une fois que le serveur a répondu, on
  // a le message mis à jour qui représente
  // la confirmation.
  // On y ajoute toujours les infos utiles. 
  .map((message) => ({
    ...message,
    is_confirmed: true,
    type: 'sent_message'
  }))
  // Et on décrit l'action pour savoir comment
  // modifier l'état
  .map((message) => ({
    action: 'confirmer_message',
    message: message
  }))
```

#### Création de la liste finale

Nous avons donc maintenant trois observables qui décrivent les transformations à apporter à notre liste de messages : `$receiveMessage`, `optimisticallySendMessage$` et `confirmSentMessage$`. Il ne nous reste plus qu'à les assembler pour construire notre `model$`.

```js
Observable.merge(
  receiveMessage$,
  optimisticallySendMessage$,
  confirmSentMessage$
)
  .scan((previousMessageList, action) => {
    if(action.action === 'ajouter_message') {
      previousMessageList.push(action.message)

      return previousMessageList
    } else {
      const messageIndex = previousMessageList
        .findIndex((message) => (
          isSameMessage(message, action.message)
        ))

      previousMessageList[messageIndex] = action.message
      
      return previousMessageList
    }
  }, [])
```

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

## Conclusion

C'est donc tout pour aujourd'hui&nbsp;!

Ca fait un sacré morceau, pour moi comme pour vous. Il est donc le temps d'aller se changer les idées&nbsp;! Cela dit, quand vous y reviendrez, n'hésitez pas à jeter un coup d'oeil au dépôt github qui récapitule un petit peu tout ça. Ce n'est pas aussi détaillé qu'ici mais ça aura l'avantage d'être une application fonctionnelle. Cela répondra donc peut-être à des questions que vous vous pensez encore après avoir lu ce tutoriel.

En tout cas, si vous avez des questions, des remarques ou des envies, n'hésitez pas à me contacter via twitter, github ou autre&nbsp;: c'est toujours un plaisir. :)

A bientôt pour de nouvelles aventures&nbsp;!

------

Sources complémentaires&nbsp;:

- [Model-View-Intent](http://futurice.com/blog/reactive-mvc-and-the-virtual-dom) un pattern pour structurer son code en RxJS
