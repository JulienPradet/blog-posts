import React from "react";
import Element, { ELEMENT_SIZE } from "./Element.jsx";

const StartElement = () => {
  return null;
};

StartElement.Svg = Element.Svg;

StartElement.getData = Element.getData;

StartElement.getViewBox = Element.getViewBox;

export default StartElement;

const DefaultStartElement = () => {
  return null;
};

DefaultStartElement.getData = (props, context) => {
  const viewBox = StartElement.getViewBox();
  return {
    viewBox: viewBox,
    Component: () => {
      return (
        <line
          x1={0}
          x2={0}
          y1={ELEMENT_SIZE / 2 - 2.5}
          y2={ELEMENT_SIZE / 2 + 2.5}
          stroke={context.color}
        />
      );
    }
  };
};

export { DefaultStartElement };
