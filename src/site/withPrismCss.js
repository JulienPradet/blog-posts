import React from "react";
import Helmet from "react-helmet";

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
          {this.state.loadCss &&
            <Helmet
              link={[{ rel: "stylesheet", href: "/css/prism-onedark.css" }]}
            />}
          <BaseComponent {...this.props} />
        </div>
      );
    }
  };
};
