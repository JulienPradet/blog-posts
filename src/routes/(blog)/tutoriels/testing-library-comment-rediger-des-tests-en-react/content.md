L'univers du développement front-end est très fragmenté parmis tous les frameworks et approches différentes. Même si les fondamentaux restent, ça peut donner l'impression de devoir tout réapprendre à chaque fois.

Qu'en est-il au niveau des tests ? Grâce à [Testing Library](https://testing-library.com/), j'ai la sensation de pouvoir réutiliser la même approche quelque soit le framework utilisé.

En effet, la finalité de React, Vue, Svelte & co est de produire du HTML, du CSS et du JavaScript qui sera interprété par le navigateur. Ainsi, ce que nous permet Testing Library est de tester cette finalité plutôt que de tester le framework en lui même. C'est ainsi que j'ai commencé à l'utiliser dans un contexte React puis, dans mon travail actuel, j'ai pu adopter Testing Library alors que nous écrivons nos composants en Twig, Less et Vanilla JavaScript.

Dans cet article en deux parties, je vous présenterai donc :

- comment rédiger des tests en React (vous êtes ici)
- comment adapter ces tests à d'autres front-end (bientôt)

> ℹ️ Prérequis : pour pouvoir exécuter les exemples de code de ce tutoriel, il vous faudra avoir une pipeline Jest ou Vitest déjà installée.

## Exemple de Testing Library avec React

La première étape de la rédaction d'un test est de définir ce qu'on veut tester. Prenons l'exemple d'un composant Dropdown, quels tests pourrions nous écrire ?

- quand j'affiche ma dropdown, seul son bouton devrait être visible
- quand je clique sur le bouton de ma dropdown, les éléments cachés s'affichent
- quand ma dropdown est ouverte et que je clique ailleurs dans le DOM, la dropdown se ferme
- quand je focus le bouton de ma dropdown et que j'appuie sur <kbd>Enter</kbd>, les éléments cachés s'affichent
- etc.

De cette liste de descriptions, je vais passer dans un format qui me facilite l'écriture du test en lui même : **Given When Then**. En effet, pour effectuer un test il y aura toujours 3 étapes :

