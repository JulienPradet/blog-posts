import React, { Component } from "react";
import Link from "react-router-dom/Link";

const CategoryLink = ({ category, path }) => <Link to={path}>{category}</Link>;

const Menu = ({ isOpened }) =>
  <div className={`menu menu--${isOpened ? "opened" : "closed"}`}>
    <ul>
      <li>
        <CategoryLink category="Tutoriels" path="/tutoriels/" />
      </li>
      <li>
        <CategoryLink category="Fiches Techniques" path="/fiches-techniques/" />
      </li>
      <li>
        <CategoryLink category="Expérimentations" path="/experimentations/" />
      </li>
      <li>
        <CategoryLink category="Autres" path="/autres/" />
      </li>
      <li>
        <Link to="/a-propos/">A propos</Link>
      </li>
    </ul>
    <ul>
      <li>
        <a href="mailto:julien@pradet.me?body=Hi! I found your mail on your blog and...">
          julien@pradet.me
        </a>
      </li>
      <li>
        <a href="https://twitter.com/JulienPradet">
          @JulienPradet
        </a>
      </li>
      <li>
        <a href="https://github.com/JulienPradet">
          JulienPradet
        </a>
      </li>
      <li>
        <Link to="/cv/">CV</Link>
      </li>
    </ul>
  </div>;

class HeaderLinks extends Component {
  constructor() {
    super();
    this.state = {
      opened: false
    };
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  openMenu() {
    this.setState({ opened: true });
  }
  closeMenu() {
    this.setState({ opened: true });
  }
  toggleMenu() {
    this.setState(state => ({ opened: !state.opened }));
  }

  render() {
    return (
      <div className="header__menu">
        <div className="header__menu__action">
          <button
            onClick={this.toggleMenu}
            title={this.state.opened ? "Close menu" : "Open menu"}
            className={this.state.opened ? "close" : "open"}
          >
            <span>+</span>
          </button>
        </div>
        <Menu isOpened={this.state.opened} />
      </div>
    );
  }
}

export default HeaderLinks;
