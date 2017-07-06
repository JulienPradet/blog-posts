import React from "react";
import Element from "./Element";

const SkipElement = () => {
  return null;
};

SkipElement.getLength = () => 1;

SkipElement.Svg = () => null;

SkipElement.getData = element => {
  const viewBox = SkipElement.getViewBox(element);
  return {
    viewBox: viewBox,
    Component: ({ onMouseEnter, onMouseLeave }) => <SkipElement.Svg />
  };
};

SkipElement.getViewBox = Element.getViewBox;

export default SkipElement;
