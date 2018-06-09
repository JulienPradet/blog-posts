import React from "react";
import { render, hydrate } from "react-dom";
import App from "../tmp/App";
import { BrowserRouter } from "react-router-dom";
import { loadComponents } from "loadable-components";
import { dispatchUpdateEvent } from "../../site/updateNotification";
import UpdateNotification from "../../site/components/UpdateNotification";

const app = [
  <BrowserRouter key="app">
    <App />
  </BrowserRouter>,
  <UpdateNotification key="service-worker" />
];

loadComponents().then(() => {
  if (process.env.NODE_ENV === "development") {
    render(app, document.getElementById("root"));
  } else {
    hydrate(app, document.getElementById("root"));
  }
});

if ("serviceWorker" in navigator) {
  if (process.env.NODE_ENV === "production") {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(registration => {
        // Registration was successful
        registration.addEventListener("updatefound", () => {
          const installingWorker = registration.installing;
          const activeWorker = registration.active;

          installingWorker.addEventListener("statechange", () => {
            if (installingWorker.state === "installed") {
              if (navigator.serviceWorker.controller) {
                dispatchUpdateEvent();
              }
            }
          });

          if (installingWorker && !activeWorker) {
            navigator.serviceWorker.addEventListener("controllerchange", () => {
              console.log("SW attached for the first time");
            });
          } else {
            navigator.serviceWorker.addEventListener("controllerchange", () => {
              window.location.reload();
            });
          }
        });
      })
      .catch(err => {
        // registration failed :(
        console.log("ServiceWorker registration failed: ", err);
      });
  } else {
    navigator.serviceWorker.getRegistration().then(registration => {
      if (registration) {
        registration.unregister();
      }
    });
  }
}
