const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");

//the order of this require statements is important, because otherwise mongoose will complain because we try to use a model before creating it in mongodb
require("./models/User");
require("./services/passport"); //it is sufficient to include, as it must only be executed without exporting anything

const keys = require("./config/keys");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //cookies valid 30 days
    keys: [keys.cookieKey]
  })
);

//to tell passport that we are gonna use cookies
app.use(passport.initialize());
app.use(passport.session());

//express doest not parse by default the payload..with this middleware we have the body in the request, that we can use in the POST requests
app.use(bodyParser.json());

require("./routes/authRoutes")(app); //the require returns the exported function, that we call immediately with the app object
require("./routes/billingRoutes")(app); //the require returns the exported function, that we call immediately with the app object

if (process.env.NODE_ENV === "production") {
  // if some request comes for a route that is not already contemplated above, then look for a match in the path
  // having the route indicated below
  app.use(express.static("client/build"));

  //ultimately, if we get a request for some route that we don't understand, just serve the file index.html
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//Heroku can Inject environment variables, that is runtime configurations, like the PORT we are running on!
const PORT = process.env.PORT || 5000;

app.listen(PORT);
