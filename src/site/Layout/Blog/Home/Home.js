import React from "react";
import Helmet from "react-helmet";
import pageCriticalCSS from "../../../../public/css/page_critical.css";
import PostContainer from "../Post/PostContainer";
import PostHeader from "../Post/PostHeader";
import PostContent from "../Post/PostContent";
import GlobalFooter from "../../../components/GlobalFooter";
import PageList from "../../../components/PageList/PageList";

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
      <PostHeader page={props.page} url={props.path} />
      <PostContent isPost>
        {props.children}
      </PostContent>
      <hr />
      <div className="page-content">
        <PageList />
      </div>
    </div>
    <GlobalFooter />
  </PostContainer>;

export default Post;
