//this is a middleware that we include only for some specific route
module.exports = (req, res, next) => {
  //next is a function that we call when our middleware has done its job
  if (!req.user) {
    return res.status(401).send({ error: "You must be logged in" });
  }
  next();
};
