import React, { Component } from "react";
import { withPageTitle } from "../../components/PageTitle";

class HeaderLinks extends Component {
  render() {
    if (this.props.title) {
      return (
        <div className="header__motto">
          <h2>
            {this.props.title}
          </h2>
        </div>
      );
    }

    return (
      <div className="header__motto">
        <span>Mes valeurs sont </span>
        <span>
          la <strong>bienveillance</strong>{" "}
        </span>
        <span>et le <strong>partage</strong></span>
      </div>
    );
  }
}

export default withPageTitle("title")(HeaderLinks);
