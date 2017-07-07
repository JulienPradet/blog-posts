Si vous n'avez pas encore eu l'occasion de vous battre avec des `mergeAll`, cette notion ne sera pas forcément facile à appréhender. Mais globalement, ce que vous pouvez vous dire, c'est que si dans un observable, vous vous attendez à recevoir des valeurs mais que vous avez un observable, c'est qu'il manque un `mergeAll` quelque part (ou un [`switchMap`](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-switchMap)).

Ok. Nous avons donc notre `intent$` permettant de dire qu'on souhaite envoyer un message. Il est donc temps de l'envoyer au serveur.

```js 
// Pour chaque intention, on décide d'envoyer
// le message au serveur
const sendMessageRequest$ = sendMessageIntent$
  .map((sentMessageData) => (
    // On envoie le message au serveur qui
    // nous le retourne lorsqu'il est
    // correctement enregistré
    fetch.post('/message', sentMessageData)
      .then((response) => response.json())
  ))

// On transforme la promesse en un observable
// pour pouvoir mieux le manipuler
const sendMessageResponse$$ = sendMessageRequest$
  .map((promise) => 
    Observable.fromPromise(promise))

// On applatit les réponses pour avoir un
// Observable final qui contient tous les
// messages envoyés avec succès
const sendMessageResponse$ = sendMessageResponse$$
  .mergeAll(sentMessageResponse$ => sentMessageResponse$)

// On précise que c'est un message envoyé
const sentMessage$ = sendMessageResponse$
  .map((message) => ({
    ...message,
    type: 'sent_message'
  }))
```
