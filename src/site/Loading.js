import React from "react";

class Loading extends React.Component {
  constructor() {
    super();
    this.state = {
      displaySpinner: false
    };
  }

  componentDidMount() {
    this.deferLoading = setTimeout(
      () => {
        this.setState({ displaySpinner: true });
      },
      100
    );
  }

  componentWillUnmount() {
    clearTimeout(this.deferLoading);
  }

  render() {
    return (
      <div
        className={
          "spinner " + (this.state.displaySpinner ? "" : "spinner--hidden")
        }
        ariaLabel="Chargement en cours..."
      />
    );
  }
}

export default Loading;
