Nous avons donc une magnifique application qui affiche une liste vide. Cependant, on peut profiter de cette étape pour changer le modèle initial et y mettre n'importe quelle donnée : un message unique recu, un message unique envoyé, une liste de message complète, etc. Vous pourrez ainsi tester le comportement de la fonction `displayView` pour qu'elle affiche le modèle convenablement dans tous les cas.

La seule contrainte, est que la fonction `displayView` réponde au contrat suivant&nbsp;:

- affiche la liste de messages passée en entrée
- affiche un formulaire d'envoi de message
- retourne les observables représentants les évènements du DOM : pour nous il n'y aura que la soumission du formulaire.

Comme indiqué en préambule, je ne détaillerai pas l'implémentation de cette fonction. Une solution serait d'utiliser la librairie [virtual-dom](https://github.com/Matt-Esch/virtual-dom) comme j'ai pu le faire dans l'exemple complet disponible sur [github](https://github.com/JulienPradet/blog-posts/tree/master/src/content/tutoriels/organiser-du-code-rxjs/tchat/). Cependant, il est tout à fait possible de le remplacer par des composants React ou de l'adapter au framework de votre choix.

Une fois que la méthode `displayView` est implémentée, il est temps de rendre l'application dynamique.

### 1. Récupération des messages distants

Pour rendre cette liste de messages dynamique, la première étape consiste à récupérer des messages depuis le serveur. Pour cela, admettons que nous avons à disposition l'observable `receiveServerMessage$` qui va fournir, un par un, les messages envoyés par le serveur.
