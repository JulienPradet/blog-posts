import React from 'react'
import { Link } from 'phenomic'

const Subscription = () => {
  // Stockage des listeners
  let listeners = []

  return {
    // Possibilité de s'inscrire
    subscribe: (listener) => {
      listeners = [].concat(listeners, [listener])

      // Possibilité de se désinscrire
      return () => {
        listeners = listeners.filter((item) => item !== listener)
      }
    },
    // Possibilité de prévenir tout le monde
    notify: () => {
      listeners.forEach((listener) => listener())
    }
  }
}

const UserService = () => {
  let subscription = Subscription()
  let user = null

  // On passe par une fonction pour ne pas oublier de notifier ceux qui se sont enregistré
  const setUser = (nextUser) => {
    user = nextUser
    subscription.notify()
  }

  return {
    // Méthode de login du user. Celle-ci peut être appelée de n'importe où.
    login: (login, password) => {
      // Login ultra sécurisé
      setUser({
        name: login
      })
    },
    logout: () => {
      setUser(null)
    },
    //
    getData: () => {
      return {user: user}
    },
    // Il faut exposer la méthode pour que le Provider s'enregistre aux données du service.
    subscribe: subscription.subscribe
  }
}

const ServiceProvider = (serviceName, service) => {
  class ServiceProvider extends React.Component {
    getChildContext () {
      return {
        [serviceName]: service
      }
    }

    render () {
      return React.Children.only(this.props.children)
    }
  }

  ServiceProvider.childContextTypes = {
    [serviceName]: React.PropTypes.shape({
      subscribe: React.PropTypes.func.isRequired
    }).isRequired
  }

  ServiceProvider.propTypes = {
    children: React.PropTypes.node.isRequired
  }

  ServiceProvider.displayName = serviceName + 'ServiceProvider'

  return ServiceProvider
}

const ServiceSubscriber = (serviceName) => {
  class ServiceSubscriber extends React.Component {
    constructor (props, context) {
      super()
      this.state = {
        data: context[serviceName].getData()
      }
    }
    componentWillMount () {
      this.unsubscribe = this.context[serviceName]
        .subscribe(() => {
          this.setState({
            data: this.context[serviceName].getData()
          })
        })
    }

    componentWillUnmount () {
      this.unsubscribe()
    }

    render () {
      return this.props.children(
        this.state.data,
        this.context[serviceName]
      )
    }
  }

  ServiceSubscriber.contextTypes = {
    [serviceName]: React.PropTypes.shape({
      subscribe: React.PropTypes.func.isRequired
    }).isRequired
  }

  ServiceSubscriber.propTypes = {
    children: React.PropTypes.func.isRequired
  }

  ServiceSubscriber.displayName = serviceName + 'Subscriber'

  return ServiceSubscriber
}

const userService = UserService()
const UserProvider = ServiceProvider('user', userService)
const UserSubscriber = ServiceSubscriber('user')

const Logger = () => (
  <UserSubscriber>
    {(data, service) => (
      <button
        onClick={() => {
          data.user
            ? service.logout()
            : service.login('Julien', 'TopSecret')
        }}
      >
        {data.user ? 'Se déconnecter' : 'Se connecter'}
      </button>
    )}
  </UserSubscriber>
)

const LoggedUser = () => (
  <UserSubscriber>
    {(data, service) => (
      <div>{data.user ? data.user.name : 'Anonyme'}</div>
    )}
  </UserSubscriber>
)

const Example = () => (
  <UserProvider>
    <div>
      <div>
        <Link to='/wip/injecter-des-donnees-react/'>Revenir au sujet</Link>
      </div>
      <div>
        <Logger />
        <LoggedUser />
      </div>
    </div>
  </UserProvider>
)

export default Example
