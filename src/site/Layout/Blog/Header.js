import React from "react";
import HeaderLinks from "./HeaderLinks";
import HeaderMotto from "./HeaderMotto";

const PageHeader = () => {
  return (
    <div className="header">
      <div className="header__title">
        <h1>
          <span>Enchanté,</span> <span>Julien&nbsp;Pradet</span>
        </h1>
      </div>
      <HeaderLinks />
      <HeaderMotto />
    </div>
  );
};

export default PageHeader;
