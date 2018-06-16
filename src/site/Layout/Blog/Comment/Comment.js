import React, { Component, Fragment } from "react";
import sendComment from "./sendComment";
import CommentsRecap from "./CommentsRecap";
import CommentsStatus from "./CommentsStatus";

const getMessage = type => {
  if (type === "success") {
    return <Fragment>✓ Bien reçu !</Fragment>;
  } else if (type === "sync") {
    return null;
  } else {
    return (
      <Fragment>
        <span className="error">
          Je suis désolé, mais c'est buggé. :/
          <br />
          N'hésitez pas à me <a href="mailto:julien@pradet.me">
            contacter
          </a>{" "}
          pour que je corrige ça au plus vite&nbsp;!
        </span>
      </Fragment>
    );
  }
};

const getDataFromForm = form => {
  let data = {
    "form-name": form.attributes.name.value
  };

  const formData = new FormData(form);
  const keys = formData.entries();
  for (var [key, value] of keys) {
    data[key] = value;
  }

  return data;
};

const sendForm = form => {
  const data = getDataFromForm(form);

  return sendComment(data)
    .then(type => {
      if (type === "success" || type === "sync") {
        form.reset();
      }
      return type;
    })
    .then(type => {
      return getMessage(type);
    });
};

class Comment extends Component {
  constructor() {
    super();
    this.state = {
      loading: false
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    this.timeout = setTimeout(() => {
      this.setState({ loading: true });
    }, 100);

    sendForm(e.target).then(message => {
      clearTimeout(this.timeout);
      this.setState({
        loading: false,
        message: message
      });
    });
  }

  render() {
    const page = this.props.page;

    return (
      <div className="comment">
        <h2>Quelque chose à ajouter ? :)</h2>
        <form
          onSubmit={this.onSubmit}
          name="comment"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="trap"
        >
          <div style={{ display: "none" }}>
            <input type="hidden" name="title" value={page.title} />
          </div>
          <input type="hidden" name="trap" />
          <div className="comment-field">
            <label htmlFor="name">
              Votre nom
              <span className="small">celui qui vous plait</span>
            </label>
            <input type="text" id="name" name="name" />
          </div>
          <div className="comment-field">
            <label htmlFor="comment">
              Votre message
              <span className="small">en markdown si vous voulez</span>
            </label>
            <textarea required id="comment" name="comment" />
          </div>
          <div className="comment-field">
            <label htmlFor="public" className="checkbox">
              <input type="checkbox" id="public" name="public" />
              Souhaitez-vous que ce message soit public&nbsp;?
              <p className="small">
                Si oui, il sera ajouté en fin d'article, dès que j'aurai eu le
                temps de le publier.
              </p>
            </label>
          </div>
          <div className="comment-actions">
            <div className="comment-actions__button">
              <button type="submit" disabled={this.state.loading}>
                {this.state.loading ? "Envoi en cours..." : "Envoyer"}
              </button>
            </div>
            <div className="comment-actions__status">
              <CommentsStatus page={page} />
            </div>
          </div>
          {this.state.message && <p>{this.state.message}</p>}
        </form>
        <CommentsRecap page={page} />
      </div>
    );
  }
}

export default Comment;
