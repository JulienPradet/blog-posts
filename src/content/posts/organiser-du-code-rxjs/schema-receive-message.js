import React from "react";
import { Viz, Line, Element } from "../../../site/Viz";

const ReceiveMessageViz = () => {
  const viz = (
    <Viz>
      <Line legend="receiveServerMessage$">
        <Element value={{ content: "Bonjour!" }} preview="m1" color="#b7e" />
        <Element
          value={{ content: "Comment ça va ?" }}
          preview="m2"
          color="#7be"
        />
      </Line>
    </Viz>
  );

  return viz;
};

export default ReceiveMessageViz;
