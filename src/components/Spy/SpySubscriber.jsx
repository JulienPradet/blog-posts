import React from "react";
import PropTypes from "prop-types";

class SpySubscriber extends React.Component {
  render() {
    return this.props.children(this.context.spy.targets);
  }
}

SpySubscriber.contextTypes = {
  spy: PropTypes.shape({
    registerTarget: PropTypes.func.isRequired,
    targets: PropTypes.object.isRequired
  }).isRequired
};

SpySubscriber.propTypes = {
  children: PropTypes.func.isRequired
};

export default SpySubscriber;
