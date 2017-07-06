import React from "react";
import { Viz, Line, Element } from "../../../site/Viz";

const ReceiveMessageViz = () => {
  const viz = (
    <Viz>
      <Line legend="sendMessageEvent$">
        <Element
          color="#b7e"
          preview="e1"
          value={{ target: { sourceTarget: "..." } }}
        />
        <Element
          color="#7eb"
          preview="e2"
          value={{ target: { sourceTarget: "..." } }}
        />
        <Element
          color="#7be"
          preview="e3"
          value={{ target: { sourceTarget: "..." } }}
        />
      </Line>
      <Line legend="sendMessageIntent$">
        <Element color="#b7e" preview="m1" value={{ message: "Salut!" }} />
        <Element
          color="#7eb"
          preview="m2"
          value={{ message: "Ca va et toi ?" }}
        />
        <Element color="#7be" preview="m3" value={{ message: "A l'huile" }} />
      </Line>
    </Viz>
  );

  return viz;
};

export default ReceiveMessageViz;
