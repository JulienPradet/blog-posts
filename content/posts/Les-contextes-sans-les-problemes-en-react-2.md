---
title: Les contextes sans les problèmes en React - Partie 2
date: 2017-01-20
layout: Post
description: Nous avons vu dans le post de la semaine dernière que les contextes pouvaient poser des problèmes de mise à jour des composants. Comment peut-on les contourner ?
---

Cet article fait suite à [celui de la semaine dernière](posts/Les-contextes-sans-les-problemes-en-react/).
Dans ce dernier, nous avons vu comment éviter de noyer nos composants React avec des milliers de propriétés en tirant partie des contextes qui sont une fonctionnalité native de React. Nous nous sommes aussi préparés aux futurs *breaking changes*, étant donné que les contextes sont une fonctionnalité dite *expérimentale*.

Pour cela on a créé deux types de composants&nbsp;:
- les `Providers` qui injectent un contexte dans leur arbre de composant
- les `Subscribers` qui redonnent accès à un contexte aux enfants.

Ils nous restait cependant un dernier problèmes à régler&nbsp;: comment être sûr que les changements dans le contexte sont propagés à tous les enfants&nbsp;?

Attention tout de même&nbsp;: cette problématique n'est véritablement pertinente que lorsque les données mises à disposition par le contexte sont amenées à changer dans le temps.

L'exemple que l'on va prendre dans cet article est un service d'authentification. C'est un objet qui nous permet de savoir à tout moment le nom de l'utilisateur connecté et qui met à dispositions deux méthodes pour se connecter et se déconnecter.

## Rappel du problème

Avant d'attaquer la solution, pourquoi est-ce que certains enfants ne sont pas mis à jour&nbsp;?

Pour répondre à cette question, nous avons besoin de savoir d'où viennent les mises à jour d'un composant. En React, il n'y a que trois possibilités&nbsp;:

- Le parent du composant a fait un nouveau rendu
- Le composant a mis à jour son état (`setState`)
- Le composant a forcé sa mise à jour (`forceUpdate`)

Le contexte venant d'un [arrière-arrière-(...)-arrière-grand-parent](https://youtu.be/ZnYNmsY3n1w?t=6s) du composant, la mise à jour ne peut pas venir de lui même. La seule solution est donc que le parent du composant ait fait un nouveau rendu.

Cependant, l'idée du contexte étant que seuls ceux qui en ont besoin y ont accès, cela veut dire que le parent n'a vraisemblablement pas accès à ce contexte. Et donc, s'il n'a pas accès à ce contexte, il y a de fortes chances qu'il fasse des optimisations (via `shouldComponentUpdate`) qui prennent uniquement en compte ses propres propriétés et son propre état. Ainsi, malgré une mise à jour du `Provider`, la mise à jour du `Subscriber` peut être interrompue par ce parent.

