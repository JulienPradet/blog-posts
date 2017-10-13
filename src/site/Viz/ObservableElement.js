import React from "react";
import Line from "./Line";
import Element, { ELEMENT_SIZE } from "./Element";

const PADDING = 0;

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
    Component: ({ onMouseEnter, onMouseLeave }) => (
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
            onMouseEnter={({ offset, ...element }) =>
              onMouseEnter({
                ...element,
                offset: {
                  left: offset.left,
                  top: offset.top + parentContext.viewBox.height + PADDING
                }
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
    )
  };
};

export default ObservableElement;
