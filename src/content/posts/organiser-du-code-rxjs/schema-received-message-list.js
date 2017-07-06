import React from "react";
import { Viz, Line, Element, StartElement } from "../../../site/Viz";

const ReceiveMessageViz = () => {
  const viz = (
    <Viz>
      <Line legend="receiveMessageIntent$">
        <Element color="#b7e" preview="1" value={{ content: "Bonjour!" }} />
        <Element
          color="#7eb"
          preview="2"
          value={{ content: "Comment ça va ?" }}
        />
        <Element color="#7be" preview="3" value={{ content: "Allo ?" }} />
      </Line>
      <Line legend="receivedMessage$">
        <Element
          color="#b7e"
          preview="1'"
          value={{ content: "Bonjour!", type: "received_message" }}
        />
        <Element
          color="#7eb"
          preview="2'"
          value={{ content: "Comment ça va ?", type: "received_message" }}
        />
        <Element
          color="#7be"
          preview="3'"
          value={{ content: "Allo ?", type: "received_message" }}
        />
      </Line>
      <Line legend="model$">
        <StartElement color="#AAA" value={[]} preview={"[]"} />
        <Element
          color="#b7e"
          preview="[.]"
          value={[{ content: "Bonjour!", type: "received_message" }]}
        />
        <Element
          color="#7eb"
          preview="[..]"
          value={[
            { content: "Bonjour!", type: "received_message" },
            { content: "Comment ça va ?", type: "received_message" }
          ]}
        />
        <Element
          color="#7be"
          preview="[...]"
          value={[
            { content: "Bonjour!", type: "received_message" },
            { content: "Comment ça va ?", type: "received_message" },
            { content: "Allo ?", type: "received_message" }
          ]}
        />
      </Line>
    </Viz>
  );

  return viz;
};

export default ReceiveMessageViz;
