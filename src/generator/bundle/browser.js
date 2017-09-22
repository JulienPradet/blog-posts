import React from "react";
import { render, hydrate } from "react-dom";
import App from "../tmp/App";
import { BrowserRouter } from "react-router-dom";
import { loadComponents } from "loadable-components";
import displayUpdateNotification from "../../site/displayUpdateNotification";

const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

loadComponents().then(() => {
  if (process.env.NODE_ENV === "development") {
    render(app, document.getElementById("root"));
  } else {
    hydrate(app, document.getElementById("root"));
  }
});

if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(registration => {
        // Registration was successful
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          installingWorker.onstatechange = () => {
            if (installingWorker.state === "installed") {
              if (navigator.serviceWorker.controller) {
                displayUpdateNotification();
              }
            }
          };
        };
      })
      .catch(err => {
        // registration failed :(
        console.log("ServiceWorker registration failed: ", err);
      });
  });
}
