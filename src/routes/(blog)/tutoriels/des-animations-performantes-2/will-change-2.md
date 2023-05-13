## En détails

Il faut tout de même retenir quelques point sur cette propriété, parce que tout de même, tout n'est pas toujours magique&nbsp;!

- Si vous en utilisez trop, cela consomme beaucoup de mémoire et cela aura l'effet inverse : le navigateur sera encore moins performant.

- Ce n'est compatible qu'avec les propriétés qui ne changent pas l'affichage des éléments. Par exemple, si vous changez la couleur, le navigateur sera tout de même obligé de repeindre des pixels. Essayez donc de rester sur `transform` et `opacity`.

- La propriété `will-change` est inutile si vous utilisez les `keyframes` en CSS en tandem avec les propriétés `transform` et/ou `opacity`. Cela vient du fait qu'en utilisant les `keyframes`, le navigateur sait déjà que l'élément va bouger.

- (moins utile à savoir) Si vous utilisez `position: fixed`, un layer ne sera pas nécessairement créé automatiquement. Cela dépend de la denisté de votre écran. ([source](https://developers.google.com/web/fundamentals/performance/rendering/simplify-paint-complexity-and-reduce-paint-areas#reduce_paint_areas))

## Conclusion

En bref, cette propriété est tout de même assez magique. Mais elle corrobore surtout le fait qu'il faut essayer de rester sur les animations basées sur `transform` et `opacity` si on veut éviter d'avoir des problèmes.

En tout cas, avant de l'utilisez, pensez à vérifier qu'elle est vraiment utile en passant par vos dev tools.

La semaine prochaine, on passera côté JS&nbsp;! En effet, parfois, on ne peut pas se contenter du CSS pour animer ses pages. Mais de nouveaux challenges se présentent si on change de langage. On parlera encore un petit peu de Layout, mais aussi d'orchestration d'évènement.

---

En attendant, voici quelques sources pour vous permettre d'approfondir le sujet&nbsp;:

- [An Introduction to the CSS will-change Property](https://www.sitepoint.com/introduction-css-will-change-property/)
- [Simplify Paint Complexity and Reduce Paint Areas](https://developers.google.com/web/fundamentals/performance/rendering/simplify-paint-complexity-and-reduce-paint-areas)
- [Accelerated Rendering in Chrome](https://www.html5rocks.com/en/tutorials/speed/layers/)
- [CSS ‘will-change’ Property: A Performance Case Study](https://www.maxlaumeister.com/blog/css-will-change-property-a-performance-case-study/)
