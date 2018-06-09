import React from "react";
import content from "./v2.md";

const Autres = props => (
  <div ref={props.markdownRef} dangerouslySetInnerHTML={{ __html: content }} />
);

export default Autres;
