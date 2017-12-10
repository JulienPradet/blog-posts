import { Component } from "react";

class ScrollToTopOnUpdate extends Component {
  componentDidUpdate(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }
  render() {
    return null;
  }
}

export default ScrollToTopOnUpdate;
