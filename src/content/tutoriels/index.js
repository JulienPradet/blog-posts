import React from "react";
import { setPageTitle } from "../../site/components/PageTitle";

const Tutoriels = props =>
  <div>
    <p>Bienvenue dans les <strong>Tutoriels</strong>&nbsp;!</p>
    <p>
      J'y présente <strong>comment</strong> et surtout{" "}
      <strong>pourquoi</strong> faire les choses. Le
      contenu y est souvent dense et se concentre sur les{" "}
      <strong>bonnes pratiques</strong> plutôt que sur
      la technique.
    </p>
  </div>;

export default setPageTitle("Tutoriels")(Tutoriels);
