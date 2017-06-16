import React from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import { withSite } from "./Site";
import PageHeader from "./PageHeader";
import PageContent from "./PageContent";
import PageFooter from "./PageFooter";
import PageList from "./PageList";
import GlobalFooter from "./GlobalFooter";

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

const makeMeta = props => [
  { charset: "utf-8" },
  { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
  {
    name: "viewport",
    content: "width=device-width, initial-scale=1"
  },
  { name: "author", content: "Julien Pradet" },
  { name: "description", content: props.page.description },
  { name: "theme-color", content: "#00C9C9" },
  { property: "twitter:site", content: "@JulienPradet" },
  { property: "twitter:card", content: "summary" },
  { property: "twitter:creator", content: "@JulienPradet" },
  { property: "twitter:title", content: props.page.title },
  {
    property: "twitter:description",
    content: (props.page.twitter && props.page.twitter.description) ||
      props.page.description
  },
  {
    property: "twitter:image",
    content: props.page.image ||
      "https://pbs.twimg.com/profile_images/424964348461600768/aygHDGpF.png"
  },
  {
    property: "og:site_name",
    content: props.site.meta.site_name
  },
  { property: "og:type", content: "page" },
  { property: "og:title", content: props.page.title },
  {
    property: "og:url",
    content: `${props.site.meta.homepage}${props.path}`
  },
  {
    property: "og:image",
    content: props.page.image ||
      "https://pbs.twimg.com/profile_images/424964348461600768/aygHDGpF.png"
  },
  { property: "og:description", content: props.page.description }
];
const makeLink = props => [
  {
    rel: "canonical",
    href: `${props.site.meta.homepage}${props.path}`
  },
  { rel: "stylesheet", href: `/css/main.css` },
  {
    rel: "shortcut icon",
    href: "/favicon.ico",
    type: "image/x-icon"
  },
  { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
  { rel: "manifest", href: "/manifest.json" },
  {
    rel: "alternate",
    type: "application/rss+xml",
    title: "Le flux RSS de Julien Pradet",
    href: `${props.site.meta.homepage}/feed.xml`
  }
];

class Page extends React.Component {
  constructor() {
    super();
    this.state = { appendCodeCss: false };
  }

  componentDidMount() {
    this.setState({ appendCodeCss: true });
  }

  render() {
    const helmet = (
      <Helmet
        title={
          `${this.props.page.title || "Blog"} | ${this.props.site.meta.author.name}`
        }
        meta={makeMeta(this.props)}
        link={makeLink(this.props)}
      />
    );

    if (
      typeof this.props.page.isPage === "undefined" || this.props.page.isPage
    ) {
      return (
        <div className="page">
          {helmet}
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
};

Page.defaultProps = {
  isHome: false,
  standalone: false
};

Page.defaultProps = {
  page: {}
};

export default withSite(Page);
