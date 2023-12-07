const jwt = require("jsonwebtoken");
const ApiError = require("../error/ApiError");

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  // const { SECRET_KEY } = process.env;
  const SECRET_KEY = "very-secret-key";

  if (!token) {
    return next(ApiError.unauthorized("User is unauthorized"));
  }

  // const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return next(ApiError.unauthorized("User is unauthorized"));
  }

  req.user = payload;
  req.user._id = jwt.decode(token, SECRET_KEY);

  return next();
};
