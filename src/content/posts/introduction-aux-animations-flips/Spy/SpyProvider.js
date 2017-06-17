import React from "react";
import PropTypes from "prop-types";

class SpyProvider extends React.Component {
  constructor() {
    super();
    this.targets = {};
    this.subscribers = {};
    this.registerTarget = this.registerTarget.bind(this);
    this.registerSubscriber = this.registerSubscriber.bind(this);
  }

  getChildContext() {
    return {
      spy: {
        registerTarget: this.registerTarget,
        registerSubscriber: this.registerSubscriber,
        getTargets: () => this.targets
      }
    };
  }

  registerTarget(key, target) {
    this.targets = {
      ...this.targets,
      [key]: target
    };
    this.subscribers.forEach(subscriber => subscriber());
  }

  registerSubscriber(subscriber) {
    this.subscribers = [...this.subscribers, subscriber];
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
    registerSubscriber: PropTypes.func.isRequired,
    getTargets: PropTypes.func.isRequired
  }).isRequired
};

export default SpyProvider;
