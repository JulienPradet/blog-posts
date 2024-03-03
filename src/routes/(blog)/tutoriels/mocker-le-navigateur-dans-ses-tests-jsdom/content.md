Dans [un tutoriel précédent](/tutoriels/testing-library-comment-rediger-des-tests-en-react/) nous avons vu comment faire des tests unitaires en JavaScript. Pour cela nous sommes passés par [jsdom](https://github.com/jsdom/jsdom) : une implémentation d'une grande partie des APIs navigateurs en Node.js.

L'intérêt de cette librairie est que nous pouvons exécuter de la manipulation de DOM alors que nous ne sommes pas dans un vrai navigateur. Nous avons donc l'opportunité d'exécuter plus rapidement un bon nombre de tests pour aller chercher les cas limites et sécuriser nos composants.

Le problème c'est que tout n'est pas disponible : nous ne sommes pas dans un navigateur donc tout ce qui est visuel ne sera pas testable. A titre d'exemple, des APIs telles que `getBoundingClientRect`, `scrollTo`, `IntersectionObserver`, `matchMedia`, etc. ne sont pas implémentées dans jsdom puisqu'elles reposent sur la taille de votre navigateur, un élément purement visuel.

Vous vous retrouvez avec des erreurs du style :

```
TypeError: window.matchMedia is not a function
```

Que doit-on faire dans ce cas là ? Doit-on nous aussi faire une fausse implémentation (= un mock) ? Où se trouve la limite de ce qu'on peut remplacer ?

## Quel genre d'API peut-on mocker ?

Prenons l'exemple d'un composant qui doit afficher des choses en fonction du device de l'utilisateur (ajouter une classe, changer du contenu, etc. sur mobile vs desktop).

Pour cela il y a deux implémentations possibles :

- ajouter un [event listener sur le `resize`](https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event)
  ```js
  window.addEventListener('resize', (event) => {
  	console.log(window.innerWidth);
  });
  ```
- utiliser [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) qui permet de réutiliser la syntaxe des media queries en CSS pour savoir si on match ou non un certain type de device.
  ```js
  const match = window.matchMedia('(min-width: 992px)');
  match.addListener(() => {
  	console.log(match.matches); // true or false
  });
  ```

Dans le premier cas, il va être très difficile de mocker de manière convaincante le `resize` : quand une personne resize votre page, iel ne va pas déclencher un unique événement de `resize`. Il y aura certainement un changement d'orientation, voire déplacer sa souris qui va déclencher plein d'événements : autant d'événements qu'il faudra aussi simuler et mocker. Il faudra aussi être vigilant à bien mettre à jour la taille de la fenêtre, mettre à jour les informations de l'élément en mockant le getBoundingClientRect, etc.

Ce ne sera donc pas le genre d'API qu'il sera pertinent de mocker parce que votre test sera 90% de mock pour 10% de test. De plus, cela risque de n'être qu'une représentation très partielle du comportement réel du navigateur. Sur ce genre de cas, privilégiez donc des tests e2e avec [Cypress](https://www.cypress.io/) ou [Playwright](https://playwright.dev/).

Pour le deuxième cas, celui de `window.matchMedia` c'est différent : on ne va plus devoir simuler la totalité des `resize`, on peut se contenter de déclencher un événement unique dans lequel `match.matches === true`.

Si on généralise :

- ✅ mockez si vous pouvez vous contenter d'une quantité limitée de mock ou d'événements
- ❌ ne pas mocker si vous vous retrouvez avec une multitude de mocks à créer ou que vous commencez à trop dépendre de positions ou de tailles en pixels.

D'ailleurs de manière générale, quelque chose qui est facile à mocker sera certainement un code qui sera meilleur. Typiquement il est préconisé de passer par `matchMedia` plutôt que `resize` parce que c'est plus performant, plus fiable et plus expressif. Que du bonheur :)

### Que faire quand j'utilise une librairie qui abstrait le navigateur ?

Maintenant admettons que vous utilisez par exemple [use-match-media](https://github.com/jepser/use-match-media), un hook React qui gère pour vous `window.matchMedia` : que faire ?

Est-ce que vous devez mocker la librairie en elle même ou `window.matchMedia` qui est en dessous ?

Ca dépend. 😁

Personnellement je suis d'avis que plus vous mockez quelque chose de bas niveau, mieux c'est. En effet, cela vous permet d'être plus résilient au changement et de tester une plus grande partie de la couche. Par exemple, si vous changez de version majeure de `use-match-media`, vous serez content·e de ne pas avoir besoin d'adapter votre mock ET d'avoir un test qui vous assure que la fonctionnalité complète fonctionne. Si vous aviez mocké la librairie vous allez devoir vérifier manuellement que la librairie vous renvoie toujours les bonnes informations et vous devrez faire évoluer votre mock le cas échéant. Il est donc plus pertinent de mocker `window.matchMedia` plutôt que la librairie qui l'utilise.

Cependant parfois cela peut rendre vos mocks trop complexes. Ca peut être le cas par exemple pour tout ce qui va toucher au réseau. Il peut par exemple être plus facile de mocker le hook `useQuery` de [@tanstack/react-query](https://tanstack.com/query/latest) plutôt que d'aller mocker le `window.fetch` qui est en dessous. Ou peut être en passant par [msw](https://mswjs.io/) comme le propose Kent C. Dodds dans [Stop mocking fetch](https://kentcdodds.com/blog/stop-mocking-fetch).

## Cas pratique de `matchMedia`

Maintenant que nous savons s'il est pertinent de se lancer dans un mock, voyons comment nous pourrions implémenter ce mock.

1. Remplacer l'API navigateur dans le test
2. Déclencher un listener manuellement

### Remplacer l'API navigateur

Quand on utilise un `window.matchMedia`, le code ressemble à ceci :

```js
// addClassOnMobile.js
function addClassOnMobile() {
	const match = window.matchMedia('(min-width: 992px)');
	// initialize mobile class when the function is first called
	document.body.classList.toggle('mobile', match.matches);

	// update the mobile class whenever the device format changes
	match.addListener((match) => {
		document.body.classList.toggle('mobile', match.matches);
	});
}
```

Nous avons donc une fonction qui prend en paramètre une `mediaQuery`. Cette fonction retourne un objet qui a les clés :

- `matches` qui indique si à l'initialisation on vérifie cette mediaQuery ou non
- `addListener` qui est appelé lorsqu'il y a un changement d'affichage

En réalité l'objet est de type [`MediaQueryList`](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList) et donc a plus de clés disponibles. Cependant, si dans votre code vous n'utilisez que `matches` et `addListener` n'allez pas vous embêter à mocker les autres.

Ainsi, si on retranscrit ces mots avec du code, ça nous donnerait :

```js
// matchMediaMock.js
export const matchMediaMock = (mediaQuery) => {
	let callbacks = [];

	return {
		matches: false,
		addListener: (callback) => {
			callbacks.push(callback);
		}
	};
};
```

Ce n'est qu'une première implémentation partielle, mais ça nous suffit pour commencer à remplacer l'API dans notre test :

```js
// addClassOnMobile.test.js
beforeEach(() => {
	window.matchMedia = matchMediaMock;
});

afterEach(() => {
	// Par acquis de conscience on nettoie toujours les variables
	// globales qu'on a modifié au cours de notre test
	// afin d'éviter fuites de mémoire et pollution des autres tests
	window.matchMedia = undefined;
});
```

Maintenant si on execute notre test, ce ne sera plus l'API du navigateur ou de jsdom mais bien le nôtre qui sera utilisé.

> 💡 Parfois, l'API que vous voulez mocker existe déjà. Dans ce cas, vous avez deux options :
>
> - soit vous pouvez utiliser jest.spyOn afin d'observer l'interaction avec cette API
> - soit vous pouvez conserver la même méthode que précédemment mais en passant à réinitialiser dans `afterEach` non pas avec `undefined` mais avec la valeur initialze
>
>   ```js
>   let initialMatchMedia;
>
>   beforeEach(() => {
>   	initialMatchMedia = window.matchMedia;
>   	window.matchMedia = matchMediaMock;
>   });
>
>   afterEach(() => {
>   	window.matchMedia = initialMatchMedia;
>   });
>   ```

### Déclencher un listener manuellement

Cependant, on ne déclenche pour l'instant jamais de mise à jour. Le callback passé au `addListener` n'est jamais appelé, il est uniquement stocké dans le tableau `callbacks`.

Si on se réfère à la méthode **Given When Then** que j'avais présenté dans [Testing Library : Comment rédiger des tests front-end ?](https://www.julienpradet.fr/tutoriels/testing-library-comment-rediger-des-tests-en-react/), il nous manque le **When** :
quand le navigateur change de format et déclenche le listener.

```js
// addClassOnMobile.test.js
it('should add a mobile class to the body when the match changes', () => {
	// GIVEN
	addClassOnMobile();

	// WHEN
	triggerMediaChange(true);

	// THEN
	expect(document.body.classList.contains('mobile')).toBe(true);
});
```

La méthode `triggerMediaChange` n'existe nul part pour le moment. Nous allons devoir la créer pour pour nous assurer que les listeners soient bien déclenchés quand elle est appelée.

Le principe d'un mock est qu'il doit fonctionner, certes, mais dans le cas très restreint de votre cas. Ainsi, même si dans notre première implémentation du `matchMediaMock` nous avions stocké les callback à l'intérieur du mock, il ne faut pas hésiter à les déplacer pour répondre à notre besoin, même quand ça paraît moche.

```diff
// matchMediaMock.js
+let callbacks = [];

export const matchMediaMock = (mediaQuery) => {
-   let callbacks = [];

	return {
		matches: false,
		addListener: (callback) => {
			callbacks.push(callback);
		}
	};
};

+export const triggerMediaChange(matches) {
+    callbacks.forEach((callback) => {
+        callback({
+            matches: matches
+        })
+    })
+}
```

Ici, nous avons fait en sorte que _tous_ les listeners de _tous_ les matchMedia en cours d'utilisation soient appelés avec `{matches: true}` dans le cas où on appelle `triggerMediaChange(true)`.

C'est donc une implémentation **très** limitée, mais dans notre cas nous n'avons qu'un seul `matchMedia` à la fois. Nous n'avons pas besoin d'aller plus loin.

Si au contraire nous avions deux exécutions différentes (un `matchMedia` pour la vue mobile et un `matchMedia` pour la vue tablette), nous aurions certainement besoin d'améliorer notre mock. Mais pour l'instant cette version suffira.

Si vous êtes arrivés jusqu'ici, vous avez sûrement votre test qui passe au vert. 🎉

Cependant, avant de passer la suite je veux retenir votre attention sur un point : quand vous écrivez des mocks, il y a des grandes chances de s'emmêler les pinceaux. En effet, on implémente une version simplifiée de la réalité qui, par essence, est fausse. Il y a donc de fortes chances pour que le mock ne fasse pas réellement ce que vous imaginez **ou** que votre test empêche des régressions sur votre mock au lieu d'empêcher des régressions sur votre code.

Pensez donc à casser votre code (ce qu'il y a dans `addClassOnMobile.js`), pour vous assurer que votre test détectera toute régression. **Tant que vous n'aurez jamais vu votre test échouer (rouge), vous pouvez considérer que votre test ne marche pas.** Je ne compte plus le nombre de fois où je pensais avoir fini d'écrire mes tests mais où je me suis rendu compte que je ne testais rien. C'est d'ailleurs un des avantages du <abbr tabIndex="-1" title="Test Driven Development">TDD</abbr> : vu que vous n'avez pas encore codé au moment d'écrire vos tests, vous le verrez forcément rouge.

### Penser à nettoyer son mock après les tests

C'est toujours un bon réflexe à prendre d'essayer de se demander : que se passe-t-il si j'effectue un autre test ?

Dans notre cas, on fait appel pendant le test à `addClassOnMobile`. Cette fonction appelle `matchMedia` (la version mockée) qui ajoute un nouveau callback dans le tableau `callbacks`. Cette dernière existe à l'échelle du module (= une fonction qui n'est pas cachée dans une fonction). Donc si un autre test fait un appel à `matchMedia`, on ne se retrouvera avec **deux** listeners dans notre tableau `callbacks`.

Cela peut vite commencer à provoquer des problèmes notamment quand plusieurs fichiers différents utilisent le même mock. Donc à la fin de chaque test on va faire attention à bien nettoyer notre mock.

```js
// addClassOnMobile.test.js
import { cleanupMatchMedia } from './matchMediaMock';

afterEach(() => {
	cleanupMatchMedia();
});
```

```js
// matchMediaMock.js

export const cleanupMatchMedia = () => {
	callbacks = [];
};
```

### Exercice : ajouter un test avec une valeur initiale différente

Si on récapitule à quoi ressemble notre mock, notre ficher ressemble à ceci :

```js
// matchMediaMock.js

/** @var {((match: {matches: boolean}) => void)[]} */
let callbacks = [];

/**
 * @param {string} mediaQuery
 */
export const matchMediaMock = (mediaQuery) => {
	return {
		matches: false,
		addListener: (callback) => {
			callbacks.push(callback);
		}
	};
};

/**
 * @param {boolean} matches
 */
export const triggerMediaChange(matches) {
    callbacks.forEach((callback) => {
        callback({
            matches: matches
        })
    })
}

export const cleanupMatchMedia = () => {
	callbacks = [];
};
```

Cependant, admettons qu'on veut ajouter un nouveau test :

- it should add a mobile class on body when the initial media matches

Actuellement, dans `matchMediaMock`, on retourne `matches: false`. Ce n'est pas compatible avec le test qu'on veut ajouter : il faudrait que `matches: true`. Comment pourrions-nous faire ?

> 💡 Je vous encourage à chercher la solution par vous même avant de passer à la suite. Une piste serait d'imaginer ce qu'on pourrait faire dans l'étape **Given** du test pour influencer le comportement du mock.

<figure>
<img src="/images/posts/testing-library/interlude.gif" alt="Le texte 'A little interlude' est affiché sur un fond étoilé tout mignon.">
<figcaption>Source : <a href="https://giphy.com/gifs/break-pause-interlude-x2Cqbgx3SSCNNghso8">KerBop Publishing</a></figcaption>
</figure>

**ℹ️ Solution ℹ️**

L'astuce est de déclencher le changement d'état **avant** l'appel à `addClassOnMobile`. D'un point de vue navigateur c'est ce qui se passe : au tout premier affichage de la page, il se demande sur quel type de device on est.

```diff
// addClassOnMobile.test.js
it('should add a mobile class on body when the initial media matches', () => {
+   triggerMediaChange(true);
	addClassOnMobile();

-   triggerMediaChange(true);

	expect(document.body.classList.contains('mobile')).toBe(true);
});
```

Par contre, pour que ça fonctionne il faut nécessairement faire évoluer le mock. Ainsi, au lieu de renvoyer un `matches: false`, on va le variabiliser. Quand on appelle `triggerMediaChange`, on change cette variable. Ainsi, au moment où notre code va appeler `matchMediaMock`, il aura la valeur du dernier appel à `triggerMediaChange`.

```diff
// matchMediaMock.js

let callbacks = [];
+let currentMatches = false;

export const matchMediaMock = (mediaQuery) => {
	return {
-		matches: false,
+		matches: currentMatches,
		addListener: (callback) => {
			callbacks.push(callback);
		}
	};
};

export const triggerMediaChange = (matches) => {
+	currentMatches = matches;
	callbacks.forEach((callback) => {
		callback({
			matches: matches
		});
	});
};

export const cleanupMatchMedia = () => {
+	currentMatches = false;
	callbacks = [];
};
```

Et enfin, comme pour les callbacks, on pense bien à réinitialiser la variable initiale histoire d'être sûr d'être exactement dans le même état à chaque démarrage de test.

</details>

## Récapitulatif

Nous voilà arrivé au bout ! 👏

Vous sentez-vous capable d'attaquer les mocks dont vous avez besoin dans vos tests maintenant ? N'hésitez pas à me partager vos réussites ou difficultés sur [Mastodon](https://piaille.fr/@julienpradet) ou [Twitter](https://twitter.com/JulienPradet).

En attendant, s'il n'y a que quelques éléments que je veux que vous reteniez de cet article, ce serait :

- ce n'est pas parce que jsdom n'implémente pas une API qu'il n'est pas possible de la tester unitairement
- évitez cependant de mocker tout ce qui repose sur une orchestration complexe ou sur des pixels, les tests <abbr tabIndex="-1" title="End-To-End">e2e</abbr> ou les tests visuels seront plus adaptés
- les mocks reposent souvent sur des variables globales, pensez à les nettoyer
- veillez à toujours casser votre code quand vous avez fini d'écrire votre test : tant que le test n'aura pas été rouge vous n'êtes pas sûr que votre test est bon.

Si ce sont des pratiques que vous aimeriez propager au sein de votre entreprise, sans forcément trop savoir par où commencer ou sans avoir le temps de vous y pencher, n'hésitez pas à me contacter par [mail](mailto:julien.pradet+article-blog@gmail.com). Nous pourrons en discuter avec plaisir.

Adishatz 👋
