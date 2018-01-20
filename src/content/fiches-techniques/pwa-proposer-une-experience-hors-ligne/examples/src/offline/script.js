import { listenContactRequest } from "../common/contact-form";
// On n'oublie pas d'enregistrer
// le Service Worker
if ("serviceWorker" in navigator) {
  // On essaye d'enregistrer le Service
  // Worker
  navigator.serviceWorker.register("/service-worker.js");
}

const form = document.querySelector("#contact-form");
listenContactRequest(form);
