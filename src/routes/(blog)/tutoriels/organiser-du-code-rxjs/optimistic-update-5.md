#### Création de la liste finale

Nous avons donc maintenant trois observables qui décrivent les transformations à apporter à notre liste de messages : `receiveMessage$`, `optimisticSendMessage$` et `confirmSentMessage$`. Il ne nous reste plus qu'à les assembler pour construire notre `model$`.

```js
const model$ = Observable.merge(receiveMessage$, optimisticSendMessage$, confirmSentMessage$).scan(
	(previousMessageList, action) => {
		if (action.action === 'ajouter_message') {
			previousMessageList.push(action.message);

			return previousMessageList;
		} else if (action.action === 'confirmer_message') {
			const messageIndex = previousMessageList.findIndex((message) =>
				isSameMessage(message, action.message)
			);

			previousMessageList[messageIndex] = action.message;

			return previousMessageList;
		} else {
			return previousMessageList;
		}
	},
	[]
);
```
