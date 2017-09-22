import React from "react";
import PropTypes from "prop-types";
import getDisplayName from "./util/getDisplayName";

class SiteProvider extends React.Component {
  getChildContext() {
    return {
      site: {
        meta: this.props.meta,
        pages: this.props.pages,
        components: this.props.components
      }
    };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

SiteProvider.childContextTypes = {
  site: PropTypes.shape({
    meta: PropTypes.any.isRequired,
    pages: PropTypes.any.isRequired,
    components: PropTypes.any.isRequired
  }).isRequired
};

SiteProvider.propTypes = {
  meta: PropTypes.any.isRequired,
  pages: PropTypes.any.isRequired,
  components: PropTypes.any.isRequired,
  children: PropTypes.node.isRequired
};

export const withSite = Component => {
  const withSiteComponent = (props, context) => (
    <Component site={context.site} {...props} />
  );

  withSiteComponent.contextTypes = {
    site: PropTypes.object.isRequired
  };

  withSiteComponent.displayName = `withSite(${getDisplayName(Component)})`;

  return withSiteComponent;
};

export default SiteProvider;
