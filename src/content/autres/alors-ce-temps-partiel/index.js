import React from "react";
import content from "./content.md";

const Article = () => (
  <div>
    <div dangerouslySetInnerHTML={{ __html: content }} />
  </div>
);

export default Article;
