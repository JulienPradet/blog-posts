import React from "react";
import PropTypes from "prop-types";

class SpyProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      targets: {}
    };
    this.registerTarget = this.registerTarget.bind(this);
  }

  getChildContext() {
    return {
      spy: {
        registerTarget: this.registerTarget,
        targets: this.state.targets
      }
    };
  }

  registerTarget(key, target) {
    this.setState(state => ({
      targets: {
        ...state.targets,
        [key]: target
      }
    }));
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

SpyProvider.propTypes = {
  children: PropTypes.node.isRequired
};

SpyProvider.childContextTypes = {
  spy: PropTypes.shape({
    registerTarget: PropTypes.func.isRequired,
    targets: PropTypes.object.isRequired
  }).isRequired
};

export default SpyProvider;
