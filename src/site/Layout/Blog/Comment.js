import React from "react";

class Comment extends React.Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const keys = formData.entries();
    let data = {
      "form-name": form.attributes.name.value
    };
    for (var [key, value] of keys) {
      data[key] = value;
    }

    const body = Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body
    })
      .then(response => {
        if (response.status === 200) {
          console.log("youpi");
        } else {
          console.error(response);
        }
      })
      .catch(error => console.error("oops"));
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
          <input type="hidden" name="title" value={page.title} />
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
            <button type="submit">Envoyer</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Comment;
