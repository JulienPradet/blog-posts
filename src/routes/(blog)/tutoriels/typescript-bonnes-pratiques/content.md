En ce moment je joue pas mal avec TypeScript. Notamment je suis en train de vous préparer une exploration assez chouette (j'espère 😁) sur son utilisation en tandem avec [Stimulus](https://stimulus.hotwired.dev/).

Mais avant de vous parler de ça, je me devais de faire une introduction sur comment j'utilise TypeScript au quotidien. Qu'est-ce qui pour moi fait qu'une base de code écrite en TypeScript est saine ? Quelles sont les règles à mettre en place pour que TypeScript vous soit utile plutôt que de vous rajouter une charge grandissante de travail ?

> **Est-ce que cet article est fait pour vous ?** Il ne s'agit pas d'un article d'introduction, il vous faut donc avoir déjà un peu utilisé TypeScript. Par contre, si dans votre code, vous vous sentez souvent bloqué par le compilateur ou si vous avez souvent un sentiment de défaite quand vous l'utilisez, vous y trouverez sûrement quelques infos pertinentes. 🤞

---

Pour commencer, revenons à la raison pour laquelle on utilise cet outil. Il apporte notamment deux composantes dont on a du mal à se passer une fois qu'on y a goûté :

- le **filet de sécurité** : si vous n'utilisez pas une variable ou une fonction de la bonne façon, il vous criera dessus
- l'**expérience de développement** et notamment la qualité de son autocompletion : facilitant ainsi la _découverabilité_ de votre code ou de celle des librairies que vous utilisez

Cependant, TypeScript peut vite devenir douloureux dès lors :

- qu'on pousse le compilateur à ignorer certains types, ce qui crée des trous béants dans notre filet de sécurité
- qu'on réécrit les types un peu partout, ce qui rend chaque changement et mise à jour pénible

Pour s'en prémunir, je vais vous présenter ce que je considère comme les **3 règles d'or** quand je code au quotidien :

- [définir les types uniquement lorsque nécessaire](#definir-des-types-uniquement-lorsque-necessaire) (essentiellement pour des signatures de fonction)
- [ne (presque) jamais utiliser `any` ou de `as`](#ne-jamais-utiliser-any)
- [privilégier des dérivations de types plutôt que de les réécrire](#privilegier-la-derivation-de-types)

Il existe évidemment des exceptions à ces règles, mais en les ayant en tête, vous devriez pouvoir améliorer la qualité de votre code et surtout votre <abbr tabIndex="-1" title="Developer eXperience">DX</abbr>.

## Définir des types uniquement lorsque nécessaire

```typescript
// ❌ à éviter
const values: string[] = ['mon', 'tableau'];

// ✅ préférer
const values = ['mon', 'tableau'];
```

TypeScript est muni d'un système d'inférence. Ce que ça veut dire, c'est qu'il va essayer au maximum de définir les types à partir des valeurs que vous lui donnez.

Par exemple, dans le code ci-dessus, on n'a pas besoin de lui dire que c'est un tableau de string parce qu'il va le voir directement à partir de la valeur qu'on a assigné. Profiter de cette fonctionnalité vous allégera grandement la lecture et l'écriture du code. Par exemple, quand on assigne le résultat d'une fonction à une variable :

```typescript
const value = getValue();
```

C'est le type de retour de `getValue` qui exprime le type de la variable `value`. Inutile donc de l'écrire vous même.

Il y a cependant un endroit où TypeScript ne va pas réussir à faire le travail à votre place, c'est sur les définitions de fonctions.

```js
function sum(a, b) {
	return a + b;
}
```

Ici, il ne va pas être capable de savoir que `a` et `b` doivent être des `number`. Il faut donc lui expliquer :

```typescript
function sum(a: number, b: number) {
	return a + b;
}
```

Ce sera vrai pour tous les paramètres de fonctions.

Par contre, le type de retour est facultatif. En effet, on n'a pas eu besoin d'écrire :

```typescript
function sum(a: number, b: number): number {
	return a + b;
}
```

Toutefois, c'est l'exception où j'ai tendance à ajouter un type même si l'inference peut le faire à ma place. En effet, le fait d'écrire ce type nous force à penser au fonctionnement de la fonction avant de la coder.

Ca va être particulièrement utile pour les cas limites, les cas où le type n'est pas stable. Prenons l'exemple d'une fonction `hello` : celle-ci doit retourner une string `Hello Julien` si on l'appelle avec `hello('Julien')`.

```typescript
function hello(name: string) {
	return `Hello ${name}!`;
}
```

Mais que faire si finalement `name` peut-être nullable ? Si on n'a pas anticipé le type de retour, le premier réflexe serait d'écrire :

```typescript
function hello(name: string | null) {
	// on en profite pour aussi gérer le cas d'une chaîne vide
	if (!name) {
		return null;
	}

	return `Hello ${name}!`;
}
```

Mais du coup on insère une complexité de type parce que la valeur de retour peut-être soit `null` soit `string`. Ca veut dire que partout où je vais utiliser la fonction `hello`, je vais devoir me trainer ce `null`. Et celui-ci va sûrement continuer à se répandre, nous forçant à faire des conditions `!== null` dans tous les sens.

Alors qu'en forçant le type de retour `function hello(name: string | null): string`, TypeScript nous aurait aidé à découvrir le fait que retourner `null` change la signature de la fonction et donc la complexifie.

Et donc, pour éviter ces `null`, ici, on préfère retourner une string par défaut :

```typescript
function hello(name: string | null): string {
	if (!name) {
		return 'Hello world!';
	}

	return `Hello ${name}!`;
}
```

### `as const`

Une autre situation où TypeScript ne va pas parfaitement anticiper votre besoin, c'est pour les chaines de caractères statiques.

C'est souvent le cas des constantes :

```typescript
const STATUS_LOADING = 'loading';
// type 'loading' et non string
const STATUS_COMPLETE = 'complete';
// type 'complete' et non string
const STATUS_ERROR = 'error';
// type 'error' et non string
```

La différence ici est qu'il est capable de comprendre que ce n'est pas n'importe quelle string, mais uniquement celle que vous avez écrit. Cela vient du fait que vous avez déclaré votre variable avec le mot clé `const`.

Mais si on l'avait écrit différement, TypeScript les aurait interprété comme des strings :

```typescript
const statuses = {
	loading: 'loading',
	complete: 'complete',
	error: 'error'
};
// type {
// 	loading: string,
// 	complete: string,
// 	error: string,
// }
```

Maintenant, admettons que vous voulez créer une variable qui doit avoir pour valeur uniquement l'une des string définie dans `statuses`, vous écririez le code suivant :

```typescript
type Values<T extends Record<string, unknown>> = T[keyof T];
let status: Values<typeof statuses>;
```

> 💡 **Pas de panique si ce code vous paraît chelou**, on y reviendra dans la troisième règle sur la [dérivation de types](#privilegier-la-derivation-de-types).

Mais du coup, c'est comme si on avait écrit `let status: string`. Donc si vous faites `status = "toto"`, TypeScript n'y verra pas d'inconvénient. Or on voulait uniquement une chaîne parmi les `statuses` disponibles.

Une solution très pratique dans cette situation est d'ajouter un petit `as const` à la fin de votre valeur.

```diff
 const statuses = {
 	loading: 'loading',
 	complete: 'complete',
 	error: 'error'
+} as const;
```

Grâce à ce petit changement, le type que vous manipulez est beaucoup plus précis :

```typescript
{
    readonly loading: 'loading',
    readonly complete: 'complete',
    readonly error: 'error',
}
```

Et donc, le type de la variable `status` ne sera plus une `string`, mais `'loading' | 'complete' | 'error'`, alors que vous n'avez presque pas changé votre code.

Ca va être particulièrement utile pour tout ce qui est gestion de constantes et de configurations dans votre code. N'hésitez pas à l'utiliser plutôt que d'écrire manuellement vos types.

> 💡 A noter que dans certains cas, utiliser une [`enum`](https://www.typescriptlang.org/docs/handbook/enums.html) peut être suffisant. Mais ce ne sera pas toujours pratique à utiliser et vous obligera à transformer votre code, là où `as const` est parfaitement compatible avec n'importe quel code JS.

Passons maintenant à la deuxième règle.

## Ne jamais utiliser `any`

`any` est le mode open bar de TypeScript. Si vous déclarez le type d'une variable en `any`, vous pouvez faire n'importe quoi avec. Vous essayez de faire une somme avec un nombre ? Pas de problème. Vous essayez de récupérer une de ses clés ? Bien sûr. Une clé à l'intérieur de cette clé ? Yup. Même si ça valeur réelle est `undefined` 🤷

Pour cette raison, il est de bon ton de l'éviter autant que possible. Sinon, c'est comme si vous faisiez du JS normal : pas de filet de sécurité, pas d'autocompletion.

Mais des fois, **vous ne savez vraiment pas quel type utiliser**.

Prenons l'exemple des Props en React : la valeur d'une propriété peut vraiment être tout et n'importe quoi. Un nombre, un booléen, une string, un objet, une fonction, etc.

Donc le premier réflexe est de décrire les propriétés de cette façon :

```typescript
type Props = Record<string, any>;

// ou bien comme ceci
type Props = { [key in string]: any };
```

Mais si on fait ça, alors on peut manipuler les propriétés n'importe comment :

```typescript
props.quantity + props.className; // ok
```

Alors que si on remplace `any` par `unknown`, TypeScript nous crie dessus en indiquant qu'il ne connait pas les types des trucs qu'on essaye de manipuler.

```typescript
props.quantity + props.className;
// props.quantity is of type unknown
// props.className is of type unknown
```

C'est déjà une bonne première étape : maintenant on est obligé de considérer que le format de la donnée qu'on a reçu n'est pas évident.

Une option qu'on voit souvent est d'utiliser le mot clé `as` :

```typescript
const quantity = props.quantity as number;
// quantity: number
```

Mais en faisant ça, on ne fait que dire à TypeScript : « Aie confiance » <span aria-label="comme Kaa dans le Livre de la Jungle">😵‍💫🐍</span>. C'est un open bar, mais un open bar conscient. Parfois ça peut vous permettre d'aller plus vite dans des situations où vraiment il n'y a aucune chance que ce soit faux. Mais j'ai tendance à le déconseiller parce que ça reste de l'open bar.

Une meilleure méthode est de vérifier ou de forcer avec du JS le type de nos données **avant** de les utiliser :

```typescript
// En castant la donnée
const quantity = Number(props.quantity);
// quantity: number
if (Number.isNaN(quantity)) {
	// Le type est bon, mais il faut aussi
	// penser à gérer le cas où ce n'est
	// pas un vrai nombre
}

// Ou en vérifiant son type
const quantity = props.quantity;
if (typeof quantity === 'number') {
	// ...
}
```

Ce sera parfois fastidieux et c'est dans cette situation que des librairies comme [Zod](https://zod.dev/) ou [Valibot](https://valibot.dev/) peuvent vous aider.

Mais au moins, grâce à ça, vous êtes sûr de la qualité de vos données.

> 💡 Une bonne lecture à ce sujet serait l'article de Matt Pocock : [An `unknown` can't always fix an `any`](https://www.totaltypescript.com/an-unknown-cant-always-fix-an-any)

Cela dit, la plupart du temps, vous n'êtes pas vraiment censé avoir besoin ni d'any, ni d'unknown. Notamment, le code parent a sûrement déjà fait la vérification du type sur `quantity`. A ce moment là, une meilleure solution serait sûrement d'utiliser la dérivation de type.

> ⚠️ **Il existera toujours des exceptions.** Si par exemple la donnée a été définie 2 lignes plus haut, qu'au niveau du code il y a aucun risque, mais que c'est compliqué de rajouter des types, alors oui, choisissez la méthode la plus simple. Ajoutez un commentaire pour la prochaine personne qui passera par là, des tests automatisés et passez à la suite. L'essentiel est de ne pas être dogmatique, mais d'avoir en tête les risques que cela comporte.

## Privilégier la dérivation de types

Lorsque vous travaillez avec des types scalaires (`string`, `number`, `boolean`, etc.), dans l'ensemble vous aurez peu besoin de vous répéter parce que l'inférence de TypeScript fonctionne très bien.

Par contre, dès que vous commencez à manipuler des objects, TypeScript va avoir plus de mal à deviner vos types de retour.

Prenons l'exemple d'une fonction qui veut récupérer tout un objet _sauf_ la clé `children`. Celle-ci peut être pratique pour traiter des `props` en React par exemple :

```typescript
function getAttributes(props) {
	const attributes = { ...props };
	delete attributes['children'];
	return attributes;
}

const props = {
	className: 'button',
	children: 'Envoyer'
};
// type: { className: string, children: string }

const attributes = getAttributes(props);
// { className: 'button'}
```

Si on décrit la fonction `getAttributes` de la manière la plus directe possible en TS, on écrirait :

```typescript
function getAttributes(props: Record<string, unknown>): Record<string, unknown>;
```

Après tout, ça fonctionne : en entrée on prend un objet clé/valeur, et en sortie on retourne un nouvel objet clé/valeur.

Le problème c'est que maintenant, si je veux réutiliser l'attribut `className`, TypeScript n'est pas content :

```js
attributes.className; // type `unknown`
```

Comment faire pour que TypeScript connaisse le type de `className` ? On n'a pas le droit de faire un `attributes.className as string` parce que ça voudrait dire forcer la main à TypeScript et donc rater une catégorie d'erreur. (cf. [première règle](#definir-des-types-uniquement-lorsque-necessaire))

La solution va plutôt être d'améliorer la définition de type de notre fonction. En effet, pour l'instant, on a écrit que le type de retour était un _nouveau_ record au niveau de la signature de la fonction. Mais en réalité, ça devrait être le même Record auquel on a enlevé une clé.

```typescript
function getAttributes(props: Record<string, unknown>): Record<string, unknown>;
//                            ^ ce Record est différent de ^
```

Pour expliquer ça à TypeScript on va devoir en faire un "Generic". Dans l'esprit, c'est comme si on stockait un type dans une variable :

<!-- prettier-ignore -->
```typescript
function getAttributes<
    Props extends Record<string, unknown>
>(props: Props): Props;
```

<details><summary>💡 Si vous avez plutôt l'habitude de lire <code>getAttributes&lt;T extends ...&gt;</code> et que ce <code>Props</code> vous paraît curieux, cliquez ici pour lire l'explication.</summary>

Quand vous regardez du code typé qui utilise des générics, vous trouverez souvent ces variables de type nommées avec une seule lettre: `T`, `K`, `V`, etc. Souvent il faut considérer que c'est l'initial du nom que vous voulez lui donner : **T**ype, **K**ey, **V**alue. Mais rien ne vous empêche d'utiliser des vrais mots (comme ici `Props` au lieu de `P`).

C'est une histoire d'avantages et d'inconvénients :

- utiliser une seule lettre permet de vraiment distinguer le fait qu'on est en train de manipuler un type générique
- utiliser un mot complet facilite la lecture immédiate, mais peut parfois faire doublon avec un autre type externe déjà défini

Choisissez donc la méthode qui fait le plus de sens dans votre contexte. Il n'y a pas de règle universelle si ce n'est celle qui marche dans votre équipe. :)

Revenons maintenant à nos moutons.

</details>

Dans le code ci-dessus, on a donc stocké dans la variable de type `Props` un type qui doit respecter la contrainte `Record<string, unknown>` grâce au mot clé `extends`. Le type `Props` sera donc forcément un objet clé/valeur.

Ainsi, quand TypeScript va compiler le code :

1. il va voir qu'on appelle la fonction `getAttributes` avec un paramètre `props` qui a pour type `{ className: string, children: string }`
2. de fait, il va comprendre tout seul que le type `Props = { className: string, children: string }` (c'est ce qu'on appelle de l'inférence)
3. Et donc, le type de retour de la fonction étant `Props`, il réutilisera exactement le même format d'objet : `{ className: string, children: string }`

C'est déjà une excellente première étape, mais pour l'instant `attributes` va être un objet qui a toujours la clé `children`. On va donc avoir besoin de transformer le type de retour pour retirer la clé children de l'objet initial : [`Omit<Props, 'children'>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys).

<!-- prettier-ignore -->
```typescript
function getAttributes<
    T extends Record<string, unknown>
>(props: T): Omit<T, 'children'>;
```

Donc si je lui avais passé en entrée `{ className: string, children: ReactNode }`, alors le type de retour de ma fonction getAttributes serait `{ className: string }`.

Et du coup, quand je vais manipuler le résultat de la fonction, j'aurais bel et bien le bon type :

```js
const attributes = getAttributes(props);
attributes.className; // type string
```

> 💡 Il existe pas mal de types tels que Omit qui sont déjà dans TypeScript et qui peuvent vous êtes utiles : [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html). N'hésitez donc pas à y jeter un coup d'oeil pour les avoir en tête le jour où vous en aurez besoin !

> 💡 Par ailleurs, tout comme dans n'importe quel code, **il y a souvent plusieurs méthodes** pour arriver à vos fins. Il peut donc parfois être utile de retourner le problème pour vous en sortir. La première idée qui vous vient en tête n'est pas toujours la meilleure.
>
> Par exemple, on aurait pu changer nos types de cette façon :
>
> ```typescript
> function getAttributes<
> 	Attributes extends Record<string, unknown>
> 	Props extends Attributes & {children: ReactNode}
> >(props: Props): Attributes;
> ```
>
> Plutôt que de retirer la propriété `children` avec `Omit`, j'ai précisé dès le départ que `Props` était constitué de tout un tas de clé (`Attributes`) ET de la clé `children`.
>
> De plus, je vous avais dit que vous pouviez ajouter une variable de type pour en faire un générique. Mais en réalité on peut en ajouter autant qu'on veut et les nommer comme bon nous semble. C'est pour ça qu'ici j'ai définit `Attributes` et `Props`.

### Types génériques

Pour finir, en vous parlant de dérivation de type, je vous l'ai présenté en partant directement d'une fonction. Mais sachez que **cette notion de généricité des types est aussi disponible pour un `type` seul**. Cela fonctionne presque pareil :

```typescript
type Attributes<T extends Record<string, unknown>> = Omit<T, 'children'>;
```

C'est pratique parce que ça vous permet de réutiliser le même typage à plusieurs endroits. Ainsi, j'aurais pu récrire ma fonction de cette façon :

<!-- prettier-ignore -->
```typescript
function getAttributes<
    T extends Record<string, unknown>
>(props: T): Attributes<T>;
```

Plus votre code est générique, plus vous aurez besoin d'y avoir recours. Les possibilités sont réellement infinies. Vous pouvez aller très loin dans la définition de vos types.

Cela dit, on peut aussi vite s'y perdre. C'est vraiment la partie la plus velue de TypeScript, et ça met du temps à rentrer. Mais petit à petit vous deviendrez à l'aise avec certains concepts et pourrez en découvrir d'autres.

Pour vous aider dans cette quête, je compte publier un nouvel article **"Maîtriser les types avancés en TypeScript"** dès la semaine prochaine &ndash; il est déjà écrit, il faut juste que je finisse 2-3 pétouilles.

Alors si ça vous intéresse, n'hésitez pas à me suivre sur les réseaux sociaux ([Mastodon](https://piaille.fr/@julienpradet), [LinkedIn](https://www.linkedin.com/in/julienpradet/), [Twitter](https://twitter.com/JulienPradet)) ou via mon flux [RSS](/feed.xml).

Si vous êtes trop impatients, sachez aussi qu'une excellente ressource pour continuer de vous améliorer est [Total TypeScript (EN)](https://www.totaltypescript.com/). Il va bientôt publier un bouquin, mais vous avez déjà beaucoup à apprendre juste avec la partie gratuite de son contenu, profitez-en !

## Conclusion

Nous voilà arrivé au bout, avec un peu de sueur, mais on a tenu bon.

Ce qu'on a vu c'est que TypeScript est réellement capable de disparaître une fois que vous avez bien typé vos briques fondatrices. Ca vous évitera toute une catégorie de bugs, mais aussi améliorera grandement votre expérience de développement.

Pour cette raison, cela vaut donc le coup d'investir dans des bases saines qui passent par les 3 règles :

- définir uniquement les types nécessaires
- ne jamais utiliser `any` ou `as` (sauf `as const`)
- dériver vos types plutôt que de les réécrire

Et vous, vous en auriez vu d'autres ?
