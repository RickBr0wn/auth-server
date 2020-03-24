const notFound = (req, res, next) => {
  const error = new Error(
    `This is not the route you are looking for - ${req.originalRoutes}`
  )
  res.status(404)
  next(error)
}

const errorHandler = (error, req, res, next) =>
  res.status(res.statusCode === 200 ? 500 : res.statusCode).json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
  })

module.exports = { notFound, errorHandler }
