import React, { Component } from "react";
import Container from "./flip/Container";
import flipElement from "./flip/Element";
import SpyProvider from "./Spy/SpyProvider";
import spySubscriber from "./Spy/spySubscriber";
import spyTarget from "./Spy/spyTarget";
import compose from "./compose";

const Button = props => (
  <div
    style={{
      background: "white",
      padding: "1em",
      position: "relative",
      zIndex: 2
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
  </div>
);

const InnerContent = compose(
  spyTarget({
    key: "content",
    nodeTransformer: node => node.clientHeight,
    shouldUpdate: (prevProps, nextProps) =>
      prevProps.opened !== nextProps.opened
  }),
  flipElement(
    props =>
      props.opened
        ? { duration: 150, delay: 150, updateScale: false }
        : { duration: 250, delay: 0, updateScale: false }
  )
)(props => (
  <div
    ref={node => {
      props.flip.setFlipElement(node);
      props.setSpyTarget(node);
    }}
    className={props.opened ? "" : "hidden"}
    style={{
      position: "absolute",
      width: "100%",
      top: props.opened ? 0 : "-1em"
    }}
  >
    <div style={{ padding: "0.5em 1em 1em" }}>
      Salut, moi c'est le contenu&nbsp;!
    </div>
  </div>
));

const ContentBackground = compose(
  spySubscriber(props => targets => ({
    height: targets.content
  })),
  flipElement({ duration: 300 })
)(props => (
  <div
    ref={props.flip.setFlipElement}
    style={{
      background: "white",
      height: props.opened ? props.spyTargets.height : 1
    }}
  />
));

const Content = props => (
  <div
    style={{
      maxWidth: "20em",
      margin: "0 auto",
      textAlign: "center"
    }}
  >
    <Button toggle={props.toggle} opened={props.opened} />
    <div style={{ position: "relative" }}>
      <ContentBackground opened={props.opened} />
      <InnerContent opened={props.opened} />
    </div>
  </div>
);

class BaseTogglable extends Component {
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
export default props => (
  <SpyProvider>
    <BaseTogglable />
  </SpyProvider>
);
