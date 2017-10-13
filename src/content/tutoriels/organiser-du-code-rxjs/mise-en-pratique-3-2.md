
Cependant, si on execute ce code, on a l'erreur&nbsp;: *`submitMessageEvent$` is undefined*. Il va donc falloir le récupérer depuis `view$`. En effet, on a dit que `displayView` était responsable de mettre à disposition un tel Observable. il va donc être possible de faire découler `sendMessageIntent$` de `view$`. Et ça tombe bien, cela nous permet de respecter le MVI. :)

La subtilité cependant est que dans un observable (`view$`), on a un sous-observable (`view.submitMessageEvent$`). Pourtant, nous ne voulons pas que l'`intent$` soit un *Observable* qui contient des *Observables* qui contiennent des *valeurs*. Nous voulons uniquement un *Observable* qui contient des *valeurs*. C'est pourquoi nous allons utiliser `mergeAll`. Cet opérateur récupére toutes les valeurs présentes dans les sous-observables et les met à disposition directement dans l'observable qu'il crée.

```js
// On récupère les sous observables
// qui contiennent les évènements 
const submitMessageEvent$$ = view$
  .map((view) => view.submitMessageEvent$)

// On applatit les sous observables
const submitMessageEvent$ = submitMessageObservable$
  .mergeAll((view) => view.submitMessageEvent$)

// On transforme event$ en intent$
// (idem que code plus haut)
const sendMessageIntent$ = submitMessageEvent$
  .map((event) => event.sourceTarget)
  .map((formElement) => new FormData(formElement))
  .map((formData) => formData.serialize())
```