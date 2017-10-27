C'est déjà bien. On affiche ce qu'on veut.

Par contre, on a notre premier problème qui est à l'origine de tous nos maux&nbsp;: `Tree`, le parent qui affiche `Node`, ne connait pas la taille de son enfant. Pourtant il en a besoin pour renseigner la propriété [`viewBox`](https://www.sarasoueidan.com/blog/svg-coordinate-systems/#svg-viewbox) dans la balise `svg` et ainsi afficher les choses à la bonne échelle. Comment s'en sortir&nbsp;?

### Récupération de la taille des noeuds

La solution consiste à faire en sorte que le composant parent (`Tree`) puisse récupérer la taille des composants qu'il affiche.

```jsx
const Node = /* ne change pas */;

const Tree = (props) => {
  // props.children est le noeud
  // racine de l'arbre qu'on veut
  // afficher
  const nodeElement = props.children

  // De plus, on a accès au composant
  // React utilisé par l'enfant via
  // nodeElement.type
  // (Je ne suis pas sûr que ce soit
  // légal, mais ça permet de savoir
  // à quel noeud on a affaire)

  let viewBox
  if (nodeElement.type === Node) {
    // Si c'est un Node, on sait
    // qu'il fait 80 x 30
    viewBox = "0 0 80 30"
  } else {
    // Sinon, on ne connait pas le
    // composant enfant donc on
    // n'affiche rien
    return null
  }

  return <svg viewBox={viewBox}>
    {props.children}
  </svg>
}

const Demo = /* ne change pas */
```
