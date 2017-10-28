Nous avons donc affiché un arbre qui contient des noeuds qui eux-même peuvent contenir des noeuds. Pour éviter de trop surcharger les exemples de code, j'ai retiré certaines parties telles que les lignes entre les noeuds, l'espacement entre les noeuds, etc.

Mais fondamentallement, il y a tout ce qu'il faut pour faire le reste&nbsp;:

* Gestion d'un contexte pour savoir ce qu'un noeud doit afficher (`Node.getContext`)
* Possibilité de mettre l'information que l'on veut dans un contexte (`width`, `height`, `element`, `children`, ... et `anchor` pour afficher les lignes entre les noeuds&nbsp;?)
* Séparation des responsabilités&nbsp;: un noeud doit savoir comment s'afficher mais ne doit pas être responsable de son influence sur les autres noeuds. Il va plutôt remonter des informations au parent (ex&nbsp;: `width`, `height` et `element`) et laisse ce dernier gérer le reste (ex&nbsp;:dans le noeud parent, on entoure chaque enfant par `<g transform="...">...</g>`)

Pour voir comment gérer les lignes et les espacements, vous pouvez lire le code sur [github](https://github.com/JulienPradet/blog-posts/tree/master/src/content/explorations/svg-bizarre-en-react/demo).

## Conclusion

Avec cette technique de contexte, on a réussi à afficher le SVG qu'on voulait. On a même pu l'appliquer à différents cas d'utilisation (observables et arbres de données). Mais quand même, ça fait bizarre d'écrire tout ça. Est-ce que c'est vraiment la bonne solution&nbsp;? Honnêtement, je ne sais pas. Mais j'aime bien cette notion de contexte d'affichage/execution même si elle n'a rien de révolutionnaire en soi.

Il reste tout de même quelques points douteux à éclaircir&nbsp;:

* Pourquoi avoir utilisé React&nbsp;? En effet, si on y réfléchit, ce n'est pas très utile d'avoir utilisé React ici. En ayant des composants qui retournent tous `null`, cela veut dire qu'on utilise React uniquement pour définir de quoi est composé notre arbre. Autant utiliser du JSON. Ou du XML.
    ```jsx
    <Tree definition={{
      type: "node",
      name: "John",
      children: [
        { type: "node", name: "Alice" },
        { type: "node", name: "Bob" }
      ]
    }} />

    /* vs */

    <Tree>
      <Node name="John">
        <Node name="John" />
        <Node name="John" />
      </Node>
    </Tree>
    ```

    Si les données viennent d'une API, c'est d'ailleurs très certainement ce qu'il faudra privilégier plutôt que de refaire les noeuds à la main.

    Cependant, là où React reste utile, c'est dans le calcul des éléments à afficher pour chaque noeud (la clé `element` dans `Node.getContext`). En effet, il est pratique ici de rajouter des event listeners et donc des interactions sur les noeuds que vous voulez. Cela permettrait par exemple d'afficher des informations supplémentaires au survol (la date de naissance, une citation, etc.). [J'en ai d'ailleurs eu besoin sur mes schémas d'observables (attention, le code est moins propre).](https://github.com/JulienPradet/blog-posts/tree/master/src/site/Viz)

* Si on a appelé tout ça un contexte, est-ce que ce ne serait pas plus simple de passer par l'[API des contextes en React](https://reactjs.org/docs/context.html#how-to-use-context) quitte à y être&nbsp;? Je pense que ça peut se faire mais que ça amenerait quelques complications&nbsp;:
    * Le SVG ne serait pas affiché du premier coup. Il faudrait attendre que tous les composants soient montés avant de pouvoir afficher quelque chose, entrainant par là même des complications pour faire du SSR.
    * Ce serait compliqué de faire en sorte qu'un composant soit monté pour appeler le contexte alors qu'on ne veut pas vraiment afficher ses enfants mais plutôt la représentation de ses enfants.
    * Cela risquerait nous coincer dans l'utilisation de l'API qui d'ailleurs est toujours considérée instable.
    * Mais ça se tente. <span aria-label="emoji souriant">:)</span> Si vous voulez expérimenter sur le sujet, n'hésitez pas à m'en faire part&nbsp;!

* Un inconvénient cependant est qu'on est obligé de connaître à l'avance tous les noeuds enfants. Adieu la magie de la composition des éléments React. Cela dit, on pourrait adapter cette technique à l'[API des returns/calls](https://github.com/facebook/react/tree/master/packages/react-call-return) qui est entrain d'être étudiée par la core team ([voici un tuto en anglais qui en parle plus en détail](https://cdb.reacttraining.com/react-call-return-what-and-why-7e7761f81843)).

En tout cas, c'est agréable de faire ce genre d'expérimentations. Je suis sûr d'approcher le problème différemment la prochaine fois que je dois afficher des choses sur un écran. Cette notion de contexte pour calculer la position des enfants me plait bien. Une corde de plus à mon arc en quelque sorte.

Et vous, qu'en pensez-vous&nbsp;? Ca vous paraît fou/bête/intéressant&nbsp;? N'hésitez pas à me faire part de vos avis sur [github](https://github.com/JulienPradet/blog-posts), [twitter](https://twitter.com/JulienPradet) ou autre.

Au plaisir&nbsp;!