
> A noter&nbsp;: étant donné que c'est exactement la action d'ajout pour les messages reçus ou pour les messages envoyés, il serait envisageable de faire un petit peu de refactoring à l'aide d'un `Observable.merge` pour éviter de la dupplication de code.

#### Confirmation d'un message

```js
// Cette fois, le but va être d'envoyer le
// message au serveur, d'écouter la réponse
// et de remplacer le message optimiste par
// le nouveau.
// On repart donc de `sentMessage$` qui est
// la réponse serveur.
const confirmSentMessage$ = sentMessage$
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
  // modifier l'état.
  .map((message) => ({
    action: 'confirmer_message',
    message: message
  }))
```