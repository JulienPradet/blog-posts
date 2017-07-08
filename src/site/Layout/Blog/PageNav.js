import React from "react";
import { withSite } from "../../Site";
import PageNavPreview from "./PageNavPreview";

const PageNav = ({ site }) =>
  <div className="page-nav">
    {site.pages.map((page, index) =>
      <PageNavPreview key={page.location} page={page} />
    )}
  </div>;

export default withSite(PageNav);
