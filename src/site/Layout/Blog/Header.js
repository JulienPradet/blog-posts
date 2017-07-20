import React from "react";
import PageLink from "../../components/PageLink";
import HeaderLinks from "./HeaderLinks";
import HeaderMotto from "./HeaderMotto";

const PageHeader = () => {
  return (
    <div className="header">
      <div className="header__title">
        <h1>
          <PageLink to="/">
            <span>Enchanté,</span> <span>Julien&nbsp;Pradet</span>
          </PageLink>
        </h1>
      </div>
      <HeaderLinks />
      <HeaderMotto />
    </div>
  );
};

export default PageHeader;
