import React, { Component } from "react";
import { formatSimpleDate } from "../../util/dateFormats";
import toCssId from "../../util/toCssId";
import AnimationElement from "../../components/Animation/Element";
import PagePreview from "./PagePreview";

class PageNavPreviewCategory extends Component {
  render() {
    return (
      <button
        onClick={this.onClick}
        title={this.props.page.category}
        aria-label={this.props.page.category}
      >
        -
      </button>
    );
  }
}

const PageNavPreview = ({ page }) => (
  <AnimationElement id={`page-preview["${page.location}"]`}>
    {({ setAnimatedElement }) => (
      <div
        className={`page-nav__item page-nav__item--${toCssId(page.category)}`}
        ref={setAnimatedElement}
      >
        <div className="timeline">
          <div className="page-nav__item__preview timeline__side">
            <PagePreview page={page} />
          </div>
          <div className="timeline__center page-nav__item__category">
            <PageNavPreviewCategory page={page} />
          </div>
          <div className="page-nav__item__meta timeline__side">
            <div>
              <time dateTime={new Date(page.date).toISOString()}>
                {formatSimpleDate(new Date(page.date))}
              </time>
            </div>
          </div>
        </div>
      </div>
    )}
  </AnimationElement>
);

export default PageNavPreview;
