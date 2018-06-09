const path = require("path");
const fs = require("../util/fs");

const createContent = paths => () => {
  const manifest = {
    short_name: "Julien P.",
    name: "Enchanté, Julien Pradet",
    start_url: "https://www.julienpradet.fr/",
    background_color: "#f6edda",
    theme_color: "#f6edda",
    display: "standalone",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };

  return JSON.stringify(manifest);
};

const createManifest = paths => () => {
  return fs.writefile(
    path.join(paths.buildPath, "manifest.json"),
    createContent(paths)()
  );
};

module.exports = createManifest;
