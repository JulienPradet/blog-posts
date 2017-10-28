Le schéma prend toute la place qui lui est mis à disposition.

Voilà qui est mieux. Si on a un `Node` dans notre arbre, on sait que le SVG fera *80&nbsp;&times;&nbsp;30*. Cela dit, est-on bien sûr qu'il fasse *80&nbsp;&times;&nbsp;30*&nbsp;? Après tout, si le noeud a des enfants qui eux même ont des enfants, il sera bien plus grand que *80&nbsp;&times;&nbsp;30*.

Nous allons donc devoir déléguer le calcul de cette taille à l'enfant. On pourrait donc remplacer `viewBox = "0 0 80 30"` par quelque chose du style&nbsp;: `Node.getViewBox(nodeElement.props)`. Cela permet de mettre le calcul de la `viewBox` au bon endroit.

Cependant cela pose un dernier problème. Si `Node` fait des calculs complexes pour savoir quoi afficher, il risque faire le boulot deux fois. Une première fois au moment du `getViewBox` et une autre fois au moment du `render`. L'idée est donc de tout faire d'un coup&nbsp;: le render **et** le calcul de la `viewBox`.

```jsx
// Le composant n'affiche plus rien
// étant donné qu'on fait tout le
// boulot dans `getContext`
// C'est aussi pour cette raison
// que ça pourrait être du XML,
// et ce serait pareil.
const Node = () => null;

// On recapitule ce que Node est
// censé afficher et comment.
Node.getContext = (props) => {
  return {
    width: 80,
    height: 30,
    element: <g>
      <rect ... />
      <text ... />
    </g>
  }
};

const Tree = (props) => {
  const nodeElement = props.children

  let context
  if (nodeElement.type === Node) {
    // Plutôt que de deviner la taille du
    // composant, on lui demande toutes
    // les informations nécessaires
    context = Node.getContext(
      nodeElement.props
    )
  } else {
    return null
  }

  // Et on affiche le SVG avec les
  // informations qu'on a pu récupérer
  return <svg viewBox={`0 0 ${context.width} ${context.height}`}>
    {context.element}
  </svg>
}

const Demo = /* ne change pas */
```
