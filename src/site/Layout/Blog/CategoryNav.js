import React from "react";
import Link from "react-router-dom/Link";

const CategoryLine = ({ path, category }) => <Link to={path}>{category}</Link>;

const CategoryLines = () =>
  <div className="category-nav">
    <CategoryLine category="Tutoriels" path="/tutoriels" />
    <CategoryLine category="Fiches Techniques" path="/fiches-techniques" />
    <CategoryLine category="Expérimentations" path="/experimentations" />
    <CategoryLine category="Autres" path="/autres" />
  </div>;

export default CategoryLines;
