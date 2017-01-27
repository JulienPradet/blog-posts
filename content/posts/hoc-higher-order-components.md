---
title: HOC pour Higher Order Component
date: 2017-01-27
layout: Post
description: Plutôt que de vous parler pûrement de React, dans cet article, je vais plutôt essayer de présenter l'essence d'un HOC parce que ça peut aussi vous être utile dans d'autres domaines.
---

Cet article fait suite à la conf' que j'ai donné au ToulouseJS de Janvier 2017. [Les slides sont disponibles.](https://julienpradet.github.io/slides/hoc/#/0?_k=cs90gj) Le format article est un petit peu long. Mais vous pouvez essayer de suivre les slides et raccrocher ici quand vous êtes perdu.

Le principe des HOC (a.k.a. Higher Order Component) est un pattern qui a été popularisé par [Dan Abramov](https://twitter.com/dan_abramov) dans [son article qui propose une alternative aux Mixins en React](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.alh0a0zad).

Si vous n'avez pas vraiment fait de programmation fonctionnelle jusque là, vous pensez certainement que c'est un gros mot fait pour des hurluberlus passionnés par les maths. Après tout, le nom est inspiré des [Higher Order Functions](https://en.wikipedia.org/wiki/Higher-order_function) (a.k.a. [Fonction d'Ordre Supérieur](https://fr.wikipedia.org/wiki/Fonction_d%27ordre_sup%C3%A9rieur)), qui sont des fonctions qui ont pour paramètre des fonctions (<small>`(f, data) => result`</small>) et/ou qui renvoient des fonctions (<small>`(param) => g`</small>).

Mais le pattern HOC est une version simplifiée des HOF. Après avoir lu cet article, vous devriez avoir suffisamment de billes pour savoir comment et pourquoi utiliser ce pattern.

## Késako&nbsp;?

Tout d'abord ce qu'il est important de comprendre, c'est que derrière ce pattern se retrouve une seule formule&nbsp;: `(Base) => Enhanced`. Le HOC sera une fonction qui, à partir d'un truc de base, renvoie un truc amélioré. Le but derrière tout ça est de *rendre votre code plus* ***lisible*** en cachant la logique derrière une fonction.

> *&ndash; Ouais, bah c'est le principe d'une fonction hein&nbsp;!* &ndash; Tout à fait. :)

### Avec des tableaux, qu'est ce que ça donne&nbsp;?

Prenons l'exemple d'une fonction qui prend en entrée une liste de questions et renvoie une liste de réponses.

```js
function answerQuestions (questions) {
  return questions
    .filter((question) => isNotTroll(question))
    .filter((question) => canIAnswer(question))
    .map((question) => rephraseIfNeeded(question))
    .map((question) => computeAnswer(question))
}
```

Le type de départ est un tableau. Le type d'arrivée est un tableau. Vous pouvez donc considérer que c'est un HOA : Higher Order Array. *Ce concept, dans la vraie vie, n'existe pas.* D'ailleurs, si vous êtes un pro du fonctionnel, vous avez peut-être envie de me sauter à la gorge en ce moment même, étant donné qu'un tableau n'est, ni de près, ni de loin, une fonction. Mais je trouve qu'il représente assez bien le concept.

Si ça peut vous aider, vous pouvez même appeler ça une *Factory*. Je ne vous en voudrais pas parce que ça m'a aidé aussi. Ou *Enhancer*.

Maintenant, considérons que la personne qui va lire votre code ne connait ni `filter`, ni `map` mais qu'elle a envie de comprendre ce que fait la fonction `answerQuestions`. Vous allez donc devoir améliorer un petit peu plus la lisiblité de votre code&nbsp;:

```js
function filterQuestions (questions) {
  return questions
    .filter((question) => isNotTroll(question))
    .filter((question) => canIAnswer(question))
}

function getAnswers (questions) {
 return questions
   .map((question) => rephraseIfNeeded(question))
   .map((question) => computeAnswer(question))
}

function answerQuestions (questions) {
  var valuableQuestions = filterQuestions(questions)
  return getAnswers(valuableQuestions)
}
```

En soit, vous avez juste découpé votre fonction en deux et nommé les convenablement vos fonctions et variables. Mais, la personne qui lira ce bout de code comprendra les étapes pour construire les réponses plus facilement que si elle a besoin d'aller chercher sur MDN la définition du [`map`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/map) et du [`filter`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/filter).

Et maintenant, on en vient à l'avantage majeur des HOC : la composition. Puisque `filterQuestions` et `getAnswers` sont eux aussi des HOC, vous allez pouvoir les mettre bout à bout pour construire le HOC plus global `answerQuestions`.

```js
var answerQuestions = pipe(
  filterQuestions,
  getAnswers
)
```

Ce qui se lit&nbsp;: *`answerQuestions` est la succession des étapes `filterQuestions` et `getAnswers`*.  
<small>[`pipe` est tiré de ramda.](http://ramdajs.com/0.21.0/docs/#pipe) [L'équivalent serait `flow` en lodash.](https://lodash.com/docs#flow)</small>

Si cette étape de composition vous paraît trop complexe, ce n'est pas grave. Vous pourrez toujours y revenir plus tard quand vous serez plus à l'aise avec les fonctions de fonctions.

### Et en React&nbsp;?

C'est la même chose&nbsp;! A partir d'un `Composant`, on va retourner un `Composant` amélioré&nbsp;: `(BaseComponent) => EnhancedComponent`.

#### Loader

Prenons l'exemple d'un composant qui affiche un spinner tant qu'il est entrain de charger et le nom de l'utilisateur quand il a fini. Plutôt que de vous montrer un HOC tout fait, je vais montrer comment on en vient à en extraire un.

Voici notre composant initial&nbsp;:

```jsx
function User(props) {
  return props.loading
    ? <StylishSpinner />
    : <div>
        {props.user.name}
      </div>
}
```

Ce qui est gênant ici, c'est que la partie qui apporte réellement de la valeur (*comment est-ce que j'affiche un user*) et noyée avec la partie qui s'occupe de l'affichage du chargement. On va donc l'extraire&nbsp;:

```jsx
function DumbUser () {
  return (
    <div>
      {props.user.name}
    </div>
  )
}

function User (props) {
  return props.loading
    ? <StylishSpinner />
    : <DumbUser />
}
```

Maintenant, imaginez que ce `StylishSpinner` vous l'utilisiez pour représenter le chargement partout dans votre application. Cela veut dire que vous allez devoir réécrire cette même logique à chaque fois. Pire encore, cela veut dire que vous allez devoir refaire l'effort de comprendre votre code à chaque que vous tomberez dessus. Ici ce n'est qu'une ternaire, mais ça peut être plus lourd que ça. On va donc l'extraire lui aussi en rendant le `DumbUser` paramétrable&nbsp;:

```jsx
function withLoading (DumbUser) {
  return function (props) {
    return props.loading
      ? <StylishSpinner />
      : <DumbUser {...props} />
  }
)

var User = withLoading(DumbUser)
```

NB&nbsp;: Il est important de faire passer les propriétés qui venaient d'en haut au DumbUser, sinon on ne sera pas capable d'afficher quoique ce soit.

Et si on renomme le `DumbUser`, on se rend compte que nous avons fait un HOC&nbsp;:

```jsx
function withLoading (BaseComponent) {
  // Début du EnhancedComponent
  return function (props) {
    return props.loading
      ? <StylishSpinner />
      : <BaseComponent {...props} />
  }
  // Fin du EnhancedComponent
)
```

Cependant, nous pouvons encore l'améliorer. Admettons que vous avez un autre composant ailleurs qui utilise `props.isDone` plutôt que `props.loading` pour définir s'il est entrain de charger ou non. Cela veut dire qu'il faut aussi extraire cette partie et la mettre en paramètre&nbsp;:

```jsx
function withLoading (isLoading, BaseComponent) {
  return function (props) {
    isLoading(props)
      ? <StylishSpinner />
      : <BaseComponent {...props} />
  }
}

var User = withLoading(
  (props) => props.loading,
  DumbUser
)
```

Et paf&nbsp;! On a fait un HOC.

#### Fetcher

Maintenant, prenons un exemple un petit peu plus complexe. Le principe reste le même&nbsp;: faire en sorte d'isoler une partie de la fonctionnalité du composant en respectant la formule&nbsp;: `(BaseComponent) => EnhancedComponent`.

```jsx
// 1. Définition des paramètres
function fetchData ({
  getRequest,
  addResultToProps,
  BaseComponent
}) {
  // 2. Renvoie d'un nouveau composant
  return class extends React.Component {
    constructor () {
      super()
      this.state = {
        data: null,
        loading: true
      }
    }

    componentWillMount () {
      // 3. Personnalisation grâce aux paramètres
      getRequest(props)
        .then((res) => res.json())
        .then((data) => this.setState({
          loading: false,
          data: data
        })
    }

    render () {
      // 3. Personnalisation grâce aux paramètres
      const props = addResultToProps(
        this.props,
        this.state
      )

      return <BaseComponent {...props} />
    }
  }
}
```

1. **Définition des paramètres**  
    Le HOC est toujours une fonction. Celle-ci a plus de paramètres mais il y a toujours le BaseComponent en entrée.

2. **Renvoie d'un nouveau composant**  
    Le but est de renvoyer un composant amélioré. Tout à l'heure c'était un composant Stateless et donc ce n'était pas forcément très visible. Ici avec le mot clé `class`, c'est peut-être plus facile de voir la différence entre le `HOC` et le `EnhancedComponent`. Et qui dit composant dit qu'il est capable de faire exactement la même chose que ce qu'il aurait dû faire en dehors d'un HOC&nbsp;: constructeur, lifecycle, **render**, etc.

3. **Personnalisation grâce aux paramètres**  
    Les paramètres permettent d'extraire la véritable valeur du composant en posant les bonnes questions&nbsp;:
    * Quelle requête faut-il faire à l'API&nbsp;?
    * Quelles propriétés venant de l'API faut-il ajouter en propriété à mon `BaseComponent`&nbsp;? *Cette question sera très souvent posée dans vos HOC car chaque BaseComponent aura besoin de propriétés différentes. De plus, cela permet d'expliciter l'arrivée de nouvelles propriétés.*

    Ainsi, quand on lit les paramètres on n'a plus besoin de comprendre le fonctionnement intrinsèque du composant pour savoir ce qu'il fait.

Pour faire un composant qui va chercher dans une API l'utilisateur connecté puis qui l'affiche, cela donne donc&nbsp;:

```jsx
var LoggedUser = fetchData({
  getRequest: function (props) {
    return fetch('/api/me')
  },
  addResultToProps: function (props, result) {
    return {
      ...props,
      user: result.data
    }
  },
  BaseComponent: User
})
```

NB&nbsp;: Il est possible que vous ayez plus de mal à comprendre le fonctionnement de ce HOC. Si c'est le cas, essayez de le réécrire comme vous l'auriez écrit sans HOC afin de refaire les étapes d'extraction que j'ai explicité sur le `withLoading`.

#### Composition

Maintenant qu'on a deux HOC, on peut se dire qu'on va essayer de faire un HOC plus général qui permettra de faire directement le lien entre `LoggedUser` et `DumbUser`. En effet, pour l'instant ça ne s'enchaîne pas très bien&nbsp;:

```jsx
function DumbUser () {
  return (
    <div>
      {props.user.name}
    </div>
  )
}

var CurrentUsername = withLoading(
  function (props) { return props.loading },
  DumbUser
)

var LoggedUser = fetchData({
  getRequest: function (props) {
    return fetch('/api/me')
  },
  addResultToProps: function (props, result) {
    return {
      ...props,
      user: result.data
    }
  },
  BaseComponent: CurrentUsername
})
```

Si vous avez suivi le `pipe` de tout à l'heure, ça marchait bien parce qu'à chaque fois, en paramètre, on n'avait qu'un tableau et que le résultat n'était qu'un tableau. On va donc réécrire nos HOC pour les faire fonctionner de la même façon. C'est à dire que l'on va créer des fonctions qui génèrent des HOC qui n'ont que le `BaseComponent` en paramètre.

```jsx
// Le HOC
  var withLoading = function (isLoading, BaseComponent) {
    ...
  }
// Devient
  var withLoading = function (isLoading) {
    return function (BaseComponent) {
      ...
    }
  }

// Et donc, à l'utilisation
  const CurrentUsername = withLoading(
    function (props) { return props.loading },
    DumbUser
  )
// Devient
  var withDefaultLoading = withLoading(
    function (props) { return props.loadin }
  )
  var CurrentUsername = withDefaultLoading(
    DumbUser
  )
// Ce que vous pouvez simplifier en
  var CurrentUsername = withLoading(
    function (props) { return props.loadin }
  )(DumbUser)
```

Je peux concevoir que ces transformations ne vous parlent pas plus que ça pour l'instant, mais si vous appliquez les mêmes sur `fetchData`, vous allez pouvoir réécrire votre `LoggedUser` ainsi&nbsp;:

```jsx
const LoggedUser = compose(
  fetchData(...),
  withLoading(...)
)(Username)
```

Cela se lit&nbsp;: `LoggedUser` va mettre à disposition des données venant de l'API via `fetchData` et l'affichera via un composant qui aura une étape de chargement via `withLoading` avant d'afficher le `DumbUser`

<small>[`compose` est tiré de ramda.](http://ramdajs.com/0.21.0/docs/#compose) [L'équivalent serait `flowRight` en lodash.](https://lodash.com/docs#flowLeft) La différence par rapport au `pipe` ou `flow` est le sens de composition. Ici c'est le résultat de `withLoading` qui est passé à `fetchData` et non l'inverse.</small>

Et là, on atteint le stade *Chocapic* parce qu'on arrive à composer nos HOC et donc à bien enchaîner la lecture des étapes d'améliorations.

#### Mise en pratique au quotidien

Sauf si vous êtes vraiment très fort, si c'est la première fois que vous êtes face à un concept de ce genre, vous vous sentez sûrement un petit peu perdu. C'est normal.

Cependant, j'ai une petite astuce qui a fonctionné pour moi&nbsp;: j'ai arrêté d'utiliser le mot clé `class` dans mon code React. Pour faire cela, j'ai utilisé la librairie [Recompose](https://github.com/acdlite/recompose) qui met à disposition tout un tas de HOC bas niveaux qui vont vous permettre d'abstraire le `state` (via [withState](https://github.com/acdlite/recompose/blob/c68853e6b451973c1c3ae261d98c78104a6c0701/docs/API.md#withstate)), les `handlers` (via [withHandlers](https://github.com/acdlite/recompose/blob/c68853e6b451973c1c3ae261d98c78104a6c0701/docs/API.md#withhandlers)), [et plein d'autres trucs](https://github.com/acdlite/recompose/blob/c68853e6b451973c1c3ae261d98c78104a6c0701/docs/API.md).

Quand vous en aurez fait quelques uns, a priori, vous serez capable de faire de la composition sur n'importe quoi.

Depuis, je n'utilise presque plus `recompose` parce qu'il n'est pas nécessaire de séparer un `state` de ses `handlers`. Par contre, j'utilise toujours autant de HOC avec en plus la joie de comprendre ce que je fais. :)

## Les bonnes pratiques

Maintenant que nous connaissons les bases, voici 3 conseils en plus qui vous permettront de tirer le meilleur de ce pattern.

### Ne pas surgénéraliser les HOC

Le risque est de se dire que quelque chose dépend d'un composant et de complexifier le HOC alors que pour l'instant vous n'en avez pas besoin.

Par exemple, l'extraction du paramètre `isLoading` dans mon `withLoading` est certainement inutile.

Dans le pire des cas, si un jour vous avez besoin d'un paramètre en plus, vous pouvez tout à fait le rajouter. Il vous suffira de lui donner une valeur par défaut pour que tous ceux qui utilisaient déjà le HOC fonctionnent toujours.

### Toujours respecter la même signature

`({paramA, paramB, paramC}) => (BaseComponent) => EnhancedComponent`

1. **Séparer le `BaseComponent`** du reste des paramètres. Cela vous permettra de composer plus facilement vos HOC sans recourir à des astuces à base de `.bind`.

2. **Utiliser un seul paramètre qui est un objet d'options** plutôt qu'une liste de paramètres (cf. `fetchData`). Cela vous permettra de nommer les paramètres lors de l'utilisation du HOC. Ainsi le besoin auquel répond chaque option sera explicite et vous n'aurez pas à revenir à l'implémentation du HOC pour le comprendre.

### Découper et nommer chaque `compose`

Si vous adoptez `recompose` il y a de fortes chances que vous vous retrouviez avec des `compose` unissant beaucoup de HOC. Si c'est le cas, cela veut sûrement dire que vous améliorez votre composant pour trop de raisons à la fois. Séparer explicitement ces raisons en les nommant vous sera utile. Vous validerez ainsi votre schéma de pensée et permettrez aux autres de plus facilement le comprendre.

A propos de la nomenclature de nommage, il n'y a pas vraiment de convention établie mais, généralement, les noms des HOC sont en `camelCase`.

## Alors, vous vous y mettez&nbsp;?

Personnellement, ce pattern m'a beaucoup apporté.

Mon code est mieux découpé et lisible étant donné que chaque HOC fait une seule chose. Mon code est plus maintenable puisqu'il me suffit de changer le contenu du HOC pour corriger le bug qui les affecte tous. Et surtout, mon code s'est amélioré dans sa globalité et non uniquement en React, parce que j'ai redécouvert une façon de faire qui est utile quelque soit la techno ou l'environnement.

Par contre, il ne faut pas se leurrer&nbsp;: ce n'est pas une solution miracle. D'une part parce qu'elle est difficile à prendre en main si vous ne venez pas du monde fonctionnel. D'autre part parce que ce n'est qu'une astuce pour rendre votre code plus lisible et maintenable. Il faut bien connaître le modèle qui est utilisé en dessous (array, composant React ou autre) pour que le pattern soit réellement efficace.

Mais ça vous le coup d'essayer, non&nbsp;? :)
