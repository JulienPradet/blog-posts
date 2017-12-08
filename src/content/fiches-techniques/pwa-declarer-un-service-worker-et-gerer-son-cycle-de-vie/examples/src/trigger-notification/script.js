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

  navigator.serviceWorker.getRegistration().then(registration => {
    registration.addEventListener("updatefound", () => {
      // On récupère le Service
      // Worker en cours
      // d'installation
      const newWorker = registration.installing;
      // `registration` a aussi
      // les clés `active` et
      // `waiting` qui permettent
      // de récupérer les Service
      // Workers correspondant

      newWorker.addEventListener("statechange", () => {
        if (newWorker.state === "installed") {
          console.log("Un nouveau Service Worker est prêt.");
          document.querySelector("#notification").style.display = "block";
        }
      });
    });
  });

  document
    .querySelector("#on-activation-request")
    .addEventListener("click", () => {
      // On récupère le Service Worker
      // qui a fini de s'installer
      navigator.serviceWorker.getRegistration().then(registration => {
        // Et on lui envoie le
        // message d'activation
        registration.waiting.postMessage("skipWaiting");
      });
    });
}
