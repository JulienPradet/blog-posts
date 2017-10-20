import React from "react";
import PageLink from "../site/components/PageLink";
import { withSite } from "../site/Site";
import toCssId from "../site/util/toCssId";
import home from "./home.md";

const Category = withSite(({ name, site }) => {
  const pageNumber = site.pages.filter(({ category }) => category === name)
    .length;

  return (
    <li className={toCssId(name)}>
      <PageLink to={`/${toCssId(name)}/`}>
        {name} ({pageNumber})
      </PageLink>
    </li>
  );
});

const Home = () => (
  <div>
    <div dangerouslySetInnerHTML={{ __html: home }} />
    <ul className="category-list">
      <Category name="Tutoriels" />
      <Category name="Fiches Techniques" />
      <Category name="Explorations" />
      <Category name="Autres" />
    </ul>
  </div>
);

export default withSite(Home);
