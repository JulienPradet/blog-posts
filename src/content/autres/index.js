import React from "react";
import { setPageTitle } from "../../site/components/PageTitle";

const Autres = props =>
  <div>
    <p>Bienvenue dans les <strong>Autres Articles</strong>&nbsp;!</p>
    <p>
      Ce sont des articles <strong>que je n'ai pas su ranger</strong>.
      Je ne suis pas fermé à l'idée d'écrire sur d'autres sujets que
      le développement web. Alors forcément, j'ai des articles qui rentrent
      dans aucune case. :)
    </p>
  </div>;

export default setPageTitle("Autres Articles")(Autres);
