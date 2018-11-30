let updateElement = () => {};
let stateStore = null;
let currentElement = null;

export const initHooks = element => {
  currentElement = element;
};

export const resetHooks = () => {
  currentElement = null;
};

export const useState = initialValue => {
  if (!stateStore) {
    stateStore = initialValue;
  }
  const updater = newValue => {
    stateStore = newValue;
    updateElement();
  };
  return [stateStore, updater];
};
