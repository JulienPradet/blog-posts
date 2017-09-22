import React, { Component, Children } from "react";
import PropTypes from "prop-types";

class PageTitleProvider extends Component {
  constructor() {
    super();
    this.state = {
      title: null
    };
  }

  getChildContext() {
    return {
      pageTitle: {
        get: () => this.state.title,
        set: titleReducer =>
          this.setState(({ title }) => ({
            title:
              typeof titleReducer === "function"
                ? titleReducer(title)
                : titleReducer
          }))
      }
    };
  }

  render() {
    return Children.only(this.props.children);
  }
}
PageTitleProvider.childContextTypes = {
  pageTitle: PropTypes.shape({
    get: PropTypes.func.isRequired,
    set: PropTypes.func.isRequired
  }).isRequired
};

const setPageTitle = title => BaseComponent => {
  class SetPageTitle extends Component {
    getTitle() {
      return typeof title === "function" ? title(this.props) : title;
    }

    updateTitle() {
      this.context.pageTitle.set(this.getTitle());
    }

    removeTitle() {
      this.context.pageTitle.set(
        title => (title === this.getTitle() ? null : title)
      );
    }

    componentDidMount() {
      this.updateTitle();
    }

    componentWillUnmount() {
      this.removeTitle();
    }

    render() {
      return <BaseComponent {...this.props} />;
    }
  }

  SetPageTitle.contextTypes = {
    pageTitle: PropTypes.shape({
      set: PropTypes.func.isRequired
    }).isRequired
  };

  return SetPageTitle;
};

const withPageTitle = (propName = "title") => BaseComponent => {
  class WithPageTitle extends Component {
    render() {
      const props = {
        ...this.props,
        [propName]: this.context.pageTitle.get()
      };
      return <BaseComponent {...props} />;
    }
  }

  WithPageTitle.contextTypes = {
    pageTitle: PropTypes.shape({
      get: PropTypes.func.isRequired
    }).isRequired
  };

  return WithPageTitle;
};

export { PageTitleProvider, setPageTitle, withPageTitle };
