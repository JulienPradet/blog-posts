import React, { Component } from "react";
import Container from "./flip/Container";
import flipElement from "./flip/Element";

const Base = props => (
  <div
    ref={props.flip.setFlipElement}
    style={{
      background: "white",
      padding: "1em",
      maxWidth: "20em",
      margin: "0 auto",
      textAlign: "center"
    }}
  >
    <button
      onClick={props.toggle}
      style={{
        border: "none",
        background: "#00c9c9",
        color: "white",
        fontWeight: "bold",
        padding: "1em"
      }}
    >
      {props.opened ? "Fermer" : "Ouvrir"}
    </button>
    {props.opened &&
      <div style={{ marginTop: "1.5em" }}>
        Salut, moi c'est le contenu&nbsp;!
      </div>}
  </div>
);

const Content = flipElement({ duration: 300 })(Base);

class Togglable extends Component {
  constructor() {
    super();
    this.state = { opened: false };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(state => ({ opened: !state.opened }));
  }

  render() {
    return (
      <div style={{ minHeight: "10em" }}>
        <Container>
          {() => <Content toggle={this.toggle} opened={this.state.opened} />}
        </Container>
      </div>
    );
  }
}

export default Togglable;
