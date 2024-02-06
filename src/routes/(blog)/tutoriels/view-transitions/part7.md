</details>
<details><summary>Dans l'exemple de cet article le contenu ne change pas de scale. Il n'y a que la taille de la zone visible qui change. <strong>Comment feriez-vous si l'image que vous animez était légèrement zoomée après la transition ?</strong> (Cliquez pour voir la réponse)</summary>

L'astuce ne sera plus d'unset les `block-size` et `inline-size`, mais de privilégier l'utilisation de `object-fit` et `object-position`. En effet, chaque screenshot est une image, donc toutes les propriétés qui vous aident d'ordinaire à positionner des images vous seront aussi utiles ici.

Notez aussi que parfois des propriétés dynamiques comme `inline-size: fit-content` peuvent vous sauver la mise.

</details>
<details><summary><strong>Une fois votre transition finie, vous voulez déclencher d'autres animations (ex: fade-in d'un texte) ou utiliser des <a href="https://css-tricks.com/ease-out-in-ease-in-out/">méthodes de easing</a>. Comment orchestrer ça ?</strong> (Cliquez pour voir la réponse)</summary><p>Par défaut, je mentionnais le fait qu'une view-transition se joue avec un fade-in (opacité 0 à 1). C'est d'ailleurs pour ça qu'on avait fait un <code>animation-name: unset;</code> dans l'exemple de cet article. Donc si vous préférez décaler l'animation d'un élément, ça pourrait être en utilisant un <code>animation-delay</code>.</p>

Si les séquences sont vraiment complexes et bien séparées, sachez aussi que vous pouvez récupérer une promesse quand votre première animation est terminée.

```js
const viewTransition = document.startViewTransition(() => ...);

await viewTransition.updateCallbackDone;
```

</details>

## Conclusion

Avec tout ça, vous devriez être paré pour animer tout ce qui vous passe sous la main 😁

Cela dit, cette API reste particulièrement adaptée quand vous voulez passer un élément d'un point A à un point B. C'est pour ça qu'on parle de `transition`. Elle permet notamment de gérer des cas complexes où le DOM change complètement.

Mais si vous avez une solution simple en CSS que vous arrivez à gérer avec des `@keyframes` classiques, des propriétés `transition`, qui restent [performantes](/tutoriels/des-animations-performantes-1/), let's go ! N'oubliez pas tout ce que vous avez déjà pu utiliser par le passé.

Si par contre, vous vous demandez jusqu'où on peut pousser cet API et vous avez envie de faire des tests et des expériences, simples ou compliquées, [j'aimerais beaucoup en entendre parler](/developpeur-web-performance/#contact).

La suite pour cette API est son activation dans un contexte de MPA (la page se recharge complètement). C'est aujourd'hui encore [sous feature flag dans Chrome](https://daverupert.com/2023/05/getting-started-view-transitions/) et j'ai personnellement été confronté à quelques éléments bloquants. Mais dès que ça se débloque, je vous en parle 👀

En tout cas, si ce genre de contenus vous plait ou que vous aimez lire des trucs sur le web, la webperf ou le front de manière général, n'hésitez pas à me suivre sur les réseaux sociaux ([Mastodon](https://piaille.fr/@julienpradet), [LinkedIn](https://www.linkedin.com/in/julienpradet/) ou [Twitter](https://twitter.com/JulienPradet)) et à me dire ce que je devrais améliorer pour la suite.

Prenez soin de vous, et à très vite 🫶
