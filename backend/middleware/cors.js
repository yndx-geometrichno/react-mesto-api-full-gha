const allowedCors = [
  "https://bestfrontend.here.nomoredomainsmonster.ru",
  "http://bestfrontend.here.nomoredomainsmonster.ru",
  "localhost:3000",
];


module.exports = (req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.headers("Access-Control-Allow-Origin", origin);
  }

  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
  }

  const requestHeaders = req.headers['access-control-request-headers'];

  if(method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end()
  }
  return next()
;};
