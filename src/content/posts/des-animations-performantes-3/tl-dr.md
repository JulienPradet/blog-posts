## TL;DR

Si vous devez récupérer les données liées au style d'un élément du DOM, faites le en une seule fois et au début de votre animation. Une fois que cette étape est réalisée, laissez le navigateur orchestrer lui même les mises à jour en utilisant la méthode :

* `requestAnimationFrame`

Mais pourquoi&nbsp;? Qu'est-ce que ça apporte&nbsp;?
