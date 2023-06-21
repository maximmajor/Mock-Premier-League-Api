import { Request, Response, NextFunction } from 'express';
import accountModel from '../models/accountModel';
import {HttpException} from './HttpException';

const authorize = async (req: Request, res: Response, next: NextFunction) => {
  const accountId = req.user; // Assuming the user ID is stored in the req.user property
  try {
    const account = await accountModel.findById(accountId).exec();
    if (!account) {
      throw new HttpException(401, 'Unauthorized');
    }
    // Check if the user is an admin
    if (!account.isAdmin) {
        return res.status(401).json( {error: 'Only admins can perform this action'});
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default authorize;
