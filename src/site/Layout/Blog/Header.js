import React from "react";
import PageLink from "../../components/PageLink";
import HeaderLinks from "./HeaderLinks";
import HeaderMotto from "./HeaderMotto";
import { withPageTitle } from "../../components/PageTitle";

const PageHeader = props => {
  const TitleComponent = props.page.isHome && !props.page.filter ? "h1" : "h2";

  return (
    <div className="header timeline">
      <div className="header__title timeline__side">
        <TitleComponent>
          <PageLink to="/">
            <span>Enchanté,</span> <span>Julien&nbsp;Pradet</span>
          </PageLink>
        </TitleComponent>
      </div>
      <HeaderLinks />
      <HeaderMotto isHome={props.page.isHome && props.page.removeTitle} />
    </div>
  );
};

export default withPageTitle("title")(PageHeader);
