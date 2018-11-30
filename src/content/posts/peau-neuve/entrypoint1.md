## Automatiser l'ajout des pages

C'est une technique que j'avais déjà mis en place sur [Pigment-Store](). Le principe consiste à lire le système de fichier pour récupérer tous les fichiers qui nous intéressent. Dans mon cas, ce sont tous les fichiers `index.js` dans le dossier `src/content`. Ici encore, RxJS simplifie le travail.

Voici, par exemple, comment je récupère l'ensemble des pages&nbsp;:
