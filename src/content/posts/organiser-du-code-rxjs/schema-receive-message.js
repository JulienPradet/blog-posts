import React from "react";
import { Viz, Line, Element } from "../../../site/Viz";

const ReceiveMessageViz = () => {
  const viz = (
    <Viz>
      <Line legend="receiveServerMessage$">
        <Element value={{ content: "Bonjour!" }} preview="1" />
        <Element value={{ content: "Comment ça va ?" }} preview="2" />
        <Element value={{ content: "Allo ?" }} preview="3" />
      </Line>
    </Viz>
  );

  return viz;
};

export default ReceiveMessageViz;
