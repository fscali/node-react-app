const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");

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

require("./routes/authRoutes")(app); //the require returns the exported function, that we call immediately with the app object

//Heroku can Inject environment variables, that is runtime configurations, like the PORT we are running on!
const PORT = process.env.PORT || 5000;

app.listen(PORT);
