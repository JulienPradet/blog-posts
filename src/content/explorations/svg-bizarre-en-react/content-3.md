C'est la version simplifiée d'un outil que je développe qui représente l'arbre généalogique des personnages d'un roman.

### Préambule

Avant d'attaquer, posons nous un petit instant sur le fonctionnement du SVG. En effet, celui-ci a une différence majeure par rapport au HTML&nbsp;: on est obligé de gérer nous-même le placement des éléments les uns par rapport aux autres. Si on ne le fait pas, les éléments se superposent.

<figure>
<svg viewBox="0 0 15 15" width="50%" height="5em" style="margin: 1em auto; display: block;">
  <rect fill="#FFC107" width="15" height="15" />
  <rect fill="#EF5350" width="10" height="10" />
</svg>
<figcaption>Carré rouge sur carré jaune, oeuvre déposée</figcaption>
</figure>

```html
<svg viewBox="0 0 15 15">
  <rect fill="#FFC107" width="15" height="15" />
  <rect fill="#EF5350" width="10" height="10" />
</svg>
```

Devoir placer des éléments à la main quand un ordinateur pourrait le faire à ma place, ça ne me fait pas rêver. Surtout quand je fais un schéma&nbsp;: si j'ajoute un élément quelque part, je n'ai pas envie de décaler tous les autres éléments un par un. Sinon, je le ferai avec Gimp/Inkscape/Illustrator.

C'est pour cette raison que pour représenter cet arbre, je préfère écrire le bout de code suivant, en laissant le soin à mon ordi' de tout placer convenablement&nbsp;:

```jsx
<Tree>
  <Node name="Camille">
    <Node name="Bob">
      <Node name="Raymonde">
        <Node name="Jules" />
      </Node>
      <Node name="Pierre" />
    </Node>
    <Node name="Alice">
      <Node name="Alphonse" />
      <Node name="Gertrude" />
    </Node>
  </Node>
</Tree>
```

Ainsi, dans un arbre (`Tree`) j'ai un noeud (`Node`) qui lui même peut avoir des enfants qui sont à leur tour des noeuds (`Node`).


### Représentation d'un noeud

Ok. Commençons par le commencement et représentons un noeud unique. Celui-ci est constitué d'une bordure et d'un texte. Nous pouvons l'écrire de la façon suivante&nbsp;:

```jsx
const width = 80;
const height = 30;

const Node = props => (
  <g>
    <rect
      width={width}
      height={height}
      strokeWidth={1}
      stroke="#484848"
      fill="white"
      rx={5}
      ry={5}
    />
    <text
      x={width / 2}
      y={height / 2}
      textAnchor="middle"
      alignmentBaseline="middle"
      fill="#484848"
      fontSize={14}
    >
      {props.name}
    </text>
  </g>
);

const Tree = props => <svg>{props.children}</svg>;

const Demo = () => (
  <Tree>
    <Node name="Camille" />
  </Tree>
);
```

Ce qui donne&nbsp;: