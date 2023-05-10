// Import required modules and dependencies
const { verify } = require('jsonwebtoken');
const Admin = require('../model/admin');
const Learner = require('../model/learner');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { private_key } = process.env;

// Exported module containing token verification middleware functions
module.exports = {
  // Middleware function to verify admin token
  adminToken: catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return next(new AppError('No token provided', 401));
    }
    const foundAdmin = await Admin.findOne({ accesstoken: token });
    if (!foundAdmin) {
      return next(new AppError('Invalid token', 401));
    }
    verify(token, private_key, (err, _) => {
      if (err && err.name === 'TokenExpiredError') {
        return next(new AppError('Token expired', 401));
      } else if (err && err.name === 'JsonWebTokenError') {
        return next(new AppError('Invalid token', 401));
      }
      next();
    });
  }),

  // Middleware function to verify learner token
  learnerToken: catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return next(new AppError('No token provided', 401));
    }
    const foundLearner = await Learner.findOne({ accesstoken: token });
    if (!foundLearner) {
      return next(new AppError('Invalid token', 401));
    }
    verify(token, private_key, (err, _) => {
      if (err && err.name === 'TokenExpiredError') {
        return next(new AppError('Token expired', 401));
      } else if (err && err.name === 'JsonWebTokenError') {
        return next(new AppError('Invalid token', 401));
      }
      next();
    });
  })
}
