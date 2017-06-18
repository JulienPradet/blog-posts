import React from "react";
import PropTypes from "prop-types";

const spySubscriber = mapTargetsToProps => BaseComponent => {
  class SpySubscriber extends React.Component {
    componentDidMount() {
      this.context.spy.registerSubscriber(() => this.forceUpdate());
    }

    render() {
      return (
        <BaseComponent
          spyTargets={mapTargetsToProps(this.props)(
            this.context.spy.getTargets()
          )}
          {...this.props}
        />
      );
    }
  }

  SpySubscriber.contextTypes = {
    spy: PropTypes.shape({
      registerTarget: PropTypes.func.isRequired,
      registerSubscriber: PropTypes.func.isRequired,
      getTargets: PropTypes.func.isRequired
    }).isRequired
  };

  return SpySubscriber;
};

export default spySubscriber;
