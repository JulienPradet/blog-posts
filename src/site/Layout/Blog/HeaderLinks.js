import React, { Component } from "react";
import PageLink from "../../components/PageLink";

const CategoryLink = ({ category, path }) =>
  <PageLink to={path}>
    {category}
  </PageLink>;

const Menu = ({ isOpened, toggleMenu }) =>
  <div
    className={`menu__wrapper menu__wrapper--${isOpened ? "opened" : "closed"}`}
  >
    {isOpened && <div className="menu__overlay" onClick={toggleMenu} />}
    <div className={`menu menu--${isOpened ? "opened" : "closed"}`}>
      <div className="menu__content">
        <div className="menu__content__item">
          <h3>Catégories</h3>
          <ul>
            <li>
              <CategoryLink category="Tutoriels" path="/tutoriels/" />
            </li>
            <li>
              <CategoryLink
                category="Fiches Techniques"
                path="/fiches-techniques/"
              />
            </li>
            <li>
              <CategoryLink category="Explorations" path="/explorations/" />
            </li>
            <li>
              <CategoryLink category="Autres" path="/autres/" />
            </li>
          </ul>
        </div>
        <div className="menu__content__item">
          <h3>Me contacter</h3>
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
              <PageLink to="/cv/">CV</PageLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
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
      <div className="header__menu timeline__center">
        <div className="header__menu__action">
          <button
            onClick={this.toggleMenu}
            title={this.state.opened ? "Close menu" : "Open menu"}
            className={this.state.opened ? "close" : "open"}
          >
            <span>+</span>
          </button>
        </div>
        <Menu isOpened={this.state.opened} toggleMenu={this.toggleMenu} />
      </div>
    );
  }
}

export default HeaderLinks;
