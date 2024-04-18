const logger = require('./logger.js');

const errorHandler = (err, req, res, next) => {
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';
    logger.error('An error occurred:', err);
    next();
}

module.exports = errorHandler;


// import { Request, Response, NextFunction } from 'express';
// import logger from './logger.js';

// const errorHandler = (err, req, res, next) => {
//     const errStatus = err.statusCode || 500;
//     const errMsg = err.message || 'Something went wrong';
//     logger.error('An error occurred:', err);
//     next();
// }

// export default errorHandler