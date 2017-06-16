import React from "react";

class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
      standby: true
    };
    this.runDemo = this.runDemo.bind(this);
  }

  runDemo() {
    this.setState({ standby: false });
  }

  render() {
    return (
      <div className="demo">
        {this.state.standby
          ? <button onClick={this.runDemo} className="demo__launch">
              Run demo
            </button>
          : React.Children.only(this.props.children())}
      </div>
    );
  }
}

export default Demo;
