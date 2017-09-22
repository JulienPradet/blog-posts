import React from "react";
import content from "./content.md";

const Article = props => (
  <div>
    <div dangerouslySetInnerHTML={{ __html: content }} />
  </div>
);

export default Article;
