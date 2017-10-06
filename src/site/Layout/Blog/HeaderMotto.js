import React, { Component } from "react";
import PageLink from "../../components/PageLink";

class HeaderLinks extends Component {
  render() {
    if (!this.props.isHome) {
      return (
        <div className="header__motto timeline__side">
          <PageLink to="/">Revenir à l'accueil</PageLink>
        </div>
      );
    }

    return (
      <div className="header__motto timeline__side">
        <span>Mes valeurs sont </span>
        <span>
          la <strong>bienveillance</strong>{" "}
        </span>
        <span>
          et le <strong>partage</strong>
        </span>
      </div>
    );
  }
}

export default HeaderLinks;
