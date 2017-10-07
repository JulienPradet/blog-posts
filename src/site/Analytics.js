/* global ga */
import { Component } from "react";

let Analytics = () => null;

if (process.env.GA_TRACKING_ID) {
  Analytics = class Analytics extends Component {
    pageView(props) {
      ga("send", "pageview", props.location.pathname);
    }
    componentDidMount() {
      this.pageView(this.props);
    }
    componentDidUpdate(prevProps) {
      if (this.props.location.pathname !== prevProps.location.pathname) {
        this.pageView(this.props);
      }
    }
    render() {
      return null;
    }
  };
}

export default Analytics;
