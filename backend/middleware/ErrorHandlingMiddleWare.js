const ApiError = require("../error/ApiError");

// eslint-disable-next-line func-names
module.exports = function (err, req, res) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: "Unexpected server side error" });
};
