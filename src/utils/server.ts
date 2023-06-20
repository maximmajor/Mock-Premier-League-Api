import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { errorHandler, notFoundHandler } from '../middlewares/errorHandlers';
import rateLimitErrorHandler from '../middlewares/rateLimiterError';
import accountRoutes from '../routes/account'

function createServer() {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));

    // use middlewares
    app.use(cors());
    app.use(helmet());
    app.use(morgan('tiny'));
    app.use(bodyParser.json());

    // use routes
    app.use('/account', accountRoutes);


    // handle 404 errors
    app.use(notFoundHandler);

    // handle errors
    app.use(errorHandler);

    // Add the rate limit error handler middleware
    app.use(rateLimitErrorHandler);


    return app;
}

export default createServer;