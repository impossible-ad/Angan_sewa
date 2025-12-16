export const globalErrorHandler = (err, req, res, next) => {
  const message = err.message;
  const status = err.status ? err.status : "Failed";
  const statusCode = err.StatusCode ? err.statusCodde : 500;
  res.status(statusCode).json({
    status,
    message,
  });
};
