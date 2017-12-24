// On se branche sur chaque requête émise
self.addEventListener("fetch", event => {
  const requestUrl = new URL(event.request.url);

  // Si la requête est bien celle que l'on
  // veut simuler
  if (requestUrl.pathname === "/replace-response/toto") {
    // Alors, on modifie la réponse
    event.respondWith(
      // Pour renvoyer "Hello Toto"
      new Response(new Blob(["Hello Toto"], { type: "text/html" }), {
        status: 200,
        statusText: "OK",
        headers: {
          "Content-Type": "text/html"
        }
      })
    );
  }
});
