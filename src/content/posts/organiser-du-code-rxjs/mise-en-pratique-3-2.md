
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
