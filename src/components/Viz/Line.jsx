import React, { Children } from "react";
import Element, { ELEMENT_SIZE } from "./Element.jsx";
import StartElement, { DefaultStartElement } from "./StartElement.jsx";
import SkipElement from "./SkipElement.jsx";
import ObservableElement from "./ObservableElement.jsx";
import IsComplete from "./IsComplete.jsx";

const LEGEND_WIDTH = 188;
const LEGEND_HEIGHT = 16;
const LEGEND_PADDING = 12;

const Line = () => {
  return null;
};

const elementToComponent = (context, element) => {
  const Component = element.Component;

  return ({ onMouseEnter, onMouseLeave }) => (
    <g transform={`translate(${context.offset.left}, ${context.offset.top})`}>
      <Component
        onMouseEnter={
          typeof onMouseEnter === "function" &&
          (({ offset, ...element }) =>
            onMouseEnter({
              ...element,
              offset: {
                left: context.offset.left + offset.left,
                top: context.offset.top + offset.top
              }
            }))
        }
        onMouseLeave={onMouseLeave}
      />
    </g>
  );
};

const addElementToContext = (context, element) => {
  return {
    separationWidth: context.separationWidth,
    viewBox: {
      width: context.viewBox.width,
      height: Math.max(context.viewBox.height, element.viewBox.height)
    },
    offset: {
      left: context.offset.left + context.separationWidth,
      top: 0
    },
    length: context.length - 1,
    color: context.color
  };
};

const getInitialContext = (width, legend, length, color) => {
  const legendWidth = legend ? LEGEND_WIDTH + LEGEND_PADDING : 0;
  let lineWidth = width - legendWidth;
  const separationWidth = Math.max(
    lineWidth / (length + 1),
    ELEMENT_SIZE * 1.25
  );
  lineWidth = separationWidth * (length + 1);
  width = lineWidth + legendWidth;

  return {
    separationWidth: separationWidth,
    viewBox: {
      width: width,
      height: LEGEND_HEIGHT
    },
    offset: {
      left: legendWidth,
      top: 0
    },
    length: length,
    color: color
  };
};

Line.getLength = props => {
  return Children.toArray(props.children)
    .filter(child => child.type !== StartElement)
    .map((child, index) => {
      if (child.type === Element) {
        return index + Element.getLength(child.props);
      } else if (child.type === SkipElement) {
        return index + SkipElement.getLength(child.props);
      } else if (child.type === ObservableElement) {
        return index + ObservableElement.getLength(child.props);
      } else {
        return 0;
      }
    })
    .reduce((length, childLength) => Math.max(length, childLength), 0);
};

Line.getData = (props, parentContext) => {
  const initialContext = getInitialContext(
    parentContext.width,
    props.legend,
    props.length || Line.getLength(props),
    props.color || "#AAA"
  );

  const startElementFactory = context => {
    const startElement = Children.toArray(props.children).find(
      child => child.type === StartElement
    );

    if (startElement) {
      return StartElement.getData(startElement.props, context);
    } else {
      const defaultStartElement = DefaultStartElement.getData(null, context);
      return {
        ...defaultStartElement,
        Component: props.hideStart ? () => null : defaultStartElement.Component
      };
    }
  };

  const elementFactories = [
    startElementFactory,
    ...Children.toArray(props.children)
      .map(child => {
        if (child.type === Element) {
          return context => Element.getData(child.props, context);
        } else if (child.type === SkipElement) {
          return context => SkipElement.getData(child.props, context);
        } else if (child.type === ObservableElement) {
          return context => ObservableElement.getData(child.props, context);
        } else {
          return null;
        }
      })
      .filter(data => data !== null)
  ];

  const { context, Components } = elementFactories.reduce(
    ({ context, Components }, elementFactory) => {
      const element = elementFactory(context);
      const Component = elementToComponent(context, element);

      return {
        context: addElementToContext(context, element),
        Components: [...Components, Component]
      };
    },
    {
      context: initialContext,
      Components: []
    }
  );

  const isComplete = Children.toArray(props.children).find(
    child => child.type === IsComplete
  );

  const ElementsComponents = Components.map((Component, index) => {
    return ({ onMouseEnter, onMouseLeave }) => (
      <Component
        key={index}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    );
  });

  return {
    viewBox: {
      width: context.viewBox.width,
      height: context.viewBox.height
    },
    Component: ({ onMouseEnter, onMouseLeave }) => (
      <Line.Svg
        color={props.color || "#AAA"}
        legend={props.legend}
        viewBox={context.viewBox}
        width={parentContext.width}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        length={Math.max(props.length, props.children.length)}
        isComplete={isComplete}
        ElementComponents={ElementsComponents}
      />
    )
  };
};

Line.Svg = props => {
  const startLineOffset = {
    left: props.legend ? LEGEND_WIDTH + LEGEND_PADDING : 0,
    top: ELEMENT_SIZE / 2
  };

  const width = props.viewBox.width;

  const elements = props.ElementComponents.map((ElementComponent, index) => {
    return (
      <ElementComponent
        key={index}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      />
    );
  });

  const isComplete = (
    <g transform={`translate(${width}, ${startLineOffset.top})`}>
      {props.isComplete ? (
        <line x1={0} x2={0} y1={-2.5} y2={2.5} stroke={props.color} />
      ) : (
        <path
          d="M -3 -2 L 0 0 L -3 2"
          stroke={props.color}
          fill={props.color}
        />
      )}
    </g>
  );

  return (
    <g>
      {props.legend && (
        <text
          x={LEGEND_WIDTH}
          y={startLineOffset.top + LEGEND_HEIGHT / 3}
          fontSize={LEGEND_HEIGHT}
          textAnchor="end"
        >
          {props.legend}
        </text>
      )}

      <line
        x1={startLineOffset.left}
        x2={width}
        y1={startLineOffset.top}
        y2={startLineOffset.top}
        stroke={props.color}
      />

      {elements}
      {isComplete}
    </g>
  );
};

export default Line;