1. **Given** : à partir de tel état (ex: étant donné qu'une dropdown est affichée dans ma page)
2. **When** : lorsqu'il se passe tel action (ex: quand l'utilisateur clique sur le bouton)
3. **Then** : alors il devrait se passer tel chose (ex: alors les éléments cachés devraient s'afficher)

> ℹ️ Sachez que vous pouvez aussi trouver le pattern AAA (Arrange, Act, Assert). Cela correspond aux mêmes étapes avec des noms différents. Je trouve cependant que le Given When Then pousse à réfléchir du point de vue de l'utilisateur et a l'avantage d'être un format très répandu lorsque vous vous approchez du <abbr title="Behavior Driven Developpment">BDD</abbr> avec notamment la syntaxe [Gherkin](https://docs.behat.org/en/v2.5/guides/1.gherkin.html).

En construisant ainsi vos tests vous aurez une meilleure vision de ce que doit faire votre composant et ce que vous devez tester. C'est la partie la plus dure parce que ça demande de penser à un maximum de cas. Mais ce sera bénéfique pour la prochaine personne qui lira votre code, que ce soit un·e collègue ou votre moi futur. Si techniquement vous n'arrivez pas à les implémenter, ce n'est pas grave. [Skippez](https://jestjs.io/docs/api#describeskipname-fn) les s'il le faut, mais conservez une trace de votre intention.

Ok, donc une fois que j'ai ma liste de tests, comment les traduire avec du code ?

### 0. Configurer votre test runner

Premièrement vous aurez besoin d'installer Testing Library:

```sh
npm install --save-dev @testing-library/react @testing-library/jest-dom jsdom
```

De plus, avant de commencer à se lancer dans du code, il faut comprendre que pour s'abstraire des librairies, Testing Library va utiliser un faux navigateur : [jsdom](https://github.com/jsdom/jsdom). C'est une manière d'avoir accès à du DOM et exécuter du JavaScript même si nous sommes dans du node.js.

Ainsi le framework de votre choix _croira_ que vous êtes dans un navigateur et vous pourrez le tester comme si vous aviez votre Chrome, Firefox ou autre d'ouvert. A partir de ce moment là il faut donc imaginer que vous êtes dans une page web classique (avec son head, son body, etc.) mais que vous ne pouvez pas la voir.

Ca implique aussi certaines complications : les tests qui sont purement visuels sont plus difficiles à réaliser (ex : est-ce que mes bords sont toujours arrondis ? Est-ce que j'utilise toujours la bonne couleur ?). Il faudra plutôt utiliser du Visual Testing dans ces cas là.

> 🤔 Je découvre à l'occasion de la rédaction de ce tutoriel [happy-dom](https://github.com/capricorn86/happy-dom) qui se veut être une alternative plus rapide à `jsdom`. Je n'ai pas eu l'occasion de tester à ce jour mais étant donné que ce n'est qu'une ligne de configuration à changer ça vaudra le coup d'essayer.

#### Pour Jest

https://testing-library.com/docs/react-testing-library/setup#jest-28

```sh
npm install --save-dev jest-environment-jsdom
```

```diff
// jest.config.js
module.exports = {
+  testEnvironment: 'jsdom',
   // ... other options ...
}
```

#### Pour Vitest

https://vitest.dev/config/#environment

```diff
// vite.config.js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
+   environment: 'jsdom',
    // ... other options ...
  },
})
```

### 1. Structure générale du test

Commençons par organiser notre fichier. Si vous n'avez jamais eu l'occasion d'écrire de tests unitaires, voici une structure générale :

```js
// file: Dropdown.test.jsx (ce fichier vit généralement juste à côté de votre composant)

// Regroupons tous les tests du composant dans un seul
describe('Dropdown', () => {
    // Chaque cas va être décrit par un `it`.
	it('should display hidden parts when the user clicks on the button', () => {
		// GIVEN a dropdown that was just rendered
        ...

		// WHEN the user clicks
        ...

		// THEN the hidden part should be displayed
        ...
	});

    it('should ...')
});
```

Vous remarquerez que je n'ai pas mis le Given When Then directement dans le nom du test. En effet, j'apprécie la syntaxe "should xxx" qui donne souvent une description plus courte. Et qui permet d'avoir ce genre de messages quand je lis les résultats de mes tests:

<figure tabindex="0">
<img src="/images/posts/testing-library/jest-cli-results.png" alt="Screen du résultat d'une ligne de commande Jest qui montre que les tests de Dropdown.test.js passent et affiche un par un le message de chaque cas de test, le premier étant le même que celui qu'on voit dans le `it` de l'exemple de code précédent">
<figcaption>Screen de la CLI de Jest (cliquer pour afficher en taille réelle)</figcaption>
</figure>

Ca ne m'empêche pas d'être explicite en gardant le format GIVEN WHEN THEN en commentaires dans le test.

### 2. Ecriture du test

1. **GIVEN a dropdown that was just rendered**

La plupart du temps il s'agira de faire le rendu de votre composant en utilisant la syntaxe de votre framework. Le but est d'écrire le code comme vous l'auriez écrit dans votre application. Par exemple, pour notre Dropdown :

```jsx
import { render } from '@testing-library/react';
import Dropdown from './Dropdown.jsx';

it('should display hidden parts when the user clicks on the button', () => {
	// GIVEN a dropdown that was just rendered
	render(
		<Dropdown>
			<p>Hidden part of the dropdown</p>
		</Dropdown>
	);
});
```

La fonction `render` va permettre de transformer votre code _React_ pour l'ajouter dans la fameuse page invisible créée par jsdom. C'est un peu l'équivalent de [createRoot/root.render](https://react.dev/reference/react-dom/client/createRoot).

Si jamais vous avez des options particulières à passer à votre composant, c'est le bon moment. Par exemple si la dropdown peut initialement être ouverte et que je veux tester ce cas, j'aurais pu rajouter la propriété `isOpenedInitially={true}`.

2. **WHEN the user clicks**

Vient ensuite l'action : ce qui va changer votre état.

La tentation quand on veut faire une action, c'est d'utiliser les mêmes outils qu'on utilise d'habitude pour naviguer dans le DOM (`document.querySelector`, utilisation d'une `ref` en React, etc.).

L'inconvénient c'est qu'on ne va pas vraiment tester ce que ferait un humain. En ne se plaçant pas de son point de vue, on rend notre test plus fragile parce qu'on se lie à la manière dont on a codé le composant (ex: on a besoin de connaître la classe qui a été mise sur le bouton).

Testing Library permet justement d'abstraire cela et nous pousse à changer de point de vue :

```jsx
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

it('should display hidden parts when the user clicks on the button', async () => {
    ...

    // WHEN the user clicks
    const dropdownButton = await screen.findByText('Open');
    userEvent.click(dropdownButton);
});
```

> ⚠️ Si vous n'avez pas l'habitude d'utiliser `await` pensez à bien ajouter `async` en début de fonction, sinon votre code échouera.

Plutôt que de récupérer le bouton, je récupère l'élément qui a le texte "Open". Je m'assure de ce qu'il se passe quand l'utilisateur clique sur le texte "Open" et non quand l'utilisateur a cliqué sur un `button` qui a la classe `open-dropdown`.

D'ailleurs, j'aurais pu aussi écrire `dropdownButton.click()`. Le test aurait sûrement fonctionné. Mais il faut éviter parce que le `.click` sur le button est celui du DOM et il ne fait que ça : déclencher un événement de click. Or, quand un utilisateur click dans le navigateur, cela va déclencher un mouseenter, focus le button, lancer un click d'un type particulier (`isTrusted: true`), etc. En utilisant `userEvent.click()`, Testing Library va s'assurer que tout ça soit fait et donc sera beaucoup plus proche du comportement d'un vrai navigateur. Votre test est ainsi plus robuste.

A noter que pour la plupart des situations vous aurez une méthode dans `screen` ou dans `userEvent` qui répondra à votre besoin. Essayez toujours de vous placer du point de vue de l'utilisateur.

Par exemple : qu'est-ce que fait un utilisateur quand iel remplit un champ de formulaire ? Est-ce qu'iel sélectionne directement l'input ? Ou est-ce qu'iel choisit plutôt l'input en fonction du label qu'iel a lu à côté de l'input ?

```diff
-const input = document.querySelector('input[name="firstname"]');
+const input = await screen.findByLabelText('Firstname');
```

3. **THEN the hidden part should be displayed**

Vient enfin l'assertion. La manière de récupérer le DOM est la même que dans l'action de l'étape 2 : on préfère passer par `screen.findByText` ou une méthode équivalente.

Cependant, ce qu'on va vouloir vérifier ce n'est pas si l'élément est `null`. On va plutôt vérifier qu'il est `visible`.

```jsx
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom'

it('should display hidden parts when the user clicks on the button', async () => {
    ...

    // THEN the hidden part should be displayed
    const content = await screen.findByText('Hidden part of the dropdown');
    expect(content).toBeVisible();
});
```

La méthode [`toBeVisible`](https://github.com/testing-library/jest-dom#tobevisible) a été ajoutée par l'import de `@testing-library/jest-dom`. C'est ce qu'on appelle un `matcher` et ça permet de faire des assertions un peu plus complexe que celles de Jest (`toBe`, `toEqual`, `toMatchInlineSnapshot`, etc.).

En l'occurrence, ce que fait `toBeVisible` c'est :

- s'assurer que l'élément existe (`!== null`)&nbsp;;
- qu'il est bien dans la page, dans le DOM (qu'il n'a pas été retiré à un moment ou à un autre)&nbsp;;
- qu'il est visible : qu'il n'a pas du style CSS associé qui pourrait le rendre invisible (ex: `display: none`, `opacity: 0` ou qu'il n'est pas caché parce qu'un de ses parents n'est pas visible).

Cela permet ainsi de tester que, d'un point de vue _utilisateur_, c'est bien affiché. Pas forcément joliement affiché (vu que pour rappel la page est virtuelle, invisible), mais à minima qu'il n'y a rien qui le cache ou le rend inaccessible. Ainsi il pourra vérifier des questions de `visibility` ou de `display`, mais il ne pourra pas vérifier que l'élément est visible sans avoir besoin de scroll ou qu'il n'y a pas une modal qui vient le cacher.

## Soucis avec `toBeVisible`

> ❓ Je ne comprends pas, dans mon CSS j'ai `.hidden { display: none }` et j'ai bien la classe `hidden` qui est dans mon HTML quand je fais `console.log(document.body.innerHTML)`, pourtant `expect(element).not.toBeVisible()` échoue ?

Parfois ce n'est pas toujours aussi évident. Ca dépend de la manière dont votre CSS est importé dans votre page. Par exemple admettons que vous ayez ajouté un `<link rel="stylesheet" href="./style.css">` dans votre page HTML.

Jusqu'ici rien dans notre test indique que ce style existe. Il faut donc penser à l'y ajouter.

La manière la plus simple serait de faire :

```jsx
describe('Dropdown', () => {
    let style;

    // Avant chaque `it`, création d'une nouvelle balise style
    // qui va contenir le style nécessaire au style.
    beforeEach(() => {
        style = document.createElement('style');
        style.innerHTML = `.hidden {display: none;}`;
        document.body.appendChild(style)
    })

    // Après chaque `it` pour être sur de ne pas impacter les
    // autres tests, on enlève le style qu'on vient d'ajouter
    // à la page invisible.
    afterEach(() => {
        document.body.removeChild(style)
    })

    it(...)
})
```

Cependant cela vous demande de duppliquer votre code CSS. L'idéal serait donc de configurer votre test runner pour utiliser les mêmes méthodes que ce que vous faites
dans votre code applicatif.

Cela peut se faire en ajoutant des _transformers_ dans Jest. Le plus immédiat étant peut être [jest-transform-css](https://github.com/dferber90/jest-transform-css). Ainsi vous pourrez vous contenter d'importer votre fichier CSS directement dans votre test ou dans votre composant :

```jsx
import './style.css';
```

> C'est une méthode simple pour démarrer, mais selon la manière dont vous développez votre CSS, ce ne sera peut être pas suffisant. Dans le prochain article, je rentrerai plus en détail sur les _transformers_ et comment les adapter à votre besoin.

## Recapitulatif

Si on remet tout ça ensemble, voici à quoi ressemblerait notre fichier de test final :

```jsx
// Dropdown.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Dropdown from './Dropdown.jsx';
import './style.css';

describe('Dropdown', () => {
	it('should display hidden parts when the user clicks on the button', () => {
		// GIVEN a dropdown that was just rendered
        render(
            <Dropdown>
                <p>Hidden part of the dropdown</p>
            </Dropdown>
        );

		// WHEN the user clicks
        const dropdownButton = await screen.findByText('Open');
        userEvent.click(dropdownButton);

		// THEN the hidden part should be displayed
        const content = await screen.findByText('Hidden part of the dropdown');
        expect(content).toBeVisible();
	});
});
```

Ainsi, quand on regarde ce qu'on a écrit, la seule partie qui est liée à React est le `render` avec le JSX associé. Tout le reste est totalement agnostique et se place du point de vue utilisateur, s'assurant non pas que le code est bon mais que la fonctionnalité est bonne.

Mission accomplie ! Bravo d'être arrivé jusqu'ici 👏

Dans la deuxième partie nous verrons comment coder notre propre `render` adapté à nos outils. Pour cela je m'inspirerai de ce dont nous avons eu besoin au boulot : du HTML généré en Twig, du JS et du Sass/Less.

Si en attendant ça vous a plu ou que vous avez la moindre remarque, n'hésitez pas à me le faire savoir sur [Twitter](https://twitter.com/JulienPradet). J'éclaircirai certains points avec plaisir.

L'infrastructure front-end est un domaine difficile à aborder tellement les outils sont nombreux et évoluent vite. Mais parfois un petit ajustement ou le bon outil au bon endroit peut radicalement améliorer votre expérience de développement et votre efficacité au quotidien. Si vous avez besoin d'accompagnement ou que vous souhaitez initier ces pratiques dans votre entreprise, n'hésitez pas à me contacter par [mail](mailto:julien.pradet+article-blog@gmail.com). Nous pourrons en discuter avec plaisir.

A la semaine prochaine 👋
