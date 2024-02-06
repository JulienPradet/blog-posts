Essentiellement, il s'agit du code suivant :

```js
input.addEventListener('change', () => {
	element.classList.toggle('active');
});
```

Par le passé, si j'avais voulu l'animer, j'aurais dû jouer sur des propriétés CSS, manipuler des positions, et peut-être utiliser des techniques comme les [animations FLIP](/tutoriels/introduction-aux-animations-flips/) pour m'assurer que ce soit performant.

Mais grâce à la nouvelle API des View Transitions, si je veux l'animer, je n'ai qu'une seule chose à faire : entourer le code qui active la modification de style par [`document.startViewTransition`](https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition).

```diff
input.addEventListener('change', () => {
+	document.startViewTransition(() => {
		element.classList.toggle('active');
+	});
})
```

> 💡 Attention toutefois, `document.startViewTransition` n'est [pas disponible partout](https://caniuse.com/view-transitions). Veillez donc à vérifier son existence afin de ne pas casser tous les autres navigateurs :
>
> ```diff
> input.addEventListener('change', () => {
> +	if ('startViewTransition' in document) {
> 		 document.startViewTransition(() => {
> 			 element.classList.toggle('active');
> 		 });
> +	} else {
> +		 element.classList.toggle('active');
> +	}
> })
> ```

Une fois ceci fait, vous obtiendrez le résultat suivant :
