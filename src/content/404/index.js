import React from "react";
import Link from "react-router-dom/Link";

const Home = () => (
  <div style={{ textAlign: "center" }}>
    <h1>Malheureusement, ce lien est cassé. :(</h1>

    <p>
      N'hésitez pas à <a href="https://twitter.com/JulienPradet">
        me prévenir
      </a>{" "}
      pour que je le corrige !
    </p>

    <p>
      <Link to="/">Revenir à la page d'accueil</Link>
    </p>
  </div>
);

export default Home;
