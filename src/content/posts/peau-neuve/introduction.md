Je vous présente mon nouveau blog&nbsp;!

> &ndash;&nbsp;Déjà ? Mais ça fait un mois que tu as ouvert ton blog, non ?!  
> &ndash;&nbsp;Ouais et en plus tu as juste ajouté des icones en haut à gauche&hellip;

En vrai, c'est un petit peu plus que ça. J'ai fait mon propre générateur de site statique. Pourquoi ? Parce que j'aime bien réinventer la roue. Mais aussi et surtout parce que j'avais besoin d'un petit peu plus que ce que me proposait [Phenomic]() (qui est au passage très pratique pour de vrais sites statiques).

*Les étapes ne sont pas très détaillées parce que je parle plus de comment j'en suis arrivé là que de la solution technique. Cependant, si pour vous certains points mériteraient d'être approfondis, n'hésite pas à me suggérer une idée d'article :)*

## Quelles contraintes&nbsp;?

Voici la liste des contraintes que je me suis fixé&nbsp;:

* Créer une nouvelle page doit être équivalent à créer un nouveau fichier
* Les pages doivent être facilement crawlable pour le SEO
* Des éléments complexes doivent pouvoir être mis au milieu des pages
  * Exemples de code responsive
  * Demos
* Le poids des pages et le temps de chargement doivent rester minimaux
* Ecrire les pages en React (parce que c'est rigolo)
* Apprendre plein de choses (parce que c'est rigolo aussi)

Du coup, comment ça marche&nbsp;?

## Quelles sont les étapes&nbsp;?

Une fois les contraintes connues, je me suis demandé comment j'aurais créé un site React sans me préoccupé de l'automatisation&nbsp;:

1. Je crée un fichier JS qui sert de point d'entrée à React
2. J'ajoute une par une chaque page à ce fichier
3. Je le transforme en bundle via webpack
4. Je récupère le contenu de chaque page pour faire mes fichiers HTML
5. J'ajoute les autres éléments statiques (images, css, etc.)

Cela m'a permis d'une part de voir quels seraient mes jalons pour ne pas avoir le syndrome de la page blanche. D'autre part j'ai pu identifier quels points seraient important à automatiser et qu'est ce que je pourrais reprendre d'autres projets&nbsp;:

* L'ajout des pages au point d'entrée doit être automatisé
* La transformation en contenus HTML est en fait du <abbr title="Server Side Rendering">SSR</abbr> que je peux récupérer d'ailleurs

Par ailleurs, pour gérer l'enchaînement des étapes, j'ai choisi d'utiliser [RxJS]() qui brille pour ce cas d'usage. D'ailleurs, entre temps, il y a [cet article très intéressant qui est sorti](https://strongloop.com/strongblog/lets-code-it-static-site-generator-with-rx-js/) qui parle d'à peu près la même chose.
