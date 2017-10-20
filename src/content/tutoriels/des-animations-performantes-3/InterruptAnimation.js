import React from "react";
import PropTypes from "prop-types";

const CLOSED_SCALE = 1;
const EXPANDED_SCALE = 1.5;
const DURATION = 2000;

const getScaleFromNode = node => {
  return node.getBoundingClientRect().width / 180 || CLOSED_SCALE;
};

class InterruptAnimation extends React.Component {
  constructor() {
    super();
    this.state = {
      opened: false
    };
    this.node = {};
    this.toggle = this.toggle.bind(this);
    this.animate = this.animate.bind(this);
  }

  shouldComponentUpdate(_, nextState) {
    return this.state.opened !== nextState.opened;
  }

  componentDidMount() {
    Object.keys(this.node)
      .map(key => this.node[key])
      .forEach(node => {
        node.style.transform = `scale(${CLOSED_SCALE}, 1)`;
      });
  }

  componentDidUpdate() {
    if (this.props.withoutLayoutThrashing) {
      this.initialScale = Object.keys(this.node)
        .map(key => this.node[key])
        .map(node => {
          let scale;
          if (this.props.checkStart) {
            scale = getScaleFromNode(node);
          } else {
            scale = this.state.opened ? CLOSED_SCALE : EXPANDED_SCALE;
          }
          return scale;
        })
        .reduce(
          (initialScale, scale, index) => ({
            ...initialScale,
            [index]: scale
          }),
          {}
        );
    } else {
      this.initialScale = {};
    }

    this.start = window.performance.now();
    window.requestAnimationFrame(this.animate);
  }

  getScale(progress, index) {
    if (!this.initialScale[index]) {
      if (this.props.checkStart) {
        this.initialScale[index] = getScaleFromNode(this.node[index]);
      } else {
        this.initialScale[index] = this.state.opened
          ? CLOSED_SCALE
          : EXPANDED_SCALE;
      }
    }

    if (this.state.opened) {
      return (
        this.initialScale[index] +
        (EXPANDED_SCALE - this.initialScale[index]) * progress
      );
    } else {
      return (
        this.initialScale[index] -
        (this.initialScale[index] - CLOSED_SCALE) * progress
      );
    }
  }

  animate() {
    let progress = (window.performance.now() - this.start) / DURATION;
    if (progress > 1) progress = 1;

    Object.keys(this.node)
      .map(key => this.node[key])
      .forEach((node, index) => {
        const scale = this.getScale(progress, index);
        node.style.transform = `scale(${scale}, 1)`;
      });

    if (progress < 1) {
      window.requestAnimationFrame(this.animate);
    }
  }

  toggle() {
    this.setState(state => ({
      opened: !state.opened
    }));
  }

  render() {
    return (
      <div style={{ maxHeight: 180, overflowY: "auto" }}>
        {new Array(this.props.length).fill(0).map((_, index) => (
          <button
            key={index}
            ref={node => {
              this.node[index] = node;
            }}
            onClick={this.toggle}
            style={{
              display: "block",
              border: "none",
              cursor: "pointer",
              background: "#00c9c9",
              color: "white",
              padding: "1em",
              margin: "0.2em auto",
              fontSize: "1.1em",
              willChange: "transform",
              width: "180px",
              touchAction: "manipulation"
            }}
          >
            {this.state.opened ? "Click to close" : "Click to expand"}
          </button>
        ))}
      </div>
    );
  }
}

InterruptAnimation.propTypes = {
  length: PropTypes.number,
  checkStart: PropTypes.bool,
  withoutLayoutThrashing: PropTypes.bool
};
InterruptAnimation.defaultProps = {
  length: 1,
  checkStart: false,
  withoutLayoutThrashing: false
};

export default InterruptAnimation;
