import React from "react";
import {
  Viz,
  Line,
  SkipElement,
  StartElement,
  Element
} from "../../../site/Viz";

const SendMessageViz = () => {
  const viz = (
    <Viz>
      <Line legend="receivedMessage$">
        <Element
          color="#b7e"
          preview="r1"
          value={{ message: "Bonjour!", type: "received_message" }}
        />
        <SkipElement />
        <Element
          color="#7be"
          preview="r2"
          value={{ message: "Comment ça va ?", type: "received_message" }}
        />
      </Line>
      <Line legend="sentMessage$">
        <SkipElement />
        <Element
          color="#7eb"
          preview="s1"
          value={{ message: "Salut!", type: "sent_message" }}
        />
        <SkipElement />
        <Element
          color="#be7"
          preview="s2"
          value={{ message: "Ca va et toi ?", type: "sent_message" }}
        />
      </Line>
      <Line legend="message$">
        <Element
          color="#b7e"
          preview="r1"
          value={{ message: "Bonjour!", type: "received_message" }}
        />
        <Element
          color="#7eb"
          preview="s1"
          value={{ message: "Salut!", type: "sent_message" }}
        />
        <Element
          color="#7be"
          preview="r2"
          value={{ message: "Comment ça va ?", type: "received_message" }}
        />
        <Element
          color="#be7"
          preview="s2"
          value={{ message: "Ca va et toi ?", type: "sent_message" }}
        />
      </Line>
      <Line legend="model$">
        <StartElement preview="[]" />
        <Element
          color="#b7e"
          preview="[.]"
          value={[{ message: "Bonjour!", type: "received_message" }]}
        />
        <Element
          color="#7eb"
          preview="[..]"
          value={[
            { message: "Bonjour!", type: "received_message" },
            { message: "Salut!", type: "sent_message" }
          ]}
        />
        <Element
          color="#7be"
          preview="[...]"
          value={[
            { message: "Bonjour!", type: "received_message" },
            { message: "Salut!", type: "sent_message" },
            { message: "Comment ça va ?", type: "received_message" }
          ]}
        />
        <Element
          color="#be7"
          preview="[....]"
          value={[
            { message: "Bonjour!", type: "received_message" },
            { message: "Salut!", type: "sent_message" },
            { message: "Comment ça va ?", type: "received_message" },
            { message: "Ca va et toi ?", type: "sent_message" }
          ]}
        />
      </Line>
    </Viz>
  );

  return viz;
};

export default SendMessageViz;
