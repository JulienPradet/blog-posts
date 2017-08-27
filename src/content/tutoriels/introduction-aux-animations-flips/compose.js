const compose = (...functions) =>
  functions.reduce((finalFn, currentFn) => x => currentFn(finalFn(x)), x => x);

export default compose;
