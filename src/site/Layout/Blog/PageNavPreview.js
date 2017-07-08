import React, { Component } from "react";
import { formatDate } from "../../util/dateFormats";
import PagePreview from "./PagePreview";

class PageNavPreviewCategory extends Component {
  render() {
    return (
      <button onClick={this.onClick} title={this.props.page.category}>
        -
      </button>
    );
  }
}

const PageNavPreviewMeta = ({ page }) =>
  <div>
    <time dateTime={new Date(page.date).toISOString()}>
      {formatDate(new Date(page.date))}
    </time>
  </div>;

const PageNavPreview = ({ page }) =>
  <div className="page-nav__item">
    <div className="page-nav__item__preview">
      <PagePreview page={page} />
    </div>
    <div className="page-nav__item__category">
      <PageNavPreviewCategory page={page} />

    </div>
    <div className="page-nav__item__meta">
      <PageNavPreviewMeta page={page} />
    </div>
  </div>;

export default PageNavPreview;
