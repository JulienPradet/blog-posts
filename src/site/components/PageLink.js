import React, { Component } from "react";
import Link from "react-router-dom/Link";
import PreloadPage from "./PreloadPage";
import { UPDATE_EVENT } from "../updateNotification";

class PageLink extends Component {
  constructor() {
    super();
    this.state = {
      shouldUpdate: false
    };
    this.switchToNormalLink = this.switchToNormalLink.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener(UPDATE_EVENT, this.switchToNormalLink);
  }

  componentWillUnmount() {
    document.body.removeEventListener(UPDATE_EVENT, this.switchToNormalLink);
  }

  switchToNormalLink() {
    this.setState({
      shouldUpdate: true
    });
  }

  render() {
    const { to, children, ...rest } = this.props;

    if (this.state.shouldUpdate) {
      return (
        <a href={to} {...rest}>
          {children}
        </a>
      );
    }

    return (
      <PreloadPage location={to} onMiss={this.switchToNormalLink}>
        {({ load }) => (
          <Link onMouseEnter={load} onFocus={load} to={to} {...rest}>
            {children}
          </Link>
        )}
      </PreloadPage>
    );
  }
}

export default PageLink;
