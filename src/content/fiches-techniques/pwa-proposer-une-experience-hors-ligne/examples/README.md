# Exemples d'utilisation des services workers

Le but de ce dépôt est de fournir les exemples disponibles dans ["PWA : Intercepter les requêtes HTTP et les mettre en cache"](http://julienpradet.fr/fiches-techniques/pwa-proposer-une-experience-hors-ligne/). Il y a donc tous les exemples techniques. Cependant, pour comprendre le but de cet exemple, pensez à aller voir l'article de blog. :)

Afin d'accéder aux exemples&nbsp;:

1. récupérez le dépôt sur Github :
    ```
    git clone git@github.com:JulienPradet/blog-posts.git
    ```
2. Allez dans le dossier d'exemple
    ```
    cd blog-posts/src/content/fiches-techniques/pwa-proposer-une-experience-hors-ligne/examples
    ```
3. Installez les dépendances
    ```
    npm install
    ```
4. Lancez le serveur qui met à disposition les exemples
    ```
    npm start
    ```
5. Ouvrez l'adresse `http://localhost:8080/` dans votre navigateur

Si vous avez des problèmes lors de l'affichage des exemples, veillez à ce que&nbsp;:
1. le serveur ait pu démarré convenablement
2. un Service Worker ne soit pas déjà installé sur localhost:8080
3. votre navigateur supporte les Service Workers