import React from "react";
import withRouter from "react-router/withRouter";
import PageLink from "../../components/PageLink";
import toCssId from "../../util/toCssId";

const CategoryLine = withRouter(({ path, category, location }) => {
  const className = `category-nav__line category-nav__line--${toCssId(
    category
  )}`;

  return location.pathname === path ? (
    <PageLink className={className} to="/" title="Revenir à l'accueil">
      Revenir à l'accueil
    </PageLink>
  ) : (
    <PageLink className={className} to={path} title={category}>
      {category}
    </PageLink>
  );
});

const CategoryLines = () => (
  <div className="category-nav" aria-hidden="true">
    <CategoryLine category="Tutoriels" path="/tutoriels/" />
    <CategoryLine category="Fiches Techniques" path="/fiches-techniques/" />
    <CategoryLine category="Explorations" path="/explorations/" />
    <CategoryLine category="Autres" path="/autres/" />
  </div>
);

export default CategoryLines;
