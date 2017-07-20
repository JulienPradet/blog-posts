import { Component } from "react";
import { withSite } from "../Site";

class PreloadPage extends Component {
  constructor() {
    super();
    this.load = this.load.bind(this);
  }

  load() {
    const Component = this.props.site.components[this.props.location];
    if (Component) {
      Component.load();
    }
  }

  render() {
    return this.props.children({ load: this.load });
  }
}

export default withSite(PreloadPage);
