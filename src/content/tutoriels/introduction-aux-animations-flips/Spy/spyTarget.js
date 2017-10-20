import React, { Component } from "react";
import PropTypes from "prop-types";

const spyTarget = ({ key, nodeTransformer, shouldUpdate }) => BaseComponent => {
  nodeTransformer = nodeTransformer || (x => x);
  const getKey = typeof key === "function" ? key : () => key;

  class SpyTarget extends Component {
    constructor() {
      super();
      this.setSpyTarget = this.setSpyTarget.bind(this);
      this.updateTarget = this.updateTarget.bind(this);
    }

    componentDidMount() {
      this.updateTarget();
      window.addEventListener("resize", this.updateTarget);
    }

    componentDidUpdate(prevProps) {
      if (shouldUpdate(prevProps, this.props)) {
        this.updateTarget();
      }
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.updateTarget);
    }

    setSpyTarget(target) {
      this.target = target;
    }

    updateTarget() {
      this.context.spy.registerTarget(
        getKey(this.props),
        nodeTransformer(this.target)
      );
    }

    render() {
      return <BaseComponent setSpyTarget={this.setSpyTarget} {...this.props} />;
    }
  }

  SpyTarget.contextTypes = {
    spy: PropTypes.shape({
      registerTarget: PropTypes.func.isRequired
    }).isRequired
  };

  return SpyTarget;
};

export default spyTarget;
