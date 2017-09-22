import React from "react";
import Helmet from "react-helmet";
import prismCss from "./prism-onedark.css";

export default () => BaseComponent => {
  return class extends React.Component {
    constructor() {
      super();
      this.state = {
        loadCss: false
      };
    }

    componentDidMount() {
      this.setState({
        loadCss: true
      });
    }

    render() {
      return (
        <div>
          {this.state.loadCss && (
            <Helmet link={[{ rel: "stylesheet", href: prismCss }]} />
          )}
          <BaseComponent {...this.props} />
        </div>
      );
    }
  };
};
