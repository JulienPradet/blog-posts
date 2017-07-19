import React from "react";
import Link from "react-router-dom/Link";
import HeaderLinks from "./HeaderLinks";
import HeaderMotto from "./HeaderMotto";

const PageHeader = () => {
  return (
    <div className="header">
      <div className="header__title">
        <h1>
          <Link to="/">
            <span>Enchanté,</span> <span>Julien&nbsp;Pradet</span>
          </Link>
        </h1>
      </div>
      <HeaderLinks />
      <HeaderMotto />
    </div>
  );
};

export default PageHeader;
