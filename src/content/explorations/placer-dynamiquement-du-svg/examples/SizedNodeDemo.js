import React from "react";

const width = 80;
const height = 30;

const Node = props => (
  <g>
    <rect
      x="1"
      y="1"
      width={width - 2}
      height={height - 2}
      strokeWidth="1"
      stroke="#484848"
      fill="white"
      rx={5}
      ry={5}
    />
    <text
      x={width / 2}
      y={height / 2 + 1}
      textAnchor="middle"
      alignmentBaseline="middle"
      fill="#484848"
      fontSize={14}
    >
      {props.name}
    </text>
  </g>
);

const Tree = props => {
  const nodeElement = props.children;

  let viewBox;
  if (nodeElement.type === Node) {
    viewBox = `0 0 80 30`;
  } else {
    // Je ne connais le composant fils
    // alors je n'affiche rien
    return null;
  }

  return <svg viewBox={viewBox}>{props.children}</svg>;
};

const Demo = props => {
  return (
    <Tree>
      <Node name="Camille" />
    </Tree>
  );
};

export default Demo;
