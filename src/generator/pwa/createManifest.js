const path = require("path");
const fs = require("../util/fs");

const createContent = paths => () => {
  const manifest = {
    short_name: "Julien P.",
    name: "Enchanté, Julien Pradet",
    start_url: "https://www.julienpradet.fr/",
    background_color: "#faffff",
    theme_color: "#00C9C9",
    display: "standalone"
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
