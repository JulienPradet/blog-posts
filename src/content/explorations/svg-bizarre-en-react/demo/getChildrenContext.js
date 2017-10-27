const getChildContext = child => {
  const Component = child.type;
  const props = child.props;

  if (typeof Component.getContext !== "function") {
    console.warn("Child component cannot influence parent context");
  }

  return Component.getContext(props);
};

const getContext = (applyToContext, initialContext, children) => {
  if (!children) {
    children = [];
  }

  if (!Array.isArray(children)) {
    children = [children];
  }

  const context = children.reduce((context, child) => {
    const childContext = getChildContext(child);
    return applyToContext(context, {
      ...childContext,
      __type: child.type
    });
  }, initialContext);

  return context;
};

export default getContext;
