import React, { Component } from "react";
import { getComments } from "./commentsDb";

class CommentsStatus extends Component {
  constructor() {
    super();
    this.state = {
      status: null
    };
    this.updateStatus = this.updateStatus.bind(this);
  }

  updateStatus() {
    getComments().then(comments => {
      if (this.mounted) {
        const hasError = comments.some(({ status }) => status === "error");
        const hasPending = comments.some(
          ({ status }) => ["retry", "pending"].indexOf(status) > -1
        );

        this.setState({
          status:
            comments.length === 0
              ? null
              : hasError ? "error" : hasPending ? "pending" : "success"
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
    return <span>{this.state.status}</span>;
  }
}

export default CommentsStatus;
