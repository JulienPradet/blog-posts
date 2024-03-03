Testing Library est une librairie qui nous permet de transformer notre façon d'écrire les tests en adoptant le point de vue de nos utilisateurs. Dans sa documentation, nous pouvons voir qu'il est compatible avec toute une tripotée de frameworks: React, Vue, Angular, etc. La semaine dernière, nous avons par exemple vu comment cela fonctionnait pour React.

Dans le billet de cette semaine, nous allons essayer de comprendre comment ça marche plus en profondeur en l'adaptant à un autre framework : Twig.

- [comment rédiger des tests en React](/tutoriels/testing-library-comment-rediger-des-tests-en-react/)
- <a href="/tutoriels/testing-library-adapter-a-son-propre-framework/" aria-current="page">comment adapter ces tests à d'autres front-end</a> (vous êtes ici)

> ℹ️ Prérequis : pour pouvoir suivre ce tutoriel, je vous conseille d'avoir lu la première partie notamment pour comprendre les subtilités de jsdom et pour vous aider à comprendre la construction du test.

## Présentation de Twig

Twig est un moteur de templating très répandu dans l'écosystème PHP et plus particulièrement Symfony. C'est l'outil qui va sortir du HTML en prenant en compte des variables, des fonctions, etc. Sa syntaxe est très proche d'autres outils tels que [handlebars](https://handlebarsjs.com/), [mustache.js](https://mustache.github.io/), [ERB](https://github.com/ruby/erb), etc.

Par exemple voici à quoi pourrait ressembler une dropdown :

```twig
{# templates/dropdown.html.twig #}
<div
    class="dropdown {% if isOpenedInitially %}dropdown--opened{% endif %}"
    aria-expanded="{% if isOpenedInitially %}true{% else %}false{% endif %}"
    aria-controls="dropdown-content"
>
	<button class="dropdwn__toggle">Open/Close</button>
    <p
        id="dropdown-content"
        class="dropdown__content"
        {% if isOpenedInitially %}hidden{% endif %}
    >
        {{ content }}
    </p>
</div>
```

Le HTML peut paraître un peu compliqué parce que j'ai ajouté des attributs nécessaires à la gestion de l'accessibilité. Mais dans l'esprit, j'ai accès à des variables que je peux afficher (`{{ content }}`) et je peux faire des conditions avec `{% if condition %}`.

Et cela va ensuite être utilisé en général par un autre fichier Twig:

```twig
{% include 'dropdown.html.twig' with {
    'isOpenedInitially': true,
    'content': 'Mon super contenu',
} only %}
```

Si vous êtes plus habitués à React, c'est finalement très équivalent à :

```jsx
<Dropdown isOpenedInitially={true} content="Mon super contenu" />
```

## Comment le transposer avec Testing Library ?

Maintenant, revenons à nos tests : quand nous avions écrit nos tests dans l'article précédent, nous avions eu trois étapes différentes :

1. GIVEN a dropdown that was just rendered

   ```jsx
   render(
   	<Dropdown openLabel="Open" closeLabel="Close">
   		<p>Hidden part of the dropdown</p>
   	</Dropdown>
   );
   ```

2. WHEN the user clicks
   ```jsx
   const dropdownButton = await screen.findByText('Open');
   userEvent.click(dropdownButton);
   ```
3. THEN the hidden part should be displayed.
   ```jsx
   const content = await screen.findByText('Hidden part of the dropdown');
   expect(content).toBeVisible();
   ```

Il y a donc essentiellement le `render` qui est propre à React : on a besoin de définir quel composant et quelles propriétés on veut afficher, puis la fonction render ajoute le composant au faux DOM, à la page invisible créée par jsdom.

Le reste peut rester strictement identique.

> ℹ️ Peut-être avez-vous noté que `screen` qui est utilisé dans le WHEN et le THEN, est importé depuis `@testing-library/react`. Peut-être est-ce donc lié à React ? La réponse est non. Il s'agit en fait d'un alias et nous aurions tout à fait pu l'importer directement depuis `import { screen } from @testing-library/dom`

### Un render qui fait un rendu Twig

Commençons donc par écrire la fonction `render` dédiée à Twig. L'objectif est de pouvoir passer un fichier (`dropdown.html.twig`) et des propriétés (`isInitiallyOpened` & `content`). Finalement, c'est très proche de ce qu'on fait quand on écrit un `include`. On peut donc adapter cela à une syntaxe plus JS.

```js
render('dropdown.html.twig', {
	isInitiallyOpened: true,
	content: 'Mon super contenu'
});
```

Mais ce `render` qu'est-ce qu'il doit faire ?

1. transformer un fichier Twig en vrai HTML
2. ajouter ce HTML dans le DOM (celui de jsdom)

#### 1. Transformer un fichier Twig en vrai HTML

Twig est initialement un projet réalisé en PHP. Or, quand on exécute des tests en jest/vitest, nous sommes dans un environnement JavaScript. Nous allons donc avoir besoin de trouver une librarie qui fait ça pour nous.

La première qui remonte avec une recherche Google est [twig.js](https://www.npmjs.com/package/twig). Cependant je vous déconseille de l'utiliser car le support des fonctionnalités Twig n'est que très partiel. C'est possible de s'en sortir avec mais cela vous demandera de modifier certaines syntaxes dans vos templates.

[Twing](https://www.npmjs.com/package/twing) est plus confidentiel mais a l'avantage de supporter la quasi-totalité du langage. Il vous posera donc moins de problèmes.

```js
// ./testing-library-twig.js
import path from 'path';
import { TwingEnvironment, TwingLoaderFilesystem } from 'twing';

// Le chemin vers le dossier qui contient vos fichiers Twig
// Cela peut aussi être un tableau de chemins si vous vos templates
// sont répartis dans plusieurs dossiers/bundles.
const templatesPath = path.join(process.cwd(), 'templates');
// Le loader est l'outil responsable de trouver vos templates twigs
// dans votre système de fichier
const loader = new TwingLoaderFilesystem(templatesPath);

const twing = new TwingEnvironment(
	loader,
	// Des options de rendu qui correspondent aux options que vous avez définies
	// dans votre configuration Symfony
	// https://nightlycommit.github.io/twing/api.html#environment-options
	{
		strict_variables: true
	}
);

/**
 * La méthode render qui sera utilisée dans vos tests
 * @param {string} templatePath
 * @param {Object} properties
 */
export async function render(templatePath, properties) {
	const template = await twing.load(templatePath);
	const html = await template.render(properties);
	console.log(html);
}

// Nous exportons les méthodes de @testing-library/dom afin de
// conserver la même façon d'importer `screen` ou n'importe quelle
// méthode qui permet d'interagir avec le DOM dans nos tests
export * from '@testing-library/dom';
```

Ok donc normalement si vous exécutez cette nouvelle fonction `render`, cela créera le HTML attendu dans la variable `html`. Cependant, il ne fait pas encore partie de votre page. Un peu comme vous auriez fait un appel ajax et vous vous contentez de faire un `console.log` du contenu de la réponse. Il faut **faire quelque chose** de cette réponse.

#### 2. ajouter ce HTML dans le DOM

Nous allons donc faire ce que nous aurions fait avec de l'Ajax dans un vrai navigateur, c'est-à-dire ajouter le HTML dans le `body` de votre page :

```diff
export async function render(templatePath, properties) {
	const template = await twing.load(templatePath);
	const html = await template.render(properties);
-   console.log(html);
+
+   const element = document.createElement('div');
+   element.innerHTML = html;
+   document.body.appendChild(element);
}
```

À partir de ce moment-là vous pouvez commencer à exécuter votre test :

```diff
- import { render, screen } from '@testing-library/react';
+ import { render, screen } from './texting-library-twig.js';

-   render(
-   	<Dropdown openLabel="Open" closeLabel="Close">
-   		<p>Hidden part of the dropdown</p>
-   	</Dropdown>
+   await render(
+      'dropdown.html.twig',
+      {
+          isInitiallyOpened: true,
+          content: 'Mon super contenu'
+      }
   );
```

> ℹ️ La méthode `render` de React est synchrone, tandis que la fonction `render` que nous avons créée est asynchrone. C'est pour cette raison que nous devons ajouter le `await` devant la méthode : il nous faut attendre que la librairie `twing` ait bien fini son travail.

Et voilà ! Dans votre test, vous pouvez maintenant interagir avec le résultat de votre fichier Twig en passant par Testing Library.

<figure>
<img src="/images/posts/testing-library/tada.gif" alt="Un lapin habillé tout en jaune qui écarte les bras et s'exclame : Tadaaaaa">
<figcaption>Source : <a href="https://giphy.com/gifs/simon-superrabbit-simon-super-rabbit-lapin-HnpptCI5XLZzY96h1z">Simon Super Rabbit</a></figcaption>
</figure>

Par exemple vous pouvez vérifier que le contenu est bien visible initialement vu que vous avez passé `isInitiallyOpened: true`.

```js
expect(await screen.findByText('Mon super contenu')).toBeVisible();
```

> 💡 Si vous avez déjà l'habitude de Testing Library, vous avez peut-être l'habitude d'écrire : `const { findByText } = render(...)`. Vous pouvez mettre cela en place en configurant le `return` de votre méthode `render` :
>
> ```diff
> +import { getQueriesForElement } from '@testing-library/dom';
>
> export async function render(templatePath, properties) {
>     [...]
> +
> +   return getQueriesForElement(element);
> }
> ```

### Nettoyer le DOM après le test

Nous avons donc notre `render` qui transform du Twig en HTML pour ensuite l'ajouter dans notre page virtuelle. Ca nous permet d'exécuter un premier test. Mais que va-t-il se passer au prochain test ?

Notre `render` fait un `document.body.appendChild`. Donc si j'exécute plusieurs fois la méthode, le HTML va commencer à se dupliquer dans le HTML causant ainsi des problèmes de concurrence entre les tests et accessoirement de memory leak.

La bonne pratique est donc de nettoyer le DOM après chaque test.

Dans `jest` et Testing Library cela se fait généralement dans un `afterEach` avec une méthode appelée `cleanup` : après chaque test on s'assure de remettre notre page en état pour que le prochain ne soit pas impacté.

```diff
// ./testing-library-twig.js

+let mountedElements = [];

export async function render(templatePath, properties) {
	const template = await twing.load(templatePath);
	const html = await template.render(properties);

    const element = document.createElement('div');
    element.outerHTML = html;
    document.body.appendChild(element);
+
+   mountedElements.push(element);
}

+export function cleanup() {
+   mountedElements.forEach((element) => {
+       document.body.removeChild(element);
+   });
+};
+
+afterEach(() => {
+   cleanup();
+});
```

Ainsi, après chaque exécution de test, le body sera à nouveau vide.

### Ajouter la gestion du JavaScript

Nous sommes désormais capable de tester le HTML généré par Twig. C'est donc une très bonne première étape, mais ce ne sont pas forcément les tests qui apportent le plus de valeur : en effet ce qui a le plus de chance de casser au cours des évolutions, ce sont les interactions de l'utilisateur. Que doit-il se passer quand l'utilisateur clique sur le bouton ?

Pour cette partie-là, nous avons de la chance, nous avons peu de choses à faire :

- nous avons le HTML qui est déjà prêt
- nous sommes dans un environnement `jsdom` qui mimique un navigateur et donc la plupart des APIs navigateur sont déjà mockées

La seule chose qui peut évoluer c'est la manière dont vous avez écrit votre JS.

```js
window.addEventListener('DOMContentLoaded', () {
	const button = document.querySelector('.dropdown__toggle');
	button.addEventListener('click', function () {
		const dropdown = button.closest('.dropdown');
		dropdown.classList.toggle('dropdown--opened');
		// + la gestion des attributs d'accessiblité
	});
});
```

Par exemple dans ce cas, on se repose sur `DOMContentLoaded` qui est un événement qui n'a pas de sens dans le contexte de jsdom : le contenu est chargé depuis bien longtemps, on ne manipule la page qu'avec du JavaScript.

De plus, en fonction de comment vous avez l'habitude de coder votre JS, vous avez peut-être beaucoup d'autres fonctionnalités dans votre page et pas uniquement le code dédié à votre dropdown. Dans notre test on ne veut tester _que_ la dropdown.

L'idéal serait donc de transformer le code en séparant la partie qui concerne la dropdown dans sa propre fonction, voire dans son propre fichier, afin de pouvoir l'exécuter indépendamment. En faisant cela on sépare la responsabilité de la page (= quand est-ce qu'on doit commencer à initialiser la dropdown), de la responsabilité de la dropdown (= il faut écouter tel bouton).

```js
import { initDropdown } from './initDropdown.js';

window.addEventListener('DOMContentLoaded', function () {
	initDropdown();
});
```

```js
// initDropdown.js
export function initDropdown() {
	const button = document.querySelector('.dropdown__toggle');

	button.addEventListener('click', function onToggle() {
		const dropdown = button.closest('.dropdown');
		dropdown.classList.toggle('dropdown--opened');
	});
}
```

Une fois fait, dès que le HTML est prêt dans notre test, on peut commencer à appeler cette fonction.

```diff
// dropdown.test.js
+import initDropdown from './initDropdown.js',

// ...

render('dropdown.html.twig', {
	isInitiallyOpened: true,
	content: 'Mon super contenu'
});
+initDropdown();

// ...
```

Ainsi, en faisant un click sur le composant, l'event listener du `initDropdown` sera bien appelé et donc la dropdown se mettra bien à jour. 🎉

Il est courant de ne pas trop savoir quand mettre le `initDropdown` ou de le mettre trop tard dans les tests. Il faut bien à faire attention de le faire **avant** l'action de l'utilisateur. C'est donc une bonne astuce de toujours le faire dans l'étape **GIVEN** du test.

### Ajouter la gestion du CSS

Maintenant la dernière partie de ce qui compose un composant : le CSS.

Je vous parlais dans [le tutoriel précédent](/tutoriels/testing-library-adapter-a-son-propre-framework/) de la différence entre `.toBeInTheDocument()` et `.toBeVisible()`. L'avantage du second est qu'il permet de prendre en compte le CSS.

Ainsi, même si nous ne sommes pas dans le contexte d'une vraie page web il est quand même pertinent d'essayer d'importer le CSS afin de le prendre en compte dans les tests.

Pour cela nous allons utiliser le même principe que le HTML :

1. Récupérer le CSS
2. L'ajouter dans le DOM

Comme base d'exemple, nous utiliserons ce petit bout de [Sass](https://sass-lang.com/).

```css
.dropdown {
	&__content {
		display: none;
	}

	&--opened &__content {
		display: block;
	}
}
```

## Récupérer le CSS en utilisant un Transformer

La première étape de récupération du CSS se fait en configurant des Transformers dans Jest. Un Transformer est une étape de modification de l'import qui permet d'indiquer à node.js comment exécuter le code lorsque celui-ci n'est pas du JavaScript compatible.

Certaines librairies existent à ce sujet, mais elles ne font pas forcément ce dont on a besoin. Par exemple, [jest-scss-transform](https://www.npmjs.com/package/jest-scss-transform) transforme vos fichiers en retirant tout le CSS et en ne gérant que les [`:export`](https://css-tricks.com/getting-javascript-to-talk-to-css-and-sass/). Il faut qu'on trouve une autre solution.

Nous allons donc voir comment créer notre propre Transformer pour être capable de s'adapter à n'importe quel tooling CSS. Notamment, on veut faire en sorte que si on écrit :

```js
import dropdownStyles from './dropdown.scss';

console.log(dropdownStyles);
```

Alors ça devrait logger le CSS de la dropdown, celui qu'on ajouterait dans une balise `<style>` dans le navigateur. Ainsi, après le passage du transformer, le code devrait ressembler à quelque chose de ce style :

```js
export default `
.dropdown__content {
    display: none;
}

.dropdown--opened .dropdown__content {
    display: block;
}
`;
```

Ainsi, dans notre test, quand on importera le fichier .scss, il ne verra plus du style, mais un export de string.

> ℹ️ Je considère ici que jest est configuré pour fonctionner en ESM. Mais si vos fichiers sont écrits en CommonJS, alors le fichier JS généré devrait utiliser `module.exports = ` à la place de `export default`.
>
> Si vous avez besoin de la syntaxe en `:export` n'hésitez pas à adapter le code généré pour ajouter des variables supplémentaires à exporter par exemple.

#### Configurer un transformer

Premièrement pour indiquer à Jest quel Transformer appliquer sur quel fichier, nous devons modifier sa configuration :

```js
// jest.config.js
export default {
	// ...
	transform: {
		'^.+\\.(scss|sass)$': './config/jest/SassTransformer.js'
	}
};
```

Le but est d'indiquer pour quels fichiers on veut appliquer notre transformer. Le fichier `SassTransformer.js` va être le code responsable de transformer le fichier initial en un fichier JavaScript. Il doit respecter la signature suivante :

```js
export default {
	process: (sourceText, sourcePath) => {
		return {
			code: code
		};
	}
};
```

Nous avons ainsi accès à la source du fichier qu'on veut compiler. Puis dans la variable `code`, nous devons retourner une string qui doit contenir le code JavaScript généré (exporter une string qui contiendra le CSS final).

Pour créer cette variable, nous allons récupérer le CSS depuis notre fichier Sass, grâce à la librairie
[sass](https://www.npmjs.com/package/sass).

```js
const sass = require('sass');

export default {
	process: (sourceText, sourcePath) => {
		const css = sass.compile(sourcePath);
		return {
			code: `export default ${JSON.stringify(css)};`
		};
	}
};
```

Et pouf ! Jest est maintenant correctement configuré pour que vous puissiez importer un fichier `.scss` et ainsi récupérer le CSS final dans une variable. Si vous étiez en mode `--watch` pensez à bien redémarrer votre commande pour que jest repère vos changements.

> ℹ️ À noter que les Transformers peuvent être configurés bien plus finement. Il est par exemple possible de configurer des sourceMap si vous avez besoin de faciliter le debug, ou de mettre des clés de cache si vos opérations de transformation sont lourdes. Cependant, ce sont souvent des opérations qui sont optionnelles et dont vous n'aurez pas besoin avant un bon moment. N'hésitez donc pas à aller au plus simple dans un premier temps.

#### Importer le style dans notre page

Maintenant que nous sommes capables de récupérer le CSS de notre dropdown, le but va être de l'ajouter dans notre DOM pour qu'il soit pris en compte par Testing Library.

Dans un vrai navigateur, nous aurions besoin de créer une balise `<style>` que nous remplissons avec le CSS. Nous allons donc reproduire cela en JavaScript:

```js
import dropdownStyles from './dropdown.scss';

const style = document.createElement('style');
style.innerHTML = dropdownStyles;
document.body.appendChild(style);
```

### Nettoyer le CSS après le test

Il faut toutefois faire attention aux mêmes choses que pour le render du HTML : bien nettoyer nos styles après nos tests. L'idéal est de faire ça en même temps que le `cleanup` afin que cela soit fait de manière générique et que vous n'ayez pas besoin de le gérer manuellement dans chaque test.

Pour cela, nous allons ajouter une nouvelle méthode à côté de notre `render` Twig qui aura la charge d'ajouter le CSS et de faire en sorte que la balise style soit retirée après le cleanup.

```diff
// ./testing-library-twig.js

let mountedElements = [];

export async function render(templatePath, properties) {
    // ...
}

+export function renderStyles(css) {
+    const style = document.createElement('style');
+    style.innerHTML = css;
+    document.body.appendChild(style);
+
+    mountedElements.push(style);
+}

export function cleanup() {
   mountedElements.forEach((element) => {
       document.body.removeChild(element);
   });
};
```

Ainsi, dans notre fichier de test, nous n'avons plus qu'à ajouter ces quelques lignes dans l'étape **GIVEN**.

```diff
// dropdown.test.js
+import dropdownStyles from './dropdown.scss',

// ...

render('dropdown.html.twig', {
	isInitiallyOpened: true,
	content: 'Mon super contenu'
});
+renderStyles(dropdownStyles);

// ...
```

## Récapitulatif

Nous avons donc maintenant possibilité de :

1. faire un rendu twig qui va venir s'ajouter dans la page HTML
2. exécuter du JavaScript pour être en mesure de tester des interactions
3. importer le CSS pour être au plus proche du comportement du navigateur et rendre nos tests un peu plus fiables

```jsx
// Dropdown.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import initDropdown from './initDropdown.js',
import dropdownStyles from './dropdown.scss';

describe('Dropdown', () => {
	it('should display hidden parts when the user clicks on the button', () => {
		// GIVEN a dropdown that was just rendered
        await render('dropdown.html.twig', {
            isInitiallyOpened: true,
            content: 'Mon super contenu'
        });
        renderStyles(dropdownStyles);
        initDropdown();

		// WHEN the user clicks
        const dropdownButton = await screen.findByText('Open');
        userEvent.click(dropdownButton);

		// THEN the hidden part should be displayed
        const content = await screen.findByText('Mon super contenu');
        expect(content).toBeVisible();
	});
});
```

Avec cela vous devriez donc avoir tout ce qu'il faut pour commencer à écrire des tests unitaires front-end même si vous travaillez sur une stack qui n'est pas forcément à la pointe du dernier framework à la mode.

L'avantage est que vos tests seront très peu couplés à votre framework et seront en grande partie réutilisable le jour où vous imaginez une migration.

C'est aussi un excellent outil à avoir à disposition car il vous permettra d'exécuter plus de tests plus rapidement qu'une suite <abbr tabIndex="-1" title="End-To-End">e2e</abbr>. Notamment sur une suite e2e on va généralement se concentrer sur des scenarios là où avec ces tests unitaires vous pourrez aller tester les cas limites et toutes les subtilités de votre composant.

Enfin, sachez que je n'ai présenté que le minimum vital pour que vous puissiez lancer vos premiers tests. Un sujet intéressant à creuser si vous êtes sur Twig serait de mocker des Extensions Twigs. En effet, dans votre application Symfony vous avez sûrement des fonctions ou des filtres globaux que vous utilisez dans vos templates. Un bon point d'entré pour démarrer serait cette documentation : [Extending Twing](https://nightlycommit.github.io/twing/advanced.html).

---

Si en attendant ça vous a plu ou que vous avez la moindre remarque, n’hésitez pas à me le faire savoir sur [Mastodon](https://piaille.fr/@julienpradet) ou [Twitter](https://twitter.com/JulienPradet). J’éclaircirai certains points avec plaisir.

L’infrastructure front-end est un domaine difficile à aborder tellement les outils sont nombreux et évoluent vite. Mais parfois un petit ajustement ou le bon outil au bon endroit peut radicalement améliorer votre expérience de développement et votre efficacité au quotidien. Si vous avez besoin d’accompagnement ou que vous souhaitez initier ces pratiques dans votre entreprise, n’hésitez pas à me contacter par mail. Nous pourrons en discuter avec plaisir.

Des bisous 😚
