import React from "react";
import Helmet from "react-helmet";
import homeCriticalCSS from "../../../../public/css/home_critical.css";
import Header from "../Header";
import CategoryNav from "../CategoryNav";
import PageNav from "../../../components/PageNav";
import makeHelmet from "../../../util/makeHelmet";
import { withSite } from "../../../Site";

const Home = props => {
  const helmet = makeHelmet(props);

  return (
    <div className="blog">
      {helmet}
      <Helmet>
        <style type="text/css">{homeCriticalCSS}</style>
      </Helmet>
      <div className="blog__header">
        <Header />
      </div>
      <CategoryNav />
      <div
        itemScope
        itemType="http://schema.org/Article"
        className="blog__content"
      >
        <div
          dangerouslySetInnerHTML={{
            __html: `
            <div itemscope itemtype="http://schema.org/Person" itemprop="author">
              <meta itemprop="name" content="Julien Pradet" />
            </div>
          `
          }}
        />
        {props.children}
      </div>
      <PageNav filter={props.page.filter} />
    </div>
  );
};
export default withSite(Home);
