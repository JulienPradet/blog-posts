Avec ce petit changement de code, on a maintenant un crossfade entre les deux états, autrement dit l'état précédent disparaît pendant que le nouvel état apparaît. En effet, `document.startViewTransition` dit essentiellement au navigateur de :

1. Prendre un screenshot de la page avant
2. Prendre un screenshot de la page après
3. Animer la transition entre les deux

Mais animer l'opacité n'est pas toujours le mieux. Heureusement, il est possible d'indiquer au navigateur **comment** animer la transition.

Notamment, plutôt que de faire un screenshot de la page entière, on peut lui dire d'animer uniquement une petite partie. Dans notre cas, on ne veut animer que l'_Element_.

Pour cela, il nous faut ajouter une propriété CSS :

```css
.element {
	view-transition-name: element-id;
}
```

Vous pouvez lui donner n'importe quelle valeur. L'essentiel est que cet id soit unique sur votre page.
