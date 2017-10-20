import React from "react";
import { Viz, Line, Element } from "../../../site/Viz";

const ReceiveMessageViz = () => {
  const viz = (
    <Viz>
      <Line legend="sendMessageIntent$">
        <Element value={{ content: "Salut !" }} preview="m1" color="#7eb" />
        <Element
          value={{ content: "Ca va et toi ?" }}
          preview="m2"
          color="#be7"
        />
      </Line>
      <Line legend="optimisticSendMessage$">
        <Element
          color="#7eb"
          preview="s1"
          value={{
            action: "ajouter_message",
            message: {
              content: "Salut !",
              is_confirmed: false,
              type: "sent_message"
            }
          }}
        />
        <Element
          color="#be7"
          preview="s2"
          value={{
            action: "ajouter_message",
            message: {
              content: "Ca va et toi ?",
              is_confirmed: false,
              type: "sent_message"
            }
          }}
        />
      </Line>
    </Viz>
  );

  return viz;
};

export default ReceiveMessageViz;
