import React from "react";
import content from "./retours.md";

const Article = props => (
  <div ref={props.markdownRef} dangerouslySetInnerHTML={{ __html: content }} />
);

export default Article;
