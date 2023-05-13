import React, { Children } from "react";
import Line from "./Line.jsx";
import Tooltip from "./Tooltip.jsx";
import { SpyProvider, SpySubscriber, SpyTarget } from "../Spy";

const DEFAULT_WIDTH = 400;
const VERTICAL_PADDING = 10;

const getDataFromChildren = ({ children, width }) => {
  const length = children
    .map(child => {
      if (child.type === Line) {
        return Line.getLength(child.props);
      } else {
        return 0;
      }
    })
    .reduce((maxLength, childLength) => Math.max(maxLength, childLength), 0);

  const childrenData = children
    .map(child => {
      if (child.type === Line) {
        return Line.getData(
          {
            ...child.props,
            length: child.props.length || length
          },
          { width }
        );
      } else {
        return null;
      }
    })
    .filter(data => data !== null);

  return {
    children: childrenData
  };
};

const getViewBox = data => {
  const viewBox = data.children
    .filter(data => data !== null)
    .reduce(
      (viewBox, child) => ({
        width: Math.max(viewBox.width, child.viewBox.width),
        height: viewBox.height + child.viewBox.height + VERTICAL_PADDING
      }),
      { width: 0, height: 0 }
    );

  return {
    width: viewBox.width,
    height: viewBox.height - VERTICAL_PADDING
  };
};

class Viz extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  computeState(props) {
    const data = getDataFromChildren({
      width: props.width,
      children: Children.toArray(props.children)
    });
    const viewBox = getViewBox(data);
    return {
      data,
      viewBox
    };
  }

  onMouseEnter({ offset, value, color }) {
    if (this.clearTimeout) {
      clearTimeout(this.clearTimeout);
      this.clearTimeout = null;
    }

    this.setState({
      tooltip: {
        offset,
        value,
        color
      }
    });
  }

  onMouseLeave() {
    this.clearTimeout = setTimeout(() => {
      this.setState({ tooltip: null });
      this.clearTimeout = null;
    }, 300);
  }

  getLines(data) {
    const children = data.children.filter(child => child.Component);

    return children.reduce(
      ({ children, offset }, { Component, viewBox }, index) => {
        const element = (
          <g key={index} transform={`translate(${offset.left}, ${offset.top})`}>
            <Component
              onMouseEnter={({ offset: childOffset, ...element }) =>
                this.onMouseEnter({
                  ...element,
                  offset: {
                    left: offset.left + childOffset.left,
                    top: offset.top + childOffset.top
                  }
                })
              }
              onMouseLeave={this.onMouseLeave}
            />
          </g>
        );

        return {
          children: [...children, element],
          offset: {
            left: offset.left,
            top: offset.top + viewBox.height + VERTICAL_PADDING
          }
        };
      },
      { children: [], offset: { top: 0, left: 0 } }
    ).children;
  }

  render() {
    return (
      <SpyProvider>
        <SpyTarget name="container">
          {({ setSpyTarget }) => (
            <div
              style={{ position: "relative", margin: "1.5em 0" }}
              ref={setSpyTarget}
            >
              {this.state.tooltip && (
                <Tooltip
                  {...this.state.tooltip}
                  onMouseEnter={this.onMouseEnter}
                  onMouseLeave={this.onMouseLeave}
                />
              )}

              <SpySubscriber>
                {({ container }) => {
                  const { data, viewBox } = this.computeState({
                    ...this.props,
                    width: container
                      ? container.getBoundingClientRect().width
                      : DEFAULT_WIDTH
                  });
                  const lines = this.getLines(data);

                  return (
                    <svg viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}>
                      {lines}
                    </svg>
                  );
                }}
              </SpySubscriber>
            </div>
          )}
        </SpyTarget>
      </SpyProvider>
    );
  }
}

export default Viz;
