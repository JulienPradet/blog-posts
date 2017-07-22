import React from "react";
import Helmet from "react-helmet";
import homeCriticalCSS from "./css/blog_critical.scss";
import Header from "./Header";
import CategoryNav from "./CategoryNav";
import PageNav from "../../components/PageNav";
import makeHelmet from "../../util/makeHelmet";
import toCssId from "../../util/toCssId";
import { withSite } from "../../Site";
import { PageTitleProvider } from "../../components/PageTitle";

const BlogContent = props => {
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
        {(!props.page.isHome || props.page.filter) &&
          <h1>{props.page.title}</h1>}
        {props.children}

        {!props.page.isHome && <hr />}
        {!props.page.isHome &&
          <footer className="page-footer">
            Si vous voulez suivre mes publications, il paraît que j'ai un feed
            {" "}
            <a href="/feed.xml">RSS</a>
            {" "}
            et un
            {" "}
            <a href="https://twitter.com/JulienPradet">Twitter</a>
            .
            <br />
            Si vous pensez à d'autres méthodes que vous voudriez que je mette en
            place
            (pigeon voyageur, avion en papier, etc.), n'hésitez pas à me les
            proposer :)
          </footer>}
      </div>
    </div>
  );
};

const Blog = props => {
  const helmet = makeHelmet(props);

  return (
    <PageTitleProvider>
      <div className={`blog ${toCssId(props.page.category)}`}>
        {helmet}
        <Helmet>
          <style type="text/css">{homeCriticalCSS}</style>
        </Helmet>
        <div className="blog__header">
          <Header page={props.page} />
        </div>
        <CategoryNav />
        <BlogContent page={props.page}>
          {props.children}
        </BlogContent>
        {props.page.isHome && <PageNav filter={props.page.filter} />}
      </div>
    </PageTitleProvider>
  );
};

export default withSite(Blog);
