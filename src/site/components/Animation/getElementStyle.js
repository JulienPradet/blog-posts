const getElementStyle = element => {
  const style = window.getComputedStyle(element);
  const bounding = element.getBoundingClientRect();
  const opacity = parseFloat(style.opacity);

  const matrixMatch = style.transform.match(
    /^matrix\((\d+(\.\d*)?), (\d+(\.\d*)?), (\d+(\.\d*)?), (\d+(\.\d*)?), (\d+(\.\d*)?), (\d+(\.\d*)?)\)$/
  );

  return {
    top: bounding.top,
    left: bounding.left,
    width: bounding.width,
    height: bounding.height,
    opacity: Number.isNaN(opacity) ? 1 : opacity,
    zIndex: parseInt(style.zIndex, 10) || 0,
    translateX: matrixMatch ? parseInt(matrixMatch[9], 10) : 0,
    translateY: matrixMatch ? parseInt(matrixMatch[11], 10) : 0,
    scaleX: matrixMatch ? parseFloat(matrixMatch[1]) : 1,
    scaleY: matrixMatch ? parseFloat(matrixMatch[7]) : 1
  };
};

export default getElementStyle;
