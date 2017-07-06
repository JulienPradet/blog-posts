import React from "react";
import Line from "./Line";
import Element, { ELEMENT_SIZE, FONT_SIZE } from "./Element";

const PADDING = 10;

const ObservableElement = () => {
  return null;
};

ObservableElement.getLength = props => {
  return 1 + Line.getLength(props);
};

ObservableElement.getData = (props, parentContext) => {
  const line = Line.getData(
    {
      children: props.children,
      length: parentContext.length,
      color: props.color || parentContext.color || "#AAA",
      hideStart: true
    },
    { width: parentContext.viewBox.width - parentContext.offset.left }
  );

  const LineComponent = line.Component;

  return {
    viewBox: {
      width: line.viewBox.width,
      height: line.viewBox.height + parentContext.viewBox.height + PADDING
    },
    Component: ({ onMouseEnter, onMouseLeave }) =>
      <g>
        <line
          strokeDasharray="4, 6"
          stroke={props.color || parentContext.color || "#AAA"}
          x1={0}
          x2={0}
          y1={ELEMENT_SIZE / 2}
          y2={parentContext.viewBox.height + PADDING + ELEMENT_SIZE / 2}
        />
        <g
          transform={`translate(0, ${parentContext.viewBox.height + PADDING})`}
        >
          <LineComponent
            onMouseEnter={({ offset, value }) =>
              onMouseEnter({
                offset: {
                  left: offset.left,
                  top: offset.top + parentContext.viewBox.height + PADDING
                },
                value
              })}
            onMouseLeave={onMouseLeave}
          />
        </g>
        <Element.Svg
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          preview={null}
          value={props.preview || "Observable"}
          color={props.color || parentContext.color || "#AAA"}
        />
      </g>
  };
};

ObservableElement.Svg = props => {
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
        stroke={props.color || "black"}
        strokeWidth={1}
        fill="white"
      />
      <text textAnchor="middle" fontSize={FONT_SIZE} y={FONT_SIZE / 3}>
        {props.preview
          ? props.preview
          : typeof props.value === "string"
            ? `${props.value.substr(0, 1)}${props.value.length > 1 ? "…" : ""}`
            : Array.isArray(props.value) ? `[…]` : `{…}`}
      </text>
    </g>
  );
};

export default ObservableElement;
