import React from 'react'
import Page from '../site/Page'
import content from './home.md'
import meta from './meta'

export default class Home extends React.Component {
  render () {
    return (
      <Page page={meta} path={this.props.match.path} isHome>
        <div dangerouslySetInnerHTML={{__html: content}} />
      </Page>
    )
  }
}

Home.propTypes = {
  match: React.PropTypes.shape({
    path: React.PropTypes.string.isRequired
  }).isRequired
}
