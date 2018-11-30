## Optimisations

Le problème de vouloir faire une appli en React pour un blog, c'est que nécessairement, c'est plus lourd qu'une bête page HTML. J'ai donc du faire des efforts pour améliorer tout ça.

### Améliorer le premier affichage de la page

La première chose à faire sur ce point est de décaler le chargement de tout ce qui n'est pas nécessaire. Notamment, lorsqu'il s'agit d'une application React, c'est de décaler le chargement des `scripts`. Pour ce faire, il suffit d'ajouter l'attribut `async` (ou `defer` selon votre besoin) sur vos balises, et c'est gagné.

Je suis passé de 200ms à 120ms sur une page complexe avec beaucoup d'exemples de code.

###
