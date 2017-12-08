/* global self */
// fichier : /service-worker.js

console.log("SW: Téléchargement fini.   ");

self.addEventListener("install", event => {
  console.log("SW: Installation en cours.");

  self.skipWaiting();

  // Un Service Worker a fini d'être
  // installé quand la promesse dans
  // `event.waitUntil` est résolue
  event.waitUntil(
    // Création d'une promesse
    // factice qui est résolue au
    // bout d'une seconde
    new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("SW: Installé.");
        resolve();
      }, 1000);
    })
  );
});

self.addEventListener("activate", event => {
  console.log("SW: Activation en cours.");

  // Un Service Worker a fini d'être
  // activé quand la promesse dans
  // `event.waitUntil` est résolue
  event.waitUntil(
    // Création d'une promesse
    // factice qui est résolue au
    // bout d'une seconde
    new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("SW: Activé.");
        resolve();
      }, 1000);
    })
    // Des que l'activation est terminée
    // On dites à toutes les pages ouvertes
    // d'utiliser ce Service Worker
    // .then(() => self.clients.claim())
  );
});

self.addEventListener("message", event => {
  console.log("SW: Message reçu 2");
  console.log("SW:", event.data);
});
