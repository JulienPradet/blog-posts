### Affichage des enfants des noeuds

Maintenant qu'un noeud peut avoir une taille dynamique sans poser problème au parent, rendons le vraiment dynamique. Pour cela, nous allons utiliser exactement la même technique mais à l'intérieur de chaque noeud&nbsp;:
1. on construit le contexte qui contient tous les enfants pour savoir comment les afficher
2. on calcule la taille globale du noeud en incluant les enfants (`width`, `height`)
3. on reforme le noeud à afficher en incluant les enfants (`element`)


```jsx
Node.getContext = props => {
  // Contexte du noeud sans ses enfants
  const parentContext = {
    width: 80,
    height: 30,
    element: <g>
      <rect ... />
      <text ... />
    </g>
  };

  // Si le noeud n'a pas d'enfant, le
  // contexte ne bouge pas
  if (!props.children) {
    return parentContext;
  }

  // Calcul du contexte des enfants
  let childrenContext = {
    width: 0,
    height: 0,
    children: []
  };

  // On récupère les enfants du noeud
  // et on s'assure que ce soit un tableau
  // Ex : s'il n'y a qu'un seul enfant,
  // props.children n'est pas un tableau
  const children = Array.isArray(props.children)
    ? props.children :
    [props.children]
  
  // Chaque enfant vient ajouter sa
  // largeur et sa hauteur au contexte
  // global et ajoute les éléments
  // utils à l'affichage
  children.forEach((child, index) => {
    if (child.type === Node) {
      // L'enfant du noeud est un noeud.
      // On récupère donc son contexte
      // pour savoir comment il va
      // influencer les autres enfants
      const childContext =
        Node.getContext(child.props);

      // On décale l'enfant vers la
      // droite en fonction des enfants
      // qui le précèdent.
      // Sinon, les enfants se superposent.
      const childElement = (
        <g
          key={index}
          transform={`translate(${childrenContext.width}, 0)`}
        >
          {childContext.element}
        </g>
      );

      // Puis on ajoute l'enfant transformé
      // à la liste des enfants à afficher.
      childrenContext.children.push(
        childElement
      );

      // Maintenant qu'il y a un nouvel
      // enfant, on indique que la somme
      // des enfants est un peu plus
      // large qu'avant.
      childrenContext.width +=
        childContext.width;

      // Idem pour la hauteur :
      // la hauteur de tous les enfants
      // est égale à la hauteur du plus
      // grand des enfants
      childrenContext.height = Math.max(
        childrenContext.height,
        childContext.height
      );
    } else {
      // Comme pour Tree, on ignore les
      // enfants qu'on ne sait pas gérer.
      console.warn(
        "Type d'enfant inconnu",
        child
      );
    }
  });

  // Maintenant qu'on connait le contexte
  // du parent et des enfants, on
  // fusionne les deux pour créer le
  // contexte final

  const parentHorizontalMargin =
    childrenContext.width / 2
    - parentContext.width / 2;

  const childrenVerticalMargin =
    parentContext.height;

  return {
    // Les enfants sont en dessous du
    // parent, donc la largeur totale est
    // le max entre la largeur du parent
    // et celle des enfants
    width: Math.max(
      parentContext.width,
      childrenContext.width
    ),
    // Les enfants sont en dessous du
    // parent, donc les hauteurs
    // s'additionnent.
    height: parentContext.height
      + childrenContext.height,
    // On reconstruit l'élément complet
    // qui inclut le parent et les enfants.
    // On n'oublie pas des transformations
    // pour centrer le parent et placer
    // les enfants sous le parent
    element: (
      <g>
        <g transform={`translate(${parentHorizontalMargin}, 0)`}>
          {parentContext.element}
        </g>
        <g transform={`translate(0, ${childrenVerticalMargin})`}>
          {childrenContext.children}
        </g>
      </g>
    )
  };
};
```

Et voilà&nbsp;!