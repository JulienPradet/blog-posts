## Quel intérêt par rapport à des animations normales&nbsp;?

Sans parler de la mise en place dans le code, on peut déjà se demander ce que ça apporte.

La première et essentielle des raisons est la performance. En effet, vu que tout le calcul de l'animation est fait avant son démarrage (F, L, I), l'animation même est très rapide, d'autant que l'animation résultante (P) est basée sur les techniques performante.

La deuxième est l'abstraction du déplacement. En effet, une fois la lib sous jacente créée, il n'y a plus besoin de savoir que l'élément s'est déplacé de 10 ou 100 pixels sur la droite. C'est calculé à partir des infos déjà présentes dans le navigateur.

Pour autant, même si c'est une technique qui apporte beaucoup de facilitées, ce n'est pas pour autant la solution miracle.

## Quand l'utiliser&nbsp;?

Comme à chaque fois, tout est question de contexte.

### ❌ Contenu et position statiques

**Pas d'animation FLIP** si vos animations n'ont pas de rapport avec le contenu que vous animez, vraisemblablement il sera plus simple de rester sur des animations CSS pures. Ca peut être un bouton qui grossit au survol, un élément qui apparaît de manière rigolote quand il débarque sur la page, etc.

### ✅ Changement de position

**Les animations FLIP excellent** lorsque le contenu _change de place_. Ce sont les animations dans lesquelles il n'y a pas de transformation en hauteur ou en largeur mais uniquement des déplacements. La librairie [react-flip-move](http://joshwcomeau.github.io/react-flip-move/examples/#/shuffle?_k=n14dtx) illustre très bien ce principe.

MaJ: D'ailleurs, j'ai découvert ce [bout de doc dans Vue.js](https://vuejs.org/v2/guide/transitions.html#List-Move-Transitions) le lendemain de la publication de cet article&nbsp;! Le composant `transition` y est implémenté avec les animations FLIP :)

### ⚠️ Changement de contenu

**Cette fois ci, pas de réponse universelle.**

En effet, on est limité dans le type d'animations à disposition. Et donc,rapidement, on va tordre ou faire faire des sauts au contenu. Concrètement, si vous appliquez une transformation FLIP, sans réfléchir, ça peut ressembler à ça&nbsp;:
