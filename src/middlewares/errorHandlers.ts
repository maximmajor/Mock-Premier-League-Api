import { Request, Response, NextFunction } from 'express';
import { HttpException } from './HttpException';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const error = new HttpException(404, 'Resource not found');
  next(error);
};

export const errorHandler = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';

  res.status(status).json({
    status,
    message,
  });
};