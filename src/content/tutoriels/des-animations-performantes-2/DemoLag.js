import React from "react";

class MovingBoxShadow extends React.Component {
  constructor() {
    super();
    this.state = {
      animating: true
    };
    this.toggleAnimation = this.toggleAnimation.bind(this);
    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    window.requestAnimationFrame(this.animate);
  }

  animate(t) {
    if (this.state.animating) {
      const pos = Math.sin(t / 1000) * 80 + 80;
      this.node.style.transform = `translate(${pos}px)`;
      window.requestAnimationFrame(this.animate);
    }
  }

  toggleAnimation() {
    this.setState({ animating: !this.state.animating }, () =>
      window.requestAnimationFrame(this.animate)
    );
  }

  render() {
    return (
      <div id={`${this.props.id}-container`} onClick={this.toggleAnimation}>
        <style
          dangerouslySetInnerHTML={{
            __html: `
        #${this.props.id}-container {
          position: relative;
          margin: 0em auto;
          height: 300px;
          overflow: hidden;
        }
        #${this.props.id}-container .button {
          position: absolute;
          bottom: 0;
          width: 100%;
          opacity: 0.7;
          font-size: 0.8em;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
        }
        #${this.props.id}-box {
          position: absolute;
          top: 80px;
          left: 80px;
          width: 200px;
          padding: 20px;
          background: #ffffff;
          box-shadow:
          0.25em 0.25em 3em #ffff77,
          0.25em 0.25em 3em #ffff77,
          0.25em 0.25em 3em #ffff77,
          0.25em 0.25em 3em #ffff77,
          0.25em 0.25em 3em #ffff77,
          0.25em 0.25em 3em #ffff77,
          0.25em 0.25em 3em #ffff77,
          0.25em 0.25em 3em #ffff77,
          0.25em 0.25em 3em #ffff77,
          0.25em 0.25em 3em #ffff77,
          0.25em 0.25em 3em #ffff77,
          0.25em 0.25em 3em #ffff77,
          0.25em 0.25em 3em #ffff77,
          0.25em 0.25em 3em #ffff77,
          0.25em 0.25em 3em #ffff77,
          0.25em 0.25em 3em #ffff77,
          0.25em 0.25em 3em #ffff77,
          0.25em 0.25em 3em #ffff77,
          0.25em 0.25em 3em #ffff77,
          0.25em 0.25em 3em #ffff77,
          0.25em 0.25em 3em #ffff77,
          0.25em 0.25em 3em #ffff77,
          0.25em 0.25em 3em #ffff77,
          0.25em 0.25em 3em #ffff77,
          0.25em 0.25em 3em #ffff77,
          0.25em 0.25em 3em #ffff77,
          0.25em 0.25em 3em #ffff77,
          0.25em 0.25em 3em #ffff77,
          0.25em 0.25em 3em #ffff77,
          0.25em 0.25em 3em #ffff77,
          0.25em 0.25em 5em #ff77ff,
          0.25em 0.25em 5em #ff77ff,
          0.25em 0.25em 5em #ff77ff,
          0.25em 0.25em 5em #ff77ff,
          0.25em 0.25em 5em #ff77ff,
          0.25em 0.25em 5em #ff77ff,
          0.25em 0.25em 5em #ff77ff,
          0.25em 0.25em 5em #ff77ff,
          0.25em 0.25em 5em #ff77ff,
          0.25em 0.25em 5em #ff77ff,
          0.25em 0.25em 5em #ff77ff,
          0.25em 0.25em 5em #ff77ff,
          0.25em 0.25em 5em #ff77ff,
          0.25em 0.25em 5em #ff77ff,
          0.25em 0.25em 5em #ff77ff,
          0.25em 0.25em 5em #ff77ff,
          0.25em 0.25em 5em #ff77ff,
          0.25em 0.25em 5em #ff77ff,
          0.25em 0.25em 5em #ff77ff,
          0.25em 0.25em 5em #ff77ff,
          0.25em 0.25em 5em #ff77ff,
          0.25em 0.25em 5em #ff77ff,
          0.25em 0.25em 5em #ff77ff,
          0.25em 0.25em 5em #ff77ff,
          0.25em 0.25em 5em #ff77ff,
          0.25em 0.25em 5em #ff77ff,
          0.25em 0.25em 5em #ff77ff,
          0.25em 0.25em 5em #ff77ff,
          0.25em 0.25em 5em #ff77ff,
          0.25em 0.25em 5em #ff77ff,
          0.25em 0.25em 7em #77ffff,
          0.25em 0.25em 7em #77ffff,
          0.25em 0.25em 7em #77ffff,
          0.25em 0.25em 7em #77ffff,
          0.25em 0.25em 7em #77ffff,
          0.25em 0.25em 7em #77ffff,
          0.25em 0.25em 7em #77ffff,
          0.25em 0.25em 7em #77ffff,
          0.25em 0.25em 7em #77ffff,
          0.25em 0.25em 7em #77ffff,
          0.25em 0.25em 7em #77ffff,
          0.25em 0.25em 7em #77ffff,
          0.25em 0.25em 7em #77ffff,
          0.25em 0.25em 7em #77ffff,
          0.25em 0.25em 7em #77ffff,
          0.25em 0.25em 7em #77ffff,
          0.25em 0.25em 7em #77ffff,
          0.25em 0.25em 7em #77ffff,
          0.25em 0.25em 7em #77ffff,
          0.25em 0.25em 7em #77ffff,
          0.25em 0.25em 7em #77ffff,
          0.25em 0.25em 7em #77ffff,
          0.25em 0.25em 7em #77ffff,
          0.25em 0.25em 7em #77ffff,
          0.25em 0.25em 7em #77ffff,
          0.25em 0.25em 7em #77ffff,
          0.25em 0.25em 7em #77ffff,
          0.25em 0.25em 7em #77ffff,
          0.25em 0.25em 7em #77ffff,
          0.25em 0.25em 7em #77ffff
          ;
          ${this.props.fast && "will-change: transform;"}
        }
    `
          }}
        />
        <div id={`${this.props.id}-box`} ref={node => (this.node = node)}>
          Bonjour,
          Je suis une boîte avec des propriétés couteuses.
        </div>
        <button className="button" onClick={this.toggleAnimation}>
          {this.state.animating
            ? "Cliquer pour mettre en pause"
            : "Cliquer pour animer"}
        </button>
      </div>
    );
  }
}

export default MovingBoxShadow;
