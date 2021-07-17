const ERROR_HANDLERS = {
  CastError: (res) =>
    res.status(400).send({
      error: "malformatted id",
    }),
  ValidationError: (res, err) =>
    res.status(400).json({
      err: err.message,
    }),
  JsonWebTokenError: (res, err) =>
    res.status(401).json({
      err: "invalid token",
    }),
  defaultError: (res) => res.status(500).end(),
};

module.exports = (error, request, response, next) => {
  console.error(error);

  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError;

  handler(response, error);
};
