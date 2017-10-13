import React from "react";
import PageLink from "../PageLink";
import { formatDate } from "../../util/dateFormats";

const ensureSlashs = url => {
  if (!url.startsWith("/")) url = `/${url}`;
  if (!url.endsWith("/")) url = `${url}/`;
  return url;
};

const PagePreview = ({ page }) => (
  <div className="page-preview">
    <PageLink to={ensureSlashs(page.location)} className="page-preview__title">
      {page.title}
    </PageLink>
    <div className="page-preview__meta">
      {page.date && <time>{formatDate(page.date)}</time>}
    </div>
    <div className="page-preview__description">{page.description} </div>
    <div className="page-preview__read-more">
      <PageLink to={ensureSlashs(page.location)}>Lire la suite →</PageLink>
    </div>
  </div>
);

export default PagePreview;
