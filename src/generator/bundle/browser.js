import React from "react";
import { render } from "react-dom";
import { withAsyncComponents } from "react-async-component";
import App from "../tmp/App";
import { BrowserRouter } from "react-router-dom";

withAsyncComponents(
  <BrowserRouter>
    <App />
  </BrowserRouter>
).then(result => {
  const { appWithAsyncComponents } = result;

  render(appWithAsyncComponents, document.getElementById("root"));
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(registration => {
        // Registration was successful
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      })
      .catch(err => {
        // registration failed :(
        console.log("ServiceWorker registration failed: ", err);
      });
  });
}
