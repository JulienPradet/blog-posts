import React, { Component } from "react";
import { getComments } from "./commentsDb";
import Icon from "../../../../icons/Icon";

class CommentsStatus extends Component {
  constructor() {
    super();
    this.state = {
      status: null
    };
    this.updateStatus = this.updateStatus.bind(this);
  }

  updateStatus() {
    getComments()
      .then(comments => {
        return comments.filter(
          ({ data }) => data.title === this.props.page.title
        );
      })
      .then(comments => {
        if (this.mounted) {
          const hasError = comments.some(({ status }) => status === "error");
          const hasSync = comments.some(({ status }) => status === "sync");

          this.setState({
            status:
              comments.length === 0
                ? null
                : hasError ? "error" : hasSync ? "sync" : "success"
          });
        }
      });
  }

  componentDidMount() {
    this.mounted = true;
    this.updateStatus();

    if ("serviceWorker" in navigator) {
      this.listener = event => {
        if (event.data === "comments-update") {
          this.updateStatus();
        }
      };
      navigator.serviceWorker.addEventListener("message", this.listener);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    if (this.listener) {
      navigator.serviceWorker.removeEventListener("message", this.listener);
    }
  }

  render() {
    switch (this.state.status) {
      case "error":
        return (
          <button type="button" onClick={this.props.onClick}>
            <Icon icon="times" /> Echec de l'envoi du message
          </button>
        );
      case "sync":
        return (
          <button type="button" onClick={this.props.onClick}>
            <Icon icon="circle-notch" /> Synchronisation en cours
          </button>
        );
      case "success":
        return (
          <button type="button" onClick={this.props.onClick}>
            <Icon icon="check" /> Message envoyé
          </button>
        );
      default:
        return null;
    }
  }
}

export default CommentsStatus;
