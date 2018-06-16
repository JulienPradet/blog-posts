import React, { Component, Fragment } from "react";
import { formatSimpleDate } from "../../../util/dateFormats";
import Icon from "../../../../icons/Icon";
import markdown from "markdown-it";
import { getComments, setComments } from "./commentsDb";

const md = markdown({
  html: true,
  xhtmlOut: false,
  breaks: false,
  linkify: false,
  typographer: false,
  quotes: "“”‘’"
});

const FormattedDate = ({ date }) => {
  const formattedDate = formatSimpleDate(new Date(date));
  return <time>{formattedDate}</time>;
};

class CommentStatus extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisplayFull: false
    };
    this.toggleDisplayFull = this.toggleDisplayFull.bind(this);
  }

  toggleDisplayFull(e) {
    this.setState(state => ({
      isDisplayFull: !state.isDisplayFull
    }));
  }

  render() {
    const content = this.props.comment.data.comment;
    const isPublic = this.props.comment.data.public || false;
    const author = this.props.comment.data.name || "Anonyme";
    const status = this.props.comment.status;

    return (
      <div
        className={`comment-status ${this.state.isDisplayFull
          ? "comment-status--full"
          : "comment-status--short"}`}
      >
        <div className="comment-status__content">
          <div
            dangerouslySetInnerHTML={{
              __html: md.render(content)
            }}
          />
          {this.state.isDisplayFull &&
            (author && (
              <div className="comment-status__author">
                par <strong>{author}</strong> le{" "}
                <FormattedDate date={this.props.comment.originalTime} />{" "}
                {isPublic ? "(public)" : "(privé)"}
              </div>
            ))}
          <button
            className="comment-status__toggle"
            onClick={this.toggleDisplayFull}
          >
            {this.state.isDisplayFull ? "Refermer" : "Agrandir"}
          </button>
        </div>
        <div className="comment-status__actions">
          <button onClick={this.props.mail} title="Envoyer par email">
            <Icon icon="circle-notch" /> Mail
          </button>
          {status !== "success" &&
            status !== "error" && (
              <button
                onClick={this.props.sync}
                title="Forcer la synchronisation"
              >
                <Icon icon="redo" /> Réessayer
              </button>
            )}
          <button
            onClick={this.props.delete}
            title="Ne plus envoyer le message"
          >
            <Icon icon="trash" /> Supprimer
          </button>
        </div>
      </div>
    );
  }
}

class CommentsStatus extends Component {
  constructor() {
    super();
    this.state = {
      comments: {}
    };
    this.updateComments = this.updateComments.bind(this);
    this.sync = this.sync.bind(this);
    this.delete = this.delete.bind(this);
  }

  updateComments() {
    getComments().then(comments => {
      if (this.mounted) {
        this.setState({
          hasComments:
            comments.filter(({ data }) => data.title === this.props.page.title)
              .length > 0,
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

  mail(comment) {
    return () => {
      const a = document.createElement("a");
      const me = encodeURIComponent("Julien Pradet");
      const subject = encodeURIComponent(
        `Blog : Réponse à "${comment.data.title}"`
      );
      const body = encodeURIComponent(comment.data.comment);
      a.href = `mailto:${me}<julien@pradet.me>?subject=${subject}&body=${body}`;
      a.click();
    };
  }

  sync(comment) {
    return () => {
      if (
        "serviceWorker" in navigator &&
        "SyncManager" in window &&
        navigator.serviceWorker.controller
      ) {
        navigator.serviceWorker.ready.then(registration => {
          return registration.sync.register("comment");
        });
      }
    };
  }

  delete(comment) {
    return () => {
      return getComments()
        .then(comments => {
          return setComments(
            comments.filter(c => c.originalTime !== comment.originalTime)
          );
        })
        .then(() => this.updateComments());
    };
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
    if (!this.state.hasComments) {
      return (
        <Fragment>
          <hr />
          <p>Vous n'avez pas soumis de commentaires pour cet article.</p>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <hr />
        <div>
          {this.state.comments.error && (
            <div>
              <h3>Messages en erreur</h3>
              <div>
                {this.state.comments.error.map(comment => (
                  <CommentStatus
                    key={comment.originalTime}
                    comment={comment}
                    mail={this.mail(comment)}
                    delete={this.delete(comment)}
                    sync={this.sync(comment)}
                  />
                ))}
              </div>
            </div>
          )}
          {this.state.comments.sync && (
            <div>
              <h3>Messages restants à synchroniser</h3>
              <div>
                {this.state.comments.sync.map(comment => (
                  <CommentStatus
                    key={comment.originalTime}
                    comment={comment}
                    mail={this.mail(comment)}
                    delete={this.delete(comment)}
                    sync={this.sync(comment)}
                  />
                ))}
              </div>
            </div>
          )}
          {this.state.comments.success && (
            <div>
              <h3>Messages envoyés avec succès</h3>
              <div>
                {this.state.comments.success.map(comment => (
                  <CommentStatus
                    key={comment.originalTime}
                    comment={comment}
                    mail={this.mail(comment)}
                    delete={this.delete(comment)}
                    sync={this.sync(comment)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

export default CommentsStatus;
