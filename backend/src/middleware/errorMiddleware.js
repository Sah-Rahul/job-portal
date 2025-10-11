const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors,
    });
  }

  if (process.env.NODE_ENV === "production") {
    console.error("🔥", err);
  }

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorMiddleware;
