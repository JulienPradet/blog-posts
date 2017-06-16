import React from "react";

const PageContent = props => (
  <main className="page-content" role="main">
    {props.isPost
      ? <article itemProp="articleBody">{props.children}</article>
      : props.children}
  </main>
);

export default PageContent;
