module.exports = app => {
  const bodyParser = require("body-parser");
  app.use(bodyParser.json());
  app.post("/contact", (req, res) => {
    console.log(req.body);
    res.send(`Formulaire de contact bien reçu ! ${req.body.content}`);
  });
};
