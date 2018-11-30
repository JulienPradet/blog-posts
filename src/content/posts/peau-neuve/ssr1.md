## Création des pages HTML

Maintenant que j'ai automatisé la création de mon point d'entrée, je vais pouvoir automatiser la création de mes pages HTML. L'idée va être d'utiliser les mêmes techniques que pour le Server Side Rendering (SSR), mais de directement faire le rendu d'une page, plutôt que d'attendre la requête d'un utilisateur.

Pour faire du SSR, on fait appel à la fonction `renderToString` de React en lui passant le point d'entrée de notre application. Le problème, c'est que si on fait un `require` sur celui-ci, cela ne marche pas directement. En effet, j'utilise dans mon application des fonctionnalités qui ne sont pas compatibles avec l'environnement de node (ex&nbsp;: `import` de modules, import de fichiers `.md`, etc.). La solution est de compiler le point d'entrée avec webpack pour le rendre compatible avec node.
