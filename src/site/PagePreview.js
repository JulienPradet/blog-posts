import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "./dateFormats";

const ensureSlashs = url => {
  if (!url.startsWith("/")) url = `/${url}`;
  if (!url.endsWith("/")) url = `${url}/`;
  return url;
};

const PagePreview = ({ page }) =>
  <div className="page-preview">
    <Link to={ensureSlashs(page.location)} className="page-preview__title">
      {page.title}
    </Link>
    <div className="page-preview__meta">
      {page.date &&
        <time>
          {formatDate(page.date)}
        </time>}
    </div>
    <div className="page-preview__description">
      {page.description}
      {" "}
    </div>
    <div className="page-preview__read-more">
      <Link to={ensureSlashs(page.location)}>
        Lire la suite →
      </Link>
    </div>
  </div>;

export default PagePreview;
