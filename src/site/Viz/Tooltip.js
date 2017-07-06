import React from "react";

const MAX_WIDTH = 250;

const Tooltip = props => {
  return (
    <div
      onMouseEnter={() =>
        props.onMouseEnter({ offset: props.offset, value: props.value })}
      onMouseLeave={() => props.onMouseLeave()}
      style={{
        position: "absolute",
        width: MAX_WIDTH,
        top: props.offset.top + 5,
        left: props.offset.left - MAX_WIDTH / 2,
        background: "#f0f0f0",
        zIndex: 2,
        padding: "1em",
        overflow: "auto"
      }}
    >
      {typeof props.value === "string"
        ? props.value
        : <pre style={{ margin: 0 }}>
            {JSON.stringify(props.value, null, 2)}
          </pre>}
    </div>
  );
};

export default Tooltip;
