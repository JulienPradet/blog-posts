import React from "react";
import getDisplayName from "./util/getDisplayName";

class SiteProvider extends React.Component {
  getChildContext() {
    return {
      site: {
        meta: this.props.meta,
        pages: this.props.pages.map(page => {
          return Object.assign({}, page, {
            date: page.date && new Date(page.date),
            isPage: typeof page.isPage === "undefined" ? true : page.isPage
          });
        })
      }
    };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

SiteProvider.childContextTypes = {
  site: React.PropTypes.object.isRequired
};

SiteProvider.propTypes = {
  meta: React.PropTypes.any.isRequired,
  pages: React.PropTypes.any.isRequired,
  children: React.PropTypes.node.isRequired
};

export const withSite = Component => {
  const withSiteComponent = (props, context) => (
    <Component site={context.site} {...props} />
  );

  withSiteComponent.contextTypes = {
    site: React.PropTypes.object.isRequired
  };

  withSiteComponent.displayName = `withSite(${getDisplayName(Component)})`;

  return withSiteComponent;
};

export default SiteProvider;
