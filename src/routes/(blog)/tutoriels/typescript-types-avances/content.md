La semaine dernière, je vous parlais des [3 règles d'or en TypeScript](/tutoriels/typescript-bonnes-pratiques/).

La troisième est certainement la plus difficile à mettre en place : préférer la dérivation de types.

Ce que j'entends par là, c'est que le système de typage va être vraiment efficace à partir du moment où vous êtes précis dans sa définition. Mais plus vous êtes précis, plus vous risquez de dupliquer les types et rendre le code inmaintenable. La solution est alors de recourir à la dérivation (= définir un type à partir d'un autre).

Mais ce n'est pas facile. Alors aujourd'hui, je vais vous présenter pas à pas quelques notions clés qui vous permettront de configurer vos types au mieux. En assimilant au fur et à mesure ces concepts, vous devriez pouvoir devenir autonome pour typer n'importe quelle partie de votre code 💪

> **Est-ce que cet article est fait pour vous ?** Il ne s'agit pas d'un article d'introduction, il vous faut donc avoir déjà utilisé TypeScript et avoir croisé la notion de généricité. Mon article de la semaine dernière peut être [une bonne première lecture pour introduire ce qu'est la généricité](/tutoriels/typescript-bonnes-pratiques/#privilegier-la-derivation-de-types). L'objectif n'est pas forcément de tout assimiler d'un coup &ndash; certains aspects mettent du temps à rentrer &ndash; mais de mettre en place les briques qui consolideront votre compréhension de TypeScript. Voyez cela un peu comme un catalogue de techniques qui pourront vous être utiles au quotidien.

---

## Notions abordées :

- [Récupération des clés d'un objet](#recuperation-des-cles-d-un-objet-en-typescript)
- [Filtrer les clés d’un objet](#filtrer-les-cles-d-un-objet-en-typescript)
- [Manipuler des `class`](#manipuler-des-class-en-typescript)
- [Manipuler des strings](#manipuler-des-strings-en-typescript)
- [Extraire un type d’un type existant grâce à `infer`](#extraire-un-type-d-un-type-existant-grace-a-infer-en-typescript)

## Récupération des clés d'un objet en TypeScript

> **Objectif:** Restreindre le type d'une variable pour pouvoir l'utiliser directement en tant que clé d'un objet.

Prenons l'exemple d'un objet constitué de plusieurs clés :

```typescript
type Config = {
	sku: string;
	name: string;
	quantity: number;
};
```

A partir de cette config, je veux pouvoir écrire la fonction `getConfig`, qui prend en deuxième paramètre une des clés de l'objet :

```typescript
function getConfig(config, key) {
	return config[key];
}
```

Sans TypeScript, `key` pourrait être n'importe quoi, y compris `"toto"` qui ne fait pas partie des config disponibles.

On va donc chercher à la contraindre pour que ce ne soit pas juste une `string` mais plutôt une union des différentes possibilités.

```typescript
// ❌ on évite de l'écrire manuellement
type ConfigKey = 'sku' | 'name' | 'quantity';
```

Pour récupérer automatiquement cette union, on utiliser le mot clé `keyof`:

```typescript
// ✅ on lui préfère keyof
type ConfigKey = keyof Config;
```

Maintenant que l'on sait récupérer le type de la clé, revenons à notre fonction : **comment faire pour correctement typer la clé et la valeur de retour ?**

Le type de la clé, c'est `keyof Config` comme on vient de le voir. Mais le type de retour ? Le premier réflexe, serait d'utiliser `Config[keyof Config]`.

<!-- prettier-ignore -->
```typescript
// ❌ ne fonctionne pas comme attendu
function getConfig(
	config: Config,
	key: keyof Config
): Config[keyof Config] {
	return config[key];
}
```

Mais ça ne va pas fonctionner parce que si on déconstruit `Config[keyof Config]`, on aurait :

`Config[keyof Config]`  
<=> `Config['sku' | 'name' | 'quantity']`  
<=> `Config['sku'] | Config['name'] | Config['quantity']`  
<=> `string | string | number`  
<=> `string | number`

Or, si je fais `getConfig(config, 'quantity')`, je m'attends à ce que la valeur de retour soit un `number` uniquement, pas une `string`.

Donc on va devoir passer par de la généricité. Pour revoir l'explication de la syntaxe, n'hésitez pas à revenir à l'[article de la semaine dernière](/tutoriels/typescript-bonnes-pratiques/#privilegier-la-derivation-de-types).

<!-- prettier-ignore -->
```typescript
function getConfig<
  Key extends keyof Config,
>(config: Config, key: Key): Config[Key] {
  return config[key];
}
```

Ainsi, le type de `Key` est **une** des valeurs disponibles dans l'union, et pas l'union entière.

Grâce à cette méthode, on a vraiment le paramètre `key` qui ne peut être qu'une clé de l'objet `config` et donc la valeur de retour sera le type de _cette_ clé uniquement. Ca nous donne un filet de sécurité, et ça nous permet d'avoir une autocomplétion aux petits oignons :

<figure tabindex="-1">
<img src="/images/posts/typescript/config-autocomplete.png" alt="Lorsqu'on écrit le code getConfig({ sku: &quot;123&quot;, name: &quot;Product&quot; }, '') dans l'IDE, l'autocomplétion du deuxième paramètre est name et sku." width="520" height="163" loading="lazy">
</figure>

> ### Exercice
>
> Dans cet exemple on a utilisé le type `Config` défini en amont. Comment feriez-vous pour que ça fonctionne pour n'importe quel objet ?
>
> **Solution :**
>
> La solution est d'ajouter un nouveau paramètre de type. C'est ce qui permettra d'adapter la config en fonction de l'objet que vous passez à la fonction.
>
> <!-- prettier-ignore -->
> ```diff
>  function getConfig<
> +  Config extends Record<string, unknown>,
>    Key extends keyof Config,
>  >(config: Config, key: Key): Config[Key] {
>    return config[key];
>  }
> ```
>
> ⚠️ Attention cependant, ça n'a du sens que si vous voulez faire une fonction qui marche avec n'importe quel type de config. S'il n'y a qu'une seule forme de config à travers toute l'application, ça n'a sûrement pas d'intérêt de la rendre générique.

## Filtrer les clés d'un objet en TypeScript

> **Objectif** : Apprendre à transformer le type d'un objet

La semaine dernière, je vous parlais du type utilitaire `Omit<T, key>`. Celui-ci permet de retirer une ou plusieurs clés de votre objet.

```typescript
type Config = {
	sku: string;
	name: string;
	quantity: number;
};

type LimitedConfig = Omit<Config, 'quantity'>;
// { sku: string, name: string }
```

Pour lui retirer plusieurs clés :

```typescript
type LimitedConfig = Omit<Config, 'quantity' | 'name'>;
// { sku: string }
```

Mais comment feriez vous si vous vouliez plutôt filtrer les clés en fonction de leur valeur ? Par exemple, je ne veux récupérer que les clés dont la valeur associée est une string ?

Commençons par dupliquer le type en disant : je crée un nouveau type `StringConfig` qui a exactement les mêmes clés que Config (`Key in keyof Config`), et pour chaque clé je lui associe la même type de valeur que Config (`Config[Key]`).

```typescript
// ❌ pas encore complet
type StringConfig = {
	[Key in keyof Config]: Config[Key];
};
```

Le problème c'est que pour l'instant je n'ai pas filtré mes valeurs. Pour ça, l'astuce est de dire à TypeScript : si `Config[Key]` est de type string, alors je l'utilise, sinon je lui associe le type [`never`](https://www.typescriptlang.org/docs/handbook/2/functions.html#never) pour dire à TypeScript qu'on n'a pas le droit d'utiliser cette clé.

<!-- prettier-ignore -->
```typescript
// ❌ pas encore complet
type StringConfig = {
	[Key in keyof Config]:
		Config[Key] extends string
			? Config[Key]
			: never;
};
```

<figure tabindex="-1">
<img src="/images/posts/typescript/quantity-never.png" alt="L'autocompletion de stringConfig.quantity montre un type never" width="685" height="110" loading="lazy">
</figure>

On a bien un type `never` sur la `quantity` plutôt qu'un `number`. Mais ce n'est pas totalement satisfaisant parce que la clé `quantity` existe toujours. C'est un peu trompeur pour la personne qui utilisera le type plus tard.

On va donc retirer toutes les clés qui retournent un type `never`. Pour ça j'ai besoin de 2 étapes :

1. Je récupère toutes les clés dont la valeur n'est **pas** never. Pour cela, je reprends le même code que plus haut à 2 différences près :

   <!-- prettier-ignore -->
   ```typescript
   type StringConfigKeys = {
   	[Key in keyof Config]:
   		Config[Key] extends string
   			? Key
   //			  ^^^ je retourne la clé plutôt que sa valeur
   			: never;
   }[keyof Config]
   //^^^^^^^^^^^^^ puis je récupère toutes les clés
   //              plutôt que l'objet { [key]: key }
   ```

   Ainsi, TypeScript va comprendre que `StringConfigKeys = 'sku' | 'name'`. L'intérêt étant que la clé `quantity` a complètement disparu.

2. Je peux ensuite reconstruire l'objet entier en ne récupérant **que** les clés définies à l'étape 1, grâce au type utilitaire [`Pick`](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys)

   ```typescript
   type StringConfig = Pick<Config, StringConfigKeys>;
   ```

Et voilà, vous avez votre nouveau type qui a été convenablement filtré 🎉

> ### Exercice
>
> Potentiellement devoir refaire cette gymnastique à chaque fois, c'est pas très pratique. Alors à la place, comment est-ce que vous coderiez les types :
>
> - `RemoveNeverValues<O>` qui prend un objet `O`, et renvoie un nouveau type où toutes les clés dont la valeur est `never` ont disparu
> - `FilterByValue<O, V>` qui prend un objet `O`, et qui ne conserve que les clés dont la valeur est du même type que `V`
>
> Ainsi, vous pourriez écrire:
>
> ```typescript
> type StringConfig = FilterByValue<Config, string>;
> ```
>
> **Solution :**
>
> ```typescript
> // Retire toutes les clés dont la valeur est `never`
> type RemoveNeverValues<T> = Pick<
> 	T,
> 	{
> 		[K in keyof T]: T[K] extends never ? never : K;
> 	}[keyof T]
> >;
>
> // Retire du type T toutes les clés qui ont pour valeur V
> type FilterByValue<T, V> = RemoveNeverValues<{
> 	[Key in keyof T]: T[Key] extends V ? T[Key] : never;
> }>;
>
> // Ce qui nous permet d'avoir enfin
> // ce type filtré fonctionnel ✅
> type StringConfig = FilterByValue<Config, string>;
> // { sku: string, name: string }
> ```

### Manipuler des `class` en TypeScript

> **Objectif :** Extraire les méthodes disponibles d'une `class`

En programmation orientée objet, il est fréquent de passer par l'utilisation d'interfaces pour décrire les méthodes attendues dans une class. Cela pourrait ressembler à ceci :

```typescript
type ClockInterface = {
	getCurrentTime(): Date;
};

class Clock implements ClockInterface {
	currentTime: Date = new Date();

	constructor(h: number, m: number) {
		// Votre implémentation
	}

	getCurrentTime() {
		return this.currentTime;
	}
}
```

<details>
<summary>Si vous vous interrogez sur l'<strong>utilisation de <code>interface</code> vs <code>type</code></strong>. N'hésitez pas à déplier cette explication pour en savoir plus.</summary>

Il existe 2 différences entre `type` et `interface` :

1. Le principal bénéfice de `interface` est qu'il est possible de faire de l'héritage via le mot clé `extends`. Cela mimique donc très bien un héritage classique en <abbr title="Programmation Orientée Objet">POO</abbr>.

   ```typescript
   interface AnimalInterface {
   	eat(): void;
   }

   interface DogInterface extends AnimalInterface {
   	bark(): string;
   }
   ```

2. L'[autre différence](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces) est que si vous déclarez la même interface plusieurs fois, alors elles vont se fusionner entre elles.

   ```typescript
   interface Window {
   	addEventListener: EventListener;
   }

   interface Window {
   	body: HTMLBodyElement;
   }

   // alors tout objet typé avec Window
   // devra avoir à la fois la méthode
   // addEventListener et un body
   ```

   A l'inverse, quand on déclare deux types avec le même nom, cela déclenchera une erreur (`Error: Duplicate identifier 'Window'.`).

   Ainsi, pour éviter de trop éparpiller ma définition de type, je préfère utiliser `type`. Ca ne m'empêche pas d'utiliser de temps en temps `interface`, mais uniquement quand je ne peux pas faire autrement (système de plugins où quelqu'un peut étendre une API existante).

</details>

**❓ Si on regarde `ClockInterface`, on constate qu'on n'a pas typé le `constructor` ? Comment faire pour aussi forcer le type du constructeur ?**

En fait, lorsqu'on code une `class`, on crée en réalité deux choses distinctes :

1. le constructeur : qui est là pour construire un objet (= la fonction qui est appelée quand on fait `new`)
2. l'instance : qui est l'objet qu'on manipule après avoir fait un `instance = new Class()`

Donc si vous voulez représenter le type du constructeur, il faut plutôt écrire :

```typescript
type ClockConstructor = new (hour: number, minute: number): Clock;
```

> 💡 Plus généralement, vous pouvez utiliser ce type générique lors que vous introduisez des variables de types :
>
> ```typescript
> export type Constructor<T> = new (...args: unknown[]) => T;
>
> // Ou bien celui-ci pour ajouter des propriétés statiques
> export type ConstructorWithStatics<T, S extends Record<string, unknown>> = Constructor<T> & S;
> ```
>
> A l'inverse, si à partir d'un constructeur vous voulez pouvoir récupérer l'instance, vous pouvez utiliser le type natif de TypeScript:
>
> ```typescript
> export type Clock = InstanceType<ClockConstructor>;
> ```

**❓ Quand est-ce que ça peut nous être utile ?**

Un exemple que vous pouvez trouver dans la nature, c'est pour des systèmes de routing. Prenons celui d'[AdonisJS](https://docs.adonisjs.com/guides/routing#router-handler) :

```typescript
router.get('users', [UsersController, 'all']);
```

Pour déclarer une URL, vous pouvez associer une URL (ici `/users`) à un handler qui appartient à un Controller (ici `UsersController::all`). Et ce Controller ressemblera à quelque chose de ce style :

```typescript
class UsersController {
	async all(ctx: HttpContext) {
		// Ca fait d'autres trucs
	}

	async store(ctx: HttpContext) {
		// Ca fait des trucs
	}
}
```

Notre but, c'est de bien typer `router.get` pour dans le deuxième paramètre on ne puisse _que_ utiliser `store` ou `all`. Il faut que ce soit impossible d'utiliser une autre chaîne de caractères. On va donc essayer de coder le type `Handler` ci-dessous.

```typescript
function post(path: string, handler: Handler): void;
```

Premièrement, un type `Handler` est un tableau qui contient deux valeurs :

1. Une class qui représente le controller
2. Une string qui spécifie quelle méthode du controller on doit appeler

```typescript
// ❌ pas encore complet
type Handler = [Constructor<unknown>, string];
```

Sauf qu'on a dit qu'on ne voulait pas juste une `string`, mais uniquement les méthodes qui appartiennent au controller. De fait, on va devoir utiliser une dérivation de type et donc utiliser de la généricité :

<!-- prettier-ignore -->
```typescript
// ❌ pas encore complet
type Handler<
    C extends Constructor<unknown>
> = [C, keyof InstanceType<C>];
```

Décortiquons ce `keyof InstanceType<C>` :

1. On sait que c'est quelque chose qu'on va devoir dériver du Constructor passé en entrée, donc c'est pour cette raison qu'on crée cette variable de type `C`
2. Cependant, je vous avais dit que le Constructor ce n'était qu'un `new`, il ne contient pas réellement les méthodes associées à la classe. C'est pour cette raison qu'on utiliser `InstanceType<C>`.
3. Mais `InstanceType<C>` retourne en fait une sorte d'objet qui a pour clés le nom des méthodes, et en valeur le type de la fonction associée. Nous, on ne veut que les clés, donc on ajoute `keyof`

> 💡 En réalité `InstanceType<C>` retournerait aussi les propriétés publiques de l'objet. Il ne contient pas _que_ les fonctions. Mais dans notre cas, notre Controller n'a que des fonctions pour l'instant.

Ainsi, j'ai bien :

```typescript
type ControllerMethodKeys = Handler<typeof UsersController>;
// [UsersController, 'store' | 'all']
```

Cela dit, ce n'est pas encore parfait. Admettons que dans mon UsersController j'ai une autre méthode, mais que sa signature n'est pas compatible parce qu'elle ne commence pas par `ctx: HttpContext` :

```typescript
class UsersController {
	async store(ctx: HttpContext) {}
	async all(ctx: HttpContext) {}

	async renderUser(user: User) {
		// Ca fait d'autres trucs
	}
}
```

> 🤫 Il faudrait sûrement que cette méthode soit privée dans cet exemple, mais faisons comme si ce n'était pas le cas.

Il ne faudrait pas que je puisse écrire `[UsersController, 'renderUser']`.

Pour y arriver, plutôt que de retourner les clés de `InstanceType<C>`, je ne retourne que les clés dont la valeur associée respecte le type `(ctx: HttpContext) => void | Promise<void>`. Je peux donc réutiliser le helper que je vous avais présenté à la fin de la section [Filtrer les clés d'un objet](#filtrer-les-cles-d-un-objet-en-typescript) : `FilterByValue`.

<!-- prettier-ignore -->
```typescript
// ✅ version finale
type Handler<C extends Constructor<unknown>> = [
	C,
	keyof FilterByValue<
        InstanceType<C>,
        (ctx: HttpContext) => void | Promise<void>
    >
];

function post<C extends Constructor<unknown>>(path: string, handler: Handler<C>): void;
```

Ce qui me permet donc d'avoir à nouveau une autocomplétion aux petits oignons 🧅

<figure tabindex="-1">
<img src="/images/posts/typescript/handler.png" alt="Lorsqu'on déclenche l'autocomplétion sur la deuxième partie du handler [UsersController, ''], on voit apparaître uniquement les options &quot;all&quot; et &quot;store&quot;" width="698" height="108" loading="lazy">
</figure>

## Manipuler des strings en TypeScript

> **Objectif :** Créer des clés dynamiques dans un objet

On a pu voir précédemment que le type `string` n'est pas identique au type `'sku' | 'name' | 'quantity'`.

Il est donc possible d'apporter beaucoup de sûreté à la gestion des strings. Et notamment, ce qui va permettre de faire ça, c'est la gestion des Template Literals en TypeScript.

En JavaScript, un template literal, c'est la syntaxe suivante :

```js
const hello = `Hello ${name}`;
```

Et bien, en TypeScript, on va pouvoir faire la même chose aux niveaux des types :

```typescript
type WithId<S extends string> = `${S}Id`;

type UserId = WithId<'user'>;
// type: "userId"
```

**❓ Comment faire alors pour ajouter des clés dynamiquement à un objet ?**

Je veux passer de cet objet :

```typescript
type Values = {
	name?: string;
	quantity?: number;
};
```

A celui-ci :

```typescript
type HasValues = {
	hasName: boolean;
	hasQuantity: boolean;
};
```

> 🤫 Je vous déconseille de réfléchir votre code de cette façon quand vous faites du TypeScript, le premier type est suffisant. Mais j'ai eu besoin de faire ce genre de code pour [Stimulus](https://stimulus.hotwired.dev/), une librairie qui était difficilement compatible avec TypeScript. Et c'est un bon cas pratique pour manipuler des Template Literals.
>
> Si vous êtes curieux de cette histoire de Stimulus, sachez que je sors un article à ce sujet semaine prochaine, alors n'hésitez pas à aller me suivre sur les réseaux sociaux \o/ ([Mastodon](https://piaille.fr/@julienpradet), [LinkedIn](https://www.linkedin.com/in/julienpradet/), [Twitter](https://twitter.com/JulienPradet) ou [flux RSS](/feed.xml))

Commençons par transformer une string `XXX` en `hasXXX` :

- on peut utiliser un Template Literal pour préfixer par `has`
- par contre, on veut que ce soit `hasName` et non `hasname`, donc on doit utiliser [`Capitalize`](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#capitalizestringtype) pour rajouter la majuscule dont on a besoin

```typescript
type HasNameKey = `has${Capitalize<'name'>}`;
// type 'hasName'
```

Maintenant, on doit faire ça pour chacune des clés de mon objet. On va donc se retrouver avec le code suivant :

```typescript
type HasValues = {
	[Key in `has${Capitalize<keyof Values>}`]: boolean;
};
```

💡 Ce qui peut vous paraître étrange, c'est le positionnement du mot clé `keyof`. Quand on fait du code classique, on a tendance à écire `for (let key of values)` et à l'intérieur seulement, on fait les transformations. Ici, ça a l'air d'être inversé : le `keyof` est à l'intérieur de toutes les transformations.

Ce qui m'a donné le déclic c'est quand j'ai compris que ces deux bouts de code sont équivalents :

```typescript
type Key = Capitalize<'name' | 'quantity'>;

type Key = Capitalize<'name'> | Capitalize<'quantity'>;
```

Donc plutôt que de chercher à construire soi même chaque cas et de mettre des `|` au milieu, on va essayer de mettre les `|` le plus _à l'intérieur_ possible pour éviter d'avoir à tout réécrire.

Et donc, comment récupérer l'union `'name' | 'quantity'` ? En mettant `keyof` :

```typescript
Capitalize<keyof Values>;
```

## Extraire un type d'un type existant grâce à `infer` en TypeScript

> **Objectif :** récupérer le type interne d'un type existant

Enfin, la dernière brique vraiment importante pour bien comprendre les systèmes de types, c'est comment extraire un type d'un autre. C'est ce qui vous permettra de bien manipuler vos types et limitera le nombre de variables de types que vous passerez à vos génériques.

Pour apprendre à faire ça, commençons par observer comment sont typées les fonctions :

```typescript
function sum(a: number, b: number): number;
```

En réalité, si on revient uniquement à la définition de son type, ça nous donnerait quelque chose de ce style :

```typescript
type Sum = (a: number, b: number) => number;
```

**❓ Comment faire pour récupérer le type de retour uniquement à partir de `Sum` ?**

Si jamais vous avez déjà parcouru la doc de TypeScript, vous aurez peut-être remarqué qu'il existe le type utilitaire [`ReturnType`](https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype). Mais admettons que nous devions la recoder cette classe utilitaire. Comment ça marcherait ?

```typescript
type ReturnType<F extends Function> = ???;
```

Une première façon serait de faire comme précédemment : on décrit un peu mieux la contrainte pour pouvoir utiliser un bout de celle-ci. Je remplace donc `Function` par :

```typescript
// ❌ ne fonctionne pas
type ReturnType<F extends (...args: unknown[]): Result> = Result;
```

Le problème c'est que la variable de type `Result` n'existe pas pour l'instant. Si on devait la rajouter, il faudrait la mettre _avant_ `F`. Sauf que nous, on a _que_ `Sum` de disponible.

La solution réside dans le mot clé `infer`. Celui-ci indique à TypeScript d'essayer de deviner le type, et de l'utiliser selon s'il a réussi ou non. Plus concrètement, ça veut dire qu'on va pouvoir faire une condition (vu qu'il faut gérer le cas où il n'a pas réussi) qui ressemble à ceci :

<!-- prettier-ignore -->
```typescript
// ✅ ça marche
type ReturnType<
    /* 1 */
    F extends (...args: never[]) => unknown
> =
    /* 2 */
	F extends (...args: never[]) => infer Result
		? Result /* 3 */
		: never /* 4 */;
```

1. On limite quand même l'utilisation de `ReturnType<F>` aux fonctions qu'on peut inférer. Sinon, je peux lui passer un objet, et il me retournera bêtement `never`, au lieu de me prévenir que le type est incompatible.
2. On utilise ensuite le mot clé `infer` pour demander à TypeScript s'il arrive à comprendre le type à l'endroit qui nous intéresse (ici en retour de fonction).
3. Si oui, alors TypeScript nous met ce type dans la variable de type `Result` qu'on a défini avec le mot clé `infer` : on l'utilise donc directement pour indiquer que c'est notre type final.
4. Si non, on retourne un autre type : très souvent `never` pour dire que ce n'est pas possible. Dans ce cas précis, on ne tombera jamais de ce côté de la condition parce qu'en `/* 1 */` on a bien ciblé le type qu'on pouvait recevoir en entrée. Mais on est quand même obligé de le renseigner.

> 💡 Vous aurez peut être constaté que j'ai écrit `...args: never[]` et non `unknown[]`. L'explication se trouve dans une [histoire de variance](https://github.com/type-challenges/type-challenges/issues/2#issuecomment-1817784406). La différence est importante, mais n'est pas vraiment important à comprendre : utilisez celui qui fonctionne 😁

C'est bien beau, mais on a juste refait du code qui existait déjà. Voyons comment on pourrait l'appliquer dans un contexte un peu différent.

Pour cela je vais reprendre l'exemple précédent :

```typescript
type Values = {
	name?: string;
	quantity?: number;
};

type HasValues = {
	[Key in `has${Capitalize<keyof Values>}`]: boolean;
};
```

J'aimerais, à partir d'une clé de `HasValues` pouvoir revenir à ma clé initiale.

```typescript
BaseValueKey<'hasName'>; // name
BaseValueKey<'hasQuantity'>; // quantity
```

**Comment est-ce qu'on pourrait typer `BaseValueKey` ?**

En utilisant les mêmes 4 étapes :

<!-- prettier-ignore -->
```typescript
type BaseValueKey<
	/* 1 */
	HasKey extends keyof HasValues
> =
	/* 2 */
	HasKey extends `has${infer Key}`
		? Uncapitalize<Key> /* 3 */
		: never /* 4 */;
```

1. On pense toujours à limiter au maximum les paramètres qu'on peut passer en entrée (ici uniquement les clés de `HasValues`)
2. On utilise le mot clé `infer` là où réside la valeur qui nous intéresse.
3. Si TypeScript a réussi à comprendre le type, on le retourne. Mais ici on a la petite subtilité qu'on l'avait mis en majuscule. Alors il faut inverser l'inverser en utilisant [`Uncapitalize<T>`](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#uncapitalizestringtype)
4. S'il n'a pas compris, on retourne le type par défaut &ndash; la plupart du temps `never`

Le mot clé `infer` peut s'utiliser dans pas mal de situations. On vient de voir notamment les arguments/retours de fonction, dans les template literals. Mais c'est aussi le cas pour les types génériques.

> ### Exercice
>
> Comment feriez-vous pour typer `ElementType<T>` qui extraire le type des éléments d'un tableau ?
>
> **Solution :**
>
> <!-- prettier-ignore -->
> ```typescript
> type ElementType<A extends Array<unknown>> =
> 	A extends Array<infer Item>
> 		? Item
> 		: never;
> ```

## Conclusion

Toutes ces techniques, mises bout à bout, vous permettront de vraiment configurer en détail votre système de typage. Gardez en tête toutefois que le but est d'arriver à une base de code qui est plus facile à gérer :

- si finalement, chaque ligne de code devient plus compliquée, et ça ne vous apporte rien de plus que vos tests automatisés, privilégiez une solution plus simple
- si au contraire, ça vous permet de bénéficier d'une meilleure sécurité et que vous êtes sur un bout de code qui est utilisé partout dans votre code base, alors ça vaut le coup d'investir un peu de temps maintenant pour vous faciliter la vie plus tard.

Je continuerai d'agrémenter le contenu de cet article dans le temps avec d'autres cas qui peuvent être utiles. Si vous en voyez d'autres, n'hésitez donc pas à [me contacter](/developpeur-web-performance/#contact).

Si vous êtes en manque d'inspiration, pas de panique : la semaine prochaine, je publierai un cas concret de comment ajouter des types sur du code JS qui n'a pas réellement été pensé pour. Notamment avec le cas d'usage de [Stimulus](https://stimulus.hotwired.dev/), un framework front particulièrement utilisé dans la communauté Ruby on Rails et Symfony (UX). N'hésitez donc pas à me suivre ([Mastodon](https://piaille.fr/@julienpradet), [LinkedIn](https://www.linkedin.com/in/julienpradet/), [Twitter](https://twitter.com/JulienPradet) ou [flux RSS](/feed.xml)) pour ne pas rater ça 😘

En attendant, voici quelques ressources qui peuvent vous être utiles pour approfondir tout ça :

- [Total TypeScript (EN) : les articles et les tips de Matt Pocock](https://www.totaltypescript.com/articles)
- [types-challenges, un repo avec plein d'exercices pour s'entraîner à la manipulation de TypeScript](https://github.com/type-challenges/type-challenges)
- [TypeType : un preprocesseur pour TypeScript](https://github.com/mistlog/typetype) (je n'ai pas encore eu le temps de creuser, mais dans certains cas vraiment compliqués, ça peut permettre de simplifier la maintenance)
