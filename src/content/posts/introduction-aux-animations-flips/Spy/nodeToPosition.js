export default node => {
  return {
    boundingBox: node.getBoundingClientRect(),
    size: {
      width: node.clientWidth,
      height: node.clientHeight
    },
    position: {
      top: node.offsetTop,
      left: node.offsetLeft
    },
    scroll: {
      top: node.scrollTop,
      left: node.scrollLeft
    }
  };
};
