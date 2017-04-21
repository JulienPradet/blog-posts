Quand vous faites une application en React, assez rapidement, vous allez avoir besoin de passer par des formulaires. Vous allez donc suivre ce que dit la documentation dans la section [*Forms*](https://facebook.github.io/react/docs/forms.html) et commencer l'implémentation. Ils appellent ça des *Controlled Components*. Ok, cool.

Une fois que vous avez fini, vous vous rendez compte que tout en bas de la doc il existe une autre façon de faire à base de *[Uncontrolled Components](https://facebook.github.io/react/docs/uncontrolled-components.html)*. *Zut&nbsp;! Encore un choix à faire&nbsp;!* Mais comment ?

## Controlled Components

### Kesako&nbsp;?

Ce qu'on appelle communément *Controlled Components* sont les composants sur lesquels vous allez choisir vous-même la valeur qui apparaît. Autrement dit, à tout moment, vous allez lui donner une `value` claire et précise.

```jsx
class ControlledInput extends React.Component {
  render () {
    return <input type="text" value="valeur de l'input" />
  }
}
```

En faisant cela, cependant, si l'utilisateur insère une nouvelle valeur dans l'input, il n'y y arrivera pas. Il aura toujours la chaîne `valeur de l'input` d'inscrite. Pour contourner ce problème, on fait en sorte que le composant React écoute les changements de l'utilisateur pour mettre à jour la valeur.

Cela va donner quelque chose qui ressemble à ça&nbsp;:

```jsx
class ControlledInput extends React.Component {
  constructor () {
    super()
    this.state = {
      value: ''
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange (event) {
    this.setState({
      value: event.target.value
    })
  }

  render () {
    return <input
      type="text"
      value="valeur de l'input"
      onChange={this.onChange}
    />
  }
}
```

Cette fois ci, votre input sera convenablement mis à jour.

> **NB&nbsp;:** Dans cet exemple, j'ai tout fait dans un seul composant. Cela dit, généralement, vous préfererez faire un composant racine `Form` qui sera responsable de stocker les valeurs, et les composants `Input` seront uniquement responsables d'appeler le `onChange` fournit par `Form`.

### Quels avantages ?

Le principal avantage est que vous *controllez* la valeur de vos composants.

Ainsi, si vous décidez de rajouter de la validation sur votre champ, vous pouvez le faire sur votre fonction de mise à jour de l'état (ici `onChange`)&nbsp;:

```jsx
onChange (event) {
  let value = event.target.value
  value = value.replace(/ +/g, ' ')
  this.setState({
    value: value
  })
}
```

Vous pourriez aussi définir une valeur initiale en changeant le state initial dans le contructeur&nbsp;:

```jsx
this.state = {
  value: this.props.defaultValue
}
```

Vous pouvez aussi ajouter un évènement externe au formulaire qui impacterait les valeurs du formulaire&nbsp;:

```jsx
onDentDeSagessesRemoved () {
  this.setState((state) => ({
    value: state.value.replace(/[^aeiouy]/gi, '')
  }))
}
```

En soit, les possibilités sont infinies et vous retrouvez derrière ce concept toute la puissance de React. En effet, l'état de votre formulaire dépendra uniquement de votre state et donc, vous n'aurez plus à vous préoccuper de la mise à jour de votre formulaire mais uniquement de votre état.

## Uncontrolled Components

### Kesako ?

Ce qu'on appelle communément *Uncontrolled Components* sont les composants sur lesquels la mise à jour de la valeur ne change pas l'état de votre composant. La valeur de l'input sera donc toujours celle envoyée par l'utilisateur.

```jsx
class UncontrolledInput extends React.Component {
  render () {
    return <input type="text" defaultValue="valeur de l'input" />
  }
}
```

> **NB&nbsp;:** A noter qu'on peut toujours lui donner une valeur initiale via la propriété `defaultValue`.

Il y a alors plusieurs manières possibles de récupérer les données entrées par l'utilisateur&nbsp;:

* Soit on ajoute une référence pour pouvoir récupérer la valeur à tout moment et manipuler l'élément directement via les méthodes du DOM
    ```jsx
    <input type="text" ref={(ref) => this.input = ref} />
    ```
* Soit on se branche sur un évènement de l'input pour déclencher une action
    ```jsx
    <input type="text" onChange={this.doSomethingWithChangeEvent} />
    ```
* Soit on écoute l'évènement de soumission du formulaire de l'input pour traiter directement les données liées à ce formulaire
    ```jsx
    class Form extends React.Component {
      constructor () {
        super()
        this.onSubmit = this.onSubmit.bind(this)
      }

      onSubmit (event) {
        event.preventDefault()
        var data = new FormData(event.target)
        console.log(Array.from(data.entries()))
      }

      render () {
        return <form onSubmit={this.onSubmit}>
          <input type="text" name="input_name" />
          <button>Submit</button>
        </form>
      }
    }
    ```

### Quels avantages ?

Le principal avantage est que vous n'avez pas besoin de *controller* la valeur de vos inputs.

Ca peut être très utile si vous avez déjà une librairie qui sait gérer des formulaires mais qui n'est pas écrite en React. Cependant, je vais plutôt vous parler d'un cas concret sans utiliser de librairie externe.

En effet, si vous ne controllez pas vous même les valeurs, ça veut aussi dire que vous pouvez plus facilement décaler l'impact du changement dans le temps. Un cas concret serait un input qui change le contenu d'une recherche asynchrone.

Par exemple, si cette recherche demande trop de ressources, vous ne voudrez pas quelle soit lancée au moindre changement. Vous voudrez plutôt minimiser le nombre de requêtes en faisant par exemple appel à un `debounce` dont le but est de n'envoyer la requête que s'il n'y en a pas eu dans les X dernières secondes. A quoi est-ce que ça peut ressembler ?

```jsx
class SearchFilters extends React.Component {
  constructor () {
    super()
    this.onChange = this.onChange.bind(this)
  }

  onChange (event) {
    event.preventDefault()

    if (this.ongoingRequest) {
      // Il y avait déjà une requête programmée.
      // On la coupe avant de lancer la nouvelle
      clearTimeout(this.ongoingRequest)
    }

    // On programme une requête dans 100ms
    this.ongoingRequest = setTimeout(() => {
      // On récupère le nom et la valeur de l'input
      const name = event.target.name
      const value = event.target.value

      // On met à jour la recherche
      this.props.setSearchFilters(name, value)

      // La requête est terminée
      this.ongoingRequest = null
    }, 500)
  }

  render () {
    return <input
      type="text"
      name="search"
      onChange={this.onChange}
    />
  }
}
```

En voyant ce bout de code, on se rend compte que la mise à jour de la recherche via `this.props.setSearchFilters` est décalée dans le temps. Si on était dans le cadre d'une valeur controllée, l'input serait donc mis à jour 500ms trop tard et du coup désagréable à l'utilisation.

## Que choisir ?

Pour moi, le choix se résume à savoir si vos inputs ont besoin d'avoir des validations/resets/transformations. Si oui, partez sur des *Controlled Components*. Si non, vous pouvez vous contenter d'*Uncontrolled Components*, ce qui sera généralement moins prise de tête.

Une petite note de fin cependant pour dire qu'il est aussi possible de cumuler les deux. En effet, il faudrait que le formulaire soit controllé, mais que l'écoute des changements se fasse au niveau du formulaire complet plutôt que de l'input. Cela permet d'avoir le meilleur des deux mondes, même si c'est un peu plus lourd à mettre en place.

Du coup, comme d'habitude, ce que vous pourrez utiliser dépendra de votre cas d'utilisation et du contexte de développement. Ca peut être fatiguant, mais s'adapter au besoin est aussi ce qu'il y a de plus intéressant dans le développement&nbsp;! :)
