import React from "react";

const PageFooter = props => (
  <footer className="page-footer">
    Si vous voulez suivre mes publications, il paraît que j'ai un feed
    {" "}
    <a href="/feed.xml">RSS</a>
    {" "}
    et un
    {" "}
    <a href="https://twitter.com/JulienPradet">Twitter</a>
    .
    <br />
    Si vous pensez à d'autres méthodes que vous voudriez que je mette en place (pigeon voyageur, avion en papier, etc.), n'hésitez pas à me les proposer :)
  </footer>
);

export default PageFooter;
