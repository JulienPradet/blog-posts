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
	}));
```
