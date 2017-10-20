* Modèle&nbsp;: représente les données de l'application  
    * Prévient la **Vue** lorsque les données changent

* Vue&nbsp;: affiche l'application  
    * Demande des données au **Modèle** pour pouvoir s'afficher
    * Prévient le **Controleur** lorsque l'utilisateur fait une action

* Controleur&nbsp;: gère l'évolution de l'application  
    * Met à jour le **Modèle** à partir des actions de la **Vue**

> *A Noter&nbsp;:* MVC n'est pas un pattern très précis et peut varier en fonction des implémentations et des usages. Il est donc tout à fait possible que le schema représenté ci-dessus ne représente pas exactement l'implémentation que vous utilisez au jour le jour. Cependant, l'idée générale reste la même.

Le MVC a régné pendant un moment sur le développement d'applications clientes et est toujours très présent côté serveur. Il n'est pas donc pas à jeter, ni à oublier.

L'avantage de celui-ci est qu'il y a une distinction claire entre chaque partie de l'application. Grâce à cela, chaque élément peut évoluer de manière quasi isolée sans impacter le reste. Le problème, dans notre cas, est qu'il ne convient pas du tout à la programmation réactive.

En effet, chaque partie doit connaître l'existence et les méthodes de l'autre pour pouvoir fonctionner&nbsp;:
* la vue *active* le controleur
* le contrôleur *transforme* le modèle

Ils *font* des choses au lieu de *prévenir* qu'il se passe quelque chose. Ils ne sont donc pas *réactifs*. Il n'y a que le modèle qui est réactif. S'il change, il se contente de prévenir qu'il a été mis à jour. Il ne sait pas ce qu'il va advenir de ses données.

Donc, si on enlève tout ce qui n'est pas réactif, on se retrouve avec le diagramme suivant&nbsp;:
