import React, { Component } from "react";
import { withSite } from "../../Site";
import PageNavPreview from "./PageNavPreview";

class PageNav extends Component {
  constructor(props) {
    super();
    this.state = {
      pages: props.site.pages.filter(
        page => (typeof props.filter === "function" ? props.filter(page) : true)
      )
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(() => ({
      pages: nextProps.site.pages.filter(
        page =>
          typeof nextProps.filter === "function" ? nextProps.filter(page) : true
      )
    }));
  }

  render() {
    return (
      <div className="page-nav">
        {this.state.pages.map((page, index) => (
          <PageNavPreview key={page.location} page={page} />
        ))}
      </div>
    );
  }
}

export default withSite(PageNav);
