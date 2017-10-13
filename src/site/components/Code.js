import React from "react";
import withPrismCss from "../util/withPrismCss";

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
    return (
      this.props.lang !== nextProps.lang ||
      this.props.children !== nextProps.children ||
      this.state.width !== nextState.width
    );
  }

  getCode(codeFormats) {
    const code = codeFormats.code.find(
      ({ printWidth }, index) =>
        printWidth <= this.state.width || index === codeFormats.code.length - 1
    ).code;

    return code;
  }

  render() {
    return (
      <pre
        className={`language-${this.props.lang || "jsx"}`}
        data-lang={this.props.lang || "jsx"}
        ref={ref => {
          this.code = ref;
          this.props.highlightCodeRef(ref);
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
