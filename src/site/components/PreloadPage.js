import { Component } from "react";
import { withSite } from "../Site";

const loadedPages = [];

class PreloadPage extends Component {
  constructor() {
    super();
    this.load = this.load.bind(this);
  }

  load() {
    if (loadedPages.indexOf(this.props.location) === -1) {
      loadedPages.push(this.props.location);
      const Component = this.props.site.components[this.props.location];
      if (Component) {
        Component.load().catch(() => {
          if (typeof this.props.onMiss === "function") {
            this.props.onMiss();
          }
        });
      }
    }
  }

  render() {
    return this.props.children({ load: this.load });
  }
}

export default withSite(PreloadPage);
