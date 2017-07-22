import React, { Component } from "react";
import Link from "react-router-dom/Link";

class HeaderLinks extends Component {
  render() {
    if (!this.props.isHome) {
      return (
        <div className="header__motto timeline__side">
          <Link to="/">Revenir à l'accueil</Link>
        </div>
      );
    }

    return (
      <div className="header__motto timeline__side">
        <span>Mes valeurs sont </span>
        <span>
          la <strong>bienveillance</strong>{" "}
        </span>
        <span>et le <strong>partage</strong></span>
      </div>
    );
  }
}

export default HeaderLinks;
