import React from "react";
import {
  Viz,
  Line,
  ObservableElement,
  SkipElement,
  Element
} from "../../../site/Viz";

const SendMessageViz = () => {
  const viz = (
    <Viz>
      <Line legend="sendMessageIntent$">
        <Element color="#7eb" preview="m1" value={{ content: "Salut!" }} />
        <SkipElement />
        <Element
          color="#be7"
          preview="m2"
          value={{ content: "Ca va et toi ?" }}
        />
      </Line>
      <Line legend="sendMessageRequest$">
        <Element color="#7eb" preview="p1" value={`Promise(...)`} />
        <SkipElement />
        <Element color="#be7" preview="p2" value={`Promise(...)`} />
      </Line>
      <Line legend="sendMessageResponse$$">
        <ObservableElement color="#7eb">
          <Element preview="m1'" value={{ content: "Salut!" }} />
        </ObservableElement>
        <SkipElement />
        <ObservableElement color="#be7">
          <Element preview="m2'" value={{ content: "Ca va et toi ?" }} />
        </ObservableElement>
      </Line>
      <Line legend="sendMessageResponse$">
        <SkipElement />
        <Element color="#7eb" preview="m1'" value={{ content: "Salut!" }} />
        <SkipElement />
        <Element
          color="#be7"
          preview="m2'"
          value={{ content: "Ca va et toi ?" }}
        />
      </Line>
      <Line legend="sentMessage$">
        <SkipElement />
        <Element
          color="#7eb"
          preview="s1"
          value={{ content: "Salut!", type: "sent_message" }}
        />
        <SkipElement />
        <Element
          color="#be7"
          preview="s2"
          value={{ content: "Ca va et toi ?", type: "sent_message" }}
        />
      </Line>
    </Viz>
  );

  return viz;
};

export default SendMessageViz;
