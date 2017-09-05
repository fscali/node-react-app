const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  //app.post("/api/stripe", async (req, res) => {

  //with express we can pass as many function as we want as arguments to the various post, get, etc methods.
  //the only requirement is that one of the function actually send the response to the user, and at that point
  //the route handler finishes its job
  app.post("/api/stripe", requireLogin, async (req, res) => {
    const token = req.body.id;

    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      source: token, // obtained with Stripe.js
      description: "Charge for Emaily credits"
    });

    req.user.credits += 5; //remember the user is automatically injected in the request by passport
    const user = await req.user.save();

    res.send(user);
  });
};
