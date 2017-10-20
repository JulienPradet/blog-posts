Cependant, l'application n'évolue plus. Il n'y a plus rien qui récupère les actions de la vue pour en faire quelque chose étant donné que c'était le rôle du Contrôleur. Il va donc falloir le remplacer.

C'est ici qu'entre en jeu les **Intentions**. Celles-ci récupérent les actions de l'utilisateur et les transforment un flux d'actions métiers. Une intention n'a donc qu'un rôle de traduction : transformer un évènement technique (ex&nbsp;: évènement de click sur un élément du DOM) en un évènement métier. Cela permet de totalement isoler le modèle de la vue.

Nous arrivons donc au fonctionnement suivant&nbsp;:
