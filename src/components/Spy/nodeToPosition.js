export default node => {
  const boundingBox = node.getBoundingClientRect();
  return {
    size: {
      width: boundingBox.width,
      height: boundingBox.height
    },
    position: {
      top: boundingBox.top,
      left: boundingBox.left
    }
  };
};
