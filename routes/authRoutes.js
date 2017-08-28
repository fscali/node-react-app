const passport = require("passport");
module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  //here passport receive the code in querystring from google and behaves differently from the previous route
  app.get(
    "/auth/google/callback",
    /*This second argument is a middleware that intercepts calls to this uri  and authenticates against our MongoDB*/
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );
  app.get("/api/logout", (req, res) => {
    //passport attaches the function logout to req
    req.logout();
    //res.send(req.user);
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    //to test the authenticated user
    //the user is attached by passport
    res.send(req.user);
  });
};
