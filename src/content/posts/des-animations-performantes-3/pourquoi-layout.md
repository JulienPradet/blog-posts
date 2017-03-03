## Pourquoi est-ce que le *Layout* est un problème en JavaScript&nbsp;?

Comme nous avons pu le voir dans [la première partie](/posts/des-animations-performantes-1), le layout est une étape couteuse lié aux balises CSS utilisées. Il n'y aurait donc pas de raison que cela impacte le JavaScript.

Pourtant, lorsque une animation est faite en JavaScript, nous avons besoin de nous fier à l'état du DOM pour adapter la qualité des animations. Et ceci déclenche une étape de *Layout*. Le risque est alors de la déclencher trop souvent.

Concrètement, c'est le cas lorsqu'on veut interrompre une animation en cours pour en déclencher une nouvelle. Nous analysons l'état du DOM pour que l'animation suivante parte de ce même état.

Une animation JS qui ne s'en préoccuperait pas ressemblerait à ça (faites un double clic sur un des boutons)&nbsp;:
