
### 4. Affichage du message *avant* confirmation serveur

Le principe de l'[Optimistic Update](https://uxplanet.org/optimistic-1000-34d9eefe4c05) est de mettre à jour l'application avant même d'avoir reçu la confirmation du serveur. Cela améliore grandement la performance ressentie de l'application et dans l'ensemble est très positif pour l'expérience utilisateur.

Dans le cadre d'un tchat, il s'agirait d'afficher le message envoyé par l'utilisateur avant même que le serveur nous confirme la réception du message. Comment adapter notre code pour atteindre ce résultat&nbsp;?

Il va falloir faire deux changements&nbsp;:

* Ajouter les messages directement depuis l'intention d'envoi de message plutôt que depuis la confirmation serveur
* Modifier le message une fois la confirmation reçue

Pour faire cela, nous allons devoir changer notre manière de construire le modèle. En effet, jusqu'à maintenant, nous prenions des messages et les fusionnions afin de construire une liste. C'était possible parce que chaque message représentait un bout de la frise à construire et qu'il suffisait de les mettre bout à bout. Cependant, maintenant, nous avons une nouvelle situation qui affectera différemment la frise : plutôt que de l'agrandir, nous allons devoir faire des petites corrections en plein milieu.
