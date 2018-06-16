import React, { Component } from "react";
import { getComments } from "./commentsDb";

const CommentStatus = props => {
  return (
    <div>
      <p>{props.comment.content} </p>
      <div>{props.comment.originalTime}</div>
    </div>
  );
};

class CommentsStatus extends Component {
  constructor() {
    super();
    this.state = {
      comments: {}
    };
    this.updateComments = this.updateComments.bind(this);
  }

  updateComments() {
    getComments().then(comments => {
      if (this.mounted) {
        this.setState({
          comments: comments
            .filter(({ data }) => data.title === this.props.page.title)
            .reduce((commentsByStatus, comment) => {
              if (!commentsByStatus[comment.status]) {
                commentsByStatus[comment.status] = [];
              }

              commentsByStatus[comment.status] = [
                ...commentsByStatus[comment.status],
                comment
              ];

              return commentsByStatus;
            }, {})
        });
      }
    });
  }

  componentDidMount() {
    this.mounted = true;
    this.updateComments();

    if ("serviceWorker" in navigator) {
      this.listener = event => {
        if (event.data === "comments-update") {
          this.updateComments();
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
    return (
      <div>
        {this.state.comments.retry && (
          <div>
            <h3>On insiste !</h3>
            <ul>
              {this.state.comments.retry.map(comment => (
                <CommentStatus key={comment.originalTime} comment={comment} />
              ))}
            </ul>
          </div>
        )}
        {this.state.comments.error && (
          <div>
            <h3>Buggé</h3>
            <ul>
              {this.state.comments.error.map(comment => (
                <CommentStatus key={comment.originalTime} comment={comment} />
              ))}
            </ul>
          </div>
        )}
        {this.state.comments.success && (
          <div>
            <h3>Envoyé !</h3>
            <ul>
              {this.state.comments.success.map(comment => (
                <CommentStatus key={comment.originalTime} comment={comment} />
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default CommentsStatus;
