import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import { withSite } from "./Site";
import PageHeader from "./PageHeader";
import PageContent from "./PageContent";
import PageFooter from "./PageFooter";
import PageList from "./PageList";
import GlobalFooter from "./GlobalFooter";
import pageCriticalCSS from "../public/css/page_critical.css";

const DefaultPage = props => (
  <div>
    <PageHeader page={props.page} url={props.path} />
    <PageContent>
      {props.children}
    </PageContent>
  </div>
);

const Post = props => (
  <div itemScope itemType="http://schema.org/Article">
    <div
      dangerouslySetInnerHTML={{
        __html: `
        <div itemscope itemtype="http://schema.org/Person" itemprop="author">
          <meta itemprop="name" content="Julien Pradet" />
        </div>
        `
      }}
    />
    <div className="home-link">
      <a href="/" title="Accueil">Accueil</a>
    </div>
    <PageHeader page={props.page} url={props.path} isPost />
    <PageContent isPost>
      {props.children}
    </PageContent>
    <hr />
    <div className="page-content">
      <PageFooter isPost />
    </div>
  </div>
);

const makeHelmet = props => (
  <Helmet>
    <title>
      {`${props.page.title || "Blog"} | ${props.site.meta.author.name}`}
    </title>
    <meta charset="utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width initial-scale=1" />
    <meta name="author" content="Julien Pradet" />
    <meta name="description" content={props.page.description} />
    <meta name="theme-color" content="#00C9C9" />
    <meta property="twitter:site" content="@JulienPradet" />
    <meta property="twitter:card" content="summary" />
    <meta property="twitter:creator" content="@JulienPradet" />
    <meta property="twitter:title" content={props.page.title} />
    <meta
      property="twitter:description"
      content={
        (props.page.twitter && props.page.twitter.description) ||
          props.page.description
      }
    />
    <meta
      property="twitter:image"
      content={
        props.page.image ||
          "https://pbs.twimg.com/profile_images/424964348461600768/aygHDGpF.png"
      }
    />
    <meta property="og:site_name" content={props.site.meta.site_name} />
    <meta property="og:type" content="page" />
    <meta property="og:title" content={props.page.title} />
    <meta
      property="og:url"
      content={`${props.site.meta.homepage}${props.path}`}
    />
    <meta
      property="og:image"
      content={
        props.page.image ||
          "https://pbs.twimg.com/profile_images/424964348461600768/aygHDGpF.png"
      }
    />
    <meta property="og:description" content={props.page.description} />
    <link rel="canonical" href={`${props.site.meta.homepage}${props.path}`} />
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
    <link rel="icon" href="/favicon.ico" type="image/x-icon" />
    <link rel="manifest" href="/manifest.json" />
    <link
      rel="alternate"
      type="application/rss+xml"
      title="Le flux RSS de Julien Pradet"
      href={`${props.site.meta.homepage}/feed.xml`}
    />
  </Helmet>
);

class Page extends React.Component {
  constructor() {
    super();
    this.state = { appendCodeCss: false };
  }

  componentDidMount() {
    this.setState({ appendCodeCss: true });
    window.scrollTo(0, 0);
  }

  render() {
    const helmet = makeHelmet(this.props);

    if (
      typeof this.props.page.isPage === "undefined" || this.props.page.isPage
    ) {
      return (
        <div className="page">
          {helmet}
          <Helmet>
            <style type="text/css">{pageCriticalCSS}</style>
            <noscript>
              {
                `
                <link rel="stylesheet" href="/css/page.css" />
                `
              }
            </noscript>
          </Helmet>
          <div>
            {this.props.page.isPost
              ? <Post
                  page={this.props.page}
                  path={this.props.path}
                  site={this.props.site}
                >
                  {this.props.children}
                </Post>
              : <DefaultPage
                  page={this.props.page}
                  path={this.props.path}
                  site={this.props.site}
                >
                  {this.props.children}
                </DefaultPage>}
            <hr />
            <div className="page-content">
              {!this.props.page.standalone &&
                <PageList length={this.props.page.isHome ? 0 : 2} />}
              {!this.props.page.isHome &&
                <Link to="/">Revenir à la page d'accueil</Link>}
            </div>
          </div>
          <GlobalFooter isPost={this.props.page.isPost} />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                var link = document.createElement('link')
                link.rel = 'stylesheet'
                link.href = '/css/page.css'
                console.log(link)
                document.body.appendChild(link)
              `
            }}
          />
        </div>
      );
    } else {
      return (
        <div className="page">
          {helmet}
          {this.props.children}
        </div>
      );
    }
  }
}

Page.propTypes = {
  site: PropTypes.shape({
    meta: PropTypes.shape({
      homepage: PropTypes.string.isRequired,
      site_name: PropTypes.string.isRequired,
      author: PropTypes.shape({
        name: PropTypes.string.isRequired
      }).isRequired
    }),
    pages: PropTypes.array.isRequired
  }),
  path: PropTypes.string.isRequired,
  page: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string,
    twitter: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string
    })
  }).isRequired,
  standalone: PropTypes.bool,
  isHome: PropTypes.bool,
  isPost: PropTypes.bool,
  children: PropTypes.node.isRequired
};

Page.defaultProps = {
  isHome: false,
  standalone: false
};

Page.defaultProps = {
  page: {}
};

export default withSite(Page);
