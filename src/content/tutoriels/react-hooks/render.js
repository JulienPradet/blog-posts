import { createElement } from "./createElement";

const renderString = element => {
  const span = document.createElement("span");
  span.textContent = element;
  return span;
};

const renderDomElement = element => {
  const node = document.createElement(element.type);
  const { children, ...props } = element.props;
  if (children) {
    children.forEach(child => {
      const childNode = renderElement(child);
      node.appendChild(childNode);
    });
  }
  Object.keys(props).forEach(propName => {
    node[propName] = props[propName];
  });
  return node;
};

let updateElement = () => {};
let stateStore = null;

const useState = initialValue => {
  if (!stateStore) {
    stateStore = initialValue;
  }
  const updater = newValue => {
    stateStore = newValue;
    updateElement();
  };
  return [stateStore, updater];
};

const renderFunction = element => {
  return renderElement(element.type(element.props));
};

const renderElement = element => {
  if (typeof element === "string") {
    return renderString(element);
  } else if (typeof element.type === "string") {
    return renderDomElement(element);
  } else if (typeof element.type === "function") {
    return renderFunction(element);
  }
};

export const render = (element, parent) => {
  let node = renderElement(element);
  parent.appendChild(node);

  updateElement = () => {
    parent.removeChild(node);
    node = renderElement(element);
    parent.appendChild(node);
  };
};
