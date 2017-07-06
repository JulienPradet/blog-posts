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
