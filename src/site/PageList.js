import React from "react";
import { withSite } from "./Site";
import PagePreview from "./PagePreview";

const PageList = props => {
  return (
    <div>
      <h2>Les derniers articles</h2>

      <ul className="page-list">
        {props.site.pages
          .sort((pageA, pageB) => {
            if (pageA.date < pageB.date) {
              return 1;
            } else if (pageA.date > pageB.date) {
              return -1;
            }
            return 0;
          })
          .slice(0, props.length > 0 ? props.length : undefined)
          .map(page =>
            <li key={page.location} className="page-list__item">
              <PagePreview page={page} />
            </li>
          )}
      </ul>
    </div>
  );
};

export default withSite(PageList);
