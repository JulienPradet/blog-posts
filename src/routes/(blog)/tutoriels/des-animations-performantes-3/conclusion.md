## Conclusion

Donc si on récapitule tout depuis le début, on peut en tirer _4 règles_ qui rendront vos animations plus performantes&nbsp;:

- N'animer que des propriétés qui ne changent pas la taille de vos contenus, afin d'éviter des étapes de Layout.
- N'animer que des propriétés qui évitent des étapes de Painting (`transform`, `opacity`) tout en prévenant le navigateur avec la propriété `will-change`
- Eviter de mélanger les étapes de récupération du DOM et de mise à jour de celui-ci en JavaScript
- Orchestrer ses animations à l'aide de `requestAnimationFrame`

Le but de cette série était de montrer un petit plus en détail ce qui se passe dans le navigateur pour mieux comprendre les animations et donc pouvoir les optimiser. Mais ce qu'il faut surtout garder en tête, c'est qu'il ne faut pas optimiser de manière prématurée. Ecrivez votre code, analysez le avec les DevTools, puis optimisez le si besoin. Si vous ne respectez pas cet ordre là, vous risquez d'optimiser des parties qui ne vous apporteront pas grand chose.

Et enfin, testez vos applications sur mobile. C'est primordial car c'est là que vous aurez des problèmes de performance.

En espérant que cette série vous aura plu&nbsp;!

Si vous avez la moindre question ou remarque, n'hésitez pas à venir me voir sur Twitter ([@JulienPradet](https://twitter.com/JulienPradet)) ou via un quelconque autre vecteur de communication. Je serai ravi d'en discuter avec vous.

D'ici peu, je commencerai une nouvelle série sur les animations, mais avec des exemples concrets cette fois. Stay tuned!
