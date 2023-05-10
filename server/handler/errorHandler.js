const AppError = require('../utils/appError');

const handleCastError = err => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
}

const handleDuplicateDBError = err => {
    const value = Object.values(err.errors).map(error => error.message);
    const message = `Duplicate feild value: ${value}. Please use another value`;
    return new AppError(message, 400);
}

const handleValidationError = err => {
    const errors = Object.values(err.errors).map(error => error.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
}

const sendErrorProd = (err, res) => {
    if(err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }
    else {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong'
        });
    }
}
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
      status : err.status,
      error : err,
      message : err.message,
      stack : err.stack 
    })
  }
  

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'fail';
    sendErrorDev(err, res)
}