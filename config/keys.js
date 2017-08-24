//keys.js -- figuring out what set of credentials to return -- to commit
if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
