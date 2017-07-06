import React from "react";

export const ELEMENT_SIZE = 30;
export const FONT_SIZE = 12;

const Element = () => {
  return null;
};

Element.getLength = () => 1;

Element.getData = (props, context) => {
  const viewBox = Element.getViewBox();
  return {
    viewBox: viewBox,
    Component: ({ onMouseEnter, onMouseLeave }) =>
      <Element.Svg
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        value={props.value}
        preview={props.preview}
        color={props.color || context.color || "black"}
      />
  };
};

Element.getViewBox = () => {
  return {
    width: ELEMENT_SIZE,
    height: ELEMENT_SIZE
  };
};

Element.Svg = props => {
  const onMouseEnter =
    typeof props.onMouseEnter === "function" &&
    (() =>
      props.onMouseEnter({
        value: props.value,
        offset: {
          top: ELEMENT_SIZE,
          left: 0
        }
      }));

  const preview = typeof props.preview === "undefined"
    ? typeof props.value === "undefined"
      ? null
      : typeof props.value === "string"
        ? `${props.value.substr(0, 1)}${props.value.length > 1 ? "…" : ""}`
        : Array.isArray(props.value) ? `[…]` : `{…}`
    : props.preview;

  return (
    <g
      onMouseEnter={onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      onFocus={onMouseEnter}
      onBlur={props.onMouseLeave}
      transform={`translate(0, ${ELEMENT_SIZE / 2})`}
      tabIndex="0"
    >
      <circle
        cx={0}
        cy={0}
        r={ELEMENT_SIZE / 2 - 1}
        stroke={props.color}
        strokeWidth={1}
        fill={preview ? "white" : props.color}
      />
      <text textAnchor="middle" fontSize={FONT_SIZE} y={FONT_SIZE / 3}>
        {preview}
      </text>
    </g>
  );
};

export default Element;
