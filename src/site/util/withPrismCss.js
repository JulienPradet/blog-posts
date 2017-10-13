import React from "react";
import Helmet from "react-helmet";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-css";
import prismCss from "./prism-onedark.css";

export default () => BaseComponent => {
  return class extends React.Component {
    constructor() {
      super();
      this.state = {
        loadCss: false
      };
      this.highlightMarkdown = this.highlightMarkdown.bind(this);
      this.highlightCode = this.highlightCode.bind(this);
    }

    componentDidMount() {
      this.setState({
        loadCss: true
      });
    }

    highlightCode(codeContainer) {
      if (codeContainer) {
        const code = codeContainer.querySelector("code").innerText;
        const highlightedCode = Prism.highlight(
          code,
          Prism.languages[codeContainer.dataset.lang]
        );
        codeContainer.querySelector("code").innerHTML = highlightedCode;
      }
    }

    highlightMarkdown(markdownContainer) {
      if (markdownContainer) {
        const codeContainers = markdownContainer.querySelectorAll("pre[class]");
        for (var i = 0; i < codeContainers.length; i++) {
          this.highlightCode(codeContainers[i]);
        }
      }
    }

    render() {
      return (
        <div>
          {this.state.loadCss && (
            <Helmet>
              <link rel="stylesheet" href={prismCss} />
            </Helmet>
          )}
          <BaseComponent
            {...this.props}
            markdownRef={this.highlightMarkdown}
            highlightCodeRef={this.highlightCode}
          />
        </div>
      );
    }
  };
};
