import React, { Component, Fragment } from "react";
import Helmet from "react-helmet";
import blogCss from "./css/blog_critical.scss";
import Header from "./Header";
import CategoryNav from "./CategoryNav";
import PageNav from "../../components/PageNav";
import makeHelmet from "../../util/makeHelmet";
import toCssId from "../../util/toCssId";
import { formatDate } from "../../util/dateFormats";
import { withSite } from "../../Site";
import { PageTitleProvider } from "../../components/PageTitle";
import PageLink from "../../components/PageLink";

class BlogContent extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.path !== this.props.path) {
      document.body.scrollTop = 0;
    }
  }

  render() {
    const props = this.props;
    return (
      <div
        itemScope
        itemType="http://schema.org/Article"
        className={`blog__content ${props.page.isHome
          ? "blog__content--home"
          : ""}`}
      >
        <span
          dangerouslySetInnerHTML={{
            __html: `
            <span itemscope itemtype="http://schema.org/Person" itemprop="author">
              <meta itemprop="name" content="Julien Pradet" />
            </span>
          `
          }}
        />
        <div>
          {(!(props.page.isHome || props.page.isStandalone) ||
            props.page.filter) && (
            <div className="blog__content__title">
              <h1 {...(!props.page.isHome ? { itemProp: "headline" } : {})}>
                <PageLink
                  to={props.path}
                  {...(!props.page.isHome
                    ? { itemProp: "mainEntityOfPage" }
                    : {})}
                >
                  {props.page.title}
                </PageLink>
              </h1>
            </div>
          )}

          {props.page.date && (
            <div className="blog__content__time">
              <time
                {...(!props.page.isHome ? { itemProp: "datePublished" } : {})}
                dateTime={new Date(props.page.date).toISOString()}
              >
                {formatDate(new Date(props.page.date))}.
              </time>
            </div>
          )}

          <main className="page-content" role="main">
            {!props.page.isHome ? (
              <article itemProp="articleBody">{props.children}</article>
            ) : (
              props.children
            )}
          </main>

          {!props.page.isHome &&
            !props.page.isStandalone && (
              <Fragment>
                <hr />
                <footer className="page-footer">
                  Si vous voulez suivre mes publications, il paraît que j'ai un
                  feed <a href="/feed.xml">RSS</a> et un{" "}
                  <a href="https://twitter.com/JulienPradet">Twitter</a>
                  .
                  <br />
                  Si vous pensez à d'autres méthodes que vous voudriez que je
                  mette en place (pigeon voyageur, avion en papier, etc.),
                  n'hésitez pas à me les proposer :)
                </footer>
              </Fragment>
            )}
        </div>
      </div>
    );
  }
}

const Blog = props => {
  const helmet = makeHelmet(props);

  return (
    <PageTitleProvider>
      <div className={`blog ${toCssId(props.page.category)}`} id="top">
        <Helmet>
          <link rel="stylesheet" href={blogCss} />
        </Helmet>
        {helmet}
        <div className="blog__header">
          <Header page={props.page} />
        </div>
        <CategoryNav />
        <BlogContent page={props.page} path={props.path}>
          {props.children}
        </BlogContent>

        {props.page.isHome && <PageNav filter={props.page.filter} />}

        <div className="gotop">
          <a href="#top">Revenir en haut</a>
        </div>
      </div>
    </PageTitleProvider>
  );
};

export default withSite(Blog);
