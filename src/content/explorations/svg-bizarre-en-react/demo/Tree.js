import React, { Children } from "react";

const Genealogie = props => {
  const rootNode = Children.only(props.children);
  const context = rootNode.type.getContext(rootNode.props);

  return (
    <svg viewBox={`0 0 ${context.width} ${context.height}`}>
      {context.element}
    </svg>
  );
};

export default Genealogie;
