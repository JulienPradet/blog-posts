import React from "react";
import Svg from "react-svg-inline";
import twitterSvg from "../../icons/iconmonstr-twitter-1.svg";
import githubSvg from "../../icons/iconmonstr-github-1.svg";

const GlobalFooter = ({ isPost }) => (
  <footer className={`footer ${isPost ? "footer--is-post" : ""}`}>
    <ul>
      <li>
        <a href={`https://twitter.com/JulienPradet`}>
          <Svg svg={twitterSvg} cleanup />
          <span className="name">@JulienPradet</span>
        </a>
      </li>
      <li>
        <a href={`https://github.com/JulienPradet/blog-posts`}>
          <Svg svg={githubSvg} cleanup />
          <span className="name">JulienPradet</span>
        </a>
      </li>
    </ul>
  </footer>
);

export default GlobalFooter;
