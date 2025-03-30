function asyncHandle(fun) {
  return (req, res, next) => {
    Promise.resolve(fun(req, res, next)).catch((error) => {
      return res.status(500).json({
        message: "Internal Server Error",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    });
  };
}
export default asyncHandle;
