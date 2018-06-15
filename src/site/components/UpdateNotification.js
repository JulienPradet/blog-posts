import React, { Component } from "react";
import { UPDATE_EVENT } from "../updateNotification";

class UpdateNotification extends Component {
  constructor() {
    super();
    this.state = {
      shouldUpdate: false
    };
    this.displayNotification = this.displayNotification.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistration().then(registration => {
        if (registration.waiting) {
          this.displayNotification();
        }
      });
    }
    document.body.addEventListener(UPDATE_EVENT, this.displayNotification);
  }

  componentWillUnmount() {
    document.body.removeEventListener(UPDATE_EVENT, this.displayNotification);
  }

  displayNotification() {
    this.setState({
      shouldUpdate: true,
      display: false
    });
  }

  toggle(event) {
    event.target.blur();
    this.setState(state => ({
      display: !state.display
    }));
  }

  update() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistration().then(registration => {
        if (registration.waiting) {
          registration.waiting.postMessage({ type: "skipWaiting" });
        }
      });
    }
  }

  render() {
    if (this.state.shouldUpdate) {
      return (
        <div
          className={`update-notification ${this.state.display
            ? `update-notification--closed`
            : ""}`}
        >
          <div>
            Oh&nbsp;? Une mise à jour est disponible&nbsp;!
            <button onClick={this.update}>Mettre à jour&nbsp;?</button>
          </div>
          <button className="close" onClick={this.toggle}>
            <span aria-label="Fermer">^</span>
          </button>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default UpdateNotification;
