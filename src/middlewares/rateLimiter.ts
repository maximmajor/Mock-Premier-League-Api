import rateLimit from 'express-rate-limit';

// Define the rate limiting options
const limiterOptions = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Maximum number of requests per windowMs
  message: 'Too many requests, please try again later.',
};

// Create the rate limiter middleware
const rateLimiter = rateLimit(limiterOptions);

export default rateLimiter;
