const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

//this fetch the schema FROM mongoose
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  //this first argumenti is what we pulled out of the database when we call the "done" callback in the function inside the strategy
  done(null, user.id); //this user.id is not the google profileId; it's the unique _id  automatically generated by mongo.
  //we use this because we could use different authentication providers, and we can only assume the existance of
  //the id generated by mongo. The profile.id is for the oauth workflow. After that we care only about our internal id.
  //passport will put this id into a cookie automatically
});

//id is the token taken by the cookie, that we previously set in serializeUser
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    //this arrow function is our opportunity to take all the information that Google gave us after authentication and store that in our DB
    (accessToken, refreshToken, profile, done) => {
      //access token: we can present it back to Google to show that
      // the user authenticated with us via Google and it can be used to manage his profile
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (!!existingUser) {
          //we already have a record with a profile.id

          done(null, existingUser);
        } else {
          new User({ googleId: profile.id }).save().then(newUser => {
            done(null, existingUser);
          });
        }
      });
    }
  )
);
