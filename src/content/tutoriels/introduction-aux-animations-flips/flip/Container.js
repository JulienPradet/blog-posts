import { Component } from "react";
import PropTypes from "prop-types";
import Flip from "./flip";

const shouldAnimate = props =>
  typeof props.shouldAnimate === "undefined" || props.shouldAnimate;
const shouldUpdateFirst = props =>
  typeof props.shouldUpdateFirst === "undefined" || props.shouldUpdateFirst;

class FlipContainer extends Component {
  constructor() {
    super();
    this.registerElement = this.registerElement.bind(this);
    this.triggerAnimation = this.triggerAnimation.bind(this);
    this.state = {
      animating: false,
      elements: []
    };
  }

  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

  componentWillUpdate(nextProps, nextState) {
    if (shouldUpdateFirst(nextProps)) {
      nextState.elements.forEach(({ flip }) => flip.first());
    }
  }

  componentDidUpdate() {
    if (shouldAnimate(this.props)) {
      this.triggerAnimation();
    }
  }

  triggerAnimation() {
    this.state.elements.forEach(({ flip }) => flip.last());
    Promise.all(this.state.elements.map(({ flip }) => flip.invert()))
      .then(() => {
        this.setState({ animating: true });
        Promise.all(
          this.state.elements.map(({ flip }) => flip.play())
        ).then(() => this.setState({ animating: false }));
      })
      .catch(() => console.log("Animation stopped"));
  }

  getChildContext() {
    return {
      flip: {
        elements: this.state.elements,
        registerElement: this.registerElement,
        triggerAnimation: this.triggerAnimation
      }
    };
  }

  registerElement(element, options, startCallback, endCallback) {
    const flip = new Flip({ element, options });
    this.setState(state => ({
      elements: [
        ...state.elements,
        { flip, element, startCallback, endCallback }
      ]
    }));
  }

  render() {
    return this.props.children({ animating: this.state.animating });
  }
}

FlipContainer.propTypes = {
  children: PropTypes.func.isRequired
};

FlipContainer.childContextTypes = {
  flip: PropTypes.shape({
    elements: PropTypes.array.isRequired,
    registerElement: PropTypes.func.isRequired,
    triggerAnimation: PropTypes.func.isRequired
  }).isRequired
};

export default FlipContainer;
