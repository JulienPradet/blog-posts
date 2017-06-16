import React from "react";
import withPrismCss from "./withPrismCss";

class Code extends React.Component {
  constructor() {
    super();
    this.state = {
      width: 70
    };
    this.updatePrintWidth = this.updatePrintWidth.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.updatePrintWidth);
    this.updatePrintWidth();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePrintWidth);
  }

  updatePrintWidth() {
    this.setState({
      width: Math.max(
        40,
        Math.floor(Math.min(600, this.code.offsetWidth) / 8.5)
      )
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.lang !== nextProps.lang ||
      this.props.children !== nextProps.children ||
      this.state.width !== nextState.width;
  }

  getCode(codeFormats) {
    return codeFormats.find(
      ({ printWidth }, index) =>
        printWidth <= this.state.width || index === codeFormats.length - 1
    ).code;
  }

  render() {
    return (
      <pre
        className={`language-${this.props.lang || "jsx"}`}
        ref={node => {
          this.code = node;
        }}
      >
        <code
          dangerouslySetInnerHTML={{
            __html: this.getCode(this.props.children)
          }}
        />
      </pre>
    );
  }
}

export default withPrismCss()(Code);
