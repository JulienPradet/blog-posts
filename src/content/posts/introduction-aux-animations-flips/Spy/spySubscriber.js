import React from 'react';

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
    spy: React.PropTypes.shape({
      registerTarget: React.PropTypes.func.isRequired,
      registerSubscriber: React.PropTypes.func.isRequired,
      getTargets: React.PropTypes.func.isRequired
    }).isRequired
  };

  return SpySubscriber;
};

export default spySubscriber;
