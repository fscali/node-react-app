const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

//Heroku can Inject environment variables, that is runtime configurations, like the PORT we are running on!
const PORT = process.env.PORT || 5000;

app.listen(PORT);
