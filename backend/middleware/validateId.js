const { Joi } = require("celebrate");

// Define Joi schema for validating ID
const idSchema = Joi.string().hex().length(24);

// Middleware for validating ID
module.exports = (req, res, next) => {
  const { error } = idSchema.validate(req.params.userId);
  if (error) {
    return res.status(400).send(error);
  }
  return next();
};
