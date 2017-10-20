import React from "react";
import { Viz, Line, Element } from "../../../site/Viz";

const SendMessageViz = () => {
  const viz = (
    <Viz>
      <Line legend="sentMessage$">
        <Element color="#7eb" preview="m1" value={{ content: "Salut!" }} />
        <Element
          color="#be7"
          preview="m2"
          value={{ content: "Ca va et toi ?" }}
        />
      </Line>
      <Line legend="confirmSentMessage$">
        <Element
          color="#7eb"
          preview="c1"
          value={{
            action: "confirmer_message",
            message: {
              content: "Salut!",
              is_confirmed: true,
              type: "sent_message"
            }
          }}
        />
        <Element
          color="#be7"
          preview="c2"
          value={{
            action: "confirmer_message",
            message: {
              content: "Ca va et toi ?",
              is_confirmed: true,
              type: "sent_message"
            }
          }}
        />
      </Line>
    </Viz>
  );

  return viz;
};

export default SendMessageViz;
