import React from "react";
import Helmet from "react-helmet";
import Link from "react-router-dom/Link";
import pageCriticalCSS from "../../../public/css/page_critical.css";
import PostContainer from "./PostContainer";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostFooter from "./PostFooter";
import GlobalFooter from "../../components/GlobalFooter";
import PageList from "../../components/PageList/PageList";

const Post = props =>
  <PostContainer>
    {props.helmet}
    <Helmet>
      <style type="text/css">{pageCriticalCSS}</style>
      <noscript>
        {`
          <link rel="stylesheet" href="/css/page.css" />
        `}
      </noscript>
      <script type="text/javascript">
        {`
            requestIdleCallback(() => {
                var link = document.createElement('link')
                link.href = '/css/page.css'
                link.rel = 'stylesheet'
                document.querySelector('head').appendChild(link)
            })
        `}
      </script>
    </Helmet>
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
        <Link to="/" title="Accueil">Accueil</Link>
      </div>
      <PostHeader page={props.page} url={props.path} isPost />
      <PostContent isPost>
        {props.children}
      </PostContent>
      <hr />
      <div className="page-content">
        <PostFooter isPost />
      </div>
      <hr />
      <div className="page-content">
        <PageList length={2} />
        <Link to="/">Revenir à la page d'accueil</Link>
      </div>
    </div>
    <GlobalFooter isPost />
  </PostContainer>;

export default Post;