Et le pire dans tout ça, c'est que cette situation se présentera plus souvent que vous ne le pensez&nbsp;! En effet, les librairies React complexes ont besoin d'assurer un certain niveau de service en faisant appel au `shouldComponentUpdate` (ex&nbsp;: [React Redux](https://github.com/reactjs/react-redux), [Relay](https://github.com/facebook/relay), etc.). D'ailleurs, vous même risquez de mettre en place ce dispositif dans un de vos composants à l'avenir.

## Principe de la solution

On sait donc qu'on ne peut pas espérer que le rendu vienne d'en haut. On va donc contourner le problème en se disant que ce sera l'enfant (`Subscriber`) qui sera responsable de se mettre à jour.

Ainsi, lorsqu'il y aura besoin d'une mise à jour on fera appel à `forceUpdate` dans le `Subscriber` pour reprendre la chaîne de rendu. La raison pour laquelle ici je vais privilégier `forceUpdate` plutôt que `setState` est parce que cela simplifie l'écriture du composant. Cependant, si vous cherchez à faire des optimisations, le mieux est d'utiliser le `setState` en y mettant uniquement les données dont a besoin votre composant. Cela vous permettra d'utiliser le `shouldComponentUpdate` sciemment.

Il ne reste donc plus qu'à savoir quand les données changent pour qu'on déclenche le `forceUpdate`. Or le seul qui sait quand les données ont changé est le service qu'on met à disposition dans notre contexte. Le rôle du `Subscriber` va donc être de demander gentiment d'être prévenu à chaque fois qu'une mise à jour a été faite (`subscribe`) pour pouvoir se mettre à jour au bon moment. Ainsi, à chaque changement, le service n'a plus qu'à récupérer tous ceux qui se sont enregistrés et les prévenir (`notify`). Ce pattern est appelé le [*Pattern Observer*](https://en.wikipedia.org/wiki/Observer_pattern).

Si on récapitule la liste des étapes cela va donc donner&nbsp;:

1. Mise à disposition du service via un `Provider`
2. Création d'un `Subscriber`
3. Enregistrement du `Subscriber` dans le service
4. Modification des données du service
5. Notification envoyée à tous les `Subscribers`
6. Mise à jour du `Subscriber` et du composant enfant

Une fois que vous serez venu à bout de l'implémentation, ça peut être un bon exercice que de revenir à cette liste pour être sûr que vous visualisez bien chaque étape.

## Implémentation de la solution

Nous allons donc l'implémenter en prenant comme exemple le service d'authentification dont je vous ai parlé dans l'intro. Dans l'ordre il va donc falloir faire le service qui peut notifier des changements, réutiliser le format du `Provider` de l'article de la semaine dernière, puis transformer le `Subscriber` pour qu'il incorpore la logique de mise à jour.

### Création du modèle d'écouter

Tout d'abord, on va créer un utilitaire qui permet de prévenir ceux qui s'y enregistrent lorsque la sonnette est tirée. Il faut donc pouvoir s'y enregistrer, se désinscrire, et prévenir qu'il y a de nouvelles données.

Il y aurait plusieurs solutions telles qu'un [EventEmitter](https://github.com/asyncly/EventEmitter2) ou un stream [rxjs](https://github.com/ReactiveX/RxJS). Mais pour éviter d'introduire trop de magie à la fois, on va se contenter de JS pur.

Je n'utilise ici ni class, ni prototype pour rendre la lecture la plus linéaire possible. Mais n'hésitez pas à l'implémenter de la façon qui vous sied le mieux ! Après tout, le but de cette méthode est d'alléger l'effort cognitif à fournir.

```jsx
function Subscription () {
  // Stockage des gens à prévenir en cas de
  // mise à jour
  var listeners = []

  return {
    // Initialiser une écoute
    subscribe: function subscribe (listener) {
      // On ajoute le listeners à la liste
      // des gens enregistrés
      listeners.push(listener)

      // On renvoie une méthode
      // qui met fin à une écoute
      return function unsubscribe () {
        // On enlève le listener de la liste
        // des gens enregistrés
        listeners = listeners.filter(
          function (item) {
            return item !== listener
          }
        )
      }
    },
    // Prévenir tout le monde d'un changement
    notify: function notify () {
      // On execute chaque listener qui est
      // un callback qui sera executé dans le
      // scope du Subscriber
      listeners.forEach(
        function (listener) {
          listener()
        }
      )
    }
  }
}
```

#### Exemple d'utilisation :

```jsx
var subscription = Subscription()
var unsubscribe = subscription.subscribe(
  function () { console.log("Updated!") }
)
subscription.notify()
unsubscribe()
```

### Création du service d'authentification

Le service est aussi du javascript pur. Ce qu'il est important de ne pas oublier, c'est qu'à chaque changement des données, il faut notifier tous ceux qui écoutent les changements via la `subscription`.

```jsx
function UserService () {
  // Initialisation de l'utilitaire d'écoute
  var subscription = Subscription()

  // Initialisation des données
  var user = null

  return {
    // Méthode de login du user
    // La méthode peut être appelée depuis
    // n'importe où.
    login: function login (login, password) {
      // Login sans validation du password :D
      user = { name: login }

      // On prévient tout le monde du changement
      subscription.notify()
    },

    // Idem pour la déconnexion
    logout: function logout () {
      user = null
      subscription.notify()
    },

    // Exposition de l'utilisateur connecté
    // Si c'est null, il est anonyme
    getUser: function getUser () {
      return user
    },

    // Exposition de la méthode d'écoute pour
    // que les enfants puissent l'appeler
    subscribe: subscription.subscribe
  }
}
```

#### Exemple d'utilisation :

```jsx
var userService = UserService()
var unsubscribe = userService.subscribe(
  function () {
    console.log(
      "New user ",
      userService.getUser()
    )
  }
)
userService.login('Julien', 'TopSecret')
userService.logout()
unsubscribe()
```

### Mise à disposition du service via un Provider

Maintenant que le service existe, on va le mettre à disposition via notre `Provider`.

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

// Dans ce composant, `subscribe` n'est pas utile.
// Il ne l'est que pour les `Subscribers`. Cependant,
// en le remontant ici, les warnings React nous
// avertiront au plus tôt.
const userServiceType = {
  userService: React.PropTypes.shape({
    subscribe: React.PropTypes.func.isRequired
  }).isRequired
}

UserServiceProvider.childContextTypes = userServiceType

UserServiceProvider.propTypes = userServiceType
```

#### Exemple d'utilisation :

```jsx
<UserServiceProvider userService={userService}>
  <div>
    Le contexte avec le service est accessible ici.
  </div>
</UserServiceProvider>
```

### Création d'un subscriber

Maintenant qu'on peut accéder au service, on va pouvoir s'y enregistrer. On va donc créer un `Subscriber` qui lors de la création du composant va s'enregistrer au service et sera responsable de mettre à jour l'état du composant lorsqu'il est notifié.

```jsx
class UserServiceSubscriber extends React.Component {
  componentWillMount () {
    // Dès que le composant est initialisé, on
    // commence l'écoute du service
    this.unsubscribe = this.context
      .userService
      .subscribe(
        // On oublie pas de bind le this
        // sinon le forceUpdate ne va pas
        // fonctionner
        this.forceUpdate.bind(this)
      )
  }

  componentWillUnmount () {
    // Attention, il est important de ne pas
    // oublier de se désinscrire. Si vous ne
    // le faites pas, vous créerez une fuite
    // mémoire. De plus React vous criera
    // dessus en prévenant qu'il n'est pas
    // possible d'appeler `forceUpdate` sur
    // un composant qui n'est plus sur la
    // page.
    this.unsubscribe()
  }

  render () {
    // On réutilise le pattern `Function as
    // Children` pour mettre à disposition
    // le service
    return this.props.children(
      this.context.userService
    )
  }
}

UserServiceSubscriber.contextTypes = userServiceType

UserServiceSubscriber.propTypes = {
  children: React.PropTypes.func.isRequired
}
```

#### Exemple d'utilisation :

```jsx
<UserServiceProvider userService={userService}>
  <UserServiceSubscriber>
    {function (service) {
      return (
        <div>
          Accès au `service` ici.
          Le rendu se fait directement ici plutôt
          que dans le composant
        </div>
      )
    }}
  </UserServiceSubscriber>
</UserServiceProvider>
```

### Utilisation finale

Si on omet le code pour rédiger le `service`, le `Provider` et le `Subscriber`, cela donne donc ça&nbsp;:

```jsx
// Création du service à injecter
var userService = UserService()

// Composant permettant de se connecter/déconnecter
function Logger () {
  return (
    <UserServiceSubscriber>
      {function (service) {
        return (
          <button
            onClick={function () {
              service.getUser()
                ? service.logout()
                : service.login('Julien', 'xxx')
            }}
          >
            {service.getUser()
              ? 'Se déconnecter'
              : 'Se connecter'}
          </button>
        )
      }}
    </UserServiceSubscriber>
  )
}

// Composant affichant l'utilisateur connecté
function LoggedUser () {
  return (
    <UserServiceSubscriber>
      {function (service) {
        return (
          <div>
            {service.getUser() ? service.getUser().name : 'Anonyme'}
          </div>
        )
      }}
    </UserServiceSubscriber>
  )
}

// Rendu global
ReactDOM.render(
  <UserServiceProvider userService={userService}>
    <div>
      <Logger />
      <LoggedUser />
    </div>
  </UserServiceProvider>,
  document.getElementById('root')
)
```

## C'est tout&nbsp;!

[Demo time&nbsp;!](http://jsfiddle.net/pz62orpv/2/)

Le résultat final n'est peut-être pas aussi élégant que du Redux, mais cela permet de retrouver des objets qui sont peut être plus familiers tout en extrayant la logique métier.

Quand vous aurez écrit tout ça pour un ou deux autres services, vous vous rendrez compte que vous pouvez généraliser la création des `Providers` et `Subscribers`. En faisant cela, finalement, vous n'aurez quasiment plus qu'à écrire le service pour pouvoir l'utiliser dans votre code.

C'est une méthode qui peut aussi être très pratique si vous avez besoin de faire des helpers pour des UIs. Ce sera d'ailleurs peut être le sujet d'un autre article. :)

Le piège est en tout cas est de se dire que les contextes suffisent en oubliant les complications induites par les optimisations que propose React.

Si vous pensez que l'idée est stupide, géniale ou si certains points ne sont pas clairs, n'hésitez pas à m'en faire part. Je serai ravi d'échanger avec vous :)

-----

Sources complémentaires :

* [React Context](https://facebook.github.io/react/docs/context.html)
* [How to safely use React context](https://medium.com/@mweststrate/how-to-safely-use-react-context-b7e343eff076#.hae0gg9tk)
* [React Broadcast](https://github.com/ReactTraining/react-broadcast)
* [Function as Children](https://github.com/ReactTraining/react-broadcast)
