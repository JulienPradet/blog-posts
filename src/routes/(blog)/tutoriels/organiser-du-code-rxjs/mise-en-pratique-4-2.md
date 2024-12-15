L'envoi des messages au serveur peut sembler un poil alambiqué si vous n'êtes pas habitués à Rx. Mais ce n'est pas si terrible que ça parce que &nbsp;:

- vous allez vous habituer à Rx :P
- ça pourrait être fait différemment&nbsp;: on pourrait envisager d'écrire `sentMessage$` de manière plus impérative à l'aide d'un `Observable.create` comme montré dans mon [précédent tutoriel](/posts/introduction-a-rxjs/)
- la partie compliquée est petite et surtout isolée&nbsp;: ça peut donc être refactoré à loisir

Maintenant que nous avons les deux sources de messages qui sont prêtes à être consommées, nous pouvons les assembler pour créer notre modèle final.

```js
// On fusionne les deux sources de message
const message$ = Observable.merge(sentMessage$, receivedMessage$);

const model$ = message$
	// Et le reste du code ne change pas
	// scan et startWith restent identiques
	.scan(/* ... */)
	.startWith([]);
```
