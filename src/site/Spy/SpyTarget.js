import React from "react";
import PropTypes from "prop-types";

class SpyTarget extends React.Component {
  constructor() {
    super();
    this.setSpyTarget = this.setSpyTarget.bind(this);
    this.updateTarget = this.updateTarget.bind(this);
  }

  componentDidMount() {
    this.updateTarget();
    window.addEventListener("resize", this.updateTarget);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateTarget);
  }

  setSpyTarget(target) {
    this.target = target;
  }

  transformNode(target) {
    const nodeTransformer = this.props.nodeTransformer || (x => x);

    return nodeTransformer(target);
  }

  updateTarget() {
    this.context.spy.registerTarget(
      this.props.name,
      this.transformNode(this.target)
    );
  }

  render() {
    return this.props.children({ setSpyTarget: this.setSpyTarget });
  }
}

SpyTarget.contextTypes = {
  spy: PropTypes.shape({
    registerTarget: PropTypes.func.isRequired,
    targets: PropTypes.object.isRequired
  }).isRequired
};

SpyTarget.propTypes = {
  children: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  nodeTransformer: PropTypes.func
};

export default SpyTarget;
