## Mais mes animations sont lentes&nbsp;!

Hé, oui&nbsp;! Même si le navigateur fait beaucoup de choses intelligentes à votre place, il ne peut pas tout faire parfaitement. Et quand on sait qu'on n'a que 16.67 millième de secondes pour faire une étape de l'animation et atteindre les 60fps... on se dit qu'il y a du boulot&nbsp;!

Pour rendre vos animations rapides, il va falloir se mettre à la place du navigateur pour comprendre ce qui ne va pas.


## Comment fonctionne un navigateur web&nbsp;?

Pour afficher une page, un navigateur web doit passer par plusieurs étapes.

1. Tout d'abord, quand votre page arrive, elle est en *HTML*. Le navigateur doit la parser pour la transformer en des objets avec lesquels il peut travailler. Ainsi, pour chaque balise HTML est créé un élément du *DOM* (*Document Object Model*). (Ce sont ces éléments du DOM qui sont mis à disposition en JavaScript.)

2. Place au *CSS*. Le navigateur va parser les feuilles de style et les transformer en *Style Rules*. Le but est de faire en sorte que, lors de la prochaine étape, il soit rapide de déterminer quelles propriétés CSS s'appliquent à chaque élément du DOM.

3. Maintenant que le navigateur connaît le contenu et qu'il sait quelles règles de style appliquer, le navigateur combine les deux et construit un nouvel arbre qu'on appelle le *Render Tree* ou *Render Application*. A partir de celui-ci, toutes les informations sont disponibles pour faire le rendu de l'application. Cependant, pour l'instant, si on devait représenter cet arbre sur une page, tous les éléments seraient en haut à gauche.

4. Pour les placer au bon endroit, on passe à l'étape du *Layout* (ou *Reflow*). Cette étape consiste à déterminer comment agencer les éléments les uns par rapport aux autres. C'est cette étape à laquelle je vais m'intéresser dans cet article.

5. Et enfin, le navigateur passe à l'étape du *Painting* qui sert à afficher votre page sur votre navigateur.

Pour résumer le tout en un seul diagramme, cela devrait ressembler à ça&nbsp;:

<figure tabindex="0">
<img src="/images/posts/des-animations-performantes/browser-flow.png" alt="Schéma représentant les 5 étapes sus-citées">
<figcaption>Fonctionnement de Webkit (<a href="https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#Main_flow_examples">source</a>)</figcaption>
</figure>
