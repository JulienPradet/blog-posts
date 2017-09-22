import React from "react";
import Link from "react-router-dom/Link";
import PreloadPage from "./PreloadPage";

const PageLink = ({ to, children, ...rest }) => (
  <PreloadPage location={to}>
    {({ load }) => (
      <Link onMouseEnter={load} onFocus={load} to={to} {...rest}>
        {children}
      </Link>
    )}
  </PreloadPage>
);

export default PageLink;
