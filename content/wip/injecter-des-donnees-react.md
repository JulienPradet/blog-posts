---
title: Injection de services en React
date: 2017-01-07
layout: Post
description: L'idée derrière React est de construire un arbre de composant et de se dire que les propriétés viennent toujours du parent. C'est lourd. Comment faire autrement ? (promis, pas de Redux, MobX, etc.)
---

L'idée derrière React est de construire un arbre de composant et de se dire que
les propriétés viennent toujours du parent.

```react
const Enfant = (props) => (
  <div>
    <p>{props.name}</p>
    <ul>
      <li><button onClick={props.action1}>Action 1</button></li>
      <li><button onClick={props.action2}>Action 2</button></li>
      <li><button onClick={props.action3}>Action 3</button></li>
    </ul>
  </div>
)

const Parent = (props) => (
  <Enfant
    name={props.name}
    action1={props.action1}
    action2={props.action2}
    action3={props.action3}
  />
)
```

Généralement, quand les gens commencent à découvrir React, la première déception
est la verbosité que cela impose&nbsp;: il faut passer les propriétés une par une. Il
est aussi fortement conseillé de réduire la taille de ses composants,
multipliant d'autant le nombre de passations à faire.

De plus, certaines données n'ont rien à voir avec l'affichage de l'application.
Il s'agit de la logique métier (a.k.a. business). A juste titre, on veut
la découpler au maximum de React pour ne pas se retrouver dans une impasse le
jour où on veut la rééutiliser ailleurs.

Quelles solutions s'offrent à nous ?

## Redux ?

Vraisemblablement c'est la première solution crédible que vous trouverez via une
recherche google.

Redux gère l'état de votre application en partant du principe que l'état courant
n'est qu'une fonction de l'état précédent et de l'action qui vient d'être émise.

C'est un très bon outil qui fonctionnera à merveille sur de grosses applications
en plus de vous apporter plein de bonnes choses pour débugger le tout. Les
concepts y sont très intéressants et peuvent vous amener doucètement vers la
programmation fonctionnelle. Diversifier son champ de compétence, c'est toujours
cool.

Par contre, si vous avez juste 3 chaînes de caractère à stocker, pas beaucoup de
temps à disposition et peu de connaissances fonctionnelles, c'est peut-être un
peu overkill.

La deuxième solution qui est de plus en plus populaire est MobX. Mais la
conclusion est la même.

