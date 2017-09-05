const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 }
});

//we are telling mongoose that we want to create a new collection "users" into mongo if it doesn't already exist
mongoose.model("users", userSchema);
