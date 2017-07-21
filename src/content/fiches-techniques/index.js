import React from "react";
import { setPageTitle } from "../../site/components/PageTitle";

const FichesTechniques = props =>
  <div>
    <p>Bienvenue dans les <strong>Fiches Techniques</strong>&nbsp;!</p>
    <p>
      Ce sont des articles <strong>mémos</strong>. Leur but principal
      est d'exposer comment fonctionne une certaine technique en mettant
      à disposition des exemples de code et de brèces explications.
      A la fin de ceux-ci, si vous faites des copier/coller, vous devriez
      avoir quelque chose qui fonctionne.
    </p>
  </div>;

export default setPageTitle("Fiches Techniques")(FichesTechniques);
