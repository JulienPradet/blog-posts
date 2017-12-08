if ("serviceWorker" in navigator) {
  // On essaye d'enregistrer le service
  // worker
  navigator.serviceWorker
    .register("service-worker.js")
    .then(registration => {
      // Le Service Worker a fini d'être
      // téléchargé.
      console.log("App: Téléchargement fini.");
    })
    .catch(err => {
      // Il y a eu un problème
      console.error("App: Crash de Service Worker", err);
    });
}
