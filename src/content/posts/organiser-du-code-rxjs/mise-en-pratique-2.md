Le but est d'ajouter les messages reçus au fur et à mesure dans le model. Si on revient sur notre diagramme du MVI, on constate que seules les intentions peuvent impacter le modèle. Et effectivement, c'est une intention&nbsp;! Elle ne vient pas du DOM, mais il ne faut pas s'arrêter là puisque le serveur nous communique l'intention d'ajouter un message à la liste de messages.

```js
const receiveMessageIntent$ = receiveServerMessage$

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
  // A chaque nouveau message dans receivedMessage$
  // on va compléter le tableau qui les contiendra
  // tous
  .scan((previousMessageList, newMessage) => {
    previousMessageList.push(newMessage)

    return previousMessageList
  }, [])
  // On commence par une liste vide en attendant
  // de recevoir les premiers messages du serveur
  .startWith([])
```
