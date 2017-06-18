import React from "react";
import home from "./home.md";

const Article = props =>
  <div>
    <div dangerouslySetInnerHTML={{ __html: home }} />
  </div>;

export default Article;
