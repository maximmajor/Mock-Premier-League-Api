import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { HttpException } from './HttpException';

// Augment the existing Request type
declare global {
    namespace Express {
        interface Request {
            user?: any; // Add the 'user' property to the Request type
        }
    }
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new HttpException(409, 'No token provided');
    }

    const [scheme, token] = authHeader.split(' ');
    if (!/^Bearer$/i.test(scheme)) {
        throw new HttpException(409, 'Invalid token format');
    }

    jwt.verify(token, 'secretWord' as Secret, (err: any, decoded: any) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        req.user = decoded.userId; // Store the decoded user information in the request object
        next();
    });
};

export default authenticate;
