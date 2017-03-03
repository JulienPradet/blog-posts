## Et pendant l'animation&nbsp;?

Pendant l'animation, il faut évidemment garder en tête tout ce que l'on a vu jusqu'à maintenant. Cependant, il y a un dernier point important&nbsp;: la vitesse de mise à jour.

En effet, il serait tout à fait possible de mettre à jour le style des éléments animés dès que l'étape précédente est finie. Cependant, le risque en faisant cela est de surcharger le navigateur. En effet, pour s'occuper de votre page, le navigateur n'a qu'un `thread`. Sans rentrer dans les détails techniques, ce que ça implique, c'est que si vous monopolisez ce `thread` pour faire votre animation, tout le reste des opérations sont mises en suspens. Et si ce cas de figure se présente, c'est bien pire qu'une animation qui lag. Par exemple, l'utilisateur n'est plus en mesure de cliquer sur la page.

Afin de résoudre ce problème, il nous faut rendre l'animation asynchrone. Elle doit rester prioritaire, mais elle ne doit pas bloquer l'ensemble du navigateur. On va donc pouvoir utiliser la même méthode que l'on a vu plus haut&nbsp;: `requestAnimationFrame`.

Voilà ce que ça donnerait à peu de choses près&nbsp;:
