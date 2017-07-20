import { Component } from "react";
import PropTypes from "prop-types";
import AnimationContainer from "./Container";
import getElementStyle from "./getElementStyle";
import quadIn from "eases/quad-in";

const defaultOptions = {
  duration: 300,
  delay: 0,
  easing: quadIn,
  updateTranslate: true,
  updateScale: true,
  updateOpacity: true,
  durationMultiplier: 1,
  getElementStyle: getElementStyle
};

class AnimationElement extends Component {
  constructor(props, context) {
    super();
    this.state = {
      isEntering: !context.animation.get(props.id).isReady()
    };
    this.setAnimatedElement = this.setAnimatedElement.bind(this);
  }

  setAnimatedElement(ref) {
    this.element = ref;
  }

  getAnimationOptions() {
    const customProps = {};
    if (this.props.duration) {
      customProps.duration = this.props.duration;
    }
    if (this.props.delay) {
      customProps.delay = this.props.delay;
    }
    if (this.props.easing) {
      customProps.easing = this.props.easing;
    }
    return Object.assign({}, defaultOptions, customProps);
  }

  animate() {
    if (
      typeof this.props.shouldAnimate !== "function" ||
      this.props.shouldAnimate()
    ) {
      const flip = this.context.animation.get(this.props.id);
      if (flip._first) {
        const options = this.getAnimationOptions();
        flip.last(this.element, options);
        flip.invert(this.element, options);
        flip
          .play(this.element, options)
          .then(() => {
            if (typeof this.props.onAnimationEnd === "function") {
              this.props.onAnimationEnd();
            }
          })
          .then(() => {
            this.prepareAnimation();
          })
          .catch(() => {
            console.warn("Failed to animate element", this.props.id);
          });
      } else {
        // No first position registered
        // It can't be animated
        this.prepareAnimation();
      }
    } else {
      this.prepareAnimation();
    }
  }

  prepareAnimation() {
    const flip = this.context.animation.get(this.props.id);
    const options = this.getAnimationOptions();
    flip.first(this.element, options);
  }

  componentWillUpdate() {
    this.prepareAnimation();
  }

  componentDidMount() {
    this.animate();
  }

  componentDidUpdate() {
    this.animate();
  }

  render() {
    return this.props.children({
      setAnimatedElement: this.setAnimatedElement,
      isEntering: this.state.isEntering
    });
  }
}

AnimationElement.propTypes = {
  children: PropTypes.func.isRequired
};

AnimationElement.contextTypes = AnimationContainer.childContextTypes;

export default AnimationElement;
