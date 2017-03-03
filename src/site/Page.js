import React from 'react'
import {Link} from 'react-router-dom'
import Helmet from 'react-helmet'
import {withSite} from './Site'
import PageHeader from './PageHeader'
import PageContent from './PageContent'
import PageFooter from './PageFooter'
import PageList from './PageList'
import GlobalFooter from './GlobalFooter'

const DefaultPage = (props) => (
  <div>
    <PageHeader page={props.page} />
    <PageContent>
      {props.children}
    </PageContent>
  </div>
)

const Post = (props) => (
  <div itemScope itemType='http://schema.org/Article'>
    <PageHeader page={props.page} isPost />
    <PageContent isPost>
      {props.children}
    </PageContent>
    <hr />
    <div className='page-content'>
      <PageFooter isPost />
    </div>
  </div>
)

class Page extends React.Component {
  constructor () {
    super()
    this.state = {appendCodeCss: false}
  }

  componentDidMount () {
    this.setState({appendCodeCss: true})
  }

  render () {
    return (
      <div className='page'>
        <Helmet
          titleTemplate={`%s | ${this.props.site.meta.author.name}`}
          defaultTitle='Blog'
          title={this.props.page.title}
          meta={[
            {charset: 'utf-8'},
            {'http-equiv': 'X-UA-Compatible', content: 'IE=edge'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {name: 'description', content: this.props.page.description},
            {name: 'theme-color', content: '#00C9C9'},
            {property: 'twitter:site', content: '@JulienPradet'},
            {property: 'twitter:card', content: 'summary'},
            {property: 'twitter:creator', content: '@JulienPradet'},
            {property: 'twitter:title', content: this.props.page.title},
            {property: 'twitter:description', content: (this.props.page.twitter && this.props.page.twitter.description) || this.props.page.description},
            {property: 'twitter:image', content: this.props.page.image || 'https://pbs.twimg.com/profile_images/424964348461600768/aygHDGpF.png'},
            {property: 'og:site_name', content: this.props.site.meta.site_name},
            {property: 'og:type', content: 'page'},
            {property: 'og:title', content: this.props.page.title},
            {property: 'og:url', content: `${this.props.site.meta.homepage}${this.props.path}`},
            {property: 'og:image', content: this.props.page.image || 'https://pbs.twimg.com/profile_images/424964348461600768/aygHDGpF.png'},
            {property: 'og:description', content: this.props.page.description}
          ]}
          link={[
            {rel: 'canonical', href: `${this.props.site.meta.homepage}${this.props.path}`},
            {rel: 'preload', href: '/css/main.css', as: 'style'},
            {rel: 'stylesheet', href: `/css/main.css`},
            {rel: 'shortcut icon', href: '/favicon.ico', type: 'image/x-icon'},
            {rel: 'icon', href: '/favicon.ico', type: 'image/x-icon'},
            {rel: 'manifest', href: '/manifest.json'},
            {rel: 'alternate', type: 'application/rss+xml', title: 'Le flux RSS de Julien Pradet', href: `${this.props.site.meta.homepage}/feed.xml`}
          ]}
        />
        <div>
          {this.props.page.isPost
            ? (
              <Post page={this.props.page}>
                {this.props.children}
              </Post>
            )
            : (
              <DefaultPage page={this.props.page}>
                {this.props.children}
              </DefaultPage>
            )}
          <hr />
          <div className='page-content'>
            {!this.props.page.standalone && (
              <PageList length={this.props.page.isHome ? 0 : 2} />
            )}
            {!this.props.page.isHome && <Link to='/'>Revenir à la page d'accueil</Link>}
          </div>
        </div>
        <GlobalFooter />
      </div>
    )
  }
}

Page.propTypes = {
  site: React.PropTypes.shape({
    meta: React.PropTypes.shape({
      homepage: React.PropTypes.string.isRequired,
      site_name: React.PropTypes.string.isRequired,
      author: React.PropTypes.shape({
        name: React.PropTypes.string.isRequired
      }).isRequired
    }),
    pages: React.PropTypes.array.isRequired
  }),
  path: React.PropTypes.string.isRequired,
  page: React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    description: React.PropTypes.string,
    image: React.PropTypes.string,
    twitter: React.PropTypes.shape({
      title: React.PropTypes.string,
      description: React.PropTypes.string,
      image: React.PropTypes.string
    })
  }).isRequired,
  standalone: React.PropTypes.bool,
  isHome: React.PropTypes.bool,
  isPost: React.PropTypes.bool,
  children: React.PropTypes.node.isRequired
}

Page.defaultProps = {
  isHome: false,
  standalone: false
}

Page.defaultProps = {
  page: {}
}

export default withSite(Page)
