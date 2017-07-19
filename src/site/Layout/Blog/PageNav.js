import React from "react";
import { withSite } from "../../Site";
import PageNavPreview from "./PageNavPreview";

const PageNav = ({ site, filter }) =>
  <div className="page-nav">
    {site.pages
      .filter(page => (typeof filter === "function" ? filter(page) : true))
      .map((page, index) => <PageNavPreview key={page.location} page={page} />)}
  </div>;

export default withSite(PageNav);
