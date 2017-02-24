import React from 'react'
import Helmet from 'react-helmet'

export default () => (BaseComponent) => {
  return class extends React.Component {
    render () {
      return <div>
        <Helmet link={[{rel: 'stylesheet', href: '/css/prism-onedark.css'}]} />
        <BaseComponent {...this.props} />
      </div>
    }
  }
}
