import React from "react";
import PropTypes from "prop-types";
import { withSite } from "./Site";
import makeHelmet from "./util/makeHelmet";
import getLayout from "./util/getLayout";

class Page extends React.Component {
  constructor() {
    super();
    this.state = { appendCodeCss: false };
  }

  componentDidMount() {
    this.setState({ appendCodeCss: true });
    window.scrollTo(0, 0);
  }

  render() {
    const helmet = makeHelmet(this.props);
    const Layout = getLayout(this.props.page.layout);
    console.log(this.props);

    return (
      <Layout
        page={this.props.page}
        path={this.props.path}
        site={this.props.site}
        helmet={helmet}
      >
        {this.props.children}
      </Layout>
    );
  }
}

Page.propTypes = {
  site: PropTypes.shape({
    meta: PropTypes.shape({
      homepage: PropTypes.string.isRequired,
      site_name: PropTypes.string.isRequired,
      author: PropTypes.shape({
        name: PropTypes.string.isRequired
      }).isRequired
    }),
    pages: PropTypes.array.isRequired
  }),
  path: PropTypes.string.isRequired,
  page: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string,
    twitter: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string
    })
  }).isRequired,
  standalone: PropTypes.bool,
  isHome: PropTypes.bool,
  isPost: PropTypes.bool,
  children: PropTypes.node.isRequired
};

Page.defaultProps = {
  isHome: false,
  standalone: false
};

Page.defaultProps = {
  page: {}
};

export default withSite(Page);
