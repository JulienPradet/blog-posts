C'est mieux, mais ce n'est pas encore tout à fait ça. Dans la section suivante, nous allons voir comment améliorer la transition pour éviter ce sentiment de flash, particulièrement visible sur desktop.

<blockquote>
<p>💡 Cependant, avant ça, je veux faire un petit laïus sur les frameworks JS, parce qu'il n'est pas forcément évident de voir comment traduire le code JS ci-dessus dans le framework de votre choix.</p>

<details>
<summary><strong>Cliquez ici pour afficher expliquer comment gérer les View Transitions en React (adaptable aux autres frameworks :))</strong></summary>

Si vous essayez de manipuler directement le DOM, React ne va pas être content parce qu'il ne sera plus synchronisé avec le contenu du DOM. Vous finirez juste par avoir une erreur et une page blanche. On va donc plutôt se reposer sur le système de rendu classique. Pour cela, nous allons donc utiliser des _states_.

Les points qu'il faut retenir sont :

- pour pouvoir correctement animer l'animation de retour il vous faut stocker quelque part l'id de l'item d'origine. Ca peut être dans un state, dans la session ou dans l'URL. A vous d'implémenter les propriétés `props.select`, `props.unselect` et `props.previousItem`. Le piste la plus directe serait de faire un composant parent qui possède un `useState`.
- pour pouvoir ajouter un `view-transition-name` juste avant de déclencher l'animation, vous pouvez séparer votre handler d'événement en 2 étapes : un premier flush/render qui ajoute la `view-transition-name`, une deuxième qui déclenche la `startViewTransition`.
- dans cet exemple, je pars du principe que vous n'utilisez pas de router externe. Si vous en utilisez un, sachez que [Remix supporte les View Transitions](https://github.com/remix-run/react-router/blob/main/CHANGELOG.md#view-transitions-), [TanStack Router semble pouvoir le faire grâce au hook `useNavigate`](https://tanstack.com/router/v1/docs/framework/react/api/router/useNavigateHook), mais qu'il n'est pour l'instant [pas possible de le faire en Next.js](https://github.com/vercel/next.js/discussions/46300).

Voici ce que ça donnerait avec du vrai code :

```js
/**
 * @var {number} props.item
 * @var {(item: number) => void} props.unselect pour revenir à la vue liste
 */
function Page(props) {
	function close(item: number) {
		if ('startViewTransition' in document) {
			document.startViewTransition(() => {
				flushSync(() => {
					props.unselect(item);
				});
			});
		} else {
			props.unselect(item);
		}
	}

	return (
		<div>
			<h4 className="header">{item}</h4>
			<button onClick={close}>
				Revenir à la liste
			</button>
		</div>
	);
}

/**
 * @var {number[]} props.list
 * @var {number|null} props.previousItem récupéré depuis le props.unselect de la Page
 * @var {(item: number) => void} props.select pour aller à la vue page
 */
function List(props) {
	// Si on vient d'une Page, on aura le paramètre passé à props.unselect qui
	// sera disponible.
	// En le passant ensuite via props.previousItem, c'est ce qui nous permet
	// de s'assurer qu'on va bien animer le retour à la liste, et c'est pour
	// cette raison qu'on n'initialise pas toujours le state à `null`
	const [itemWithViewTransitionName, setItemWithTransitionName]
		= useState(previousItem);

	function open(item: number) {
		if ('startViewTransition' in document) {
			// Avant de déclencher l'animation on met à jour le state pour que le
			// bouton concerné récupère la bonne propriété CSS view-transition-name
			flushSync(() => {
				setItemWithTransitionName(item);
			});

			// Puis seulement on déclenche l'animation
			document.startViewTransition(() => {
				flushSync(() => {
					props.select(item)
				});
			});
		} else {
			props.select(item)
		}
	}

	return (
		<ul>
			{list.map((item) => (
				<li key={item}>
					<button
						style={
							itemWithViewTransitionName === item
								? { viewTransitionName: 'element' }
								: undefined
						}
						onClick={() => open(item)}
					>
						{item}
					</button>
				</li>
			))}
		</ul>
	);
}
```

</details>
</blockquote>

### Comment faire la View Transition quand l'élément change de taille ?

Voyons maintenant plus en détail pourquoi l'animation ne paraît pas fluide. Pour cela, nous allons utiliser l'onglet Animations dans les DevTools de Chrome (vu que l'API des View Transitions n'existe pas ailleurs pour le moment).

<details>
<summary><strong>Voir comment utiliser l'onglet Animations</strong></summary>

<figure tabindex="-1">
<img src="/images/posts/view-transitions/devtools-animations.jpg" alt="Screenshot pour ouvrir l'outil Animations dans les DevTools de Chrome" width="626" height="310" loading="lazy">
</figure>

1. Cliquer sur "Customize and control DevTools"
2. Cliquer sur "More tools"
3. Choisir l'outil "Animations"

Cela vous donner accès à ce panneau, sur lequel nous allons appuyer sur "Pause all".

<figure tabindex="-1">
<img src="/images/posts/view-transitions/waiting-animations.jpg" alt="Screenshot de l'outil Animations en attente dans les DevTools de Chrome" width="628" height="231" loading="lazy">
</figure>

Dans les faits, cela bloque les prochaines animations qui pourraient advenir dans la page. Ainsi, vous pouvez aller cliquer sur notre exemple de transition et constater qu'une nouvelle timeline est apparue dans la boîte d'animations.

En cliquant dessus, on va voir toutes les animations qui sont en cours d'execution mais avec un temps bloqué à 0. Vous pouvez alors déplacer le petit losange rouge afin de jouer petit à petit l'animation.

<figure tabindex="-1">
<img src="/images/posts/view-transitions/running-animation.jpg" alt="Screenshot de l'outil Animations avec une animation en cours d'inspection dans les DevTools de Chrome" width="627" height="269" loading="lazy">
</figure>

</details>

Ainsi, si on inspecte l'animation en milieu d'exécution, on constate que cela ressemble à ceci :

<figure tabindex="-1">
<img src="/images/posts/view-transitions/weird-scale.jpg" alt="Screenshot de l'animation d'ouverture de la liste à lorsqu'elle est jouée à 50%" width="932" height="408" loading="lazy">
</figure>

Il y a bien une transition avec les screen avant/après, mais les tailles ne sont pas cohérentes. Le screenshot qui vient de la vue liste devient _très_ grand. Il est beaucoup plus haut qu'il ne le devrait.

Heureusement pour nous, on peut le corriger.

Notamment, pendant l'inspection de l'animation, si on utilise l'outil pour cibler un élément du DOM, ça va nous amener tout en haut de l'onglet "Elements" où on verra des `::view-transition-group`, `::view-transition-old`, `::view-transition-new`, etc.

<figure tabindex="-1">
<img src="/images/posts/view-transitions/view-transition-dom.png" alt="Screenshot des différents pseudo éléments qui existent pendant la transition" width="485" height="274" loading="lazy">
</figure>

En fait, ce sont des pseudo éléments qui n'existent **que** le temps de l'animation. On peut imaginer ça comme la structure du DOM qui permet d'afficher les screenshots avant, après, et orchestrer la transition entre les deux.

En les inspectant, on se rend compte qu'on peut vraiment les imaginer comme des tags HTML avec des images auxquels on a donné des propriétés CSS, des animations avec des @keyframes, etc.

Ce que ça veut dire, c'est que si le navigateur a mal positionné ces images, on peut ajouter des propriétés CSS pour corriger ça. Notamment, on va souvent avoir besoin de corriger les tailles, les `object-fit`, les positions, etc.

Dans notre cas, il faudrait que pendant la transition, le screenshot de l'état _après_, représenté par le pseudo élément `::view-transition-new(<name>)` (où `<name>` est la valeur de la propriété CSS `view-transition-name`), soit de la taille de la petite boîte violette plutôt que la grande boîte verte.

<figure tabindex="-1">
<img src="/images/posts/view-transitions/rescale-transition.jpg" alt="Screenshot des différents pseudo éléments qui existent pendant la transition" width="932" height="408" loading="lazy">
</figure>

Ce qui nous donnerait le code CSS suivant :

```css
/* J'active ces changements sur le screenshot avant (view-transition-old)
ET sur le screenshot après (view-transition-new) parce qu'il faut que
l'animation fonctionne de la même façon à l'ouverture et à la fermeture. */
html::view-transition-old(element),
html::view-transition-new(element) {
	/* `block-size` et `inline-size` peuvent être compris comme
	height & width.
	Dans cet exemple, on les unset parce qu'on ne veut pas qu'il y
	ait de transformation de taille, mais uniquement un
	déplacement/agrandissement de la zone visible. */
	block-size: unset;
	inline-size: unset;

	/* Par défaut les pseudo éléments sont déjà positionnés en absolu,
	mais ferrés en haut à gauche. Dans notre cas, on veut que ce soit
	centré, donc on utilise la bonne vieille méthode du 50% - 50% */
	top: 50%;
	left: 50%;
	translate: -50% -50%;

	/* Par défaut les transitions ont un fade-in et un fade-out pour
	s'assurer d'avoir une transition fluide entre des éléments qui changent
	de couleur ou de contenu. Ici, on sait que seul la fenêtre de visibilité
	change. Donc on peut désactiver cette animation. */
	animation-name: unset;
}
```

Cependant, si on ne fait que ça, il nous reste un problème : effectivement, l'élément n'est plus trop petit, mais on a perdu l'agrandissement. Le nouveau screenshot est toujours visible.

Pour cela, on va s'aider de la totalité de la structure des `::view-transition-xxx`. Notamment, on peut voir que `::view-transition-old` et `::view-transition-new` sont entourés par un `::view-transition-image-pair` qui, lui, est toujours à la bonne taille.

<figure tabindex="-1">
<img src="/images/posts/view-transitions/view-transition-image-pair.png" alt="Screenshot des différents pseudo éléments qui existent pendant la transition" width="485" height="274" loading="lazy">
</figure>

> Ne me demandez pas pourquoi sur le screen ci-dessus, ça affiche `::view-transition-group`, c'est bien le `::view-transition-image-pair` que je survole dans le DOM 😅

Donc pour s'assurer que les images à l'intérieur ne dépassent jamais celui-ci, quel est le CSS qu'on ajoute ?

```css
html::view-transition-image-pair(element) {
	overflow: hidden;
}
```

Et voilà 🎉 Notre liste s'anime parfaitement à l'ouverture et à la fermeture d'une page. 👏
