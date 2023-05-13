Cependant, il est possible d'éviter de trop remanier son code en utilisant `requestAnimationFrame`.

Concrètement, le rôle de `requestAnimationFrame` est de décaler un bout de code dans le temps en le rendant asynchrone. Cependant, à la différence de `setTimeout`, elle a pour particularité de manipuler la pile d'évènement pour que le bout de code soit exécuté en priorité par rapport aux autres évènements en attente.

Ainsi, on récupère chaque information du DOM une par une tout en précisant que dès qu'on a fini, il faudra exécuter la mise à jour du style. Celle-ci sera donc correctement batchée puisqu'elle ne sera plus interrompue par les phases de *Layout*. Cela donne&nbsp;:
