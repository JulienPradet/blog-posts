// Avant d'utiliser un Serivce Worker,
// on vérifie que c'est possible.
if ("serviceWorker" in navigator) {
  // Puis on déclare celui-ci
  // via la fonction `register`
  navigator.serviceWorker
    .register("service-worker.js")
    .then(registration => {
      // On a réussi ! Youpi !
      console.log("App: Achievement unlocked.");
      document.querySelector("#result").innerHTML = `
        Le service worker a été convenablement enregistré.
      `;
    })
    .catch(error => {
      // Il y a eu un problème
      console.error("App: Crash de Service Worker", error);
    });
} else {
  // Si le navigateur ne permet pas
  // d'utiliser un Service Worker
  // on ne fait rien de particulier.
  // Le site devrait continuer à
  // fonctionner normalement.
}
