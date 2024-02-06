L'exemple est plus compliqué parce que :

1. ce n'est pas juste un ajout de classe, la structure complète du DOM change. En effet, on passe d'un `<button>` quand on est dans la vue liste, à un `<h4>` quand on est sur la nouvelle page
2. selon où on clique, on ne veut pas animer tous les éléments (si je clique sur 4, il vaut mieux que j'anime le 1)
3. la taille de l'élément change afin de simuler le comportement d'une bannière en haut de page

Voyons donc comment gérer ces différentes problématiques pour obtenir une animation aux petits oignons.

### Comment faire la transition lorsqu'il y a un changement de DOM ?

Un peu plus haut, je vous disais que l'API fonctionnait en prenant un screenshot avant, un screenshot après, puis fait une transition entre les deux. De fait, cela veut dire que c'est compatible même si le DOM change complètement entre avant et après.

La seule chose à bien prendre en compte, c'est de s'assurer que la propriété CSS `view-transition-name` est présente avant _ET_ après, et que son ID soit stable.

Ici, si je veux faire la transition de l'élément 4 de la liste, vers le header 4, il va donc falloir que je fasse en sorte que :

```css
.element--4 {
	view-transition-name: element-id;
}

.header {
	view-transition-name: element-id;
}
```

Mais ça ouvre le problème que je dois avoir un id différent pour chacun des éléments de la liste. Sinon, le navigateur ne saura pas quel screenshot prendre avant de faire la transition.

D'ailleurs, il vous préviendra dans votre console en affichant le message d'erreur : `Unexpected duplicate view-transition-name: <name>`.

Le premier réflexe est donc de gérer cela en créant autant de `view-transition-name` différents qu'il y a d'éléments dans votre liste:

```html
<!-- ⚠️ ne pas faire ça -->

<!-- Dans la vue liste -->
<button style="view-transition-name: element-1">1</button>
<button style="view-transition-name: element-2">2</button>
<button style="view-transition-name: element-3">3</button>
<button style="view-transition-name: element-4">4</button>

<!-- Dans la vue page -->
<header style="view-transition-name: element-4">4</header>
```

Mais cela a pour inconvénient que ça surcharge le travail du navigateur. Notamment, dans la phase _avant_, le navigateur va être obligé de prendre un screenshot de _tous_ les éléments qui ont une `view-transition-name`. Si vous n'en avez que quelques uns sur votre site, ça peut le faire. Mais quand vous aurez adopté cette technique plus largement pour animer beaucoup de transitions, cela va commencer à surcharger votre navigateur et risque d'allonger le temps de vos interactions.

Notamment, j'ai fait quelques tests et dès 25 `view-transition-name`, sur des périphériques pas très puissants, on dépasse <a href="https://www.nngroup.com/articles/response-times-3-important-limits/">les 100ms de latence</a> entre le click et le début de l'animation. Donc à l'intéraction on commence à ressentir un petit lag. Dès 200 éléments, on constate des lags _pendant_ l'animation, même si l'animation est un simple fade.

<figure tabindex="-1" id="performance">
<img src="/images/posts/view-transitions/view-transition-performance.png" alt="Screenshot des différents pseudo éléments qui existent pendant la transition" width="603" height="374" loading="lazy">
<figcaption><a href="https://docs.google.com/spreadsheets/d/1v1RJdqrwW5Sn_hc41ErifvLJMWXT5xqquAz5yax0kIw/edit?usp=sharing">Détails</a> &ndash; <a href="/tutoriels/view-transitions/performance-test/">Page de test</a></figcaption>
</figure>

Il est donc important d'ajouter des `view-transition-name` uniquement quand vous en avez besoin, c'est-à-dire juste avant le début de l'animation :

```diff
/**
 * @var {number} item
 */
function selectItem(item) {
+	const button = document.querySelector(`#item-${item}`)
+	button.style.setProperty('view-transition-name', 'element');

	document.startViewTransition(async () => {
		goToPage(item);
	});
}
```

Et de s'assurer que le header, une fois la page ouverte, ait bien la view-transition-name aussi.

```css
.header {
	view-transition-name: element;
}
```

Attention toutefois, cela gère l'animation dans un sens uniquement : quand vous partez de la page pour revenir à la liste, il faut aussi penser à ajouter la `view-transition-name` sur le bouton.

```diff
/**
 * @var {number} currentItem the id of the displayed header
 */
function unselectItem(currentItem) {
	document.startViewTransition(async () => {
		goToList();

+		const button = document.querySelector(`#item-${currentItem}`)
+		button.style.setProperty('view-transition-name', 'element');
	});
}
```

Et grâce à ça vous obtenez cette animation :
