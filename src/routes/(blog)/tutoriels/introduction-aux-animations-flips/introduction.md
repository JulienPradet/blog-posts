Dans ma série d'article sur [les animations performantes](/tutoriels/des-animations-performantes-1/), j'ai mis l'accent sur le fait qu'il était important de rester un maximum sur les propriétés CSS `transform` et `opacity` pour réaliser des animations fluides.

Mais en vrai, c'est compliqué. En effet, en se limitant au niveau des propriétés CSS, on perd malheureusement une grande partie de ce que nous permet de faire le CSS.

Il existe cependant une technique qui permet d'inverser le problème et nous délivre de toutes les étapes manuelles qu'il faudrait faire pour n'utiliser que `transform` et `opacity`. Il s'agit de _<abbr tabIndex="-1" title="First, Last, Invert, Play">FLIP</abbr>_, présentée au monde par Paul Lewis (a.k.a. [@aerotwist](https://twitter.com/aerotwist)) dans [un des ses articles](https://aerotwist.com/blog/flip-your-animations/).

Dans la suite de cet article, je vais essentiellement réexpliquer ce qui est déjà présenté par Paul Lewis. Cela dit, je me concentrerai moins sur la partie code et approfondirai les cas d'utilisation.

## C'est quoi _FLIP_ ?

L'idée qu'il y a derrière cette technique est de calculer automatiquement les transformations. Pour ce faire, il faut passer par 4 étapes&nbsp;:

1. **F**irst&nbsp;: on enregistre la position de départ de l'élément (ex&nbsp;: `{top: 100, left: 50}`)
2. **L**ast&nbsp;: on place l'élément dans sa position finale et on enregistre sa position (ex&nbsp;: `{top: 130, left: 50}`)
3. **I**nvert&nbsp;: on calcule la différence entre les deux positions (ex&nbsp;: `{top: -30, left: 0}`) et on l'applique à l'élément. Ainsi, quand on applique cette transformation à l'élément, c'est comme s'il était revenu à sa position initiale.
4. **P**lay&nbsp;: on lance l'animation en faisant diminuer petit à petit la différence. L'animation peut être gérée en JS (ce que j'ai fait ci dessous), mais plutôt que `requestAnimationFrame` on pourrait se contenter de transitions CSS.

Cela ressemble donc à ça&nbsp;:
