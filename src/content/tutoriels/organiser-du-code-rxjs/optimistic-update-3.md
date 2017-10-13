
#### Affichage d'un message non confirmé

```js
// De la même façon que pour la réception, cette
// situation se présente dès qu'on a l'intention
// d'envoyer un message
const optimisticSendMessage$ = sendMessageIntent$
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
