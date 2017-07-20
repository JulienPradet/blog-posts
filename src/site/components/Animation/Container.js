import { Component } from "react";
import PropTypes from "prop-types";
import Flip from "./Flip";

class AnimationContainer extends Component {
  constructor() {
    super();
    this.flips = {};
  }

  getChildContext() {
    return {
      animation: {
        get: identifier => {
          if (!this.flips[identifier]) {
            this.flips[identifier] = new Flip(identifier);
          }
          return this.flips[identifier];
        }
      }
    };
  }

  render() {
    return this.props.children;
  }
}

AnimationContainer.childContextTypes = {
  animation: PropTypes.shape({
    get: PropTypes.func.isRequired
  }).isRequired
};

export default AnimationContainer;
