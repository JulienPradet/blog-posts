import React from "react";
import Link from "react-router-dom/Link";
import withRouter from "react-router-dom/withRouter";

const CategoryLine = withRouter(
  ({ path, category, location, history }) =>
    location.pathname === path
      ? <span className="category-nav__line" onClick={() => history.push("/")}>
          {category}
        </span>
      : <Link className="category-nav__line" to={path}>{category}</Link>
);

const CategoryLines = () =>
  <div className="category-nav">
    <CategoryLine category="Tutoriels" path="/tutoriels/" />
    <CategoryLine category="Fiches Techniques" path="/fiches-techniques/" />
    <CategoryLine category="Expérimentations" path="/experimentations/" />
    <CategoryLine category="Autres" path="/autres/" />
  </div>;

export default CategoryLines;
