Cool. On a maintenant des messages qui arrivent du serveur et qui sont enregistrés dans le modèle. La vue gérant déjà l'affichage des messages, il n'y a donc rien d'autre à changer pour voir des messages arriver du serveur.

Personnellement, quand j'ai aussi peu de choses à faire pour synchroniser mon serveur et ma vue, je saute de joie.

### 2. Envoi d'un message

Maintenant que nous sommes capables de recevoir de doux messages, on va s'ouvrir au monde et commencer à envoyer nous aussi des messages.

Au niveau applicatif, comment ça se passe pour envoyer un message&nbsp;? Un utilisateur entre un message dans un formulaire et le soumet. Une fois soumis, nous récupérons le message et l'envoyons au serveur. Une fois enregistré côté serveur, nous allons pouvoir le recevoir et l'ajouter à la liste des messages à afficher. Il nous faut donc transformer l'évènement de soumission du formulaire en intention.

```js
// On part de l'observable contenant les évènements
// de soumission du formulaire et on le transforme
// en intention
const sendMessageIntent$ = submitMessageEvent$
	// A partir de l'évènement, on récupère le formulaire
	.map((event) => event.sourceTarget)
	// A partir du formulaire, on récupère les données
	.map((formElement) => new FormData(formElement))
	.map((formData) => formData.serialize());
```
