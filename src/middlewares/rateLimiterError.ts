import { Request, Response, NextFunction } from 'express';

const rateLimitErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'RateLimitError') {
    // Handle rate limit error
    return res.status(429).json({ message: 'Too many requests, please try again later.' });
  }
  next(err);
};

export default rateLimitErrorHandler;
