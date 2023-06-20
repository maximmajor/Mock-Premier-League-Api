import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { errorHandler, notFoundHandler } from '../middlewares/errorHandlers';

function createServer() {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));

    // use middlewares
    app.use(cors());
    app.use(helmet());
    app.use(morgan('tiny'));
    app.use(bodyParser.json());

    // use routes
   

    // handle 404 errors
    app.use(notFoundHandler);

    // handle errors
    app.use(errorHandler);
    

    return app;
}

export default createServer;