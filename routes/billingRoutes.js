const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);

module.exports = app => {
  app.post("/api/stripe", async (req, res) => {
    const token = req.body.id;

    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      source: token, // obtained with Stripe.js
      description: "Charge for Emaily credits"
    });
    //console.log(charge);
  });
};
