import React, { Component, Fragment } from "react";
import sendComment from "./sendComment";

const getMessage = type => {
  if (type === "success") {
    return <Fragment>J'ai bien reçu votre message !</Fragment>;
  } else if (type === "error") {
    return (
      <Fragment>
        <span class="error">
          Je suis désolé, mais c'est buggé. :/
          <br />
          N'hésitez pas à me <a href="mailto:julien@pradet.me">
            contacter
          </a>{" "}
          pour que je corrige ça au plus vite&nbsp;!
        </span>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <span class="warn">
          Oops, il y a eu une erreur. Mais pas de panique, votre message est
          sauvegardé dans votre navigateur. On va réessayer de l'envoyer un peu
          plus tard.
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

  return sendComment(data).then(type => {
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

    this.setState({ loading: true });
    sendForm(e.target).then(message => {
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
          <div class="comment-field">
            <label for="name">
              Votre nom
              <span class="small">celui qui vous plait</span>
            </label>
            <input type="text" id="name" name="name" />
          </div>
          <div class="comment-field">
            <label for="comment">
              Votre message
              <span class="small">en markdown si vous voulez</span>
            </label>
            <textarea required id="comment" name="comment" />
          </div>
          <div class="comment-field">
            <label for="public" class="checkbox">
              <input type="checkbox" id="public" name="public" />
              Souhaitez-vous que ce message soit public&nbsp;?
              <p class="small">
                Si oui, il sera ajouté en fin d'article, dès que j'aurai eu le
                temps de le publier.
              </p>
            </label>
          </div>
          <div class="comment-actions">
            {this.state.loading && <p>Envoi en cours...</p>}
            <button type="submit" disabled={this.state.loading}>
              Envoyer
            </button>
            <p>{this.state.message}</p>
          </div>
        </form>
      </div>
    );
  }
}

export default Comment;
