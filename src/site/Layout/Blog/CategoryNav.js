import React from "react";
import withRouter from "react-router/withRouter";
import PageLink from "../../components/PageLink";

const CategoryLine = withRouter(
  ({ path, category, location }) =>
    location.pathname === path
      ? <PageLink className="category-nav__line" to="/">
          Revenir à l'accueil
        </PageLink>
      : <PageLink className="category-nav__line" to={path}>{category}</PageLink>
);

const CategoryLines = () =>
  <div className="category-nav">
    <CategoryLine category="Tutoriels" path="/tutoriels/" />
    <CategoryLine category="Fiches Techniques" path="/fiches-techniques/" />
    <CategoryLine category="Explorations" path="/explorations/" />
    <CategoryLine category="Autres" path="/autres/" />
  </div>;

export default CategoryLines;
