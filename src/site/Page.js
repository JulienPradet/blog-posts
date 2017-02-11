import React from 'react'
import {Link} from 'react-router-dom'
import Helmet from 'react-helmet'
import {withSite} from './Site'
import PageHeader from './PageHeader'
import PageContent from './PageContent'
import PageFooter from './PageFooter'
import PageList from './PageList'
import GlobalFooter from './GlobalFooter'

const Page = (props) => {
  return (
    <div className='page'>
      <Helmet
        titleTemplate={`%s | ${props.site.meta.author.name}`}
        defaultTitle='Blog'
        meta={[
            {charset: 'utf-8'},
            {'http-equiv': 'X-UA-Compatible', content: 'IE=edge'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {name: 'description', content: props.page.description},
            {property: 'twitter:site', content: '@JulienPradet'},
            {property: 'twitter:card', content: 'summary'},
            {property: 'twitter:creator', content: '@JulienPradet'},
            {property: 'twitter:title', content: props.page.title},
            {property: 'twitter:description', content: (props.page.twitter && props.page.twitter.description) || props.page.description},
            {property: 'twitter:image', content: props.page.image || 'https://pbs.twimg.com/profile_images/424964348461600768/aygHDGpF.png'},
            {property: 'og:site_name', content: props.site.meta.site_name},
            {property: 'og:type', content: 'page'},
            {property: 'og:title', content: props.page.title},
            {property: 'og:url', content: `${props.site.meta.homepage}${props.path}`},
            {property: 'og:image', content: props.page.image || 'https://pbs.twimg.com/profile_images/424964348461600768/aygHDGpF.png'},
            {property: 'og:description', content: props.page.description}
        ]}
        link={[
            {rel: 'canonical', href: `${props.site.meta.homepage}${props.path}`},
            {rel: 'stylesheet', href: `/css/main.css`},
            {rel: 'stylesheet', href: `/css/prism-onedark.css`}
        ]}
      />
      <div>
        <PageHeader page={props.page} />
        <PageContent>
          {props.children}
          <hr />
          {props.page.isPost && (
            <div>
              <PageFooter />
              <hr />
            </div>
          )}
          {!props.page.standalone && (
            <PageList length={props.page.isHome ? 0 : 2} />
          )}
          {!props.page.isHome && <Link to='/'>Revenir à la page d'accueil</Link>}
        </PageContent>
      </div>
      <GlobalFooter />
    </div>
  )
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
