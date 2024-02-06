## Pour aller plus loin

Voici quelques cas que vous pourriez essayer de creuser/implémenter pour vérifier que vous avez bien assimiler toutes ces notions.

<details><summary><strong>Comment est-ce que vous animeriez une liste qui est composée d'un texte ET d'une image pour chaque élément ?</strong> (Cliquez pour voir la réponse)</summary><p>Vous avez plusieurs options, mais cognitivement, moins vous déplacez d'élément, plus l'animation sera facile à comprendre. Donc il y a des chances que ce soit mieux de n'animer que l'image. Notamment la <a href="https://m3.material.io/styles/motion/transitions/applying-transitions#b974d94c-bf80-4c54-8818-4a1d7eaa10ae">guideline "Unified direction" de Material Design</a> montre bien son impacte.</p>

Mais si vous voulez animer plusieurs éléments, n'hésitez pas à ajouter plusieurs `view-transition-name`. Par exemple, pour que le lien "Revenir à la liste" ne soit pas trop violent, je lui ai ajouté une `view-transition-name` pour qu'il ait un joli fade-in/fade-out le temps de l'animation.

</details>
