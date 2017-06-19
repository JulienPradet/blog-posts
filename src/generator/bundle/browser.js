import React from "react";
import { render } from "react-dom";
import { AsyncComponentProvider } from "react-async-component";
import App from "../tmp/App";
import { BrowserRouter } from "react-router-dom";
import asyncBootstrapper from "react-async-bootstrapper";

const rehydrateState = window.ASYNC_COMPONENTS_STATE;

const app = (
  <AsyncComponentProvider rehydrateState={rehydrateState}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AsyncComponentProvider>
);

asyncBootstrapper(app).then(() => {
  render(app, document.getElementById("root"));
});

if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
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
