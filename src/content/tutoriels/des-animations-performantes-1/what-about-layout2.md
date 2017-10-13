Ici, l'étape de *Layout* va commencer par représenter la balise `nav`.

Il calcule donc la position du titre et celui-ci se positionne à gauche et prend le moins de place possible (`float: left`).

Une fois que le titre a été positionné, place au menu. Il essaye alors de caler le maximum d'éléments du menu sur une même ligne (`display: inline-block`), à droite du titre. S'il n'y arrive pas, il fait plusieurs lignes. Et si ce n'est toujours pas possible, la liste passe sous le titre.

Le positionnement de la navigation est fini et le navigateur peut passer à la suite en positionnant de la même façon le `main` qui sera en dessous du `nav`.

#### Dans le cadre d'une animation

Maintenant, imaginons que vous changiez la taille de votre titre au survol.

```css
h1:hover { font-size: 2em; }
```

Cela veut dire que la taille que va prendre le titre va doubler. Mais cela veut aussi dire qu'il reste moins de place pour la liste du menu, et donc qu'elle va potentiellement passer sur plusieurs lignes et prendre plus de place en hauteur. Et si la navigation prend plus de place, le reste de la page va aussi descendre et donc a besoin d'être recalculé. Bref, il a besoin de tout recalculer à partir de la seule balise qui a changé de style.

En soit, qu'il recalcule tout n'est pas très grave parce que à l'échelle de l'utilisateur ce n'est pas très long. Par contre, si ce changement est animé, cela veut dire que chaque nouvel affichage prendra plus longtemps, et donc que l'animation sera ralentie, voire *moche*.

### Comment l'optimiser&nbsp;?

Pour éviter d'avoir à tout recalculer à chaque fois, on va essayer de ne plus changer le *Layout* à chaque étape de l'animation. C'est possible parce que certaines propriétés ne changent pas le *flow* de la page.

C'est valable notamment pour toutes les propriétés qui affectent les couleurs (dont `opacity`), mais aussi pour la propriété `transform` étant donné que celle-ci n'a pas d'impact sur le reste des éléments.

### Comment savoir si la propriété est bonne ou mauvaise&nbsp;?

Pour le constater par vous même, vous pouvez ouvrir vos DevTools dans votre navigateur préféré et aller dans l'onglet permettant d'inspecter les performances de votre application (*Timeline* sur Chrome&Co, *Performance* sur Firefox). Une fois sur l'onglet, il vous faut enregistrer une séquence pendant laquelle vous lancerez manuellement votre animation.

<figure tabindex="0">
<img src="/images/posts/des-animations-performantes/layout.png" alt="Timeline Google Chrome avec du Layout" />
<figcaption>Voici à quoi ressemble la Timeline enregistrée via Chrome</figcaption>
</figure>

Et ce qui va vous intéresser, c'est la partie où il y a écrit *Layout* (en violet). Si elle est présente tout au long de votre animation, c'est que votre animation est couteuse. Et, bien que cela puisse s'afficher correctement dans votre navigateur, pensez aux mobiles qui auront du mal à suivre le rythme&nbsp;!

Il est important de faire le test sur plusieurs navigateurs car l'animation peut être rapide sur l'un et lente sur l'autre.

Vous pouvez aussi regarder sur [CSS Triggers](https://csstriggers.com/). Mais méfiez vous de ce qu'il vous dit car je suis tombé sur quelques incohérences par rapport à ce que j'ai constaté dans les DevTools.

## Conclusion

Voilà, vous savez maintenant comment bien choisir vos propriétés CSS et surtout comment éviter celles qui vous pourriront vos animations.

Le seul problème, c'est que ce n'est pas évident de penser de cette façon quand on débute. Mais avec un peu d'imagination, c'est tout à fait possible de n'animer qu'en utilisant ces propriétés. Si vous êtes impatients vous pouvez déjà vous intéresser à la technique [FLIP](https://aerotwist.com/blog/flip-your-animations/) présentée par [@aerotwist](https://twitter.com/aerotwist). Sinon, vous pouvez attendre ma nouvelle série d'articles sur le sujet dans 3-4 semaines. :)

La semaine prochaine, toujours sur les performances, nous verrons qu'il est possible d'optimiser aussi les phases de `Painting`. Alors à très vite :)

---

En attendant, voici quelques sources pour vous permettre d'approfondir le sujet&nbsp;:

* [How Browsers Work](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#Main_flow_examples)
* [10 principles for smooth web animations](https://blog.gyrosco.pe/smooth-css-animations-7d8ffc2c1d29#.5nmo6c7wj)
* [FLIP Your Animations](https://aerotwist.com/blog/flip-your-animations/)