Dans cet article, je vais proposer deux solutions. La première est pour
[injecter des configurations](#injection-de-configurations), la deuxième est
pour [injecter des services](#injection-de-service).

## Injection de configurations

Si vos données à stocker sont statiques et n'évoluent pas avec le temps, alors
c'est que j'appelle de l'injection de configurations.

> *Attention, ici quand je dis statique, ça ne veut pas dire qu'il faut que ce
soit une chaîne de caractère. Cela peut être un objet truffé de fonctions. Par
contre, il ne faut pas que les données renvoyées par celles-ci évoluent dans le
temps.*

Ce sera donc des configurations du type&nbsp;: Quelle est mon URL
de base ? Quelle méthode dois-je appeler si je veux envoyer des logs quelque
part ? Quel thème dois-je afficher sur mon UI ?

Pour ce cas d'usage, React met à disposition des
[contextes](https://facebook.github.io/react/docs/context.html).

C'est une feature qui est dite *expérimentale* même si elle est là depuis très
longtemps maintenant. Ils insistent et le répètent souvent. Cela veut dire qu'on n'est pas à l'abri que ça casse
dans une prochaine mise à jour. Cependant, c'est tellement utilisé par les
rédacteurs de librairies que le jour où ce sera cassé, il y aura forcément des alternatives.

### Comment l'utiliser ?

La méthode que je vais présenter ici est légèrement plus évoluée que ce qui est
expliqué dans la documentation. Si vous voulez savoir purement comment ça
fonctionne, la [documentation](https://facebook.github.io/react/docs/context.html) le fera mieux que moi. Je vais plutôt essayer de
relayer ici des bonnes pratiques que je me suis construit avec le temps.

1. **Définir un Provider** qui va irriguer le sous-arbre de son contexte

    ```jsx
    class ThemeProvider extends React.Component {
      // 1.1. Définition des données du contexte
      getChildContext () {
        return {
          theme: this.props.theme
        }
      }

      // 1.2. Rendu de l'application
      render () {
        return React.Children.only(props.children)
      }
    }

    // 1.3. Définition du type du contexte
    const themeType = {
      theme: React.PropTypes.shape({
        color: React.PropTypes.string.isRequired
      }).isRequired
    }

    ThemeProvider.propTypes = themeType

    ThemeProvider.childContextTypes = themeType
    ```

    1.1. **Définition des données du contexte via getChildContext**  
      Je conseille de récupérer les données depuis les propriétés plutôt que de
      les importer directement depuis un fichier. Cela vous permettra de tester
      plus facilement vos composants et de changer les configurations de manière
      plus explicite à la racine de votre application.

    1.2. **Rendu de l'application**  
      Il ne faut pas oublier que le Provider est un composant React. Il faut
      donc faire un rendu. Pour éviter de surcharger le DOM avec des `div`s
      inutiles, on utilise
      [React.Children.only](https://facebook.github.io/react/docs/react-api.html#react.children.only)
      qui affiche directement l'enfant passé au Provider.

    1.3. **Définition du type du contexte**  
    **Règle 1&nbsp;:** ne donner qu'un point d'entrée au contexte (ici `theme`).
    Si vous adoptez les contextes vous risquez rapidement d'avoir des conflits
    de nommage. En réduisant le nombre propriétés exposées, vous réduisez le
    risque.  
    **Règle 2&nbsp;:** réutilisez la même définition pour vos propriétés, le
    contexte du parent et le contexte des enfants. Ca vous évitera des bugs
    inutiles.


2. **Utiliser le Provider** à la racine de votre arbre

    ```jsx
    const theme = {color: #ff0000}

    ReactDOM.render(
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>,
      document.getElementById('root')
    )
    ```
    Ici je l'ai fait à la racine de l'application mais rien n'empêche de le faire au
    milieu de votre arbre. La seule contrainte est qu'il faut que ceux qui ont
    besoin du contexte soient dans la descendance du Provider.

3. **Récupérer le contexte** dans un enfant

    3.1. Sur un stateless component
    ```jsx
    const Button = (props, context) => (
      <button
        style={{color: context.theme.color}}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    )

    Button.contextTypes = themeType
    ```

    3.2. Sur un stateful component
    ```jsx
    class Button extends React.Component {
      render () {
        return (
          <button
            style={{
              color: this.context.theme.color
            }}
            onClick={this.props.onClick}
          >
            {this.props.children}
          </button>
        )
      }
    }

    Button.contextTypes = themeType
    ```

Avec ça vous êtes normalement capable de définir un contexte et de le récupérer
sans avoir trop de problèmes par la suite. Si toutefois un point n'est pas clair,
n'hésitez pas à me contacter.

### Une lib qui simplifie le travail

Petit supplément tout de même&nbsp;: si le côté expérimental des contextes vous
fait vraiment trop peur, il est toujours possible de passer par des librairies
qui se débrouilleront pour se mettre à jour le jour où il y en a besoin. Il
existe notamment [Recompose](https://github.com/acdlite/recompose) qui fait la
surcouche pour vous avec les méthodes
[`withContext`](https://github.com/acdlite/recompose/blob/c7efea4dd5de14975d7ae32cd37396eec72c087e/docs/API.md#withcontext)
et
 [`getContext`](https://github.com/acdlite/recompose/blob/c7efea4dd5de14975d7ae32cd37396eec72c087e/docs/API.md#getcontext).

## Injection de service

Mais on ne peut pas toujours se contenter de faire de l'injection de
configurations. Pif paf pouf, on vous dit d'utiliser Redux. Mais rebelotte, vous
avez juste envie de passer le nom de l'utilisateur connecté et n'avez pas le temps de rentrer dans tout un nouveau paradigme (même s'il vous veut du bien).

### Et le contexte alors ?

On ne peut pas non plus utiliser directement les contextes. En effet, ce n'est pas envisageable pour React de forcer un rendu de *toute* l'application alors que le contexte n'impacte potentiellement personne dans une branche de l'arbre de vos composants. Cela entraînerait beaucoup trop de problèmes de performance.

On peut toujours forcer un rendu dans le Provider. Mais le risque est d'avoir un composant entre le Provider et l'enfant qui fait des optimisations intelligentes avec [`shouldComponentUpdate`](https://facebook.github.io/react/docs/react-component.html#shouldcomponentupdate) (souvent le cas des libs). Lui n'est pas au courant du contexte et donc bloque le rendu du fils qui a besoin de la mise à jour du contexte. Coincé.

### Le principe de la solution

La solution se trouve plutôt dans l'état (`state`) du composant fils. En effet, fondamentalement, ce qu'on veut, c'est mettre à jour l'état du composant.

Au démarrage du composant, il va donc falloir initialiser l'écoute des changements de données. A chaque changement, on met à jour l'état du composant avec les données du service et donc React fait un nouveau rendu de l'enfant.

Mais comment savoir où écouter ? C'est une configuration qui va nous le dire en nous fournissant la méthode qui permet d'initialiser l'écoute. Et donc, on va pouvoir utiliser le pattern d'injection basé sur les contextes&nbsp;!

Si on résume les étapes nécessaire, cela donne :

1. Création du service
2. Mise à disposition du service dans tous les enfants via un Provider
3. Création d'un enfant
4. Récupération de la méthode pour écouter les changements dans l'enfant
5. Initialisation de l'écoute et récupération des données initiales
6. Changement des données qui met à jour l'état de l'enfant

Quand vous arriverez au bout de l'article essayez de revenir à cette étape là et de vérifier que vous avez bien compris où se situait chaque étape.

### Implémentation de la solution

L'exemple que l'on va implémenter et celui d'un service qui contient les informations relatives à l'utilisateur connecté.

#### Création du modèle d'écoute

Tout d'abord, on va créer un utilitaire qui permet de prévenir ceux qui s'y enregistre lorsqu'un changement s'est passé. Il faut donc pouvoir s'y enregistrer, se désinscrire, et prévenir qu'il y a de nouvelles données.

Il y aurait plusieurs solutions telles qu'un [EventEmitter](https://github.com/asyncly/EventEmitter2) ou un stream [rxjs](https://github.com/ReactiveX/RxJS). Mais pour éviter d'introduire trop de magie à la fois, on va se contenter de JS pur.

> *Je n'utilise ici ni class, ni prototype pour rendre la lecture la plus linéaire possible. Mais n'hésitez pas à l'implémenter de la façon qui vous sied le mieux&nbsp;! Après tout, le but de cette méthode est d'alléger l'effort cognitif à faire.*

```jsx
const Subscription = () => {
  // Stockage des listeners
  let listeners = []

  return {
    // Initialiser une écoute
    subscribe: (listener) => {
      listeners = [
        ...listeners,
        listener
      ]

      // Mettre fin à une écoute
      return () => {
        listeners = listeners.filter(
          (item) => item !== listener
        )
      }
    },
    // Prévenir tout le monde d'un changement
    notify: () => {
      listeners.forEach(
        (listener) => listener()
      )
    }
  }
}
```

Exemple d'utilisation&nbsp;:
```js
let subscription = Subscription()
let unsubscribe = subscription.subscribe(
  () => console.log("Updated!")
)
subscription.notify()
unsubscribe()
```

#### Création du service

Le service est aussi du javascript pur. La seule chose à retenir c'est qu'à chaque changement des données, on prend bien soin de notifier tous ceux qui écoutent le changement via la `subscription`.

```jsx
const UserService = () => {
  // Gestion des écoute via l'utilitaire d'avant.
  let subscription = Subscription()

  // Initialisation des données
  let user = null

  return {
    // Méthode de login du user
    // La méthode peut être appelée depuis
    // n'importe où.
    login: (login, password) => {
      // Login sans validation du password :D
      user = { name: login }

      // On prévient tout le monde du changement
      subscription.notify()
    },

    // Idem pour la déconnexion
    logout: () => {
      user = null
      subscription.notify()
    },

    // Exposition des données via un getter
    // Celles-ci seront mises dans l'état
    // des composants enfants
    getData: () => {
      return {user: user}
    },

    // Exposition de la méthode d'écoute
    // mais pas de la méthode de notification
    // pour que ce soit géré uniquement par le
    // service
    subscribe: subscription.subscribe
  }
}
```

Exemple d'utilisation&nbsp;:
```js
let userService = UserService()
let unsubscribe = userService.subscribe(
  () => console.log("New user ", userService.getData())
)
userService.login('Julien', 'TopSecret')
unsubscribe()
```

#### Mise à disposition du service via un Provider

Pour cette mise à disposition, on va pouvoir passer par le contexte en réutilisant exactement le pattern de l'injection de configurations.

Ce qu'on injecte est le service lui même. La différence par rapport à l'ancien pattern va se trouver dans l'enfant.

```jsx
class UserServiceProvider extends React.Component {
  getChildContext () {
    return {
      userService: this.props.userService
    }
  }

  render () {
    return React.Children.only(this.props.children)
  }
}

// Dans ce composant, `subscribe` et `getData` ne
// sont pas utiles. Ils le sont pour les enfants
// Cependant, en le remontant ici, les warnings
// React nous avertira au plus tôt.
const userServiceType = {
  userService: React.PropTypes.shape({
    subscribe: React.PropTypes.func.isRequired,
    getData: React.PropTypes.func.isRequired
  }).isRequired
}

UserServiceProvider.childContextTypes = userServiceType

UserServiceProvider.propTypes = userServiceType
```

Exemple d'utilisation&nbsp;:

```react
<UserServiceProvider userService={userService}>
  <div>
    Le contexte avec le service est accessible ici.
  </div>
</UserServiceProvider>
```

#### Création d'un subscriber

Dans le pattern précédent, étant donné qu'il suffisait de rajouter la propriété statique `contextTypes` sur le composant, il n'était pas difficile de le répéter à chaque fois. Ici, le composant étant un petit peu plus compliqué, il va falloir faire un composant intermédiaire pour ne pas se mélanger.

```jsx
class UserServiceSubscriber extends React.Component {
  constructor (props, context) {
    super()
    // On initialise le state avec les données
    // du service
    this.state = {
      data: context.userService.getData()
    }
  }

  componentWillMount () {
    // Dès que le composant est initilisé, on
    // commence l'écoute du service
    this.unsubscribe = this.context
      .userService
      .subscribe(() => {
        // A chaque changement, on met à jour
        // l'état du composant avec les nouvelles
        // données du composant
        this.setState({
          data: this.context.userService.getData()
        })
      })
  }

  componentWillUnmount () {
    // Attention, il est important de ne pas
    // oublier de se désinscrire. Si vous ne
    // le faites pas, vous créerez une fuite
    // mémoire. De plus React vous criera
    // dessus en prévenant qu'il n'est pas
    // possible d'appeler `setState` sur un
    // composant qui n'est plus sur la page.
    this.unsubscribe()
  }

  render () {
    // Pour rendre le composant réutilisable
    // l'astuce est d'utiliser le pattern
    // `Children as a Function` (cf. exemple
    // d'utilisation plus bas).
    // Cela fonctionne si le composant n'a
    // qu'un seul enfant et que celui-ci est
    // une fonction.
    //
    // On met à disposition le service lui
    // même afin de permettre des appels
    // à login/logout par exemple.
    return this.props.children(
      this.state.data,
      this.context.userService
    )
  }
}

ServiceSubscriber.contextTypes = userServiceType

ServiceSubscriber.propTypes = {
  children: React.PropTypes.func.isRequired
}
```

Exemple d'utilisation&nbsp;:

```react
<UserServiceProvider userService={userService}>
  <UserSubscriber>
    {(data, service) => (
      <div>
        Accès aux `data` et au `service` ici.
        Le rendu se fait directement ici plutôt
        que dans le composant
      </div>
    )}
  </UserSubscriber>
</UserServiceProvider>
```

#### Voilà à quoi ressemble le code final

```react
// Création du service à injecter
const userService = UserService()

// Composant permettant de se connecter/déconnecter
const Logger = () => (
  <UserSubscriber>
    {(data, service) => (
      <button
        onClick={() => {
          data.user
            ? service.logout()
            : service.login('Julien', 'xxx')
        }}
      >
        {data.user
          ? 'Se déconnecter'
          : 'Se connecter'}
      </button>
    )}
  </UserSubscriber>
)

// Composant affichant l'utilisateur connecté
const LoggedUser = () => (
  <UserSubscriber>
    {(data, service) => (
      <div>
        {data.user ? data.user.name : 'Anonyme'}
      </div>
    )}
  </UserSubscriber>
)

// Rendu global
ReactDOM.render(
  <UserProvider>
    <div>
      <Logger />
      <LoggedUser />
    </div>
  </UserProvider>,
  document.getElementById('root')
)
```

Voilà, c'est fini&nbsp;! Vous pouvez aller voir ce que ça donne sur cette [page de démo](./exemple)

Le résultat final n'est peut-être pas aussi élégant que du Redux, mais cela permet de retrouver des objets qui sont peut être plus familiers tout en extrayant la logique métier.

Quand vous aurez écrit une ou deux injections différentes, vous vous rendrez rapidement compte qu'il existe des patterns communs et qu'il est largement faisable de les généraliser. En faisant cela, finalement, vous n'aurez quasiment plus qu'à écrire la partie `UserService` et le dernier snippet de code.

C'est une méthode qui peut aussi être très pratique si vous avez besoin de faire des helpers pour des UIs. Je montrerai comment je fais ce genre de helpers dans le prochain article ou le suivant. :)

Le piège est en tout cas est de se dire que les contextes suffisent en oubliant les complications induites par les optimisations que propose React.
