const ApiError = require("../error/ApiError");

// eslint-disable-next-line func-names
module.exports = function (err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  next();
  return res.status(500).json({ message: "Unexpected server side error" });
};
