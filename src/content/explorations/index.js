import React from "react";
import { setPageTitle } from "../../site/components/PageTitle";

const Explorations = props =>
  <div>
    <p>Bienvenue dans les <strong>Explorations</strong>&nbsp;!</p>
    <p>
      Ce sont des articles <strong>rigolos</strong>. Leur but principal
      est de montrer comment je suis arrivé à tel ou tel résultat.
      Ce ne sont pas toujours des bonnes pratiques, ou des choses qui
      pourront servir dans d'autres contextes, mais sait-on jamais&nbsp;!
    </p>
  </div>;

export default setPageTitle("Explorations")(Explorations);
