import { createElement } from "./createElement";
import { render } from "./render";
import { useState } from "./hooks";

const App = () => {
  const [counter, setCounter] = useState(0);

  return createElement("div", {
    children: [
      "My first element " + counter,
      createElement("br", {}),
      createElement("button", {
        onclick: () => setCounter(counter + 1),
        children: ["click!"]
      })
    ]
  });
};

const parent = document.getElementById("app");

render(createElement(App, {}), parent);
