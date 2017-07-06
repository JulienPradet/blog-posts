import React from "react";
import {
  Viz,
  Line,
  Element,
  SkipElement,
  ObservableElement
} from "../../../site/Viz";

const ReceiveMessageViz = () => {
  const viz = (
    <Viz>
      <Line legend="sendMessageEvent$">
        <ObservableElement color="#b7e" preview="$">
          <Element preview="e1" value={{ target: { sourceTarget: "..." } }} />
        </ObservableElement>
        <SkipElement />
        <ObservableElement>
          <Element
            color="#b7e"
            preview="e1"
            value={{ target: { sourceTarget: "..." } }}
          />
        </ObservableElement>
      </Line>
      <SkipElement />
      <Line legend="sendMessageEvent$">
        <Element
          color="#b7e"
          preview="e1"
          value={{ target: { sourceTarget: "..." } }}
        />
        <Element
          color="#b7e"
          preview="e2"
          value={{ target: { sourceTarget: "..." } }}
        />
        <Element
          color="#b7e"
          preview="e1"
          value={{ target: { sourceTarget: "..." } }}
        />
      </Line>
    </Viz>
  );

  return viz;
};

export default ReceiveMessageViz;
