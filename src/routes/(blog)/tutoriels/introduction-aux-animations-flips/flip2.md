La première fois que j'ai vu cette technique, je me suis demandé pourquoi il n'y avait pas de sauts visuels.

En effet, quand on récupère la valeur de `last`, on a bien l'élement qui est positionné là où il est censé être à la fin de l'animation. Le navigateur nous dit même qu'il est entrain de l'afficher à cet endroit vu que `getBoundingClientRect` nous renvoie les bonnes valeurs.

En fait, cela vient du fait que [le _Layout_ et le _Painting_](/tutoriels/des-animations-performantes-1/#comment-fonctionne-un-navigateur-web) sont deux étapes totalement décorrélées au du niveau navigateur. Ainsi, il _batch_ les étapes de painting, ce qui fait que la mise à jour visuelle se fera, non pas à chaque fois que vous changez votre élément, mais dès que le navigateur estime qu'il est temps de le mettre à jour. C'est ce qui vous laisse le temps d'appliquer le `invert` qui fait croire visuellement que l'élément est toujours dans sa position initiale.

Par ailleurs, dans cet exemple de code, afin de limiter le nombre de choses nouvelles, j'ai limité la transformation à la position de l'élément. Cependant, il est tout à fait possible d'en rajouter en jouant sur `scale` (si la hauteur et largeur de l'élément animé bouge) ou `opacity`. (cf. [la librairie de Paul Lewis](https://github.com/GoogleChrome/flipjs/blob/a084777ec725ef842dcf91eb2af78635d4d5e783/src/raf.js#L52))
